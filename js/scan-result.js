/* scan-result.js */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const scanId = urlParams.get('id');
  const isNew = urlParams.get('new') === 'true';
  const isUpload = urlParams.get('upload') === 'true';

  let currentScan = null;

  if (scanId) {
    const scans = WaveData.getScans();
    currentScan = scans.find(s => s.id === scanId);
  }

  const sessionCapturedImage = sessionStorage.getItem('scannedImage');

  if (!currentScan) {
    // Default or newly simulated scan result
    currentScan = {
      id: 'scan_' + Date.now(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      timestamp: Date.now(),
      material: isUpload ? '내열 강화 유리' : 'PP 플라스틱 5',
      materialCode: isUpload ? 'GLASS' : 'PP',
      grade: 'safe',
      gradeTitle: '전자레인지 사용 가능',
      gradeDesc: 'BPA Free 인증을 완료한 안전한 내열 용기입니다.',
      maxTemp: isUpload ? 180 : 120,
      bpaStatus: 'Free',
      confidence: 96,
      imageUrl: sessionCapturedImage || (isUpload ? '' : 'img/logo.jpg'),
      checklist: [
        { name: 'BPA Free 인증', status: 'pass', text: '인증 완료' },
        { name: '고온 변형 테스트', status: 'pass', text: '내열 기준 통과' },
        { name: '금속 장식 성분', status: 'pass', text: '금속 성분 미감지' },
        { name: '증기 배출 가이드', status: 'warn', text: '뚜껑 개봉 후 가열' }
      ],
      aiComment: '분석 결과 해당 용기는 전자레인지 고온 데우기에 적합한 안전 용기입니다. 뚜껑을 약간 열어 증기가 배출되도록 조리하세요.'
    };
  } else if (sessionCapturedImage && isNew) {
    currentScan.imageUrl = sessionCapturedImage;
  }

  // Populate UI
  const resultImage = document.getElementById('resultImage');
  const imagePlaceholder = document.getElementById('imagePlaceholder');
  const displayImage = sessionCapturedImage || currentScan.imageUrl;

  if (displayImage && resultImage) {
    resultImage.src = displayImage;
    resultImage.style.display = 'block';
    if (imagePlaceholder) imagePlaceholder.style.display = 'none';
  } else if (imagePlaceholder) {
    imagePlaceholder.style.display = 'flex';
    if (resultImage) resultImage.style.display = 'none';
  }

  const gradeOverlay = document.getElementById('gradeOverlay');
  const gradeOverlayText = document.getElementById('gradeOverlayText');
  const gradeCard = document.getElementById('gradeCard');
  const gradeIcon = document.getElementById('gradeIcon');
  const gradeTitle = document.getElementById('gradeTitle');
  const gradeDesc = document.getElementById('gradeDesc');

  if (gradeOverlay && gradeCard) {
    gradeOverlay.className = `result-grade-overlay ${currentScan.grade}`;
    gradeCard.className = `grade-card ${currentScan.grade}`;

    if (currentScan.grade === 'safe') {
      if (gradeOverlayText) gradeOverlayText.textContent = '안전';
      if (gradeIcon) gradeIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else if (currentScan.grade === 'caution') {
      if (gradeOverlayText) gradeOverlayText.textContent = '주의';
      if (gradeIcon) gradeIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    } else {
      if (gradeOverlayText) gradeOverlayText.textContent = '위험';
      if (gradeIcon) gradeIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    }

    if (gradeTitle) gradeTitle.textContent = currentScan.gradeTitle;
    if (gradeDesc) gradeDesc.textContent = currentScan.gradeDesc;
  }

  // Material details
  const materialType = document.getElementById('materialType');
  const maxTemp = document.getElementById('maxTemp');
  const bpaStatus = document.getElementById('bpaStatus');
  const confidence = document.getElementById('confidence');
  const tempBar = document.getElementById('tempBar');
  const tempLabel = document.getElementById('tempLabel');

  if (materialType) materialType.textContent = currentScan.material;
  if (maxTemp) maxTemp.textContent = `${currentScan.maxTemp}°C`;
  if (bpaStatus) bpaStatus.textContent = currentScan.bpaStatus;
  if (confidence) confidence.textContent = `${currentScan.confidence}%`;

  if (tempBar) {
    const pct = Math.min(100, Math.round((currentScan.maxTemp / 240) * 100));
    tempBar.style.width = `${pct}%`;
  }
  if (tempLabel) tempLabel.textContent = `${currentScan.maxTemp}°C / 최대 240°C`;

  // Checklist
  const checklistEl = document.getElementById('safetyChecklist');
  if (checklistEl && currentScan.checklist) {
    checklistEl.innerHTML = '';
    currentScan.checklist.forEach(item => {
      let iconClass = 'pass';
      let icon = '<i class="fa-solid fa-check"></i>';
      if (item.status === 'fail') {
        iconClass = 'fail';
        icon = '<i class="fa-solid fa-xmark"></i>';
      } else if (item.status === 'warn') {
        iconClass = 'warn';
        icon = '<i class="fa-solid fa-exclamation"></i>';
      }

      const row = document.createElement('div');
      row.className = 'checklist-item';
      row.innerHTML = `
        <div class="check-icon ${iconClass}">${icon}</div>
        <div class="checklist-item-text">${item.name}</div>
        <div class="checklist-item-result ${iconClass}">${item.text}</div>
      `;
      checklistEl.appendChild(row);
    });
  }

  // AI Comment
  const aiCommentEl = document.getElementById('aiComment');
  if (aiCommentEl) aiCommentEl.textContent = currentScan.aiComment;

  // Save button
  const saveBtn = document.getElementById('saveResultBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (sessionCapturedImage) {
        currentScan.imageUrl = sessionCapturedImage;
      }
      WaveData.saveScan(currentScan);
      showToast('스캔 결과가 저장되었습니다.');
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> 저장 완료';
    });
  }
});

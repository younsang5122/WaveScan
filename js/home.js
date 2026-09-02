/* home.js */

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = Auth.isLoggedIn();
  const guestBanner = document.getElementById('guestBanner');
  const totalScanCountEl = document.getElementById('totalScanCount');
  const accuracyValEl = document.getElementById('accuracyVal');
  const accuracyLabelEl = document.getElementById('accuracyLabel');
  const scanCarousel = document.getElementById('scanCarousel');
  const scanEmptyState = document.getElementById('scanEmptyState');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');

  // Guest banner display
  if (!isLoggedIn && guestBanner) {
    guestBanner.style.display = 'flex';
  }

  // Load stats
  const stats = WaveData.getStats();
  if (totalScanCountEl) totalScanCountEl.textContent = stats.total;
  if (accuracyValEl) accuracyValEl.textContent = isLoggedIn ? stats.accuracy : '—';
  if (accuracyLabelEl) accuracyLabelEl.textContent = isLoggedIn ? '개인 정확도' : '로그인 필요';

  // Render recent scans
  const scans = WaveData.getScans();
  if (scans.length === 0) {
    if (scanEmptyState) scanEmptyState.style.display = 'flex';
  } else {
    scans.slice(0, 5).forEach(scan => {
      const card = document.createElement('a');
      card.className = 'scan-card';
      card.href = `scan-result.html?id=${scan.id}`;

      let badgeHtml = '';
      if (scan.grade === 'safe') badgeHtml = '<span class="badge badge-safe">안전</span>';
      else if (scan.grade === 'caution') badgeHtml = '<span class="badge badge-caution">주의</span>';
      else badgeHtml = '<span class="badge badge-danger">위험</span>';

      card.innerHTML = `
        <div class="scan-thumb">
          ${scan.imageUrl ? `<img src="${scan.imageUrl}" alt="${scan.material}">` : `<i class="fa-solid fa-bowl-food"></i>`}
          <div class="scan-thumb-badge">${badgeHtml}</div>
        </div>
        <div class="scan-info">
          <div class="scan-material">${scan.material}</div>
          <div class="scan-date">${scan.date.split(' ')[0]}</div>
        </div>
      `;
      scanCarousel.appendChild(card);
    });
  }

  // Album file upload handler
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        showToast('이미지를 분석하는 중...');
        setTimeout(() => {
          window.location.href = 'scan-result.html?upload=true';
        }, 800);
      }
    });
  }
});

/* history.js */

document.addEventListener('DOMContentLoaded', () => {
  const historyList = document.getElementById('historyList');
  const historyEmpty = document.getElementById('historyEmpty');
  const filterBar = document.getElementById('filterBar');
  const searchInput = document.getElementById('searchInput');

  const safeCountEl = document.getElementById('safeCount');
  const cautionCountEl = document.getElementById('cautionCount');
  const dangerCountEl = document.getElementById('dangerCount');
  const totalCountEl = document.getElementById('totalCount');

  let currentFilter = 'all';
  let searchQuery = '';

  function renderHistory() {
    const scans = WaveData.getScans();
    const stats = WaveData.getStats();

    if (safeCountEl) safeCountEl.textContent = stats.safe;
    if (cautionCountEl) cautionCountEl.textContent = stats.caution;
    if (dangerCountEl) dangerCountEl.textContent = stats.danger;
    if (totalCountEl) totalCountEl.textContent = stats.total;

    let filtered = scans.filter(s => {
      if (currentFilter !== 'all' && s.grade !== currentFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return s.material.toLowerCase().includes(q) || s.date.includes(q);
      }
      return true;
    });

    if (!historyList) return;
    historyList.innerHTML = '';

    if (filtered.length === 0) {
      if (historyEmpty) historyEmpty.style.display = 'flex';
    } else {
      if (historyEmpty) historyEmpty.style.display = 'none';
      filtered.forEach(scan => {
        const card = document.createElement('div');
        card.className = 'history-card';

        let badgeHtml = '';
        if (scan.grade === 'safe') badgeHtml = '<span class="badge badge-safe">안전</span>';
        else if (scan.grade === 'caution') badgeHtml = '<span class="badge badge-caution">주의</span>';
        else badgeHtml = '<span class="badge badge-danger">위험</span>';

        card.innerHTML = `
          <div class="history-thumb" onclick="location.href='scan-result.html?id=${scan.id}'">
            ${scan.imageUrl ? `<img src="${scan.imageUrl}" alt="${scan.material}">` : `<i class="fa-solid fa-bowl-food"></i>`}
            <div class="history-thumb-status ${scan.grade}"></div>
          </div>
          <div class="history-body">
            <div class="history-header" onclick="location.href='scan-result.html?id=${scan.id}'">
              <div class="history-material">${scan.material}</div>
              <div class="history-date">${scan.date.split(' ')[0]}</div>
            </div>
            <div class="history-desc" onclick="location.href='scan-result.html?id=${scan.id}'">${scan.gradeDesc}</div>
            <div class="history-footer">
              ${badgeHtml}
              <button class="history-delete" onclick="deleteItem(event, '${scan.id}')" title="삭제">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
        historyList.appendChild(card);
      });
    }
  }

  // Filter chips
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderHistory();
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderHistory();
    });
  }

  // Global delete handler
  window.deleteItem = function(e, id) {
    e.stopPropagation();
    if (confirm('이 스캔 기록을 삭제하시겠습니까?')) {
      WaveData.deleteScan(id);
      showToast('기록이 삭제되었습니다.');
      renderHistory();
    }
  };

  renderHistory();
});

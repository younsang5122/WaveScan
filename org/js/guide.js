/* guide.js */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.guide-tab');
  const panels = document.querySelectorAll('.guide-panel');

  function switchTab(tabId) {
    tabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
      else t.classList.remove('active');
    });

    panels.forEach(p => {
      if (p.id === `panel-${tabId}`) p.classList.add('active');
      else p.classList.remove('active');
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Handle URL hash if navigated from index.html (e.g. guide.html#glass)
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`panel-${hash}`)) {
    switchTab(hash);
  }
});

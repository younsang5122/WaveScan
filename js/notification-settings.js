/* notification-settings.js */

document.addEventListener('DOMContentLoaded', () => {
  const masterToggle = document.getElementById('masterToggle');
  const subToggles = document.querySelectorAll('.notif-toggle');

  if (masterToggle) {
    masterToggle.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      subToggles.forEach(t => {
        t.checked = isChecked;
      });
      showToast(isChecked ? '모든 알림이 켜졌습니다.' : '모든 알림이 꺼졌습니다.');
    });
  }

  subToggles.forEach(t => {
    t.addEventListener('change', () => {
      const allChecked = Array.from(subToggles).every(item => item.checked);
      if (masterToggle) masterToggle.checked = allChecked;
    });
  });
});

/* mypage.js */

document.addEventListener('DOMContentLoaded', () => {
  const loggedInView = document.getElementById('loggedInView');
  const guestView = document.getElementById('guestView');

  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileTag = document.getElementById('profileTag');
  const myScanCount = document.getElementById('myScanCount');
  const mySafeCount = document.getElementById('mySafeCount');
  const myAccuracy = document.getElementById('myAccuracy');
  const logoutBtn = document.getElementById('logoutBtn');

  const user = Auth.getUser();
  const isLoggedIn = Auth.isLoggedIn();

  if (isLoggedIn && user) {
    if (loggedInView) loggedInView.style.display = 'block';
    if (guestView) guestView.style.display = 'none';

    if (profileName) profileName.textContent = user.name || '사용자';
    if (profileAvatar) {
      if (user.avatar) {
        profileAvatar.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
      } else {
        profileAvatar.innerHTML = '<i class="fa-solid fa-user"></i>';
      }
    }

    if (profileTag) {
      if (user.provider === 'google') {
        profileTag.innerHTML = '<i class="fa-brands fa-google"></i> Google 연동';
      } else {
        profileTag.innerHTML = '<i class="fa-solid fa-user-check"></i> 회원';
      }
    }

    // Stats
    const stats = WaveData.getStats();
    if (myScanCount) myScanCount.textContent = stats.total;
    if (mySafeCount) mySafeCount.textContent = stats.safe;
    if (myAccuracy) myAccuracy.textContent = stats.accuracy;
  } else {
    if (loggedInView) loggedInView.style.display = 'none';
    if (guestView) guestView.style.display = 'block';
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('로그아웃 하시겠습니까?')) {
        Auth.logout();
        showToast('로그아웃 되었습니다.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 500);
      }
    });
  }
});

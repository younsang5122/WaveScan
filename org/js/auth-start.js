/* auth-start.js */

function handleGoogleLogin() {
  // Simulate Google OAuth login
  Auth.loginWithGoogle('user@gmail.com', '홍길동', 'img/logo.jpg');
  showToast('Google 계정으로 로그인 되었습니다.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

function handleGuestLogin() {
  Auth.setGuestMode();
  showToast('로그인 없이 계속합니다.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

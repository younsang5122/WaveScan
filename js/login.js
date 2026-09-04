/* login.js */

async function handleGoogleLogin() {
  const btn = document.getElementById('googleLoginBtn');
  if (btn) btn.disabled = true;

  try {
    if (window.firebaseAuth && window.signInWithPopup && window.firebaseGoogleProvider) {
      const result = await window.signInWithPopup(window.firebaseAuth, window.firebaseGoogleProvider);
      const user = result.user;
      Auth.loginWithGoogle(user.email || '', user.displayName || '구글 사용자', user.photoURL || 'img/logo.jpg');
      showToast('Google 계정으로 로그인 되었습니다.');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    } else {
      Auth.loginWithGoogle('user@gmail.com', '홍길동', 'img/logo.jpg');
      showToast('Google 계정으로 로그인 되었습니다.');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    }
  } catch (error) {
    console.error('Google 로그인 오류:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      showToast('로그인 창이 닫혔습니다.');
    } else {
      showToast('로그인 실패: ' + (error.message || '오류 발생'));
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

function handleGuestLogin() {
  Auth.setGuestMode();
  showToast('로그인 없이 계속합니다.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

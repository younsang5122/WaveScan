/* =====================================================
   WaveScan — auth.js
   Google Auth & Session Management
   ===================================================== */

const AUTH_KEY = 'wavescan_user';

const Auth = {
  getUser() {
    const userStr = localStorage.getItem(AUTH_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isLoggedIn() {
    const user = this.getUser();
    return user && user.isLoggedIn === true;
  },

  loginWithGoogle(email = 'user@gmail.com', name = '홍길동', avatar = 'img/logo.jpg') {
    const user = {
      isLoggedIn: true,
      provider: 'google',
      name: name,
      email: email,
      avatar: avatar,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  setGuestMode() {
    const guestUser = {
      isLoggedIn: false,
      provider: 'guest',
      name: '손님',
      email: '',
      avatar: ''
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(guestUser));
    return guestUser;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  updateProfile(name, avatar) {
    const user = this.getUser();
    if (user) {
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return user;
  }
};

// Global Toast notification helper
function showToast(message, duration = 2500) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

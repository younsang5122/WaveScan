// WaveScan — auth.ts (auth.js TypeScript 변환)

import type { User } from '../types/index';

const AUTH_KEY = 'wavescan_user';

const notifyAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wavescan_auth_change'));
  }
};

export const Auth = {
  getUser(): User | null {
    const userStr = localStorage.getItem(AUTH_KEY);
    return userStr ? (JSON.parse(userStr) as User) : null;
  },

  isLoggedIn(): boolean {
    const user = this.getUser();
    return !!user && user.isLoggedIn === true;
  },

  loginWithGoogle(
    email = 'user@gmail.com',
    name = '홍길동',
    avatar = '/img/logo.jpg'
  ): User {
    const user: User = {
      isLoggedIn: true,
      provider: 'google',
      name,
      email,
      avatar,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    notifyAuthChange();
    return user;
  },

  setGuestMode(): User {
    const guestUser: User = {
      isLoggedIn: false,
      provider: 'guest',
      name: '손님',
      email: '',
      avatar: '',
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(guestUser));
    notifyAuthChange();
    return guestUser;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    notifyAuthChange();
  },

  updateProfile(name?: string, avatar?: string): User | null {
    const user = this.getUser();
    if (user) {
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      notifyAuthChange();
    }
    return user;
  },
};

export function showToast(message: string, duration = 2500): void {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

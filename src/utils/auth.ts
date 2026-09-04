import type { User } from '../types/index';
import { auth, googleProvider, signInWithPopup, firebaseSignOut } from '../firebase';

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

  async loginWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const user: User = {
        isLoggedIn: true,
        provider: 'google',
        name: firebaseUser.displayName || '구글 사용자',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || '/img/logo.jpg',
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      notifyAuthChange();
      return user;
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      throw error;
    }
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

  async logout(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn("Firebase signout error", err);
    }
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

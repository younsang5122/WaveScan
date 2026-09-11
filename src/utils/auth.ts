import type { User } from '../types/index';
import { auth, googleProvider, signInWithPopup, firebaseSignOut, deleteUser } from '../firebase';

const AUTH_KEY = 'wavescan_user';

const notifyAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wavescan_auth_change'));
  }
};

export const Auth = {
  getUser(): User | null {
    const userStr = localStorage.getItem(AUTH_KEY);
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr) as User;
      if (!user || user.isLoggedIn !== true) {
        localStorage.removeItem(AUTH_KEY);
        return null;
      }
      return user;
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
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

  setGuestMode(): null {
    localStorage.removeItem(AUTH_KEY);
    notifyAuthChange();
    return null;
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

  async deleteAccount(): Promise<void> {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
      } catch (err: any) {
        console.error("Firebase deleteUser error:", err);
        if (err?.code === 'auth/requires-recent-login') {
          throw new Error('보안을 위해 다시 로그인한 후 회원 탈퇴를 진행해 주세요.');
        }
        throw err;
      }
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

export function showToast(message: string, _duration = 2500): void {
  // React Toast 컴포넌트로 이벤트 전달 (Toast.tsx 참고)
  window.dispatchEvent(
    new CustomEvent<{ text: string }>('wavescan_toast', { detail: { text: message } }),
  );
}


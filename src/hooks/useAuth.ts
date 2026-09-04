import { useState, useCallback, useEffect } from 'react';
import type { User } from '../types/index';
import { Auth } from '../utils/auth';
import { auth, onAuthStateChanged } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => Auth.getUser());
  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = user?.isLoggedIn === true;

  const refreshUser = useCallback(() => {
    setUser(Auth.getUser());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshUser();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wavescan_auth_change', handleStorageChange);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const currentUser = Auth.getUser();
        if (!currentUser || currentUser.email !== firebaseUser.email) {
          const u: User = {
            isLoggedIn: true,
            provider: 'google',
            name: firebaseUser.displayName || '구글 사용자',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || '/img/logo.jpg',
            loginTime: new Date().toISOString(),
          };
          localStorage.setItem('wavescan_user', JSON.stringify(u));
          setUser(u);
        }
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wavescan_auth_change', handleStorageChange);
      unsubscribe();
    };
  }, [refreshUser]);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      const u = await Auth.loginWithGoogle();
      setUser(u);
      return u;
    } catch (error) {
      console.error('Firebase Google Login Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const setGuestMode = useCallback(() => {
    const u = Auth.setGuestMode();
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await Auth.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback((name?: string, avatar?: string) => {
    const u = Auth.updateProfile(name, avatar);
    setUser(u);
    return u;
  }, []);

  return {
    user,
    isLoggedIn,
    loading,
    refreshUser,
    loginWithGoogle,
    setGuestMode,
    logout,
    updateProfile,
  };
};

import { useState, useCallback, useEffect } from 'react';
import type { User } from '../types/index';
import { Auth } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => Auth.getUser());

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
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wavescan_auth_change', handleStorageChange);
    };
  }, [refreshUser]);

  const loginWithGoogle = useCallback(() => {
    const u = Auth.loginWithGoogle();
    setUser(u);
    return u;
  }, []);

  const setGuestMode = useCallback(() => {
    const u = Auth.setGuestMode();
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    Auth.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback((name?: string, avatar?: string) => {
    const u = Auth.updateProfile(name, avatar);
    setUser(u);
    return u;
  }, []);

  return {
    user,
    isLoggedIn,
    refreshUser,
    loginWithGoogle,
    setGuestMode,
    logout,
    updateProfile,
  };
};


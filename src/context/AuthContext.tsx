import React, { useState, useEffect } from 'react';
import type { User } from '../types/index';
import { Auth } from '../utils/auth';
import { auth, onAuthStateChanged } from '../firebase';
import { AuthContext } from './AuthContextObject';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => Auth.getUser());
  const [isLoading] = useState<boolean>(false);

  const refreshUser = () => {
    setUser(Auth.getUser());
  };

  useEffect(() => {
    // Listen to window auth change events
    const handleAuthChange = () => {
      refreshUser();
    };

    window.addEventListener('wavescan_auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    // Firebase auth observer fallback
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const currentUser = Auth.getUser();
        if (!currentUser || currentUser.email !== firebaseUser.email) {
          const updatedUser: User = {
            isLoggedIn: true,
            provider: 'google',
            name: firebaseUser.displayName || '구글 사용자',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || '/img/logo.jpg',
            loginTime: new Date().toISOString(),
          };
          localStorage.setItem('wavescan_user', JSON.stringify(updatedUser));
          localStorage.removeItem('wavescan_guest');
          setUser(updatedUser);
        }
      } else {
        const currentUser = Auth.getUser();
        if (currentUser && currentUser.provider === 'google') {
          localStorage.removeItem('wavescan_user');
          setUser(null);
        }
      }
    });

    return () => {
      window.removeEventListener('wavescan_auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async (): Promise<User> => {
    const loggedInUser = await Auth.loginWithGoogle();
    setUser(loggedInUser);
    return loggedInUser;
  };

  const setGuestMode = (): void => {
    Auth.setGuestMode();
    setUser(null);
  };

  const logout = async (): Promise<void> => {
    await Auth.logout();
    setUser(null);
  };

  const deleteAccount = async (): Promise<void> => {
    await Auth.deleteAccount();
    setUser(null);
  };

  const updateProfile = (name?: string, avatar?: string): User | null => {
    const updated = Auth.updateProfile(name, avatar);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user && user.isLoggedIn === true,
        isLoading,
        loginWithGoogle,
        setGuestMode,
        logout,
        deleteAccount,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/index';
import { Auth } from '../utils/auth';
import { auth, onAuthStateChanged } from '../firebase';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<User>;
  setGuestMode: () => User;
  logout: () => Promise<void>;
  updateProfile: (name?: string, avatar?: string) => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
          setUser(updatedUser);
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

  const setGuestMode = (): User => {
    const guestUser = Auth.setGuestMode();
    setUser(guestUser);
    return guestUser;
  };

  const logout = async (): Promise<void> => {
    await Auth.logout();
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

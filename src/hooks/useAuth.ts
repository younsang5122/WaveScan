import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextObject';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    user: context.user,
    isLoggedIn: context.isLoggedIn,
    loading: context.isLoading,
    loginWithGoogle: context.loginWithGoogle,
    setGuestMode: context.setGuestMode,
    logout: context.logout,
    deleteAccount: context.deleteAccount,
    updateProfile: context.updateProfile,
    refreshUser: () => context.updateProfile(),
  };
};

export default useAuth;

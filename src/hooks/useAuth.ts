import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useAuthContext();

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

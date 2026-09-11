import { createContext } from 'react';
import type { User } from '../types/index';

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<User>;
  setGuestMode: () => void;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateProfile: (name?: string, avatar?: string) => User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

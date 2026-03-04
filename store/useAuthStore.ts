import { create } from 'zustand';

interface AuthState {
  isSignUp: boolean,
  toggleAuthMode: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignUp: false,
  toggleAuthMode: () => set((state) => ({ isSignUp: !state.isSignUp }))
}))
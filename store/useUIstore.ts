import { create } from 'zustand';

interface UIState {
  isScrolled: boolean,
  setIsScrolled: (value: boolean) => void;
}

export const useUIstore = create<UIState>((set) => ({
  isScrolled: false,
  setIsScrolled: (value) => set({ isScrolled: value }),
}));
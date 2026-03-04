import { create } from 'zustand';

interface MenuToggleState {
  isActiveMenu: boolean;
  setIsActiveMenu: () => void;
};

export const useMenuToggleStore = create<MenuToggleState>((set) => ({
  isActiveMenu: false,
  setIsActiveMenu: () => set((state) => ({ isActiveMenu: !state.isActiveMenu }))
}));
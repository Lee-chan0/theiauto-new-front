import { create } from 'zustand';

interface LightModeState {
  isLightMode: boolean,
  toggleLightMode: () => void;
};

export const useLightStore = create<LightModeState>((set) => ({
  isLightMode: false,
  toggleLightMode: () => set((state) => ({ isLightMode: !state.isLightMode }))
}))
import { Admin } from '@/src/service/adminService';
import { create } from 'zustand';


interface LoginInfoState {
  adminData: Admin | null,
  setAdminData: (data: Admin) => void;
  clearAdminData: () => void;
  isAuthLoading: boolean,
  setIsAuthLoading: (loading: boolean) => void;
};

export const useLoginInfoStore = create<LoginInfoState>((set) => ({
  adminData: null,
  setAdminData: (data) => set({ adminData: data }),
  clearAdminData: () => set({ adminData: null }),
  isAuthLoading: true,
  setIsAuthLoading: (loading) => set({ isAuthLoading: loading })
}));
import axiosAdminInstance from "../lib/axios";

export interface Admin {
  adminId: string,
  name: string,
  rank: string,
  email: string,
  profileImg: string
};

export interface AdminLoginValues {
  loginId: string,
  password: string
}

export interface AdminLoginToken {
  accessToken: string
};

export const adminService = {

  getAdminInfo: async () => {
    const response = await axiosAdminInstance.get<{ userInfo: Admin }>('/adminInfo');
    return response.data;
  },
  adminLogin: async (values: AdminLoginValues) => {
    const response = await axiosAdminInstance.post<AdminLoginToken>('/signin', values);
    return response.data;
  }
}
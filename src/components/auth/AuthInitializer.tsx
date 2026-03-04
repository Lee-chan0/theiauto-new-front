"use client"

import { adminService } from "@/src/service/adminService";
import { useLoginInfoStore } from "@/store/useLoginInfoStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function AuthInitializer() {
  const { setAdminData, clearAdminData, setIsAuthLoading } = useLoginInfoStore();
  const router = useRouter();

  useEffect(() => {
    const syncAdminData = async () => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        clearAdminData();
        sessionStorage.removeItem('accessToken');
        router.push('/admin/login');
        return;
      };

      try {
        const res = await adminService.getAdminInfo();
        setAdminData(res.userInfo);
        setIsAuthLoading(false);
      } catch (e) {
        console.error('Access denied');
        clearAdminData();
        router.push('/admin/login');
      };
    };

    syncAdminData();
  }, [setAdminData, clearAdminData]);

  return null;
}
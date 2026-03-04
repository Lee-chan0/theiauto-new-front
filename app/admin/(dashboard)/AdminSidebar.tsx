"use client"

import { Admin } from "@/src/service/adminService";
import { Category } from "@/src/service/categoryService";
import { useLoginInfoStore } from "@/store/useLoginInfoStore";
import { useMenuToggleStore } from "@/store/useMenuToggleStore";
import {
  ChevronDown, ChevronRight, SquareMenu,
  Car, Star, PersonStanding, Motorbike, Bot, AudioWaveform, BookImage, BookOpen,
  LucideIcon, // 1. LucideIcon 타입 가져오기
  Settings2,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 2. 여기에 타입 명시: Record<string, LucideIcon>
// "키는 문자열이고, 값은 아이콘 컴포넌트다"라고 정의
const CategoryIcons: Record<string, LucideIcon> = {
  '자동차 뉴스': Car,
  '시승기': Star,
  '라이프': PersonStanding,
  '모터스포츠': Motorbike,
  'IT': Bot,
  '커뮤니티': AudioWaveform,
  '갤러리': BookImage,
  'theiauto 월간지': BookOpen,
  '관리': Settings2
}


interface SidebarProps {
  categories: Category[];
}

export default function AdminSidebar({ categories }: SidebarProps) {
  const [activeParentId, setActiveParentId] = useState<number>();
  const { isActiveMenu } = useMenuToggleStore();
  const { adminData, clearAdminData, isAuthLoading } = useLoginInfoStore();
  const router = useRouter();

  const parentCategories = categories?.filter((parent) => !parent.parentCategoryId) || [];
  const childCategories = categories?.filter((child) => child.parentCategoryId) || [];

  const clickParent = (parentId: number): void => {
    setActiveParentId((prev) => prev === parentId ? 0 : parentId);
  };

  return (
    <aside className={`w-full lg:w-64 fixed
    border border-black/10 border-y-0 overflow-hidden 
    bg-white h-full font-sans flex flex-col 
    transition-all transform lg:translate-x-0 ${isActiveMenu ? `translate-x-0` : `-translate-x-full`}`}>
      <Link href={'/admin'}>
        <div className="w-full h-18 lg:h-15 border border-x-0 border-t-0 border-b-black/10 flex items-center justify-center pl-2 pr-14 shrink-0">
          <img
            src='/assets/images/theiautoLogo.png'
            alt="logo"
            style={{ cursor: 'pointer', objectFit: 'contain', width: '144px', height: '100%' }}
          />
          <span className="text-black/50 text-xs ml-1 font-bold">ADMIN</span>
        </div>
      </Link>

      <div className="py-4 px-4">
        <span className="text-black/30 text-xs font-semibold tracking-wider">CONTENT MANAGEMENT</span>
      </div>

      <Link href={'/admin'} className="block">
        <div className="mx-2 p-2.5 border border-black/10 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-300 mb-2">
          <div className="flex items-center gap-2">
            <SquareMenu size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500 font-semibold">전체 기사</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </Link>

      <div className="px-2 space-y-1 overflow-y-auto scrollbar-hide flex-1 mb-1.5">
        {
          parentCategories?.map((parent) => {

            const IconComponent = CategoryIcons[parent.categoryName] || BookImage;
            const isActiveParent = activeParentId === parent.categoryId;

            return (
              <div
                key={parent?.categoryId}
                className="cursor-pointer text-gray-400 text-sm group"
                onClick={() => clickParent(parent.categoryId)}
              >
                <div className={`${isActiveParent && 'bg-blue-50 text-blue-400'} group w-full flex justify-between items-center p-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-400 transition-colors mb-1.5`}>
                  <div className="flex gap-2 items-center justify-center">
                    <IconComponent size={18} />
                    <span className={`${isActiveParent ? 'font-bold' : 'font-medium'}`}>{parent?.categoryName}</span>
                  </div>
                  <ChevronDown size={16} className={`group-hover:text-blue-400 transition-all transform ${isActiveParent ? 'rotate-180 text-blue-400' : 'rotate-0 text-gray-300'} ease-in-out`} />
                </div>
                <div className="flex pl-4 gap-4">
                  <div className="w-0.5 max-h-120 bg-black/10" />
                  <div className={`${isActiveParent ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0'}
                      transition-all duration-400 overflow-hidden flex flex-col gap-2 ease-in-out w-full`}>
                    {
                      childCategories?.map((child) => (
                        child.parentCategoryId === parent.categoryId &&
                        <div
                          key={child.categoryId}
                          className="w-full hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
                        >
                          <Link key={child.categoryId} href={`/admin/${child.categoryId}`}
                            className="w-full block p-1.5 py-2">
                            <span className="text-sm text-gray-500">· {child.categoryName}</span>
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
      <div>
        {
          isAuthLoading ?
            <div className="w-full h-16 bg-gray-100 border border-black/10 border-x-0 p-4">
              <div className="h-full flex items-center gap-2 animate-pulse">
                <div className="rounded-full w-9 h-9 bg-gray-300"></div>
                <div className="flex flex-col justify-center flex-1 gap-1.5">
                  <div className="h-3.5 bg-gray-300 rounded w-20"></div>
                  <div className="h-2.5 bg-gray-300 rounded w-28"></div>
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            :
            <div className="w-full h-16 bg-gray-100 border border-black/10 border-x-0 p-4">
              <div className="h-full flex items-center gap-2 ">
                <div className="rounded-full overflow-hidden w-9 h-9 bg-gray-800">
                  <img src={adminData?.profileImg ? adminData?.profileImg : '/assets/images/theiautoLogo.png'} alt='default_img' className="object-contain w-full h-full" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-bold text-sm">{adminData?.name} {adminData?.rank}</span>
                  <span className="text-xs text-gray-500">{adminData?.email}</span>
                </div>
                <LogOut
                  className="cursor-pointer text-gray-400 hover:opacity-50"
                  size={18}
                  onClick={() => {
                    sessionStorage.removeItem('accessToken');
                    clearAdminData();
                    router.push('/admin/login');
                  }}
                />
              </div>
            </div>
        }
      </div>
    </aside>
  )
}
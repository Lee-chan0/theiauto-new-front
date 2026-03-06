"use client"

import { Category } from "@/src/service/categoryService"
import { useMenuToggleStore } from "@/store/useMenuToggleStore"
import { ChevronRight, Home, Menu, PenTool, Search } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface CategoriesProp {
  categories: Category[]
}

export default function AdminHeader({ categories }: CategoriesProp) {
  const params = useParams();
  const { setIsActiveMenu } = useMenuToggleStore();
  const currentCategoryId = params?.categoryId;

  const childCategory = categories?.filter((child) => child.parentCategoryId)
    .find((child) => child?.categoryId === Number(currentCategoryId));

  const parentCategory = categories?.find((parent) => childCategory?.parentCategoryId === parent.categoryId);

  return (
    <div className="h-15 shadow-black/8 shadow-sm p-3 flex justify-between items-center gap-5">
      {
        currentCategoryId ?
          (
            <div className="lg:flex items-center justify-left text-gray-400 hidden w-full gap-4">
              <Link href={'/admin'} className="cursor-pointer flex justify-center items-center gap-1 ">
                <Home size={16} />
                <span className="text-sm">홈</span>
              </Link>
              <ChevronRight size={16} />
              {
                <span className="text-sm">{parentCategory?.categoryName}</span>
              }
              <ChevronRight size={16} />
              {
                <span className="text-sm font-bold text-black">{childCategory?.categoryName}</span>
              }
            </div>
          )
          :
          (
            <div className="lg:flex items-center justify-center text-gray-500 gap-2 hidden">
              <Link href={'/admin'} className="cursor-pointer flex justify-center items-center gap-1 text-black">
                <Home size={16} />
                <span className="text-sm ">홈</span>
              </Link>
            </div >

          )
      }

      <div className="flex justify-between lg:justify-end w-full items-center gap-4 lg:gap-8 h-full">
        <div className="lg:relative lg:h-full hidden lg:block">
          <input type="text" placeholder="기사 검색"
            className="h-full w-40 lg:w-55 bg-gray-200 rounded-full pl-8 pr-2 py-2 outline-0 text-xs" />
          <Search size={16} className="absolute left-2.5 top-[50%] translate-y-[-50%] text-gray-400" />
        </div>

        <button
          className="flex items-center h-full w-fit
        bg-gray-800 text-gray-100 rounded-lg cursor-pointer text-sm shadow-amber-200
          px-3 py-1.5 gap-1 
        hover:bg-blue-600 transition-colors duration-500 font-bold">
          <PenTool size={16} />
          <span className="hidden lg:block">기사 작성</span>
        </button>
        <Menu size={16} strokeWidth={3} className="lg:hidden text-gray-700 cursor-pointer z-9999" onClick={() => setIsActiveMenu()} />
      </div>
    </div >
  )
}
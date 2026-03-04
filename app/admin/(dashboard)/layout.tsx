
import { categoryService } from "@/src/service/categoryService";
import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Category } from "@/src/service/categoryService";
import AuthInitializer from "@/src/components/auth/AuthInitializer";
import AdminHeader from "./AdminHeader";
import QueryProvider from "@/src/providers/QueryProvider";

const newParent = [
  { categoryId: 100, categoryName: '관리', parentCategoryId: null }
];

const newChild = [
  { categoryId: 1000, categoryName: '회원 관리', parentCategoryId: 100 },
  { categoryId: 1001, categoryName: '광고 관리', parentCategoryId: 100 },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  let categoriesData: Category[] = [];

  try {
    const res = await categoryService.getCategories();
    categoriesData = res.categories || [];
    categoriesData = [...categoriesData, ...newParent, ...newChild];
  } catch (e) {
    console.error('no result');
  }

  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
        <AuthInitializer />
        <AdminSidebar categories={categoriesData} />
        <main className="w-full m-0 lg:ml-64 ">
          <AdminHeader categories={categoriesData} />
          {children}
        </main>
      </div>
    </QueryProvider>
  )
}
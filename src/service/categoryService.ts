import axiosInstance from '@/src/lib/axios';

export interface Category {
  categoryId: number,
  categoryName: string,
  parentCategoryId: number | null,
}

export const categoryService = {
  getCategories: async () => {
    const response = await axiosInstance.get<{ categories: Category[] }>('/categories');
    return response.data;
  }
}
import axiosAdminInstance from "../lib/axios";

export interface Article {
  articleId: number,
  articleTitle: string,
  isImportant: boolean,
  isBanner: boolean,
  articleStatus: string,
  blogConfirm: boolean,
  createdAt: string,
  category: {
    categoryName: string
  };
  admin: {
    name: string,
    rank: string
  }
};

export interface GetArticleResponse {
  filteredArticles: Article[];
  total: number,
  page: number,
  hasCategory: boolean,
  totalPage: number
}

export const articleService = {
  getArticles: async (categoryId: number | string, page: number = 1, limit: number = 15) => {
    const response = await axiosAdminInstance.get<GetArticleResponse>(`/article/category/${categoryId}`, {
      params: { page, limit } // 자동으로 URL 끝에 ?page=1&limit=15를 붙임
    });
    return response.data;
  }
}
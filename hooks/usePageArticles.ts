import { articleService } from "@/src/service/articleService"
import { useQuery } from "@tanstack/react-query"




export const usePageArticles = (categoryId: number | string, page: number, limit = 15) => {
  return useQuery({
    queryKey: ['articles', categoryId, page],
    queryFn: () => articleService.getArticles(categoryId, page, limit)
  })

}
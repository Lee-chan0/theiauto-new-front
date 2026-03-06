import { categoryService } from "@/src/service/categoryService"
import { useQuery } from "@tanstack/react-query"


export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24
  });
}
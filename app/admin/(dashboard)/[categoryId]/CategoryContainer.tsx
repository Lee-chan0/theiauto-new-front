"use client"

import { useState } from "react"
import FilteredArticles from "../FilteredArticles"
import Pagenation from "../Pagenation";
import { useCategories } from "@/hooks/useCategories";
import { usePageArticles } from "@/hooks/usePageArticles";


export default function CategoryContainer({ currentId }: { currentId: number }) {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = usePageArticles(currentId, page, 15);
  const { data: categories, isLoading: categoryLoading, isError: categoryError } = useCategories();

  if (isError) return null;

  const filteredArticles = data?.filteredArticles || [];
  const totalPage = data?.totalPage || 1;

  return (
    <div className="py-8">
      <FilteredArticles articles={filteredArticles} categories={categories || []} currentId={currentId} isLoading={isLoading} />
      <Pagenation page={page} setPage={setPage} totalPage={totalPage} isLoading={isLoading} />
    </div>
  )
}
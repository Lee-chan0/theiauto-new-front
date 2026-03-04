"use client"

import { articleService } from "@/src/service/articleService";
import { useQuery } from "@tanstack/react-query";
import FilteredArticles from "./FilteredArticles";
import formatNumber from "@/lib/formatNumber";
import { useState } from "react";
import Pagenation from "./Pagenation";

const at_a_glance_element = ['총 조회수', '작성된 기사', '신규 댓글', '예약 기사'];


export default function AdminMainPage() {
  const [page, setPage] = useState<number>(1) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', 'none', page],
    queryFn: () => articleService.getArticles('none', page, 15),
  });

  if (isError) return null;

  const allArticles = data?.filteredArticles || [];
  const articleQuantity = data?.total || 0;
  const reservationArticle = data?.filteredArticles?.filter((item) => item.articleStatus !== 'publish').length || 0;
  const totalPage = data?.totalPage || 0;

  return (
    <div className="flex flex-col">
      <div className="lg:grid grid-cols-4 p-8 gap-4 hidden">
        {at_a_glance_element.map((el, index) => {

          return (
            <div
              key={index}
              className="border border-black/5 rounded-md shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] bg-gray-50 p-4"
            >
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] text-gray-500">{el}</span>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[18px]">
                    {
                      el === '작성된 기사'
                        ?
                        formatNumber(articleQuantity)
                        :
                        el === '예약 기사'
                          ?
                          formatNumber(reservationArticle)
                          :
                          312

                    }
                  </span>
                  <span className="text-red-400 text-xs">+1.5%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <FilteredArticles articles={allArticles} />
      <Pagenation page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  );
}
"use client"

import FilteredArticles from "./FilteredArticles";
import formatNumber from "@/lib/formatNumber";
import { useState } from "react";
import Pagenation from "./Pagenation";
import { usePageArticles } from "@/hooks/usePageArticles";
import { useCategories } from "@/hooks/useCategories";

const at_a_glance_element = ['총 조회수', '작성된 기사', '신규 댓글', '예약 기사'];

const getGrowthRate = (today: number, yesterday: number) => {
  if (yesterday === 0) return today > 0 ? 100 : 0;

  const rate = ((today - yesterday) / yesterday) * 100;
  return Number(rate.toFixed(1));
}


export default function AdminMainPage() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = usePageArticles('none', page, 15);

  const { data: categories } = useCategories();

  if (isError) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col *:animate-pulse *:rounded-lg">
        <div className="lg:flex flex-col h-40 hidden">
          <div className="h-40 lg:grid grid-cols-4 p-8 gap-4 hidden">
            {
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-gray-300 rounded-lg" />
              ))
            }

          </div>
        </div>
        <div className="h-full lg:h-200 bg-gray-300 m-2.5 lg:mx-8 lg:my-0" />
        <div className="h-12 bg-gray-300 mx-8 mb-6 mt-12" />
      </div>
    )
  }


  const allArticles = data?.filteredArticles || [];
  const articleQuantity = data?.total || 0;
  const reservationArticle = data?.filteredArticles?.filter((item) => item.articleStatus !== 'publish').length || 0;
  const totalPage = data?.totalPage || 0;
  const totalViews = data?.totalViews || 0;

  const yesterdayArticleTotal = data?.yesterDayArticleTotal || 0;
  const yesterdayViewsTotal = data?.yesterDayViewsTotal || 0;

  const articleGrowth = getGrowthRate(articleQuantity, yesterdayArticleTotal);
  const viewsGrowth = getGrowthRate(totalViews, yesterdayViewsTotal);

  return (
    <div className="flex flex-col">
      <div className="lg:grid grid-cols-4 p-8 gap-4 hidden">
        {at_a_glance_element.map((el, index) => {

          let value = 0;
          let growth = 0;

          if (el === '작성된 기사') {
            value = articleQuantity;
            growth = articleGrowth;
          } else if (el === '총 조회수') {
            value = totalViews;
            growth = viewsGrowth;
          } else if (el === '예약 기사') {
            value = reservationArticle;
          } else if (el === '신규 댓글') {
            value = 0;
          }

          return (
            <div
              key={index}
              className="border border-black/5 rounded-md shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] bg-gray-50 p-4"
            >
              <div className="flex flex-col gap-2.5">
                <span className="text-[13px] text-gray-500">{el}</span>
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-[18px]">
                    {formatNumber(value)}
                  </span>
                  {
                    (el === '작성된 기사' || el === '총 조회수' || el === '신규 댓글')
                      ? (
                        <div className="flex flex-col gap-0.5 items-center">
                          <span className="text-gray-500 text-[10px]">전날 대비</span>
                          <span className={`text-xs font-bold ${growth > 0 ? 'text-red-400' : growth < 0 ? 'text-blue-400' : 'text-gray-400'}`}>
                            {growth > 0 ? '+' : ''}{growth}%
                          </span>
                        </div>
                      )
                      : (
                        <span className="text-yellow-600 font-semibold text-xs">
                          Scheduled Post
                        </span>
                      )
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <FilteredArticles articles={allArticles} categories={categories || []} currentId={null} isLoading={isLoading} />
      <Pagenation page={page} setPage={setPage} totalPage={totalPage} isLoading={isLoading} />
    </div>
  );
}
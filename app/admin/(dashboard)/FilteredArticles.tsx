"use client"

import formatDate from "@/lib/formatDate";
import formatNumber from "@/lib/formatNumber";
import { Article, articleService } from "@/src/service/articleService";
import { Category } from "@/src/service/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Circle, Newspaper, X } from "lucide-react";

const list_menu = [
  { name: '번호', hideOnMobile: true },
  { name: '제목', hideOnMobile: false },
  { name: '상태', hideOnMobile: true },
  { name: '작성자', hideOnMobile: true },
  { name: '조회수', hideOnMobile: true },
  { name: '작성일', hideOnMobile: true },
  { name: '포스팅', hideOnMobile: true },
  { name: '확인', hideOnMobile: false },
];
const tableGridClass = "grid grid-cols-[80%_20%] lg:grid-cols-[5%_48%_5%_10%_7%_10%_5%_5%] gap-1.5 place-items-center w-full";

interface FilterArticlesProps {
  articles: Article[],
  categories: Category[] | any,
  currentId: number | null,
  isLoading: boolean
}

export default function FilteredArticles({ articles, categories, currentId, isLoading }: FilterArticlesProps) {
  const queryClient = useQueryClient();

  const childCategoryName = (categories || [])?.categories?.filter((child: any) =>
    child?.parentCategoryId && Number(child?.categoryId) === currentId);


  const { mutate } = useMutation({
    mutationFn: ({ articleId, confirmStatus }: { articleId: number, confirmStatus: boolean }) =>
      articleService.patchBlogConfirm(articleId, confirmStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: () => {
      console.error('no results');
    }
  });

  if (isLoading) {
    return (
      <div className="lg:p-8 p-3 lg:pt-0 ">
        <div className="bg-gray-300 h-screen p-4 px-0 animate-pulse rounded-lg">

        </div>
      </div>
    )
  }


  return (
    <div className="lg:p-8 p-3 lg:pt-0">
      <div className="bg-gray-50 p-4 px-0 border border-black/5 rounded-md shadow-[0_0_1px_1px_rgba(0,0,0,0.1)]">
        <span className="font-bold text-lg p-6 py-2 pb-5 block">{(currentId && !isLoading && childCategoryName?.[0]) ? childCategoryName[0].categoryName : '전체 기사'}</span>

        <ul className={`px-4 py-1 border-b-2 border-blue-300 ${tableGridClass}`}>
          {list_menu.map((menu, index) => (
            <li key={index} className={`text-[13px] font-semibold ${menu.hideOnMobile ? 'hidden lg:block' : 'block'}`}>
              {menu.name}
            </li>
          ))}
        </ul>

        <ul className="flex flex-col w-full">
          {
            articles?.length !== 0 ?

              articles?.map((article) => {
                const isPublish =
                  article?.articleStatus === "publish" ? (
                    <span className="hidden lg:block p-0.5 bg-blue-200 rounded-full text-[9px] text-blue-900 font-bold">공개됨</span>
                  ) : (
                    <span className="hidden lg:block p-0.5 bg-orange-100 rounded-full text-[9px] text-yellow-800 font-bold">예약됨</span>
                  );
                const isConfirmed = article?.blogConfirm || false;

                return (
                  <li
                    key={article?.articleId}
                    className={`overflow-hidden text-[12px] py-3 hover:bg-blue-50 cursor-pointer border-b p-4 border-gray-500/20 
                    *:w-full *:text-center *:truncate ${tableGridClass}`}
                  >
                    <span className="hidden lg:block">{article?.articleId}</span>
                    <span className="font-semibold truncate w-full text-left! px-2">{article?.articleTitle}</span>
                    {isPublish}
                    <span className="truncate hidden lg:block">{article?.admin?.name} {article?.admin?.rank}</span>
                    <span className="hidden lg:block">{formatNumber(article?.views)}</span>
                    <span className="hidden lg:block">{formatDate(article?.createdAt)}</span>

                    <div
                      className="hidden relative lg:flex items-center justify-center w-full h-full group"
                      onClick={(e) => {
                        e.stopPropagation();
                        mutate({ articleId: article?.articleId, confirmStatus: !article?.blogConfirm })
                      }}
                    >

                      <div className={`absolute transition-all duration-300 transform scale-100 rotate-0 opacity-100 group-hover:scale-0 group-hover:rotate-90 group-hover:opacity-0 
                        ${isConfirmed ? 'text-blue-500' : 'text-red-500'}`}
                      >
                        {isConfirmed ? <Circle size={15} strokeWidth={4} /> : <X size={18} strokeWidth={3} />}
                      </div>

                      <div className={`absolute transition-all duration-300 transform scale-0 -rotate-90 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 
                        ${isConfirmed ? 'text-red-500' : 'text-blue-500'}`}
                      >
                        {isConfirmed ? <X size={18} strokeWidth={3} /> : <Circle size={15} strokeWidth={4} />}
                      </div>

                    </div>

                    <div className="flex justify-center w-full"><Newspaper strokeWidth={3} size={14} className="text-gray-500 hover:text-gray-800 transition-colors" /></div>
                  </li>
                );
              })
              :
              <div className="w-full h-full flex justify-center items-center my-24 font-bold">
                <div className="flex items-center gap-4">
                  <span>기사가 존재하지 않습니다.</span>
                </div>
              </div>
          }
        </ul>
      </div>
    </div>
  )
}
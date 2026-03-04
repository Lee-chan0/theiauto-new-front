// Pagenation.tsx
"use client"

import { Dispatch, SetStateAction } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PagenationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
}

export default function Pagenation({ page, setPage, totalPage }: PagenationProps) {
  // ★ 한 번에 화면에 띄울 페이지 버튼의 개수 설정 (현업 표준: 5개)
  const pageCount = 5;

  // ★ 현재 속한 그룹의 '시작 번호'와 '끝 번호'를 계산합니다.
  // 예: page가 7이면 -> Math.floor((7 - 1) / 5) * 5 + 1 = 6 (시작 번호)
  const startPage = Math.floor((page - 1) / pageCount) * pageCount + 1;

  // 예: 시작 번호가 6이면 -> 6 + 5 - 1 = 10 (끝 번호). 단, totalPage를 넘지 않도록 Math.min 처리
  const endPage = Math.min(startPage + pageCount - 1, totalPage);

  // 계산된 시작과 끝 번호를 바탕으로 실제 렌더링할 배열을 만듭니다.
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 안전한 페이지 이동을 위한 핸들러 함수들
  const handlePrevGroup = () => setPage(Math.max(startPage - 1, 1));
  const handleNextGroup = () => setPage(Math.min(endPage + 1, totalPage));
  const handleFirst = () => setPage(1);
  const handleLast = () => setPage(totalPage);

  return (
    <div className="flex justify-center items-center w-full py-8 gap-1.5">

      {/* 1. 맨 처음으로 이동 (<<) */}
      <button
        onClick={handleFirst}
        disabled={page === 1}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronsLeft size={18} />
      </button>

      {/* 2. 이전 5개 그룹으로 이동 (<) */}
      <button
        onClick={handlePrevGroup}
        disabled={startPage === 1} // 첫 번째 그룹이면 클릭 금지
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {/* 3. 슬라이딩 윈도우 방식으로 잘라낸 5개의 페이지 번호만 나열 */}
      <div className="flex items-center gap-1 mx-2">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer
              ${page === pageNum
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200"
              }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 4. 다음 5개 그룹으로 이동 (>) */}
      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPage} // 마지막 그룹이면 클릭 금지
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

      {/* 5. 맨 끝으로 이동 (>>) */}
      <button
        onClick={handleLast}
        disabled={page === totalPage}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronsRight size={18} />
      </button>

    </div>
  )
}
// Pagenation.tsx
"use client"

import { Dispatch, SetStateAction } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PagenationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  isLoading: boolean
}

export default function Pagenation({ page, setPage, totalPage, isLoading }: PagenationProps) {

  if (isLoading) {
    return (
      <div className="w-full px-8">
        <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse my-10" />
      </div>
    )
  }

  const pageCount = 5;

  const startPage = Math.floor((page - 1) / pageCount) * pageCount + 1;

  const endPage = Math.min(startPage + pageCount - 1, totalPage);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  };

  const handlePrevGroup = () => setPage(Math.max(startPage - 1, 1));
  const handleNextGroup = () => setPage(Math.min(endPage + 1, totalPage));
  const handleFirst = () => setPage(1);
  const handleLast = () => setPage(totalPage);

  return (
    <div className="flex justify-center items-center w-full py-8 gap-1.5">

      <button
        onClick={handleFirst}
        disabled={page === 1}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronsLeft size={18} />
      </button>

      <button
        onClick={handlePrevGroup}
        disabled={startPage === 1}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

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

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPage}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

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
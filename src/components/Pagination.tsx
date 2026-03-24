"use client";

import Link from "next/link";
import clsx from "clsx";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function href(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={href(currentPage - 1)} className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-100">
          ←
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={href(page)}
          className={clsx(
            "px-3 py-1 text-sm border transition-colors",
            page === currentPage
              ? "bg-[#1d63ed] text-white border-[#1d63ed]"
              : "border-gray-300 hover:bg-gray-100"
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={href(currentPage + 1)} className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-100">
          →
        </Link>
      )}
    </div>
  );
}

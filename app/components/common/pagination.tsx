"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  total,
  perPage,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "dots")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("dots");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("dots");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-300">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-slate-800 disabled:opacity-40"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "dots" ? (
          <span key={`dots-${i}`} className="px-2">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-8 w-8 rounded-full transition ${
              page === p
                ? "bg-slate-200 text-black"
                : "hover:bg-slate-800"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() =>
          onPageChange(Math.min(page + 1, totalPages))
        }
        disabled={page === totalPages}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 transition hover:bg-slate-800 disabled:opacity-40"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}

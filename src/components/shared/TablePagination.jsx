import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Reusable pagination bar for tables.
 *
 * Props:
 *  currentPage  – 1-based current page number
 *  totalPages   – total number of pages
 *  totalItems   – total number of filtered items
 *  pageSize     – rows per page
 *  onPageChange – (page: number) => void
 *  accentClass  – optional Tailwind class for the active page button
 *                 e.g. 'bg-primary' (default) or 'bg-orange-500'
 */
const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  accentClass = 'bg-primary border-primary text-white',
}) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end   = Math.min(currentPage * pageSize, totalItems);

  // Build page numbers with ellipsis
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('…');
    const lo = Math.max(2, currentPage - 1);
    const hi = Math.min(totalPages - 1, currentPage + 1);
    for (let i = lo; i <= hi; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between mt-5 flex-wrap gap-3 px-1">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-secondary">{start}–{end}</span> of{' '}
        <span className="font-semibold text-secondary">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Previous page"
        >
          <FaChevronLeft size={12} />
        </button>

        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg border text-sm font-medium transition ${
                p === currentPage
                  ? accentClass
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Next page"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;

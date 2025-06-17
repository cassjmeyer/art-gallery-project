import React from "react";
import { getVisiblePages } from "../../utils/paginationUtils";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  loading?: boolean;
}

const baseButton =
  "inline-flex items-center justify-center px-3 py-2 text-sm rounded-md transition-all duration-200";
const activeButton = "bg-blue-600 text-white ring-1 ring-blue-600 shadow-sm";
const defaultButton =
  "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
const disabledButton = "text-gray-400 bg-gray-100 cursor-not-allowed";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  loading = false,
}) => {
  const isPreviousDisabled = currentPage === 1 || loading;
  const isNextDisabled = currentPage === totalPages || loading;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Page Info */}
      <div className="text-center mb-4 text-sm text-gray-600">
        Page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <nav
        className="flex flex-wrap justify-center gap-2"
        role="navigation"
        aria-label="Pagination Navigation"
      >
        {/* Previous */}
        <button
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          className={`${baseButton} ${
            isPreviousDisabled ? disabledButton : defaultButton
          }`}
          aria-label={`Go to previous page, currently on page ${currentPage}`}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {/* Page Numbers */}
        {getVisiblePages(currentPage, totalPages).map((page, index) =>
          typeof page === "number" ? (
            <button
              key={`page-${page}-${index}`}
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`${baseButton} w-9 h-9 ${
                page === currentPage
                  ? activeButton
                  : loading
                  ? disabledButton
                  : defaultButton
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={`dots-${index}`}
              className="w-9 h-9 inline-flex items-center justify-center text-sm text-gray-400"
              aria-hidden="true"
            >
              {page}
            </span>
          )
        )}

        {/* Next */}
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`${baseButton} ${
            isNextDisabled ? disabledButton : defaultButton
          }`}
          aria-label={`Go to next page, currently on page ${currentPage}`}
        >
          Next
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
          <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-2" />
          Loading...
        </div>
      )}
    </div>
  );
};

export default PaginationControls;

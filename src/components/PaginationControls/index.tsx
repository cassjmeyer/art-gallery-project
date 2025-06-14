import React from "react";
import { getVisiblePages } from "../../utils/paginationUtils";
import "./PaginationControls.css";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  loading?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  loading = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>

      <div
        className="pagination-buttons"
        role="navigation"
        aria-label="Pagination Navigation"
      >
        <button
          onClick={onPrevious}
          onKeyDown={(e) => handleKeyDown(e, onPrevious)}
          disabled={currentPage === 1 || loading}
          className="pagination-btn"
          aria-label={`Go to previous page, currently on page ${currentPage}`}
        >
          Previous
        </button>

        <div className="page-numbers">
          {getVisiblePages(currentPage, totalPages).map((page, index) =>
            typeof page === "number" ? (
              <button
                key={`page-${page}-${index}`}
                onClick={() => onPageChange(page)}
                onKeyDown={(e) => handleKeyDown(e, () => onPageChange(page))}
                disabled={loading}
                className={`page-number ${
                  page === currentPage ? "active" : ""
                }`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ) : (
              <span
                key={`dots-${index}`}
                className="page-dots"
                aria-hidden="true"
              >
                {page}
              </span>
            )
          )}
        </div>

        <button
          onClick={onNext}
          onKeyDown={(e) => handleKeyDown(e, onNext)}
          disabled={currentPage === totalPages || loading}
          className="pagination-btn"
          aria-label={`Go to next page, currently on page ${currentPage}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;

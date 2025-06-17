import React from "react";
import ArtworkCard from "./ArtworkCard";
import PaginationControls from "./PaginationControls";
import { usePaginatedArtworks } from "../hooks/usePaginatedArtworks";

const ArtworkGallery: React.FC = () => {
  const {
    artworks,
    pagination,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
  } = usePaginatedArtworks();

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="rounded-xl shadow-xl p-8 max-w-md w-full text-center border"
          role="alert"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow-sm border-b border-slate-200/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Art Institute of Chicago
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Every Work. Every Era. All in One Collection.
            </p>
            {pagination && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100/60 to-yellow-100/60 rounded-full border border-amber-200/50">
                <span className="text-sm text-amber-800 font-medium">
                  {artworks.length} of {pagination.total.toLocaleString()}{" "}
                  artworks
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
            </div>
            <p
              className="text-slate-600 text-lg font-medium"
              aria-label="Loading content"
            >
              Loading artworks...
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Artwork Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              role="grid"
              aria-label={`Grid of ${artworks.length} artworks`}
            >
              {artworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ArtworkCard artwork={artwork} />
                </div>
              ))}
            </div>

            {/* Pagination*/}
            {pagination && (
              <div className="flex justify-center pt-8">
                <div className="bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-slate-200/50">
                  <PaginationControls
                    currentPage={pagination.current_page}
                    totalPages={pagination.total_pages}
                    onPageChange={goToPage}
                    onPrevious={previousPage}
                    onNext={nextPage}
                    loading={loading}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ArtworkGallery;

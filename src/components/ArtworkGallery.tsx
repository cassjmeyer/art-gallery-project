import React from "react";
import ArtworkCard from "./ArtworkCard";
import PaginationControls from "./PaginationControls";
import { usePaginatedArtworks } from "../hooks/usePaginatedArtworks";
import "./ArtworkGallery.css";

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

  if (error) {
    return (
      <div className="error-message" role="alert">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="artwork-gallery">
      <header className="gallery-header">
        <h1>Art Institute of Chicago Collection</h1>
        {pagination && (
          <p className="collection-stats">
            Showing {artworks.length} of {pagination.total.toLocaleString()}{" "}
            artworks
          </p>
        )}
      </header>

      {loading ? (
        <div className="loading-message" aria-label="Loading content">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading artworks...</p>
        </div>
      ) : (
        <>
          <div
            className="artwork-grid"
            role="grid"
            aria-label={`Grid of ${artworks.length} artworks`}
          >
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          {pagination && (
            <PaginationControls
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              onPageChange={goToPage}
              onPrevious={previousPage}
              onNext={nextPage}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArtworkGallery;

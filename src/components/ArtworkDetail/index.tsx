import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Artwork } from "../../types/artwork";
import { fetchArtworkById, getImageUrl } from "../../services/api";

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const fromPage = queryParams.get("page") || "1";

  const handleBackClick = () => {
    navigate(`/gallery?page=${fromPage}`);
  };

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        if (id) {
          const data = await fetchArtworkById(id);
          setArtwork(data);
        }
      } catch (err) {
        setError("Failed to load artwork");
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg" aria-label="Loading artwork">
            Loading artwork...
          </p>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error ? "Error" : "Artwork not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "This artwork does not exist."}
          </p>
          <button
            onClick={handleBackClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(artwork.image_id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
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
            Back to Gallery
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              {imageUrl ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt={artwork.thumbnail?.alt_text || artwork.title}
                    className={`w-full h-full object-contain transition-opacity duration-300 hover:scale-105 transform transition-transform duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                  <p className="text-lg font-medium">No Image Available</p>
                </div>
              )}
            </div>
          </div>

          {/* Art Info */}
          <div className="space-y-6">
            {/* Title, Artist, Date */}
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {artwork.title}
              </h1>
              {artwork.artist_display && (
                <h2 className="text-xl lg:text-2xl text-gray-700 font-medium">
                  {artwork.artist_display}
                </h2>
              )}
              {artwork.date_display && (
                <p className="text-lg text-gray-600">{artwork.date_display}</p>
              )}
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              {artwork.is_on_view && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  On View
                </span>
              )}
              {artwork.is_public_domain && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Public Domain
                </span>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Details
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {artwork.place_of_origin && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Origin:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.place_of_origin}
                    </dd>
                  </div>
                )}
                {artwork.dimensions && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Dimensions:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.dimensions}
                    </dd>
                  </div>
                )}
                {artwork.medium_display && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Medium:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.medium_display}
                    </dd>
                  </div>
                )}
                {artwork.department_title && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Department:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.department_title}
                    </dd>
                  </div>
                )}
                {artwork.gallery_title && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Gallery:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.gallery_title}
                    </dd>
                  </div>
                )}
                {artwork.artwork_type_title && (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-500 sm:w-32 sm:flex-shrink-0">
                      Type:
                    </dt>
                    <dd className="text-sm text-gray-900 sm:ml-4">
                      {artwork.artwork_type_title}
                    </dd>
                  </div>
                )}
              </div>
            </div>

            {/* Credit */}
            {artwork.credit_line && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Credit
                </h3>
                <p className="text-sm text-gray-700 italic">
                  {artwork.credit_line}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtworkDetail;

import React from "react";
import { Artwork } from "../../types/artwork";
import { Link, useSearchParams } from "react-router-dom";

export interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  // Build image URL using Chicago's IIIF service
  // More info on this here: https://api.artic.edu/docs/#iiif-image-api
  const getImageUrl = (imageId: string | null) => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
  };

  const imageUrl = getImageUrl(artwork.image_id);

  // Create accessible description for the link
  const getLinkLabel = () => {
    return `View details for ${artwork.title}${
      artwork.artist_display ? ` by ${artwork.artist_display}` : ""
    }`;
  };

  return (
    <Link
      to={`/artwork/${artwork.id}?page=${currentPage}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 overflow-hidden"
      aria-label={getLinkLabel()}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.thumbnail?.alt_text || artwork.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400"
            role="img"
            aria-label={`No image available for ${artwork.title}`}
          >
            <p className="text-sm font-medium">No Image Available</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-teal-700 transition-colors duration-300">
          {artwork.title}
        </h3>

        {artwork.artist_display && (
          <p className="text-gray-600 text-sm font-medium ">
            {artwork.artist_display}
          </p>
        )}

        {artwork.date_display && (
          <p className="text-gray-500 text-sm">{artwork.date_display}</p>
        )}
      </div>

      {/* Hover Arrow Indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <svg
            className="w-4 h-4 text-teal-600"
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
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;

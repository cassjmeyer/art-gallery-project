import React from "react";
import { Artwork } from "../../types/artwork";
import { Link } from "react-router-dom";
import "./ArtworkCard.css";

export interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
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
      to={`/artwork/${artwork.id}`}
      className="artwork-card"
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={getLinkLabel()}
    >
      <div className="artwork-image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.thumbnail?.alt_text || artwork.title}
            loading="lazy"
          />
        ) : (
          <div
            className="no-image"
            role="img"
            aria-label={`No image available for ${artwork.title}`}
          >
            No Image Available
          </div>
        )}
      </div>

      <div className="artwork-info">
        <h3 className="artwork-title">{artwork.title}</h3>
        <p className="artwork-artist">{artwork.artist_display}</p>
        {artwork.date_display && (
          <p className="artwork-date">{artwork.date_display}</p>
        )}
      </div>
    </Link>
  );
};

export default ArtworkCard;

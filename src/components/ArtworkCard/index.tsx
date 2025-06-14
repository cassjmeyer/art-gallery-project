import React from "react";
import { Artwork } from "../../types/artwork";
import "./ArtworkCard.css";

interface ArtworkCardProps {
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

  return (
    <div className="artwork-card">
      <div className="artwork-image">
        {imageUrl ? (
          <img src={imageUrl} alt={artwork.title} loading="lazy" />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      <div className="artwork-info">
        <h3 className="artwork-title">{artwork.title}</h3>
        <p className="artwork-artist">{artwork.artist_display}</p>
        {artwork.date_display && (
          <p className="artwork-date">{artwork.date_display}</p>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;

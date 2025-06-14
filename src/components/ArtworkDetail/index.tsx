import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ArtworkDetail.css";

interface Artwork {
  id: number; // ID of specific piece of art
  title: string; // Title of the piece
  artist_display: string; // Readable description of the creator of piece (artist name, nationality and lifespan dates)
  date_display: string; // Period of time associated with the creation of piece
  place_of_origin: string; // The location where the creation, design, or production of the work took place, or the original location of the work
  dimensions: string; // The size, shape, scale, and dimensions of the work.
  medium_display: string; // The substances or materials used in the creation of a work
  image_id: string | null; // ID of the image to represent piece
  credit_line: string; // Asset-specific copyright information
  is_public_domain: boolean; // Whether the work is in the public domain, (created before copyrights existed or has left the copyright term)
  is_on_view: boolean; // Whether the work is on display
  gallery_title?: string; // The location of this work in the museum
  department_title: string; // The department of the museum that the work belongs to
  artwork_type_title: string; // The type of work (e.g. painting, sculpture, etc.)
}

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`
        );
        const data = await response.json();
        setArtwork(data.data);
      } catch (err) {
        setError("Failed to load artwork");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtwork();
    }
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  if (!artwork)
    return <div className="not-found-container">Artwork not found</div>;

  const getImageUrl = (imageId: string | null) => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  const imageUrl = getImageUrl(artwork.image_id);

  return (
    <div className="artwork-detail-container">
      <div>
        <Link to="/" className="back-link">
          Back to Gallery
        </Link>
      </div>

      <div className="artwork-detail-grid">
        {/* Image */}
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artwork.title}
              className="artwork-detail-image"
            />
          ) : (
            <div className="no-image-placeholder">No Image Available</div>
          )}
        </div>

        {/* Art Info */}
        <div>
          <h1 className="artwork-detail-title">{artwork.title}</h1>
          <h2 className="artist-name">{artwork.artist_display}</h2>
          <p className="date-display">{artwork.date_display}</p>

          {/* Status Badges */}
          <div className="status-badges">
            {artwork.is_on_view && (
              <span className="status-badge status-badge-on-view">On View</span>
            )}
            {artwork.is_public_domain && (
              <span className="status-badge status-badge-public-domain">
                Public Domain
              </span>
            )}
          </div>

          {/* Basic Details */}
          <div className="artwork-details">
            {artwork.place_of_origin && (
              <p>
                <strong>Origin:</strong> {artwork.place_of_origin}
              </p>
            )}
            {artwork.dimensions && (
              <p>
                <strong>Dimensions:</strong> {artwork.dimensions}
              </p>
            )}
            {artwork.medium_display && (
              <p>
                <strong>Medium:</strong> {artwork.medium_display}
              </p>
            )}
            {artwork.department_title && (
              <p>
                <strong>Department:</strong> {artwork.department_title}
              </p>
            )}
            {artwork.gallery_title && (
              <p>
                <strong>Gallery:</strong> {artwork.gallery_title}
              </p>
            )}
            {artwork.artwork_type_title && (
              <p>
                <strong>Type:</strong> {artwork.artwork_type_title}
              </p>
            )}
          </div>

          {/* Credit */}
          {artwork.credit_line && (
            <div className="credit-line">{artwork.credit_line}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Artwork } from "../../types/artwork";
import { fetchArtworkById, getImageUrl } from "../../services/api";
import "./ArtworkDetail.css";

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  if (!artwork)
    return <div className="not-found-container">Artwork not found</div>;

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
              alt={artwork.thumbnail?.alt_text || artwork.title}
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

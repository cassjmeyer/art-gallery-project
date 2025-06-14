import { useState, useEffect } from "react";
import { Artwork } from "../types/artwork";

// For my own reference, see available fields from API here: https://api.artic.edu/docs/#fields

interface PaginationInfo {
  total: number; // Total number of artworks in the collection
  limit: number; // Number of artworks per page
  offset: number; // Offset for pagination (how many items to skip before returning results)
  total_pages: number; // Total number of pages
  current_page: number; // Current page number
  prev_url?: string; // URL of the previous page
  next_url?: string; // URL of the next page
}

interface UsePaginatedArtworksResult {
  artworks: Artwork[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const usePaginatedArtworks = (): UsePaginatedArtworksResult => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fields to request from API
  const fields = [
    "id",
    "title",
    "artist_display",
    "image_id",
    "date_display",
    "thumbnail",
  ].join(",");

  const pageLimit = 20;

  const fetchArtworks = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.artic.edu/api/v1/artworks?limit=${pageLimit}&page=${page}&fields=${fields}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setArtworks(data.data);
      setPagination(data.pagination);
      setCurrentPage(page);

      console.log(`Loaded page ${page} with ${data.data.length} artworks`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch artworks");
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && (!pagination || page <= pagination.total_pages)) {
      fetchArtworks(page);
    }
  };

  const nextPage = () => {
    if (pagination && currentPage < pagination.total_pages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Load first page on mount
  useEffect(() => {
    fetchArtworks(1);
  }, []);

  return {
    artworks,
    pagination,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
  };
};

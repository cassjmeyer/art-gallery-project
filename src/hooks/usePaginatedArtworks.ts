import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Artwork } from "../types/artwork";
import { fetchArtworks } from "../services/api";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchArtworksPage = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchArtworks(page);

      if (data.pagination && page > data.pagination.total_pages) {
        console.log("This worked!");
        setError(
          `Page ${page} does not exist. The maximum page is ${data.pagination.total_pages}.`
        );
        setLoading(false);
        return;
      }

      setArtworks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch artworks");
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const nextPage = () => {
    if (pagination && currentPage < pagination.total_pages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (pagination && currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Watch for currentPage changes and fetch new data
  useEffect(() => {
    fetchArtworksPage(currentPage);
  }, [currentPage]);

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

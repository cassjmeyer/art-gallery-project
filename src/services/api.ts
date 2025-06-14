import { Artwork } from "../types/artwork";

const BASE_URL = "https://api.artic.edu/api/v1";

// Fields to request from API
export const DEFAULT_FIELDS = [
  "id",
  "title",
  "artist_display",
  "image_id",
  "date_display",
  "thumbnail",
].join(",");

export const PAGE_LIMIT = 20;

export const getImageUrl = (imageId: string | null): string | null => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
};

export const fetchArtworkById = async (id: string): Promise<Artwork> => {
  const response = await fetch(`${BASE_URL}/artworks/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};

export const fetchArtworks = async (page: number) => {
  const url = `${BASE_URL}/artworks?limit=${PAGE_LIMIT}&page=${page}&fields=${DEFAULT_FIELDS}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

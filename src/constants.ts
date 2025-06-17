export const BASE_PATHS = {
  GALLERY: "gallery",
  ARTWORK: "artwork",
} as const;

export const BASE_ROUTES = {
  GALLERY: `/${BASE_PATHS.GALLERY}`,
  ARTWORK_DETAIL: `/${BASE_PATHS.ARTWORK}/:id`,
} as const;

export const buildRoute = {
  gallery: (page?: number) =>
    typeof page === "number"
      ? `/${BASE_PATHS.GALLERY}?page=${page}`
      : `/${BASE_PATHS.GALLERY}`,

  artworkDetail: (id: string | number) => `/${BASE_PATHS.ARTWORK}/${id}`,
} as const;

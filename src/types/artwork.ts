export interface Artwork {
  id: number; // A single piece of art by given id
  title: string; // The title of the piece
  artist_display: string; // Readable description of the creator of piece (artist name, nationality and lifespan dates)
  image_id: string | null; // ID of the image to represent piece
  date_display?: string; // Period of time associated with the creation of piece
  thumbnail?: {
    alt_text: string; // Alt text for the image (for accessibility)
    width: number; // Native width of the image
    height: number; // Native height of the image
  } | null;
}

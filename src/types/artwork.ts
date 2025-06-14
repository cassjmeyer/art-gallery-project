export interface ArtworkThumbnail {
  alt_text: string | null;
  width: number | null;
  height: number | null;
}

export interface Artwork {
  id: number; // A single piece of art by given id
  title: string; // The title of the piece
  artist_display: string; // Readable description of the creator of piece (artist name, nationality and lifespan dates)
  image_id: string | null; // ID of the image to represent piece
  date_display?: string; // Period of time associated with the creation of piece
  thumbnail?: ArtworkThumbnail | null; // Thumbnail image of the piece
  place_of_origin?: string; // The location where the creation, design, or production of the work took place, or the original location of the work
  dimensions?: string; // The size, shape, scale, and dimensions of the work.
  medium_display?: string; // The substances or materials used in the creation of a work
  credit_line?: string; // Asset-specific copyright information
  is_public_domain: boolean; // Whether the work is in the public domain, (created before copyrights existed or has left the copyright term)
  is_on_view: boolean; // Whether the work is on display
  gallery_title?: string; // The location of this work in the museum
  department_title?: string; // The department of the museum that the work belongs to
  artwork_type_title?: string; // The type of work (e.g. painting, sculpture, etc.)
}

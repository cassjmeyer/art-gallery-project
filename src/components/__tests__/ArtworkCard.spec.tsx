import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ArtworkCard, { ArtworkCardProps } from "../ArtworkCard";

const mockArtwork = {
  id: 123,
  title: "Test Artwork",
  artist_display: "Test Artist",
  date_display: "2024",
  image_id: "test-image-id",
  thumbnail: {
    alt_text: "Test artwork image",
    width: 400,
    height: 300,
  },
  is_public_domain: true,
  is_on_view: true,
};

describe("ArtworkCard", () => {
  let props: ArtworkCardProps;

  beforeEach(() => {
    props = {
      artwork: mockArtwork,
    };
  });

  it("should render artwork information correctly", () => {
    render(
      <BrowserRouter>
        <ArtworkCard {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Artwork")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByAltText("Test artwork image")).toBeInTheDocument();
  });

  it("should render the artwork image", async () => {
    render(
      <BrowserRouter>
        <ArtworkCard {...props} />
      </BrowserRouter>
    );

    const image = await screen.findByRole("img", {
      name: "Test artwork image",
    });
    expect(image).toHaveAttribute(
      "src",
      `https://www.artic.edu/iiif/2/${props.artwork.image_id}/full/400,/0/default.jpg`
    );
  });

  it("should render with the correct link to the artwork", () => {
    render(
      <BrowserRouter>
        <ArtworkCard {...props} />
      </BrowserRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/artwork/${props.artwork.id}`
    );
  });

  it("should render no image placeholder when image is not available", () => {
    props.artwork.image_id = null;
    render(
      <BrowserRouter>
        <ArtworkCard {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
  });
});

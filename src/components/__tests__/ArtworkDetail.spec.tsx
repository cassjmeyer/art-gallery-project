import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ArtworkDetail from "../ArtworkDetail";
import { Artwork } from "../../types/artwork";
import { fetchArtworkById, getImageUrl } from "../../services/api";

// Mock API
jest.mock("../../services/api", () => ({
  fetchArtworkById: jest.fn(),
  getImageUrl: jest.fn(),
}));

describe("ArtworkDetail", () => {
  const mockArtwork: Artwork = {
    id: 123,
    title: "Test Artwork",
    artist_display: "Test Artist",
    date_display: "2024",
    image_id: "test-image-id",
    thumbnail: {
      alt_text: "Test artwork image",
      width: 100,
      height: 100,
    },
    is_public_domain: true,
    is_on_view: true,
    place_of_origin: "France",
    dimensions: "100 x 100 cm",
    medium_display: "Oil on canvas",
    department_title: "Painting and Sculpture",
    gallery_title: "Gallery 1",
    artwork_type_title: "Painting",
    credit_line: "Gift of Test Donor",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetchArtworkById as jest.Mock).mockResolvedValue(mockArtwork);
    (getImageUrl as jest.Mock).mockReturnValue("https://test-image-url.com");
  });

  const renderComponent = (id: string) => {
    return render(
      <MemoryRouter initialEntries={[`/artwork/${id}`]}>
        <Routes>
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render artwork details after loading", async () => {
    renderComponent("123");

    await waitFor(() => {
      expect(screen.getByText("Test Artwork")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
      expect(screen.getByText("2024")).toBeInTheDocument();
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("100 x 100 cm")).toBeInTheDocument();
      expect(screen.getByText("Oil on canvas")).toBeInTheDocument();
      expect(screen.getByText("Painting and Sculpture")).toBeInTheDocument();
      expect(screen.getByText("Gallery 1")).toBeInTheDocument();
      expect(screen.getByText("Painting")).toBeInTheDocument();
      expect(screen.getByText("Gift of Test Donor")).toBeInTheDocument();
    });
  });

  it("should render status badges correctly", async () => {
    renderComponent("123");

    await waitFor(() => {
      expect(screen.getByText("On View")).toBeInTheDocument();
      expect(screen.getByText("Public Domain")).toBeInTheDocument();
    });
  });

  it("should render a back button to the gallery link", async () => {
    renderComponent("123");

    const backButton = await screen.findByRole("button", {
      name: "Back to Gallery",
    });
    expect(backButton).toBeInTheDocument();
  });

  it("should render the artwork image", async () => {
    renderComponent("123");
    const image = await screen.findByRole("img", {
      name: "Test artwork image",
    });
    expect(image).toHaveAttribute("src", "https://test-image-url.com");
  });

  it("should render no image placeholder when image is not available", async () => {
    (getImageUrl as jest.Mock).mockReturnValue(null);
    renderComponent("123");

    await waitFor(() => {
      expect(screen.getByText("No Image Available")).toBeInTheDocument();
    });
  });

  it("should display an error if the API call fails", async () => {
    (fetchArtworkById as jest.Mock).mockRejectedValue(new Error("API Error"));
    renderComponent("123");

    await waitFor(() => {
      expect(screen.getByText("Failed to load artwork")).toBeInTheDocument();
    });
  });

  it("should display an error if the artwork is not found", async () => {
    (fetchArtworkById as jest.Mock).mockResolvedValue(null);
    renderComponent("123");

    await waitFor(() => {
      expect(screen.getByText("Artwork not found")).toBeInTheDocument();
    });
  });
});

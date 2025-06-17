import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationControls, {
  PaginationControlsProps,
} from "../PaginationControls";

describe("PaginationControls", () => {
  let props: PaginationControlsProps;

  beforeEach(() => {
    props = {
      currentPage: 2,
      totalPages: 5,
      onPageChange: jest.fn(),
      onPrevious: jest.fn(),
      onNext: jest.fn(),
      loading: false,
    };
    jest.clearAllMocks();
  });

  it("should render current page and total pages information", () => {
    render(<PaginationControls {...props} />);
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Page 2 of 5";
      })
    ).toBeInTheDocument();
  });

  it("should render Previous and Next buttons", () => {
    render(<PaginationControls {...props} />);

    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should call onPrevious when Previous button is clicked", () => {
    render(<PaginationControls {...props} />);
    fireEvent.click(screen.getByText("Prev"));
    expect(props.onPrevious).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when Next button is clicked", () => {
    render(<PaginationControls {...props} />);
    fireEvent.click(screen.getByText("Next"));
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });

  it("should disable Previous button when on first page", () => {
    render(<PaginationControls {...props} currentPage={1} />);
    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("should disable Next button when on last page", () => {
    render(<PaginationControls {...props} currentPage={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("should disable all buttons when loading", () => {
    render(<PaginationControls {...props} loading={true} />);
    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();

    // Check that page number buttons are also disabled
    const pageButtons = screen.getAllByRole("button");
    pageButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("should render page numbers and handle page clicks", () => {
    render(<PaginationControls {...props} />);

    // Check that current page is marked as active
    const activeButton = screen.getByRole("button", { current: "page" });
    expect(activeButton).toHaveClass("ring-blue-600", "shadow-sm");

    // Click on a different page number
    const page3Button = screen.getByRole("button", { name: "Go to page 3" });
    fireEvent.click(page3Button);
    expect(props.onPageChange).toHaveBeenCalledWith(3);
  });

  it("should render ellipsis for large page ranges", () => {
    render(<PaginationControls {...props} currentPage={5} totalPages={10} />);

    // Check for ellipsis presence
    const dots = screen.getAllByText("...");
    expect(dots.length).toBeGreaterThan(0);
  });

  it("should have correct aria labels for accessibility", () => {
    render(<PaginationControls {...props} />);

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Pagination Navigation"
    );

    expect(screen.getByText("Prev")).toHaveAttribute(
      "aria-label",
      "Go to previous page, currently on page 2"
    );

    expect(screen.getByText("Next")).toHaveAttribute(
      "aria-label",
      "Go to next page, currently on page 2"
    );
  });
});

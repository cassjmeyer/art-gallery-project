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
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("should render Previous and Next buttons", () => {
    render(<PaginationControls {...props} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should call onPrevious when Previous button is clicked", () => {
    render(<PaginationControls {...props} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(props.onPrevious).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when Next button is clicked", () => {
    render(<PaginationControls {...props} />);
    fireEvent.click(screen.getByText("Next"));
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });

  it("should disable Previous button when on first page", () => {
    render(<PaginationControls {...props} currentPage={1} />);
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("should disable Next button when on last page", () => {
    render(<PaginationControls {...props} currentPage={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("should disable all buttons when loading", () => {
    render(<PaginationControls {...props} loading={true} />);
    expect(screen.getByText("Previous")).toBeDisabled();
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
    const activeButton = screen.getByText("2");
    expect(activeButton).toHaveClass("active");

    // Click on a different page number
    fireEvent.click(screen.getByText("3"));
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

    expect(screen.getByText("Previous")).toHaveAttribute(
      "aria-label",
      "Go to previous page, currently on page 2"
    );

    expect(screen.getByText("Next")).toHaveAttribute(
      "aria-label",
      "Go to next page, currently on page 2"
    );
  });
});

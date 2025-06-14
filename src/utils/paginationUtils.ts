/**
 * Creates a list of page numbers for pagination, showing nearby pages and using
 * ellipsis to represent skipped pages
 */
export const getVisiblePages = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  // If there are no pages, return an empty array
  if (totalPages < 1) {
    return [];
  }

  // If the current page is out of range, throw an error
  if (currentPage < 1 || currentPage > totalPages) {
    throw new RangeError(
      `currentPage (${currentPage}) must be between 1 and ${totalPages}`
    );
  }

  // Calculate the range of pages to show
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  // Get the middle pages around current page
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  // If there's only one page, return an array with just that page
  if (totalPages === 1) {
    return [1];
  }

  // Add page 1 and ellipsis if needed
  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  // Add the middle pages
  rangeWithDots.push(...range);

  // Add last page and ellipsis if needed
  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};

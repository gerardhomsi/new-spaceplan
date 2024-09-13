"use client";

const PaginationComponent = ({ currentPage, totalPages, href, maxVisiblePages = 5 }) => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  const getPageNumbers = () => {
    const pageRange = [];

    const maxPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));
    const minPage = Math.max(1, maxPage - (maxVisiblePages - 1));

    for (let i = minPage; i <= maxPage; i++) pageRange.push(i);

    return pageRange;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-between m-2">
      {/* Previous button */}
      {currentPage === 1 ? (
        <div className="bg-gray-500 p-1 rounded text-white cursor-not-allowed" aria-disabled="true">
          Previous
        </div>
      ) : (
        <a href={`${href}/?page=${prevPage}`} aria-label="Previous Page">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Previous</button>
        </a>
      )}

      {/* Page numbers */}
      <div className="flex items-center">
        {pageNumbers.map((pageNumber) => (
          <a key={pageNumber} href={`${href}/?page=${pageNumber}`} className={`px-2 py-1 rounded hover:bg-gray-200 ${currentPage === pageNumber ? "bg-green-500 text-white" : ""}`} aria-current={currentPage === pageNumber ? "page" : undefined}>
            {pageNumber}
          </a>
        ))}
      </div>

      {/* Next button */}
      {currentPage === totalPages ? (
        <div className="bg-gray-500 p-1 rounded text-white cursor-not-allowed" aria-disabled="true">
          Next
        </div>
      ) : (
        <a href={`${href}/?page=${nextPage}`} aria-label="Next Page">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Next</button>
        </a>
      )}
    </div>
  );
};

export default PaginationComponent;

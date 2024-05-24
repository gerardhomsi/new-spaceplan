import Link from "next/link";

const PaginationComponent = ({ currentPage, totalPages, href }) => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  return (
    <div className="flex justify-between m-2">
      {currentPage === 1 ? (
        <div className="bg-gray-500 p-1 rounded text-white cursor-not-allowed" aria-disabled="true">
          Previous
        </div>
      ) : (
        <Link href={`${href}/?page=${prevPage}`} aria-label="Previous Page">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Previous</button>
        </Link>
      )}
      {currentPage === totalPages ? (
        <div className="bg-gray-500 p-1 rounded text-white cursor-not-allowed" aria-disabled="true">
          Next
        </div>
      ) : (
        <Link href={`${href}/?page=${nextPage}`} aria-label="Next Page">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Next</button>
        </Link>
      )}
    </div>
  );
};

export default PaginationComponent;

import { useEffect, useState } from "react";
import Image from "next/image";

const Pagination: React.FC<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange: any;
}> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  useEffect(() => {
    const updateDisplayedPages = () => {
      const maxDisplayedPages = 10; // Maximum number of page buttons to show
      const maxVisiblePages = maxDisplayedPages - 2; // Maximum visible pages excluding the first and last pages
      const totalPagesToDisplay = Math.min(maxVisiblePages, totalPages);

      let startPage = 1;
      let endPage = totalPagesToDisplay;

      if (currentPage > Math.floor(maxVisiblePages / 2)) {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = startPage + maxVisiblePages - 1;
      }

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }

      const displayedPages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );

      setDisplayedPages(displayedPages);
    };

    updateDisplayedPages();
  }, [totalItems, itemsPerPage, currentPage, totalPages]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange();
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange();
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange();
    }
  };

  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap">
      <button
        className="p-2 md:p-3 rounded-md bg-[#00A02C] mr-6"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <Image
          alt="moetar"
          src="/images/icon/right-arrow-pagination.svg"
          width={10}
          height={10}
        />
      </button>
      {displayedPages.map((pageNumber, index) => (
        <button
          key={index}
          className={`mx-1 px-3 transition-all border duration-[400ms] py-1 font-Inter font-semibold text-xs ${
            pageNumber === currentPage
              ? "border-black rounded-md"
              : "border-transparent"
          }`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {displayedPages[displayedPages.length - 1] < totalPages && (
        <span className="flex items-center justify-center px-3 mx-1 mb-1 text-xs">
          ...
        </span>
      )}
      {displayedPages[displayedPages.length - 1] < totalPages && (
        <button
          className="mx-1 px-3 transition-all border duration-[400ms] py-1 font-Inter font-semibold text-xs border-transparent"
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      )}
      <button
        className="p-2 md:p-3 rounded-md bg-[#00A02C] md:ml-6"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <Image
          alt="moetar"
          src="/images/icon/right-arrow-pagination.svg"
          width={10}
          height={10}
          className="rotate-180"
        />
      </button>
    </div>
  );
};

export default Pagination;

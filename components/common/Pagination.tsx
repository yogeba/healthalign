import Image from "next/image";

const Pagination: React.FC<{
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap">
      <button
        className="p-3 rounded-md bg-[#00A02C] mr-6"
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
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`mx-1 px-3 transition-all border duration-[400ms] py-1 font-Inter font-semibold text-xs ${
            number === currentPage
              ? "border-black rounded-md"
              : "border-transparent"
          }`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="p-3 rounded-md bg-[#00A02C] ml-6"
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

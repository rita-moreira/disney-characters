import React, { useCallback } from 'react'

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Paginate: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev: number) => prev - 1);
    }
  }, [currentPage, setCurrentPage]);
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev: number) => prev + 1);
    }
  }, [currentPage, setCurrentPage, totalPages]);
  return (
    <>
      <svg
        onClick={handlePrevPage}
        width={16}
        height={16}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <h4>{currentPage}</h4>
      <svg
        onClick={handleNextPage}
        width={16}
        height={16}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};

export default Paginate
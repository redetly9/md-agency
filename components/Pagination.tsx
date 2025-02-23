import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
        >
          Назад
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
        >
          Вперед
        </Link>
      )}
    </div>
  );
};

export default Pagination; 
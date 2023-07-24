import React from "react";

const Pagination = ({ current, total, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const maxVisiblePages = 5; // Change this value to control the number of visible pages

  const handlePrevPage = () => {
    onPageChange(current - 1);
  };

  const handleNextPage = () => {
    onPageChange(current + 1);
  };

  // Calculate the range of pages to show around the current page
  let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust the startPage and endPage if the total number of pages is less than maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={current === 1}>
        Назад
      </button>
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={current === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
      <button onClick={handleNextPage} disabled={current === totalPages}>
        Далее
      </button>
    </div>
  );
};

export default Pagination;

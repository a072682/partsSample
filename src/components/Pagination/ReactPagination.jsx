import { useState } from 'react';
import './ReactPagination.css';

export default function ReactPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h5>目前頁數：{currentPage}</h5>

      <ul className="pagination justify-content-center mt-3">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            上一頁
          </button>
        </li>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            下一頁
          </button>
        </li>
      </ul>
    </div>
  );
}

import { useState } from 'react';
import './_react_pagination_port.scss';

function ReactPaginationPort({ currentPage, totalPages, onPageChange }) {
  // 🔹 當前頁面，初始為第 1 頁
  // const [currentPage, setCurrentPage] = useState(1);

  // 🔹 總頁數設定，可依實際需求調整
  // const totalPages = 15;

  // 🔹 切換頁碼的函數
  const handlePageChange = (page) => {
    // 僅允許在合法頁碼範圍內切換
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 🔹 產生頁碼陣列（考慮 ... 處理）
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // 如果總頁數 <= 5，直接顯示全部
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 以下分成三種顯示邏輯
      if (currentPage <= 3) {
        // 頭部靠前：顯示 1~4 + ... + 最後一頁
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 尾部靠後：顯示第一頁 + ... + 最後四頁
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 中間頁：顯示第一頁 + ... + 前中後 + ... + 最後一頁
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  // 🔹 將頁碼陣列轉為按鈕元件
  const renderPageItems = (pages) => {
    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <li key={`ellipsis-${index}`} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      } else {
        return (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>
              {page}
            </button>
          </li>
        );
      }
    });
  };

  return (
      <ul className="pagination ">

        {/* 🔸 第一頁按鈕（圖示：⏮️） */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(1)}
            aria-label="第一頁"
          >
            <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
          </button>
        </li>

        {/* 🔸 上一頁按鈕（圖示：←） */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link d-flex align-items-center"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="上一頁"
          >
            <span className="material-symbols-outlined fs-6">arrow_back_ios</span>
          </button>
        </li>

        {/* 🔸 頁碼按鈕區 */}
        {renderPageItems(renderPageNumbers(), currentPage, handlePageChange)}

        {/* 🔸 下一頁按鈕（圖示：→） */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link d-flex align-items-center"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="下一頁"
          >
            <span className="material-symbols-outlined fs-6">arrow_forward_ios</span>
          </button>
        </li>

        {/* 🔸 最後一頁按鈕（圖示：⏭️） */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link d-flex align-items-center"
            onClick={() => handlePageChange(totalPages)}
            aria-label="最後一頁"
          >
            <span className="material-symbols-outlined fs-6">keyboard_double_arrow_right</span>
          </button>
        </li>
      </ul>
    
  );
}

export default ReactPaginationPort


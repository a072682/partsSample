import { useState } from 'react';
import './ReactPagination.css';

export default function ReactPagination2() {
  const [currentPage, setCurrentPage] = useState(1); //目前頁碼，初始為第 1 頁。
  const totalPages = 15; // 總頁數

  const handlePageChange = (page) => //傳入page函數
    {
        if (page >= 1 && page <= totalPages) //如果page大於等於1以及總頁數大於等於page則寫入目前頁碼，例如
            {
                setCurrentPage(page);
            }
    };

const renderPageNumbers = () => {
  const pages = [];

  if (totalPages <= 5) {
    // 如果總頁數最多5頁的情況下，全部顯示
    for (let i = 1; i <= totalPages; i++) //如果totalPages=5 則 i 陸續為1.2.3.4.5
    {
      pages.push(i);
    }
  } else {
    // 分三種情況處理：

    if (currentPage <= 3) { //如果當前頁碼為1~3則寫入pages(1, 2, 3, 4, '...')，即顯示1.2.3.4."..."
      // 當前頁在最前面幾頁：顯示 1~4，再加「...」與最後一頁
      pages.push(1, 2, 3, 4, '...');
    } else if (currentPage >= totalPages - 2) { //如果當前頁碼大於總頁數-2 例如總頁數為6而當前頁碼為5則顯示1."...".3.4.5.6
      // 當前頁在最後幾頁：顯示 1、...、倒數3頁
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // 當前頁在中間：顯示 1、...、前一頁、當前頁、下一頁、...、最後一頁
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...');
    }
  }
  return pages; 
    //將整理完成的pages回傳出去
};

    function renderPageItems(pages, currentPage, handlePageChange) {
        return pages.map((page, index) => {//對pages矩陣進行.map展開 例如:[1, 2, 3, 4, '...']
            if (page === '...') {
            return (
                <li key={`ellipsis-${index}`} className="page-item disabled">
                {/* key={`ellipsis-${index}`} 中的ellipsis- 純粹是因為會出現多個"..."內容但map需要給每個內容獨立的代號因此使用ellipsis-，導入後會變成ellipsis-1 or ellipsis-5 等獨立的代號來對應不同的"..." 名稱可以隨便取只要確保是獨立的即可，例如aa-，這樣就變成aa-1 or aa-5 之類的 */}
                <span className="page-link">...</span>
                </li>
            );
            } else {
            return (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    {/* 假設當前頁面為1而矩陣內容同樣為1則class會新增active也就是當前頁面是被選擇的狀態(通常就是藍底白字) */}
                <button className="page-link" onClick={() => handlePageChange(page)}>
                    {/* 這邊的 onClick={() => handlePageChange(page)}意思是當點擊頁面時就會把當前頁面切換至點擊的頁面，好比說[1, 2, 3, 4, '...']假設當前的頁面是3則頁面3就會藍底白字，這時候點擊別的頁面，好比說點擊1則會setCurrentPage(page)=>setCurrentPage(1)則currentPage=1*/}
                    {page}
                </button>
                </li>
            );
            }
        });
    }


  return (
    <div className="container mt-4 text-center">
      <h5>目前頁數：{currentPage}</h5> 
      {/* 顯示目前頁數。 */}

      <ul className="pagination justify-content-center align-items-center mt-3">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link d-flex align-items-center" onClick={() => handlePageChange(currentPage - 1)}>
            <span className="material-symbols-outlined fs-6">arrow_back_ios</span>
          </button>
        </li>

       {renderPageItems(renderPageNumbers(), currentPage, handlePageChange)}
       {/* renderPageNumbers將現有頁面以及總頁面進行處理後輸出pages，currentPage則是目前頁面判斷用，handlePageChange則是確保每個頁面都有點擊後切換為currentPage的功能
       pages進入到renderPageItems進行輸出頁碼 */}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link d-flex align-items-center" onClick={() => handlePageChange(currentPage + 1)}>
            <span className="material-symbols-outlined fs-6">arrow_forward_ios</span>
          </button>
        </li>
      </ul>
    </div>
  );
}


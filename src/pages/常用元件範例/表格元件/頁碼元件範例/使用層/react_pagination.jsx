import { useEffect, useState } from "react";
import ReactPaginationPort from "../元件層/ReactPaginationPort";




export default function ReactPagination() {

    //#region 頁碼元件控制用

        //#region 模擬資料來源
        const inputData = ["item01","item02","item03","item04","item05","item06","item07","item08","item09",]
        //#endregion

        //#region 當前頁面，初始為第 1 頁
        const [currentPage, setCurrentPage] = useState(1);
        //#endregion

        //#region 一頁中顯示項目上限
        const itemsPerPage = 4;
        //#endregion

        //#region 總頁數設定
        const totalPages = Math.ceil(inputData?.length / itemsPerPage);
        //#endregion

        //#region 計算當前要顯示的項目
            //startIndex代表當前顯示的那一頁開始的資料編號
            //endIndex代表當前顯示的那一頁結束的資料編號
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            //currentItems 為最終內容顯示陣列
            const currentItems = inputData?.slice(startIndex, endIndex);
            useEffect(()=>{
                //console.log("最終結果",currentItems)
            },[currentItems])
        //#endregion
    //#endregion
  
  return (
    <article className="頁碼元件使用層">
        <h3>頁碼元件使用範例</h3>
        {/* 頁碼區塊 */}
        <div className='paginationBox'>
            <ReactPaginationPort 
                currentPage={currentPage}//當前頁碼
                totalPages={totalPages}//總頁碼
                onPageChange={setCurrentPage}//判斷是否更新當前頁碼
            />
        </div>
        {/* 頁碼區塊 */}
    </article>
  );
}


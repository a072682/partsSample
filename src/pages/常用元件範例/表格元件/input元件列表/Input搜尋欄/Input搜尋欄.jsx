

import { useEffect, useState } from 'react';
import './_input搜尋欄.scss';


export default function Input搜尋欄 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const [data, setData] = useState({
        search: "",
    });

    useEffect(() => {
        console.log("搜尋內容:", data);
    }, [data]);
    //#endregion

    //#region 資料輸入函式
    const handleDataIn = (event) => {
        const { name, value } = event.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    //#endregion

    return (
        <>
        <div className='input搜尋欄'>
            <h3>Input搜尋欄</h3>
            {/* 元件本體 */}
            <div className="searchBox">
                {/* 搜尋 Icon */}
                <span className="material-symbols-outlined searchIcon">
                    search
                </span>

                {/* 搜尋輸入框 */}
                <input
                    className='searchInputSet'
                    type="search"
                    name="search"
                    placeholder="搜尋..."
                    value={data.search}
                    onChange={handleDataIn}
                />
            </div>
            {/* 元件本體 */}

            <h3>搜尋結果（資料狀態）:</h3>
            <pre>{JSON.stringify(data)}</pre>
        </div>
        </>
    );
};


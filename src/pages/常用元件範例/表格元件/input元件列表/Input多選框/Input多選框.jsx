

import { useEffect, useState } from 'react';
import './_input多選框.scss';


export default function Input多選框 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const [data, setData] = useState({
        item01: false,  
        item02: false,
        // checkbox 建議預設 false
    });

    useEffect(() => {
        console.log("多選框內容:", data);
    }, [data]);
    //#endregion

    //#region 資料輸入函式
    const handleDataIn = (event) => {
        const { name, checked } = event.target;

        setData(prev => ({
            ...prev,
            [name]: checked,   // ⭐ checkbox 用 checked，而不是 value
        }));
    };
    //#endregion

    return (
        <>
        <div className='input多選框'>
            <h3>Input多選框</h3>
            <label htmlFor="item01">選項一</label>
            <input
                type="checkbox"
                id="item01"
                name="item01"
                checked={data.item01}
                onChange={handleDataIn}
            />

            <label htmlFor="item02">選項二</label>
            <input
                type="checkbox"
                id="item02"
                name="item02"
                checked={data.item02}
                onChange={handleDataIn}
            />

            <h3>選擇結果:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


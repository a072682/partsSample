

import { useEffect, useState } from 'react';
import './_input單選框.scss';


export default function Input單選框 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const [data, setData] = useState({
        gender: "",
    });

    useEffect(() => {
        console.log("單選內容:", data);
    }, [data]);
    //#endregion

    //#region 資料輸入函式
    const handleDataIn = (event) => {
        const { name, value } = event.target;

        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    //#endregion

    return (
        <>
        <div className='input單選框'>
            <h3>Input單選框</h3>

            {/* Radio 01 */}
            <input
                type="radio"
                name="gender"
                value="item01"
                checked={data.gender === "item01"}
                onChange={handleDataIn}
            /> 選項1

            {/* Radio 02 */}
            <input
                type="radio"
                name="gender"
                value="item02"
                checked={data.gender === "item02"}
                onChange={handleDataIn}
            /> 選項2

            {/* Radio 03 */}
            <input
                type="radio"
                name="gender"
                value="item03"
                checked={data.gender === "item03"}
                onChange={handleDataIn}
            /> 選項3

            <h3>選擇結果:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


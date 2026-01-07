

import { useEffect, useState } from 'react';
import './_input數字.scss';


export default function Input數字 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const[data,setData]=useState({
        number:"",
    })
    useEffect(()=>{
        console.log("數字內容:",data)
    },[data]);
    //#endregion

    //#region 資料輸入函式
    const handleDataIn = (event) => {
        //目標資料解構
        const { name, value } = event.target;

        //資料寫入
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    //#endregion

    return (
        <>
        <div className='input數字'>
            <h3>Input數字</h3>
            <input  className='Input數字Set'
                    name="number"
                    type="number" 
                    min="1"
                    max="10"
                    placeholder="請輸入數字"
                    value={data.number}
                    onChange={(event)=>{handleDataIn(event)}}
            />
            <h3>數字內容:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


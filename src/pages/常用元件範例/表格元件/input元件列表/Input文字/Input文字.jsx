

import { useEffect, useState } from 'react';
import './_input文字.scss';


export default function Input文字 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const[data,setData]=useState({
        text:"",
    })
    useEffect(()=>{
        console.log("內容:",data)
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
        <div className='Input文字'>
            <h3>Input文字</h3>
            <input  className='Input文字Set'
                    name="text"
                    type="text" 
                    placeholder="輸入名稱" 
                    value={data.text}
                    onChange={(event)=>{handleDataIn(event)}}
            />
            <h3>文字內容:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


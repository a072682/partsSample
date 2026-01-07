

import { useEffect, useState } from 'react';
import './_input密碼.scss';


export default function Input密碼 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const[data,setData]=useState({
        password:"",
    })
    useEffect(()=>{
        console.log("信箱內容:",data)
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
        <div className='input密碼'>
            <h3>Input密碼</h3>
            <input  className='Input密碼Set'
                    name="password"
                    type="password" 
                    placeholder="輸入密碼"
                    value={data.password}
                    onChange={(event)=>{handleDataIn(event)}}
            />
        </div>
        <h3>密碼內容:</h3>
        <div>{JSON.stringify(data)}</div>
        </>
    );
};


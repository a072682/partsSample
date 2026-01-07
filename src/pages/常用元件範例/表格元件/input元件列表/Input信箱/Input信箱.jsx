

import { useEffect, useState } from 'react';
import './_input信箱.scss';


export default function Input信箱 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const[data,setData]=useState({
        email:"",
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
        <div className='input信箱'>
            <h3>Input信箱</h3>
            <input  className='Input信箱Set'
                    name="email"
                    type="email" 
                    placeholder="example@mail.com"
                    value={data.email}
                    onChange={(event)=>{handleDataIn(event)}}
            />
            <h3>信箱內容:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


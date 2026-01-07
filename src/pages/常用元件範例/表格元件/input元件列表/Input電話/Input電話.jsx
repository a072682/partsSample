
import { useEffect, useState } from 'react';
import './_input電話.scss';


export default function Input電話 () {

    //#region
    //#endregion

    //#region 資料狀態宣告
    const[data,setData]=useState({
        tel:"",
    })
    useEffect(()=>{
        console.log("電話內容:",data)
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
        <div className='input電話'>
            <h3>Input電話</h3>
            <input  className='Input電話Set'
                    name="tel"
                    type="tel" 
                    placeholder="0912-345-678"
                    value={data.tel}
                    onChange={(event)=>{handleDataIn(event)}}
            />
            <h3>電話內容:</h3>
            <div>{JSON.stringify(data)}</div>
        </div>
        </>
    );
};


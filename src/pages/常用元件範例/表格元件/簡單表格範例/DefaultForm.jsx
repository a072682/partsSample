

import { useDispatch } from 'react-redux';
import './_defaultForm.scss';
import { useState } from 'react';


export default function DefaultForm () {

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 建立初始資料
    const [userData, setUserData] = useState({
        email:"",
        password:"",
    })
    //#endregion

    //#region 資料輸入函式
    const handleUserData = (event) => {
        const { name, value } = event.target;
        setUserData((userData) => ({
        ...userData,
        [name]: value,   // 動態更新欄位
        }));
    };
    //#endregion

    //#region 資料送出函式
    const handleloginUser = (event) => {
        event.preventDefault();
    }
    //#endregion

    return (
        <>
        <article className='簡單表格範例'>
            <h3>簡單表格範例</h3>
            <form className='formSet' onSubmit={handleloginUser}>
                <label className='labelSet'>
                    信箱
                </label>
                <input  type="email" 
                        name="email" 
                        value={userData.email} 
                        onChange={(event)=>{handleUserData(event)}}/>
                <label className='labelSet'>
                    密碼
                </label>
                <input  type="password" 
                        name="password" 
                        value={userData.password} 
                        onChange={(event)=>{handleUserData(event)}}/>
                <button type='submit'>登入測試</button>
            </form>
        </article>
        </>
    );
};


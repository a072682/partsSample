
import './_新增會員.scss';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 新增會員() {

    //#region
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
        registerUser();
    }
    //#endregion

    //#region 註冊會員api
    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:5100/auth/register',userData);
            console.log('註冊成功', response.data);
            setUserData({
                email:"",
                password:"",
            });
        } catch (error) {
            console.error('註冊失敗', error.response.data);
        }
    };
    //#endregion

    

    return (
        <>
            <div className='新增會員'>
                <h4>新增會員</h4>
                <br />
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
                    <button type='submit'>註冊測試</button>
                </form>
                <br />
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                          dedent(`
                            //#region 註冊會員api
                            const registerUser = async () => {
                                try {
                                    const response = await axios.post('http://localhost:5100/auth/register',userData);
                                    console.log('註冊成功', response.data);
                                } catch (error) {
                                    console.error('註冊失敗', error.response.data);
                                }
                            };
                            //#endregion
                          `)   
                        }       
                    </code>
                </pre>
            </div>
            
        </>
    );
  }
          
        
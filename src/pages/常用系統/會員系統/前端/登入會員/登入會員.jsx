
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 登入會員() {

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
        loginUser();
    }
    //#endregion

    //#region 登入會員api
    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:5100/auth/login',userData);
            // 存到 localStorage
            localStorage.setItem('token', response.data.token);
            console.log('登入成功', response.data.user);
            setUserData({
                email:"",
                password:"",
            });
        } catch (error) {
            console.error('登入失敗', error.response?.data);
        }
    };
    //#endregion

    

    return (
        <>
            <div className='登入會員'>
                <h4>登入會員</h4>
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
                    <button type='submit'>登入測試</button>
                </form>
                <br />
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                          dedent(`
                            //#region 登入會員api
                            const loginUser = async () => {
                                try {
                                    const response = await axios.post('http://localhost:5100/auth/login',userData);
                                    // 存到 localStorage
                                    localStorage.setItem('token', response.data.token);
                                    console.log('登入成功', response.data.user);
                                } catch (error) {
                                    console.error('登入失敗', error.response?.data);
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
          
        
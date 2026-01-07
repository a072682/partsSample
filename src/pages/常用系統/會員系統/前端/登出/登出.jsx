
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 登出API() {

    //#region
    //#endregion

    //#region 登出api
    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:5100/auth/logout');
            // 清除 token
            localStorage.removeItem('token');
            console.log('登出成功', response.data.message);
        } catch (error) {
            console.error('登入失敗', error.response?.data);
        }
    };
    //#endregion

    

    return (
        <>
            <div className='登出'>
                <h4>登出按鈕</h4>
                <br />
                <button type='submit'
                        onClick={()=>{logout()}}
                >
                    登出測試
                </button>
                <br />
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                          dedent(`
                            //#region 登出api
                            const logout = async () => {
                                try {
                                    const response = await axios.post('http://localhost:5100/auth/logout');
                                    // 清除 token
                                    localStorage.removeItem('token');
                                    console.log('登出成功', response.data.message);
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
          
        

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 登入確認() {

    //#region
    //#endregion

    //#region
    const [authStatus, setAuthStatus] = useState(false);
    useEffect(()=>{
        console.log("登入狀態:",authStatus);
    },[authStatus])
    //#endregion

    //#region 登入確認api
    const logInCheck = async () => {
        try {
            const response = await axios.post('http://localhost:5100/auth/logInCheck');
            console.log('登入確認成功', response.data);
            setAuthStatus(true);
        } catch (error) {
            console.error('登入確認失敗', error.response?.data);
        }
    };
    //#endregion

    useEffect(()=>{
        logInCheck();
    },[])

    return (
        <>
            <div className='登入確認'>
                <h4>登入確認</h4>
                <button type='button'
                        onClick={()=>{logInCheck()}}>
                    登入確認
                </button>
                <br />
                <div>{authStatus?("登入中"):("未登入")}</div>
                <p>可以配合useEffect重新整理後就直接驗證</p>
                <br />
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                          dedent(`
                            //#region 登入確認api
                            const logInCheck = async () => {
                                try {
                                    const response = await axios.post('http://localhost:5100/auth/logInCheck');
                                    console.log('登入確認成功', response.data);
                                    setAuthStatus(true);
                                } catch (error) {
                                    console.error('登入確認失敗', error.response?.data);
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
          
        
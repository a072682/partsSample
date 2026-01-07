// src/api/apiClient.js
// 攔截器設定
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function API攔截器寫法() {

    //#region
    //#endregion

    return (
        <>
            <div className='api攔截器'>
                <h4>API攔截器</h4>
                <p>需要掛載在main.jsx</p>
                <p>可以複製相對路徑像是src\pages\常用系統\會員系統\前端\API\API.js</p>
                <p>再進行修正./pages/常用系統/會員系統/前端/API/API.js</p>
                <pre className="language-html m-0 p-16">
                    <code className="language-html">
                        {   
                          dedent(`
                            // 攔截器設定
                            import axios from "axios";

                            // 請求攔截器(全域)：每次發送 request 前執行
                            axios.interceptors.request.use((config) => {
                                // 從 localStorage 取得 token
                                const token = localStorage.getItem('token');

                                // 如果有 token，自動加入 Authorization header
                                if (token) {
                                  config.headers.Authorization = \`Bearer \${token}\`;
                                }

                                return config;
                              },
                              (error) => Promise.reject(error)
                            );
                          `)   
                        }       
                    </code>
                </pre>
            </div>
        </>
    );
}
          
        
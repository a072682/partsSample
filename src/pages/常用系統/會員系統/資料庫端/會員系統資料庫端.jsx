
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function 會員系統資料庫端() {

  return (
    <div className="container">
        <div className="content-box">
            <h4>會員系統資料庫端</h4>
            <h5>建立會員系統資料表</h5>
            <pre className="language-html m-0 p-16">
              <code className="language-html">
                {   dedent(
                        `
                        CREATE TABLE users (
                            id BIGINT PRIMARY KEY,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            password TEXT,
                            google_id VARCHAR(255),
                            auth_provider VARCHAR(20) NOT NULL,
                            created_at TIMESTAMP DEFAULT NOW(),
                            role VARCHAR(20) NOT NULL DEFAULT 'user';
                        );
                        `
                    )   
                }       
              </code>
            </pre>
            <p className='fw-bold fs-20'>首先在DBeaver資料庫中新建資料表</p>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端01.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>命名資料表名稱</p>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端02.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>建立資料表欄位</p>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端03.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端04.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端05.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端06.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端07.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端08.png" alt="" />
            </div>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端09.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>約束設定</p>
            <p>設定email欄位為唯一約束</p>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端10.png" alt="" />
            </div>
            <p className='fw-bold fs-20'>結果資料表</p>
            <div>
                <img src="/images/常用系統範例/會員系統/資料庫端/會員系統資料庫端11.png" alt="" />
            </div>
        </div>
    </div>
  );
}
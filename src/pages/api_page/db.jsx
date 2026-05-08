
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function Db() {
  return (
    <div className="container">
      <h3>資料庫連線設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        //設定 PostgreSQL 連線（使用 pg 套件建立 pool）
                        const { Pool } = require('pg'); // 引入 pg 套件，並從中取出 Pool（連線池）功能
                        require('dotenv').config(); // 引入 dotenv 套件，讓我們可以讀取 .env 檔案中的環境變數

                        const pool = new Pool({ // 建立一個新的 Pool 實例，裡面傳入連線設定 new為指定用法 建立「類別實體」的關鍵字
                        user: process.env.DB_USER,
                        host: process.env.DB_HOST,
                        database: process.env.DB_DATABASE,
                        password: process.env.DB_PASSWORD,
                        port: process.env.DB_PORT,
                        });

                        module.exports = pool; // 將這個 pool 導出（export），讓其他檔案可以使用
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

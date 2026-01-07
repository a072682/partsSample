

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_NodeJsExpressBasic.scss';



export default function NodeJsExpressBasic() {
  return (
    <div className='NodeJsExpressBox'>
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <h3>基礎Node.Js + Express 伺服器端架構和創建流程</h3>
                    <h4>先進行專案初始化</h4>
                    <p>先進入專案資料夾後開啟終端機且進行專案初始化</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   dedent(`npm init -y //會建立一個 package.json 檔案`)   }       
                        </code>
                    </pre>
                    <p>安裝必要套件</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   dedent(`npm install express pg dotenv
                                        npm install --save-dev nodemon
                                        //express 代表建立 API 伺服器
                                        //pg 代表PostgreSQL 的 Node.js 客戶端
                                        //dotenv 管理環境變數，如 DB 密碼等
                                        //nodemon 讓伺服器程式碼修改後自動重啟（開發用`)   }       
                        </code>
                    </pre>
                    <p>將結構補足</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   dedent(`專案資料夾/
                                            ├── db/
                                            │   └── db.js
                                            ├── .env
                                            ├── .gitignore
                                            ├── index.js
                                            └── package.json`)   }       
                        </code>
                    </pre>
                    <p>其中.gitignore內容為</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(
                                        `
                                        node_modules
                                        .env
                                        `
                                        )   
                            }       
                        </code>
                    </pre>
                    <p>其作用是上傳時不把.env檔案上傳避免資料洩漏</p>
                    <p>接著進入專案資料夾在.env中設定資料</p>
                    <p>內容如下</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(
                                `
                                DB_USER=postgres //預設帳號
                                DB_HOST=localhost //預設位置
                                DB_DATABASE=comebuydatabase //建立的資料庫名稱
                                DB_PASSWORD=aA128380593 //預設密碼
                                DB_PORT=5432 //預設連接卓
                                `
                                )   
                            }       
                        </code>
                    </pre>
                    <p>建立db.js 連線模組</p>
                    <p>在db資料夾下建立db.js並導入以下內容:</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(`
                                        // db/db.js
                                        const { Pool } = require('pg'); // 引入 pg 套件，並從中取出 Pool（連線池）功能
                                        require('dotenv').config(); // 引入 dotenv 套件，讓我們可以讀取 .env 檔案中的環境變數

                                        const pool = new Pool({ // 建立一個新的 Pool 實例，裡面傳入連線設定
                                        user: process.env.DB_USER,
                                        host: process.env.DB_HOST,
                                        database: process.env.DB_DATABASE,
                                        password: process.env.DB_PASSWORD,
                                        port: process.env.DB_PORT,
                                        });

                                        module.exports = pool; // 將這個 pool 導出（export），讓其他檔案可以使用
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>根據瀏覽器規定前後端不同網址時候需要用中介層溝通</p>
                    <p>先安裝中介層套件</p>
                    <p>內容如下</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(`
                                        npm install cors
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>接著為了讓前端的Cookie讓後端也能讀取需安裝cookie-parser套件</p>
                    <p>內容如下</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(`
                                        npm install cookie-parser
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>測試連線</p>
                    <p>在index.js 中引入以下內容:</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(`
                                        const express = require('express');// 載入 express 套件，建立後端伺服器框架
                                        const app = express();// 使用 express() 建立一個應用程式實例
                                        const pool = require('./db/db');// 載入我們自己寫的資料庫連線模組（也就是 db.js）
                                        const cors = require('cors');//匯入中介層套件工具
                                        const cookieParser = require('cookie-parser');//將 Cookie 字串轉換成token讓後端可以讀取
                                        require('dotenv').config();// 載入 dotenv 以支援 .env 環境變數

                                        app.use(express.json());// 解析 JSON 格式的 request body
                                        
                                        app.use(cookieParser());// 將 Cookie 字串轉換成token讓後端可以讀取

                                        //中介層設定
                                        app.use(cors({
                                            origin: 'http://localhost:5173', // 允許的前端來源
                                            // methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'], // 可允許的方法
                                            credentials: true,
                                        }));
                                        //中介層設定


                                        //測試資料庫連線的路由
                                        app.get('/test-db', async (req, res) => {
                                        // 這個函式只會在使用者訪問 http://localhost:5100/test-db 時執行
                                        try {
                                        const result = await pool.query('SELECT NOW()');
                                        // 用 pool 發送 SQL 指令：取得目前資料庫時間
                                        res.json({ message: '連線成功', time: result.rows[0] });
                                        // 回傳 JSON 結果給使用者
                                        } catch (err) {
                                        console.error(err);
                                        res.status(500).send('連線失敗');
                                        // 若有錯誤，顯示在後端並告知前端
                                        //res表示伺服器要回傳給使用者的內容
                                        //.status(500)設定狀態碼為 500（伺服器錯誤）
                                        //傳送純文字 "連線失敗" 作為回應內容
                                        }
                                        });

                                        // ✅ 啟動伺服器
                                        app.listen(process.env.PORT, () => {
                                        console.log(\`伺服器啟動於 http://localhost:\${process.env.PORT}\`);
                                        });
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>接著到package.json中加入以下內容:</p>
                    <p>確保執行npm run dev時不會出錯</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent(`
                                        "scripts": {
                                            "dev": "nodemon index.js"
                                        }
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>最後完成的初始結構</p>
                    <div className='imgBox mb-24'>
                        <img className='imgSet' src="/images/基礎框架教學/NodeJsExpressBasic/NodeJsExpress01.png" alt="" />    
                    </div>
                    <p>
                        此時應該先測試http://localhost:5100/test-db<br />
                        是否能得到連線成功的結果<br />
                        如果有則基本設定完成<br />
                        如果沒有則依照錯誤進行排查(可能是套件無安裝等原因)<br />
                        基本設定完成
                    </p>
                    <h3 className='mb-12 mt-12'>小提醒</h3>
                    <p>
                        如果無法進入資料庫則可以使用\l查詢資料庫總列表確認是不是資料庫名稱錯誤<br />
                        查詢完後按q可以跳出搜尋模式<br />
                        正常退出資料庫模式指令為\q<br />
                        轉換資料庫的指令為:\c 目標資料庫名稱<br />
                        如果需要將多餘的資料庫刪除可執行以下指令<br />
                        DROP DATABASE 資料庫名稱;<br />
                        如果需要將多餘的資料表刪除可執行以下指令<br />
                        DROP TABLE 資料表名稱;<br />
                        刪除時需要先進入對應的資料庫<br />
                        假如資料庫為A資料表為B則需要先進入A在執行刪除指令<br />
                        進入指令狀態以後要貼上不能按CTRL+V 要按右鍵<br />
                        CTRL+V功能會變成中斷目前輸入<br />
                    </p>
                </div>
            </div>
        </div>
    </div>
    
  );
}






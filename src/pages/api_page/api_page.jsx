
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import FileData from './FileData';
import Env from './Env';
import Db from './Db';
import Google from './Google';
import MiddlewaresPage from './Middlewares/MiddlewaresPage';
import RoutesPage from './routes/RoutesPage';
import ControllersPage from './controllers/ControllersPage';
import Utils from './utils/Utils';
import Validators from './validators/Validators';
import APITEST from './APITEST';





export default function ApiPage() {

    const [activeTab, setActiveTab] = useState('資料夾結構');//tab控制

    const ApiData = 
        [
            {
                title:"資料夾結構",
                key:"資料夾結構",
                pageData:<FileData />
            },
            {
                title:"環境變數(.env)",
                key:"env",
                pageData:<Env />
            },
            {
                title:"資料庫連線設定",
                key:"db",
                pageData:<Db />
            },
            {
                title:"google登入設定",
                key:"google",
                pageData:<Google />
            },
            {
                title:"追加規範(middlewares)",
                key:"middlewares",
                pageData:<MiddlewaresPage />
            },
            {
                title:"路由相關(routes)",
                key:"routes",
                pageData:<RoutesPage />
            },
            {
                title:"基礎API函式(controllers)",
                key:"controllers",
                pageData:<ControllersPage />
            },
            {
                title:"獨立單元設定(utils)",
                key:"utils",
                pageData:<Utils />
            },
            {
                title:"資料判定設定(validators)",
                key:"validators",
                pageData:<Validators />
            },
            {
                title:"API測試頁面",
                key:"APITEST",
                pageData:<APITEST />
            },
        ]

  return (
    <div className="container">
        <div className="title-box">
            <h2>API創建設定</h2>
        </div>
        <br />
        

        

        
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* Tab 選單區 */}
            <Nav className='d-flex flex-row tab-box'>
                {
                    ApiData?.map((item)=>{
                        return(
                            <>
                                <Nav.Item key={item.key} className='tab-item'>
                                    <Nav.Link className="tab-link" eventKey={item.key}>{item.title}</Nav.Link>
                                </Nav.Item>
                            </>
                        )
                    })
                }
            </Nav>
            {/* Tab 內容區 */}
            <Tab.Content className='h-100'>
                {
                    ApiData?.map((item)=>{
                        return(
                            <>
                                <Tab.Pane key={item.key} eventKey={item.key}>
                                    {item.pageData}
                                </Tab.Pane>
                            </>
                        )
                    })
                }
            </Tab.Content>
        </Tab.Container>
        {/* <h2>controllers</h2>
        <p>此資料夾放的是最純粹的運算方法，通常就是資料的加減乘除(搜尋/新增/修改/刪除)</p>
        <p>以productsController.js為產品的api設定</p>
        <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // 商品相關的 API 邏輯（CRUD）產品新增/修改/刪除等函式
                        const pool = require('../db/db');
                        //引入與資料庫連接的設定
                        const { productSchema } = require('../validators/userValidator');
                        //引入資料的判定方式(joi規則)

                        
                        // GET /products 取得所有產品api
                        exports.getAllProducts = async (req, res) => {
                            try {
                                const result = await pool.query('SELECT * FROM products');
                                res.json(result.rows);
                            } catch (err) {
                                res.status(500).json({ error: '伺服器錯誤' });
                            }
                        };

                        // GET /products/:id 取得單一產品
                        exports.getProductById = async (req, res) => {
                        const id = req.params.id;//req.params: 路由中的參數（例如 /products/:id 的 :id）。
                        try {
                            //引入套件pg可以實現向資料庫搜尋資料的功能
                            //而回傳的資料為物件結構如下
                            // {
                            //     command: 'SELECT',
                            //     rowCount: 1,
                            //     oid: null,
                            //     rows: [
                            //         { id: 1, name: 'product A', price: 100 }
                            //     ],
                            //     fields: [ ... ]
                            // }
                            //row內部的資料才是搜尋的資料
                            const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
                            if (result.rows.length === 0) return res.status(404).json({ error: '找不到產品' });
                            res.json(result.rows[0]);
                        } catch (err) {
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };

                        // POST /products 新增產品
                        exports.createProduct = async (req, res) => {

                        // 1. 驗證傳入的資料
                        //.validate是Joi 提供的主功能用來驗證某筆資料 是否符合你定義的規則
                        const { error, value } = productSchema.validate(req.body, { abortEarly: false });
                        //productSchema自己定義的規則，引用下方的productSchema函式
                        //req.body：使用者送過來的資料
                        //abortEarly: false：設定為 false 可一次回傳所有錯誤
                        //value：驗證後的資料 error：如果驗證失敗，會是一個物件

                        if (error) {
                            // 2. 若錯誤，回傳錯誤訊息陣列
                            //error.details 是一個包含錯誤細節的陣列
                            const errorMessages = error.details.map((e) => e.message);
                            return res.status(400).json({ error: '資料格式錯誤', messages: errorMessages });
                        }
                        
                        const { name, price, description, image_url } = value;
                        if (!name || !price) return res.status(400).json({ error: '名稱和價格為必填' });

                        try {
                            const result = await pool.query(
                            'INSERT INTO products (name, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
                            [name, price, description, image_url]
                            );
                            res.status(201).json(result.rows[0]);
                        } catch (err) {
                            res.status(500).json({ error: '新增產品失敗' });
                        }
                        };

                        // PUT /products/:id 修改產品
                        exports.updateProduct = async (req, res) => {
                        const id = req.params.id;
                        const { name, price, description, image_url } = req.body;
                        try {
                            const result = await pool.query(
                            'UPDATE products SET name=$1, price=$2, description=$3, image_url=$4 WHERE id=$5 RETURNING *',
                            [name, price, description, image_url, id]
                            );
                            if (result.rows.length === 0) return res.status(404).json({ error: '找不到產品' });
                            res.json(result.rows[0]);
                        } catch (err) {
                            res.status(500).json({ error: '更新產品失敗' });
                        }
                        };

                        // DELETE /products/:id 刪除產品
                        exports.deleteProduct = async (req, res) => {
                        const id = req.params.id;
                        try {
                            const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
                            if (result.rows.length === 0) return res.status(404).json({ error: '找不到產品' });
                            res.json({ message: '刪除成功' });
                        } catch (err) {
                            res.status(500).json({ error: '刪除產品失敗' });
                        }
                        };
                        `
                )   
            }       
            </code>
        </pre>
        <h3>細部說明</h3>
        <table>
            <tbody>
                <p><strong>req為前端傳給伺服器的資料。</strong></p>
                <tr>
                    <td><strong>req.body</strong></td>
                    <td>使用者在 POST/PUT 請求中傳送的資料（例如表單或 JSON）。</td>
                </tr>
                <tr>
                <td><strong>req.params</strong></td>
                <td>路由中的參數（例如 /products/:id 的 :id）。</td>
                </tr>
                <tr>
                <td><strong>req.query</strong></td>
                <td>URL 的查詢參數（例如 /products?search=apple 中的 search）。</td>
                </tr>
                <tr>
                <td><strong>req.headers</strong></td>
                <td>請求的標頭，常用於驗證（像是 token）。</td>
                </tr>
                <p><strong>res為伺服器要回傳給前端的資料。</strong></p>
                <tr>
                <td><strong>res.send</strong></td>
                <td>傳送純文字、HTML、JSON 等資料。</td>
                </tr>
                <tr>
                <td><strong>res.json</strong></td>
                <td>傳送 JSON 格式資料（最常用於 API）。</td>
                </tr>
                <tr>
                <td><strong>res.status</strong></td>
                <td>設定 HTTP 狀態碼（例如 200, 404, 500 等）。</td>
                </tr>
                <tr>
                <td><strong>res.redirect</strong></td>
                <td> 導向另一個 URL。</td>
                </tr>
            </tbody>
        </table>
        <p>pool.query代表給資料庫下指令</p>
        <p>res.json代表使用json格式回傳給前端</p>
        <p>res.status(500).json(&#123; error: '伺服器錯誤' &#125;); 代表的是回傳給前端錯誤的狀態和錯誤的內容</p>
        <table>
            <tbody>
                <p><strong>常見狀態列表</strong></p>
                <tr>
                    <td><strong>200</strong></td>
                    <td>成功請求</td>
                </tr>
                <tr>
                <td><strong>201</strong></td>
                <td>成功建立資源</td>
                </tr>
                <tr>
                <td><strong>400</strong></td>
                <td>請求格式錯誤</td>
                </tr>
                <tr>
                <td><strong>401</strong></td>
                <td>未授權（需要登入或 token）</td>
                </tr>
                <tr>
                <td><strong>403</strong></td>
                <td>已登入但沒有權限</td>
                </tr>
                <tr>
                <td><strong>404</strong></td>
                <td>找不到資源</td>
                </tr>
                <tr>
                <td><strong>500</strong></td>
                <td>伺服器錯誤</td>
                </tr>
                
            </tbody>
        </table>
        <table>
            <tbody>
                <p><strong>常見資料庫指令</strong></p>
                <tr>
                    <td><strong>SELECT：查詢資料</strong></td>
                    <td>成功請求</td>
                </tr>
                <tr>
                <td><strong>201</strong></td>
                <td>成功建立資源</td>
                </tr>
                <tr>
                <td><strong>400</strong></td>
                <td>請求格式錯誤</td>
                </tr>
                <tr>
                <td><strong>401</strong></td>
                <td>未授權（需要登入或 token）</td>
                </tr>
                <tr>
                <td><strong>403</strong></td>
                <td>已登入但沒有權限</td>
                </tr>
                <tr>
                <td><strong>404</strong></td>
                <td>找不到資源</td>
                </tr>
                <tr>
                <td><strong>500</strong></td>
                <td>伺服器錯誤</td>
                </tr>
                
            </tbody>
        </table>
        資料庫語言說明
        SELECT：查詢資料
        SELECT 欄位1, 欄位2 FROM 資料表 WHERE 條件;
        SELECT name, email FROM users WHERE id = 1;
        查出 id 為 1 的會員的 name 和 email

        INSERT：新增資料
        INSERT INTO 資料表 (欄位1, 欄位2) VALUES (值1, 值2);
        INSERT INTO users (name, email) VALUES ('Andy', 'andy@example.com');
        新增一位會員進users資料表中 name為 Andy、email 為andy@example.com

        UPDATE：更新資料
        UPDATE FROM 資料表 SET 欄位1 = 值1, 欄位2 = 值2 WHERE 條件;
        UPDATE FROM users SET name = 'Andy Chen', email = 'andyc@example.com' WHERE id = 3;
        將 id 為 3 的會員的名字和 email 更新

        DELETE：刪除資料
        DELETE FROM 資料表 WHERE 條件;
        DELETE FROM users WHERE id = 5;
        刪除 id = 5 的會員

        RETURNING *：更新或新增後回傳結果
        UPDATE users SET name = 'Andy' WHERE id = 1 RETURNING *;
        更新完會直接回傳這筆會員的所有欄位資料（id, name, email...） */}
    </div>
  );
}
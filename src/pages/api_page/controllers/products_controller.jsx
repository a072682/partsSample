
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function ProductsController() {
  return (
    <div className="container">
      <h3>處理產品 API 邏輯</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // 商品相關的 API 邏輯（CRUD）產品新增/修改/刪除等函式

                        const pool = require('../db/db');
                        const { productSchema } = require('../validators/userValidator');//由外部引入joi規則

                            //req為前端傳給伺服器的資料，res為伺服器要回傳給前端的資料

                            //req.body: 使用者在 POST/PUT 請求中傳送的資料（例如表單或 JSON）。
                            //req.params: 路由中的參數（例如 /products/:id 的 :id）。
                            //req.query: URL 的查詢參數（例如 /products?search=apple 中的 search）。
                            //req.headers: 請求的標頭，常用於驗證（像是 token）。

                            //res.send(...): 傳送純文字、HTML、JSON 等資料。
                            //res.json(...): 傳送 JSON 格式資料（最常用於 API）。
                            //res.status(...): 設定 HTTP 狀態碼（例如 200, 404, 500 等）。
                            //res.redirect(...): 導向另一個 URL。


                            // GET /products 取得所有產品
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
    </div>
  );
}

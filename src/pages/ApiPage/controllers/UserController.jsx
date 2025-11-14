
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function UserController() {
  return (
    <div className="container">
      <h3>處理會員相關邏輯</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        //會員註冊 / 登入邏輯等函式
                        const pool = require('../db/db');
                        const bcrypt = require('bcrypt');
                            //bcrypt 是一個加密套件，專門用來加密密碼
                        const jwt = require('jsonwebtoken');
                            //jsonwebtoken是一個用來產生token和驗證的套件
                        const Joi = require('joi');
                            //引入joi設定檔案規則套件
                        require('dotenv').config();


                            // Joi 驗證 schema
                        const userSchema = Joi.object({
                            username: Joi.string().min(2).max(30).required(),
                            email: Joi.string().email().required(),
                            password: Joi.string().min(6).required(),
                        });

                            //新增會員
                        exports.registerUser = async (req, res) => {
                            // 加入 role 欄位
                        const { username, email, password, role = 'user' } = req.body;

                            // 1. Joi 驗證
                        const { error } = userSchema.validate({ username, email, password });
                        if (error) {
                            return res.status(400).json({ error: error.details[0].message });
                        }

                        try {
                                // 2. 檢查是否已註冊
                            const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
                            if (existing.rows.length > 0) {
                            return res.status(400).json({ error: '此信箱已註冊' });
                            }

                                // 3. 加密密碼
                            const hashedPassword = await bcrypt.hash(password, 10);

                                // 4. 寫入資料庫
                            const result = await pool.query(
                            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at',
                            [username, email, hashedPassword, role]
                            );

                            res.status(201).json({ message: '註冊成功', user: result.rows[0] });
                        } catch (err) {
                            console.error('註冊錯誤', err);
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };


                            // 登入功能
                        exports.login = async (req, res) => {
                        const { email, password } = req.body;

                        try {
                                // 1. 查詢使用者是否存在
                            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
                            if (result.rows.length === 0) {
                            return res.status(401).json({ error: '帳號或密碼錯誤' });
                            }

                            const user = result.rows[0];

                                // 2. 驗證密碼
                            const isMatch = await bcrypt.compare(password, user.password);
                            if (!isMatch) {
                            return res.status(401).json({ error: '帳號或密碼錯誤' });
                            }

                                // 3. 產生 JWT token
                            const token = jwt.sign(
                            { // 你想放入 token 的資料
                                userId: user.id,
                                email: user.email,
                                role: user.role
                            },
                            process.env.JWT_SECRET, // 用來加密的密鑰（讀取.env中的JWT_SECRET）
                            { expiresIn: '7d' } // 過期時間（可選）
                            );

                            res.cookie('token', token, {
                            httpOnly: true,       // ✅ 只能被伺服器端讀取，無法用 JS 讀取，有效防範 XSS 攻擊
                            secure: false,        // ✅ 若是 HTTPS，建議設為 true
                            sameSite: 'lax',      // ✅ 可選值：'strict'、'lax'、'none'，防範 CSRF 攻擊
                            maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 設定 cookie 的存活時間，這裡是 7 天
                            });

                            res.json({
                            message: '登入成功',
                            token,
                            });
                        } catch (err) {
                            console.error('登入錯誤:', err);
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };

                            //登入確認
                        exports.logInCheck = (req, res) => {
                        res.json(
                            {  
                            message: '確認成功',
                            status: req.user.role,
                            }
                        );
                        };

                            //登入會員取得自己的資料：
                        exports.getCurrentUser = async (req, res) => {
                        const userId = req.user.userId;
                        try {
                            const result = await pool.query('SELECT id, username, email, role, avatar_url FROM users WHERE id = $1', [userId]);
                            res.json(result.rows[0]);
                        } catch (err) {
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };

                            //修改單一會員資料：
                        exports.getAllUserData = async (req, res) => {
                        //從token解析資料並放入req.user中再從user取出資料
                        const userId = req.user.userId;
                        const { name, email, password } = req.body;
                        try {

                                // 先加密密碼
                            const hashedPassword = await bcrypt.hash(password, 10);

                            const result = await pool.query(
                            \`UPDATE users SET name = $1, email = $2, password = $3 
                            WHERE id = $4 
                            RETURNING id, name, email, role\`,
                            [name, email, hashedPassword, userId]
                            );

                            res.json({
                            message:"會員資料修改完成",
                            user: result.rows[0],
                            });
                        } catch (err) {
                            res.status(500).json({ error: '會員資料修改失敗' });
                        }
                        };

                            //登出
                        exports.logout = (req, res) => {
                        res.clearCookie('token');
                        res.json({ message: '登出成功' });
                        };

                            //取得所有會員資料：
                        exports.getAllUserData = async (req, res) => {
                        try {
                            const result = await pool.query('SELECT * FROM users');
                            res.json(result.rows);
                        } catch (err) {
                            console.error("取得所有會員資料失敗", err);
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };

                            //取得會員資料（支援分頁 + 關鍵字搜尋)(管理員)
                        exports.getFilterUserData = async (req, res) => {

                            // 取得 URL 查詢參數中的 page（頁數），若沒傳則預設為 1
                        const page = parseInt(req.query.page) || 1;

                            // 取得 URL 查詢參數中的 limit（每頁筆數），若沒傳則預設為 10
                        const limit = parseInt(req.query.limit) || 10;

                            // 取得 URL 查詢參數中的 search（搜尋關鍵字），若沒傳則預設為空字串
                        const search = req.query.search || '';

                            // 計算 SQL 查詢的 offset（要跳過的資料數量）
                            // 告訴資料庫要「跳過」前面幾筆資料
                            // 例如：第 2 頁，每頁 10 筆，offset = (2 - 1) * 10 = 10
                            // page：第幾頁（從 1 開始）
                            // limit：每頁要顯示幾筆
                            // offset：要略過的資料數
                        const offset = (page - 1) * limit;

                        try {
                                // Step 1️⃣：計算符合搜尋條件的總筆數（用於分頁計算）
                                // ILIKE 是 PostgreSQL 不分大小寫的 LIKE
                                // \`%\${search}%\` 表示模糊搜尋，前後加 % 代表包含關鍵字
                                // COUNT(*)：統計符合條件的總筆數，不會回傳資料內容，只回傳數量。
                                // ILIKE：PostgreSQL 的「不分大小寫」模糊比對（LIKE 是分大小寫）。
                                // %abc% 表示「包含 abc 的任何字串」
                                // 如果 search 是空字串 ''，實際參數會變成 '%%'，等於「全部都符合」，所以也能列出全部使用者。
                            const countRes = await pool.query(
                            'SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1',
                            [\`%\${search}%\`]
                            );
                                //根據search回傳所有符合search內容的資料數量

                                // 從查詢結果取出總筆數（PostgreSQL 回傳的是字串，要轉成數字
                                //parseInt是把資料轉成數字
                                //因為 SQL 裡我們寫的是 SELECT COUNT(*) ...，欄位名預設就是 count
                            const total = parseInt(countRes.rows[0].count);
                                //再由parseInt轉成數字型態

                                // Step 2️⃣：查詢符合條件的會員資料（加上分頁限制）
                                //SELECT id, name, email, role：只取需要的欄位，回傳比較輕量。
                                //WHERE name ILIKE $1 OR email ILIKE $1：同樣沿用剛剛的搜尋條件。
                                //ORDER BY id：非常重要！ 分頁一定要有固定排序，不然每次翻頁結果可能會亂跳。
                                //LIMIT $2 OFFSET $3：分頁核心：$2 對應 limit（每頁幾筆）$3 對應 offset（要跳過幾筆
                                // ORDER BY id 表示結果按照 id 欄位排序
                                // --是SQL 註解
                                // LIMIT：限制最多回傳幾筆資料。
                                // OFFSET：要跳過前幾筆資料才開始回傳。
                            const result = await pool.query(
                            \`SELECT id, name, email, role 
                            FROM users
                            WHERE name ILIKE $1 OR email ILIKE $1
                            ORDER BY id -- 按照 id 排序（可改成 created_at DESC）
                            LIMIT $2 OFFSET $3\`, // 分頁用
                            [\`%\${search}%\`, limit, offset] // 對應上面 SQL 的 $1, $2, $3
                            );
                                //搜尋users資料表符合search的資料按照 id 欄位排序根據limit決定一個頁面要顯示幾筆資料，offset則決定跳過指定頁數前面多餘的資料

                                // Step 3️⃣：回傳 JSON 給前端
                            res.json({
                            total,        // 總筆數
                            page,         // 當前頁數
                            limit,        // 每頁筆數
                            users: result.rows // 會員資料陣列
                            });

                        } catch (err) {
                                // 如果 SQL 或程式有錯誤，回傳 500（伺服器錯誤）
                            console.error("會員查詢錯誤", err);
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };

                            //修改會員資料階位：
                        exports.updateUserRole = async (req, res) => {
                        const { user_id, role } = req.body;
                        try {
                            const result = await pool.query(
                            'UPDATE users SET role=$1, WHERE user_id=$2 RETURNING name, role',
                            [role,user_id]
                            );

                            if (result.rows.length === 0) {
                            return res.status(404).json({ error: '找不到該用戶' });
                            }

                            res.json({
                            message:"會員階級修改完成",
                            user:{
                                name:result.rows[0].name,
                                role:result.rows[0].role,
                            }
                            });
                        } catch (err) {
                            console.error('修改會員階級錯誤:', err);
                            res.status(500).json({ error: '伺服器錯誤' });
                        }
                        };


                            //刪除會員資格(管理員用)：
                        exports.delUserData = async (req, res) => {
                        const { user_id } = req.body;
                        try {
                            const search = await pool.query("SELECT id, name FROM users WHERE id = $1 ;",[user_id]);
                            if (search.rows.length === 0) {
                            return res.status(404).json({ error: '找不到該用戶' });
                            }
                            const result = await pool.query(
                            'DELETE FROM users WHERE id = $1 RETURNING *',
                            [user_id]
                            );

                            res.json({
                            message:"刪除會員完成",
                            userAllDataList:result.rows,
                            });
                        } catch (err) {
                            console.error('刪除會員失敗:', err);
                            res.status(500).json({ error: '伺服器錯誤' });
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



import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_會員系統伺服器端架設.scss';



export default function 會員系統伺服器端架設() {
  return (
    <div className='文章系統伺服器端架設'>
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <h4>雲端圖片伺服器端架設</h4>
                    <p>先從伺服器端基本架構後開始建立</p>
                    <div className='imgBox mb-24'>
                        <img className='imgSet' src="/images/基礎框架教學/NodeJsExpressBasic/NodeJsExpress01.png" alt="" />    
                    </div>
                    <p>將結構補足</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   dedent(`專案資料夾/
                                            ├── controllers/
                                            │       ├── user/
                                            │       │     └── userController.js
                                            │       │      
                                            │       └── auth/
                                            │             └── authController.js
                                            │
                                            ├── db/
                                            │   └── db.js
                                            ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                            ├── routes/
                                            │       ├── user/
                                            │       │     └── userRoutes.js
                                            │       └── auth/
                                            │             └── authRoutes.js
                                            ├── middlewares/
                                            │       ├── verifyTokenData.js
                                            │       └── allowRoles.js
                                            ├── utils/
                                            │     └── googleLoginSet.js
                                            ├── .env
                                            ├── .gitignore
                                            ├── index.js
                                            └── package.json`)   
                            }       
                        </code>
                    </pre>
                    <p>安裝必要套件</p>
                    <p>bcrypt套件</p>
                    <p>作用是密碼加密套件</p>
                    <p className='fs-20 fw-bold mb-24'>npm install bcrypt</p>
                    <p>jsonwebtoken套件</p>
                    <p>token套件</p>
                    <p className='fs-20 fw-bold mb-24'>npm install jsonwebtoken</p>
                    <p>passport套件</p>
                    <p>統一管理「外部登入流程」套件</p>
                    <p className='fs-20 fw-bold mb-24'>npm install passport</p>
                    <p>passport-google-oauth20套件</p>
                    <p>「Google 登入插件」套件</p>
                    <p className='fs-20 fw-bold mb-24'>npm install passport-google-oauth20</p>
                    <p>express-session套件</p>
                    <p>passport運作過程中需要的套件</p>
                    <p className='fs-20 fw-bold mb-24'>npm install express-session</p>
                    <h5>.env檔案追加內容</h5>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    GOOGLE_CLIENT_ID=google提供的ID
                                    GOOGLE_CLIENT_SECRET=google提供的密碼
                                    GOOGLE_REDIRECT_URI=http://localhost:5100/google/callback
                                `)   
                            }       
                        </code>
                    </pre>
                    <br />
                    <h5>google連線設定檔案</h5>
                    <p>utils/googleLoginSet.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const passport = require('passport');
                                    const GoogleStrategy = require('passport-google-oauth20').Strategy;

                                    passport.use(
                                    new GoogleStrategy(
                                        {
                                        clientID: process.env.GOOGLE_CLIENT_ID,
                                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                                        callbackURL: process.env.GOOGLE_REDIRECT_URI,
                                        },
                                        async (accessToken, refreshToken, profile, done) => {

                                            const email = profile.emails[0].value || null; 
                                            
                                            try {
                                                // 暫時只把資料交出去，不做任何事
                                                return done(null, {
                                                    email,
                                                    googleId: profile.id,
                                                });

                                            } catch (error) {
                                                return done(error, null);
                                            }
                                        }
                                    )
                                    );

                                    module.exports = passport;
                                `)   
                            }       
                        </code>
                    </pre>
                    <br />
                    <h5>建立基礎登入邏輯</h5>
                    <p>auth/authController.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const pool = require("../../db/db");
                                    //讀取資料庫連接設定
                                    const bcrypt = require('bcrypt');
                                    //密碼加密套件
                                    const jwt = require('jsonwebtoken');
                                    //產生token套件

                                    //新增會員
                                    exports.registerUser = async (req, res) => {
                                        //先進行解構
                                        const { email, password } = req.body;

                                        //如果沒有信箱或密碼則回報錯誤
                                        if (!email || !password) {
                                        return res.status(400).json({ message: 'email 與 password 必填' });
                                        }

                                        //密碼加密（建議難度 10）
                                        const hashedPassword = await bcrypt.hash(password, 10);

                                        try {
                                            //檢查是否已註冊
                                            const existing = await pool.query(
                                                \`
                                                    SELECT id
                                                    FROM users 
                                                    WHERE email = $1
                                                \`, 
                                                [email]
                                            );
                                            //如果有資料則回報訊息
                                            if (existing.rowCount !== 0) {
                                                return res.status(400).json({ error: '此信箱已註冊' });
                                            }

                                            const result = await pool.query(
                                                \`
                                                INSERT INTO users (email, password, auth_provider)
                                                VALUES ($1, $2, 'local')
                                                RETURNING id, email, auth_provider, created_at
                                                \` ,
                                                [email, hashedPassword]
                                            );

                                            return res.status(201).json({
                                                message: '註冊成功',
                                                user: result.rows[0],
                                            });

                                        } catch (error) {
                                            console.error(error);
                                            return res.status(500).json({ message: '伺服器錯誤' });
                                        }
                                    };

                                    // 登入會員
                                    exports.loginUser = async (req, res) => {
                                        //資料解構
                                        const { email, password } = req.body;

                                        // 基本檢查
                                        if (!email || !password) {
                                            return res.status(400).json({ message: 'email 與 password 必填' });
                                        }

                                        try {
                                            // 查詢信箱
                                            const result = await pool.query(
                                                \`
                                                SELECT id, email, password, role, auth_provider
                                                FROM users
                                                WHERE email = $1
                                                \`,
                                                [email]
                                            );

                                            // 信箱不存在則回報錯誤
                                            if (result.rowCount === 0) {
                                                return res.status(401).json({ message: '帳號或密碼錯誤' });
                                            }

                                            //會員資料
                                            const user = result.rows[0];

                                            // 比對 bcrypt 密碼
                                            const isMatch = await bcrypt.compare(password, user.password);

                                            //如果密碼比對失敗則回報錯誤
                                            if (!isMatch) {
                                                return res.status(401).json({ message: '帳號或密碼錯誤' });
                                            }

                                            // 產生 JWT（Token）
                                            const token = jwt.sign(
                                                {
                                                    id: user.id,
                                                    email: user.email,
                                                    role: user.role,
                                                    auth_provider: user.auth_provider,
                                                },
                                                process.env.JWT_SECRET,
                                                {
                                                    expiresIn: '1h', // Token 有效時間
                                                }
                                            );

                                            // 回傳 token
                                            return res.status(200).json({
                                                message: '登入成功',
                                                token,
                                                user: {
                                                    id: user.id,
                                                    email: user.email,
                                                    role: user.role,
                                                    auth_provider: user.auth_provider,
                                                },
                                            });

                                        } catch (error) {
                                            console.error(error);
                                            return res.status(500).json({ message: '伺服器錯誤' });
                                        }
                                    };

                                    //登入確認
                                    exports.logInCheck = (req, res) => {
                                        res.json(
                                            {  
                                            message: '確認成功',
                                            status: 
                                                { 
                                                    userId: req.user.id,
                                                    email: req.user.email,
                                                    role: req.user.role,
                                                    auth_provider:req.user.auth_provider
                                                },
                                            }
                                        );
                                    };

                                    //登出
                                    exports.logout = (req, res) => {
                                        res.json({ message: '登出成功' });
                                    };
                                `)   
                            }       
                        </code>
                    </pre>
                    <br />
                    <h5>建立路由設定</h5>
                    <p>routes/auth/authRoutes.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');
                                    const { registerUser, loginUser, logInCheck, logout } = require('../../controllers/auth/authController');
                                    const verifyTokenData = require('../../middlewares/verifyTokenData');
                                    const allowRoles = require('../../middlewares/allowRoles');

                                    const router = express.Router();

                                    //註冊會員
                                    router.post('/register', registerUser);

                                    //會員登入
                                    router.post('/login', loginUser);  

                                    //確認登入
                                    router.post('/logInCheck', verifyTokenData, allowRoles('admin','user','vip','vendor'), logInCheck);

                                    //登出
                                    router.post('/logout', verifyTokenData, logout);

                                    module.exports = router;
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>routes/auth/authGoogle.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');
                                    const passport = require('passport');
                                    const router = express.Router();
                                    const pool = require('../../db/db');
                                    const jwt = require('jsonwebtoken');

                                    // 啟動 Google 登入
                                    router.get('/login',
                                        //passport接手登入流程
                                        passport.authenticate('google', {
                                            scope: ['profile', 'email'],
                                            session: false,
                                            prompt: 'select_account',
                                            //每一次登入時都會重新登入google帳號
                                        })
                                    );

                                    // Google callback
                                    //http://localhost:5173/google/callback
                                    //組合完成的網址必須與GOOGLE_REDIRECT_URI相同
                                    router.get(
                                        '/callback',
                                        passport.authenticate('google', {
                                            session: false,
                                            failureRedirect: 'http://localhost:5173/#',
                                            //「Google OAuth 驗證失敗時，瀏覽器要被導向哪裡」
                                        }),
                                        async (req, res) => {

                                            const { email, googleId } = req.user;

                                            try {
                                                // 查詢是否已有此 email
                                                const existing = await pool.query(
                                                    \`SELECT id, email, role, auth_provider FROM users WHERE email = $1\`,
                                                    [email]
                                                );

                                                let user;

                                                // 如果不存在則執行以下內容
                                                if (existing.rowCount === 0) {
                                                    //將使用者資料寫入資料表
                                                    const result = await pool.query(
                                                        \`
                                                            INSERT INTO users (email, auth_provider, google_id, role)
                                                            VALUES ($1, 'google', $2, 'user')
                                                            RETURNING id, email, role
                                                        \`,
                                                        [email, googleId]
                                                    );
                                                    user = result.rows[0];
                                                } else {
                                                    // 已存在的話當作登入
                                                    user = existing.rows[0];
                                                }

                                                const token = jwt.sign(
                                                    {
                                                        id: user.id,
                                                        email: user.email,
                                                        role: user.role,
                                                        auth_provider: 'google',
                                                    },
                                                    process.env.JWT_SECRET,
                                                    { expiresIn: '1h' }
                                                );

                                                //redirect 回前端成功頁
                                                res.redirect(\`http://localhost:5173/#/常用系統範例/token?value=\${encodeURIComponent(token)}\`);

                                                } catch (error) {
                                                    console.error("google會員註冊失敗",error);
                                                    res.redirect('http://localhost:5173/#');
                                                }
                                        }
                                    );
                                    module.exports = router;
                                `)   
                            }       
                        </code>
                    </pre>
                    <h5>設定驗證程式</h5>
                    <p>middlewares/verifyTokenData.js</p>
                    <p>驗證token</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const jwt = require('jsonwebtoken');
                                    // 驗證 JWT middleware
                                    const verifyTokenData = (req, res, next) => {
                                        try {
                                            // 從 Authorization header 取得 token
                                            // 格式：Authorization: Bearer xxxxx
                                            const authHeader = req.headers.authorization;

                                            if (!authHeader) {
                                            return res.status(401).json({ message: '未提供 token' });
                                            }

                                            const token = authHeader.split(' ')[1];

                                            if (!token) {
                                            return res.status(401).json({ message: 'token 格式錯誤' });
                                            }

                                            // 驗證 token
                                            const decoded = jwt.verify(token, process.env.JWT_SECRET);

                                            // 把解碼後的使用者資料存進 req
                                            req.user = decoded;

                                            // 執行下一個
                                            next();

                                        } catch (error) {
                                            console.error(error);
                                            return res.status(401).json({ message: 'token 驗證失敗' });
                                        }
                                    };

                                    module.exports = verifyTokenData;
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>middlewares/allowRoles.js</p>
                    <p>驗證登入者身分</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    //確認登入者的狀態來給予權限
                                    // 權限驗證 middleware
                                    const allowRoles = (...roles) => {
                                        return (req, res, next) => {

                                            if (!req.user || !req.user.role) {
                                                return res.status(401).json({ message: '尚未驗證身分' });
                                            }
                                            if (!roles.includes(req.user.role)) {
                                                return res.status(403).json({ error: '權限不足' });
                                            }
                                            next();
                                        };
                                    };
                                    module.exports = allowRoles;
                                `)   
                            }       
                        </code>
                    </pre>
                    <h5>在index.js中引入路由</h5>
                    <p>index.js內容</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');// 載入 express 套件，建立後端伺服器框架
                                    const app = express();// 使用 express() 建立一個應用程式實例
                                    const pool = require('./db/db');// 載入我們自己寫的資料庫連線模組（也就是 db.js）
                                    const cors = require('cors');//匯入中介層套件工具
                                    const cookieParser = require('cookie-parser');//將 Cookie 字串轉換成token讓後端可以讀取
                                    const passport = require('./utils/googleLoginSet');//載入 passport(google登入套件需要)
                                    require('dotenv').config();// 載入 dotenv 以支援 .env 環境變數

                                    app.use(express.json());// 解析 JSON 格式的 request body

                                    app.use(cookieParser());// 將 Cookie 字串轉換成token讓後端可以讀取

                                    //const userRoutes = require('./routes/user/userRoutes'); 
                                    //會員相關用api

                                    const authRoutes = require('./routes/auth/authRoutes'); 
                                    //引入登入相關router
                                    const authGoogleRoutes = require('./routes/auth/authGoogle');
                                    //引入google登入router

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

                                    app.use(passport.initialize());
                                    //讓 Passport 接管所有『身分驗證流程』
                                    //負責處理google登入流程

                                    //app.use('/users', userRoutes);

                                    app.use('/auth', authRoutes);
                                    //登入相關API

                                    app.use('/google', authGoogleRoutes);
                                    //GOOGLE登入相關API

                                    // ✅ 啟動伺服器
                                    const PORT = process.env.PORT || 10000;

                                    app.listen(PORT, () => {
                                        console.log(\`伺服器啟動\`,PORT);
                                    });
                                `)   
                            }       
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
    
  );
}






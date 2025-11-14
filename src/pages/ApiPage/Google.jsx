
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function Google() {
  return (
    <div className="container">
      <h3>Google登入設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        //此函式是「OAuth 登入策略設定」，設定GOOGLE如何登入

                        const passport = require('passport'); // 引入 passport 主程式
                        const GoogleStrategy = require('passport-google-oauth20').Strategy; // 引入 Google OAuth 策略
                        const pool = require('../db/db'); // 引入資料庫連線物件

                        // 註冊 Google 登入策略
                        passport.use(
                            //預設名稱為"google"如果想改名則
                            //'google-login', <-- 如果要自訂策略名稱
                            new GoogleStrategy({
                                clientID: process.env.GOOGLE_CLIENT_ID,            // 從 .env 讀取 Google OAuth client ID
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET,    // 從 .env 讀取 Google OAuth client secret
                                callbackURL: process.env.GOOGLE_CALLBACK_URL,      // 登入成功後會 redirect 回來的網址
                            },
                            //Google 驗證成功後，會「自動把使用者資訊打包成 profile 給你」，你就能從 profile 拿到：
                            // profile.id → Google ID
                            // profile.displayName → 使用者名稱
                            // profile.emails → Email 陣列
                            // profile.photos → 大頭照 URL

                            // 驗證回傳的 profile 資料
                            async (accessToken, refreshToken, profile, done) => {
                                const email = profile.emails[0].value;             // 取出使用者 Email
                                const googleId = profile.id;                       // 取出 Google ID
                                const username = profile.displayName;              // 取出使用者名稱
                                const photo = profile.photos?.[0]?.value || null;  // 取出使用者頭像

                            // 調整尺寸函式（Google 通常給 s96-c，可替換成 s256-c 等）
                            const normalizePhoto = (url) => {
                                if (!url) return null;
                                return url.replace(/s\d+-c/, 's256-c'); // 例如改成 256px
                            };
                            //使用者頭像圖案調整尺寸
                            const avatarUrl = normalizePhoto(photo); 

                                try {
                                    // 檢查是否已存在該用戶（依 google_id 查找）
                                    const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);

                                    if (result.rows.length > 0) {

                                        const user = result.rows[0];
                                        
                                        //done(error, user)
                                        //error → 有錯誤時傳錯誤物件，沒有錯誤就傳 null
                                        //user → 驗證成功後的使用者資料物件（會變成 req.user）

                                        // 若原本沒頭像、或想以 Google 為主就更新
                                        if (!user.avatar_url && avatarUrl) {
                                            await pool.query(
                                            'UPDATE users SET avatar_url = $1 WHERE id = $2',
                                            [avatarUrl, user.id]
                                            );
                                            user.avatar_url = avatarUrl; // 同步到回傳物件
                                        }

                                        return done(null, user); // 已存在 → 傳回使用者資料
                                    } else {
                                    // 新用戶 → 建立帳號
                                    const newUser = await pool.query(
                                        //新增資料欄位分別是(username(名稱),email(信箱),google_id(googleID),auth_provider(登陸來源),role(使用者權限))
                                        'INSERT INTO users (username, email, google_id, auth_provider, role, avatar_url) \\
                                        //反斜線 \\ 是 JavaScript 的「行接續」符號意思是「把下一行跟這行當同一行字串」
                                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                                        [username, email, googleId, 'google', 'user', avatarUrl]
                                    );
                                    return done(null, newUser.rows[0]); // 傳回新建立的用戶
                                    }
                                } catch (err) {
                                    return done(err, null); // 若有錯誤，傳回錯誤
                                }
                            })
                        );
                        // ✅ 若要使用 session 的話，需有序列化與反序列化（但使用 JWT 可不寫）
                        // passport.serializeUser((user, done) => done(null, user.id));
                        // passport.deserializeUser((id, done) => done(null, id));
                        //這是「session-based 認證」的設定：
                        //serializeUser	將登入成功後的 user 資料「存進 session」時，選擇只存 user.id。
                        //deserializeUser	使用者後續請求時，從 session 拿到 user.id，再查資料庫找回整個 user。
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

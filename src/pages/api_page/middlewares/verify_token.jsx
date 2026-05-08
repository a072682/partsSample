
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function VerifyToken() {
  return (
    <div className="container">
      <h3>確認使用者Token是否合法</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        const jwt = require('jsonwebtoken'); // jsonwebtoken是一個用來產生token和驗證的套件
                        require('dotenv').config(); // 載入 .env 檔案中的環境變數

                        //verifyToken為驗證使用者是否有提供合法的 JWT（JSON Web Token）
                        function verifyToken(req, res, next) {
                        // 從請求的 headers 中取得 authorization 欄位
                        const authHeader = req.headers.authorization;

                        // 若沒有 Authorization 或格式不是 Bearer 開頭，回傳錯誤
                        if (!authHeader || !authHeader.startsWith('Bearer ')) {
                            return res.status(401).json({ error: '未授權，缺少或錯誤的 token' });
                        }

                        // 取得 token（格式是 Bearer xxx，所以取空格後的部分）
                        const token = authHeader.split(' ')[1];
                        
                        try {
                            // 使用 JWT_SECRET 驗證 token 是否正確與未過期
                            //.verify是jsonwebtoken套件提供的方法功能是驗證一個 JWT 是否有效，並解析出裡面的內容
                            //格式為const decoded = jwt.verify(token, secret);
                            //token = 使用者傳來的 JWT
                            //secret = .env設定的JWT_SECRET
                            //回傳值 = 如果驗證成功，會回傳「解碼後的物件」（例如包含 userId、role）
                            //如果驗證失敗（過期或偽造），會 throw 一個錯誤，必須包在 try...catch 裡
                            const decoded = jwt.verify(token, process.env.JWT_SECRET);

                            // 驗證成功，將使用者資訊存在 req.user 中，提供給後續的處理使用
                            req.user = decoded;// ✅ 手動加上 req.user（裡面可能有 userId、role 等）

                            // 進入下一個中介函式或路由處理
                            next();
                        } catch (error) {
                            // 驗證失敗，回傳錯誤（可能是過期、被竄改、不合法）
                            return res.status(403).json({ error: 'Token 驗證失敗或已過期' });
                        }
                        }

                        module.exports = verifyToken;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

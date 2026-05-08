
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function Verifycookie() {
  return (
    <div className="container">
      <h3>確認使用者cookie是否合法</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        //verifyCookie為讀取使用者的cookie使用者是否有提供合法的Token
                        const jwt = require('jsonwebtoken');

                        function verifycookie(req, res, next){
                        const token = req.cookies.token; // ✅ 從 cookie 取出

                        if (!token) {
                            return res.status(401).json({ error: '未登入或 token 遺失' });
                        }

                        try {
                            const decoded = jwt.verify(token, process.env.JWT_SECRET);
                            req.user = decoded;
                            next();
                        } catch (err) {
                            return res.status(401).json({ error: 'token 無效或已過期' });
                        }
                        };

                        module.exports = verifycookie;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

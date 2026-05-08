
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function UserRoutes() {
  return (
    <div className="container">
      <h3>會員相關路由設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // 對應 /userController 的路由設定
                        const express = require('express');
                        const router = express.Router();
                        const { registerUser } = require('../controllers/userController');
                            //使用{}為解構，意思是指從userController取出registerUser函式
                        const verifyToken = require('../middlewares/verifyToken');
                            //引入verifyToken驗證使用者是否有提供合法的 JWT
                        const verifyCookie = require('../middlewares/verifyCookieData');
                            //verifyCookie為讀取使用者的cookie使用者是否有提供合法的Token
                        const userController = require('../controllers/userController');
                            //不使用{}為引入整個模組可以使用所有userController的函式但是命名方式為userController.xxx

                            //創建會員
                        router.post('/register', registerUser);

                            //登入會員
                        router.post('/login', userController.login);

                            //確認登入
                        router.post('/logInCheck', verifyCookie,userController.logInCheck);

                            //使用者登入後取得自己的資料
                        router.get('/me', verifyCookie, userController.getCurrentUser);

                            //登出
                        router.post('/logout',userController.logout);

                        module.exports = router;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

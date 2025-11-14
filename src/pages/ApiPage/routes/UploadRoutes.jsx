
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function UploadRoutes() {
  return (
    <div className="container">
      <h3>圖片上傳相關路由設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // 對應 /uploadController 的路由設定
                        const express = require('express');
                        const router = express.Router();
                        const { upload, uploadAvatar } = require('../middlewares/upload');
                            //upload 上傳至雲端products資料夾後返回雲端網址
                            //uploadAvatar 上傳至雲端avatars資料夾後返回雲端網址
                        const verifyToken  = require('../middlewares/verifyToken');
                            //引入verifyToken驗證使用者是否有提供合法的 JWT
                        const verifyCookie = require('../middlewares/verifyCookieData');
                            //verifyCookie為讀取使用者的cookie使用者是否有提供合法的Token
                        const { uploadImage } = require('../controllers/uploadController');
                            //將雲端網址傳送至前端
                        const { updateMyAvatar } = require('../controllers/uploadController');
                            //負責把上傳雲端後的圖片網址轉成url傳至資料庫
                        const allowRoles = require('../middlewares/allowRoles');
                            //引入allowRoles確認登入者的身分權限

                            //圖片上傳
                        router.post('/upload', verifyCookie, allowRoles('admin', 'user'), upload.single('image'), uploadImage);

                            //更改使用者頭像
                        router.post('/upAvatarImg', verifyCookie, allowRoles('admin', 'user'), uploadAvatar.single('image'), updateMyAvatar);

                        module.exports = router;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

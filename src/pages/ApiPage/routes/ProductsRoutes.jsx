
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function ProductsRoutes() {
  return (
    <div className="container">
      <h3>產品相關Api路由設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // 對應 /productsController 的路由設定

                        const express = require('express');
                        const router = express.Router();
                        const productsController = require('../controllers/productsController');//引入產品新增購買刪除等函式
                        const { productSchema } = require('../validators/userValidator');//引入joi規則(單體無法執行)
                        const validate = require('../middlewares/validateSchema');//引入函式並套用productSchema的規則來驗證輸入資料
                        const verifyToken  = require('../middlewares/verifyToken');//引入verifyToken驗證使用者是否有提供合法的 JWT
                        const verifyCookie = require('../middlewares/verifyCookieData');//verifyCookie為讀取使用者的cookie使用者是否有提供合法的Token
                        const allowRoles = require('../middlewares/allowRoles');//引入allowRoles確認登入者的身分權限

                        router.get('/',  productsController.getAllProducts);
                        router.get('/:id', productsController.getProductById);
                        router.post('/', verifyCookie, allowRoles('admin'), validate(productSchema), productsController.createProduct);
                        router.put('/:id', verifyCookie, allowRoles('admin'), validate(productSchema), productsController.updateProduct);
                        router.delete('/:id',verifyCookie, allowRoles('admin'), productsController.deleteProduct);

                        module.exports = router;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

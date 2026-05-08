
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function FileData() {
  return (
    <div className="container">
      <h3>資料夾結構</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        node-express-pg-demo/         # 資料夾專案根目錄
                            │
                            ├── index.js                  # 伺服器主程式（Express 啟動點）
                            ├── package.json              # 用來記錄專案的套件的基本資訊
                            ├── .env                      # 環境變數（DB 連線、JWT_SECRET 等）
                            │
                            ├── db/
                            │   └── db.js                 # PostgreSQL 連線設定（Pool）與資料庫的連線設定
                            ├── googleAuth/
                            │   └── google.js             # 設定GOOGLE如何登入
                            │
                            ├── imgUpLoad/                
                            │   └── upload.js             # 此函式作用為上傳圖片至cloudinary雲端資料夾
                            │
                            ├── middlewares/
                            │   ├── verifyToken.js        # 驗證使用者是否有提供合法的 JWT
                            │   ├── validateSchema.js     # 此函式作用為輸入指定規則(schema)並驗證其規則(schema)
                            │   ├── allowRoles.js         # 確認登入者的身分權限
                            │   └── verifyCookieData.js   # 讀取使用者的cookie使用者是否有提供合法的Token
                            │
                            ├── routes/
                            │   ├── productsRoutes.js     # 產品 API 路由
                            │   ├── uploadRoutes.js       # 圖片上傳 API 路由
                            │   ├── googleAuthRoutes.js   # google相關路由
                            │   └── userRoutes.js         # 會員 API 路由
                            │
                            ├── controllers/
                            │   ├── productsController.js # 處理產品 API 邏輯
                            │   ├── uploadController.js   # 處理圖片上傳邏輯
                            │   └── userController.js     # 處理會員相關邏輯
                            │
                            ├── utils/                  
                            │     └── cloudinary.js 	  # 負責設定雲端連接設定
                            │
                            └── validators  
                                └── userValidator.js      # 設定資料的判定規則

                            //此結構並非一定，需要依照專案進行對應的修改
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

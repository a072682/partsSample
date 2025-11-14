
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function Env() {
  return (
    <div className="container">
      <h3>環境變數(.env)</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        PORT=5000
                        JWT_SECRET=xxx

                        //資料庫相關設定
                        DB_USER=xxx
                        DB_HOST=xxx
                        DB_DATABASE=xxx
                        DB_PASSWORD=xxx
                        DB_PORT=xxx
                        //資料庫相關設定

                        //CLOUDINARY雲端相關設定
                        CLOUDINARY_CLOUD_NAME=xxx
                        CLOUDINARY_API_KEY=xxx
                        CLOUDINARY_API_SECRET=xxx
                        //CLOUDINARY雲端相關設定
                        
                        //google憑證相關設定
                        GOOGLE_CLIENT_ID=xxx
                        GOOGLE_CLIENT_SECRET=xxx
                        GOOGLE_CALLBACK_URL=xxx
                        //google憑證相關設定

                        //此結構並非一定，通常比較敏感的資料都會放於此處再由外部提取
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

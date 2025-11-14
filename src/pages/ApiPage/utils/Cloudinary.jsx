
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function Cloudinary() {
  return (
    <div className="container">
      <h3>雲端連接設定</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        // utils/cloudinary.js
                        //負責設定雲端連接設定
                        const cloudinary = require('cloudinary').v2;//.v2 是指 Cloudinary 套件提供的第二版 API
                        require('dotenv').config();//讀取.env資料

                        cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        });
                        //將 Cloudinary 的帳號資料（如 cloud name、API key 等）設定進 cloudinary 套件內部，
                        // 讓它能正確上傳/存取圖片。這是一個初始化設定。

                        module.exports = cloudinary;
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}

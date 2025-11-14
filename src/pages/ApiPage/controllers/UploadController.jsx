
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function UploadController() {
  return (
    <div className="container">
      <h3>處理圖片上傳邏輯</h3>
      <pre className="language-html m-0 p-16">
            <code className="language-html">
            {   
                dedent(
                        `
                        const pool = require('../db/db');//取得後端資料庫連結
                        const cloudinary = require('../utils/cloudinary');//引入cloudinary的設定

                        //圖片上傳的函式
                        //負責把上傳雲端後的圖片網址轉成url傳至前端
                        // controllers/uploadController.js
                        exports.uploadImage = async (req, res) => {
                            try {
                                res.json({
                                url: req.file.path,
                                filename: req.file.filename,
                                });
                            } catch (error) {
                                res.status(500).json({ error: '上傳失敗' });
                            }
                        };


                        // controllers/userController.js
                        //負責把上傳雲端後的圖片網址轉成url傳至資料庫
                        exports.updateMyAvatar = async (req, res) => {
                            try {
                                const userId = req.user.userId;//從前端取得userId
                                //要是前端沒有攜帶圖片則顯示錯誤訊息
                                if (!req.file) return res.status(400).json({ error: '請選擇圖片' });

                                // CloudinaryStorage 會回傳這些
                                // 新的頭像url
                                const publicId = req.file.filename     // e.g. "avatars/abc123"
                                const secureUrl = req.file.path;       // https://res.cloudinary.com/.../image/upload/...

                                // 讀取當前的頭像ID資料
                                const avatarIdData = await pool.query('SELECT avatar_public_id FROM users WHERE id=$1', [userId]);
                                const oldavatarIdData = avatarIdData.rows[0]?.avatar_public_id;

                                // 更新 DB
                                const result = await pool.query(
                                \`UPDATE users
                                SET avatar_url = $1, avatar_public_id = $2
                                WHERE id = $3
                                RETURNING id, username, email, role, avatar_url, avatar_public_id\`,
                                [secureUrl, publicId, userId]
                                );

                                // 刪舊圖（若存在且不同）
                                if (oldavatarIdData && oldavatarIdData !== publicId) {
                                try { await cloudinary.uploader.destroy(oldavatarIdData); 

                                } catch (error) { /* 忽略失敗 */ 
                                    //失敗的話甚麼都不做單純顯示訊息
                                    console.warn('刪除舊頭像失敗：', oldavatarIdData, error.message);
                                }
                                //cloudinary.uploader.destroy(oldPublicId)是 官方的刪檔 API
                                //參數：publicId（要含資料夾路徑，如 avatars/abc123）不能傳 URL；要傳 publicId 才刪得掉
                                //回傳：類似 { result: 'ok' }、{ result: 'not found' }
                                }

                                res.json(result.rows[0]);
                            } catch (err) {
                                console.error(err);
                                res.status(500).json({ error: '上傳失敗' });
                            }
                        };
                        `
                )   
            }       
            </code>
        </pre>
    </div>
  );
}



import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_雲端圖片伺服器端架設.scss';



export default function 雲端圖片伺服器端架設() {
  return (
    <div className='雲端圖片伺服器端架設'>
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <h4>雲端圖片伺服器端架設</h4>
                    <p>先從伺服器端基本架構後開始建立</p>
                    <div className='imgBox mb-24'>
                        <img className='imgSet' src="/images/基礎框架教學/NodeJsExpressBasic/NodeJsExpress01.png" alt="" />    
                    </div>
                    <p>將結構補足</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   dedent(`專案資料夾/
                                            ├── controllers/
                                            │       └── images/
                                            │               └── imagesController.js
                                            ├── db/
                                            │   └── db.js
                                            ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                            ├── routes/
                                            │       └── images/
                                            │               └── imagesRoutes.js
                                            ├── utils/
                                            │       └── cloudinary.js
                                            ├── .env
                                            ├── .gitignore
                                            ├── index.js
                                            └── package.json`)   
                            }       
                        </code>
                    </pre>
                    <p>安裝必要套件</p>
                    <p>Multer套件</p>
                    <p>作用是接收前端 <code>{'<input type="file" />'}</code>  上傳的檔案</p>
                    <p className='fs-20 fw-bold'>npm install multer</p>
                    <p>cloudinary套件</p>
                    <p>cloudinary雲端伺服器套件</p>
                    <p>先建立與雲端連接的設定檔案</p>
                    <p className='fs-20 fw-bold mb-24'>npm install cloudinary</p>
                    <p>utils/cloudinary.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    // utils/cloudinary.js
                                    //負責設定雲端連接設定
                                    const cloudinary = require('cloudinary').v2;//.v2 是指 Cloudinary 套件提供的第二版 API
                                    require('dotenv').config();//讀取.env資料

                                    cloudinary.config({
                                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                                    api_key: process.env.CLOUDINARY_API_KEY,
                                    api_secret: process.env.CLOUDINARY_API_SECRET,
                                    });
                                    //將 Cloudinary 的帳號資料（如 cloud name、API key 等）
                                    //設定進 cloudinary 套件內部，讓它能正確上傳/存取圖片。這是一個初始化設定。

                                    module.exports = cloudinary;
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>建立基礎邏輯</p>
                    <p>controllers/images/imagesController.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const cloudinary = require('../../utils/cloudinary');
                                    const fs = require('fs');//fs為Node.js 內建模組
                                    //意思是FileSystem（檔案系統）
                                    //作用是讓 JavaScript 可以「讀 / 寫 / 刪 / 操作」電腦上的檔案

                                    //#region
                                    //#endregion

                                    //#region 取得圖片清單
                                    exports.getImages = async (req, res) => {
                                    try {
                                        //取得資料夾名稱
                                        const { folder } = req.query;

                                        //如果沒有資料夾名稱則回報錯誤
                                        if (!folder) {
                                            return res.status(400).json({ message: '缺少 folder 參數' });
                                        }

                                        const result = await cloudinary.api.resources({
                                            //upload 代表 自己上傳的圖片
                                            type: 'upload',
                                            //\${folder} 代表 目標資料夾的名稱
                                            // 例如 articles/
                                            prefix: \`\${folder}/\`, 
                                            //一次取最多30張圖片
                                            max_results: 30,
                                        });

                                        // 精簡回傳資料
                                        const images = result.resources.map((img) => ({
                                            public_id: img.public_id,
                                            url: img.secure_url,
                                            created_at: img.created_at,
                                        }));

                                        //回傳圖片資料
                                        res.json(images);

                                    } catch (error) {
                                        console.error('取得圖片清單失敗:', error);
                                        res.status(500).json({ message: '取得圖片清單失敗' });
                                    }
                                    };
                                    //#endregion

                                    //#region 上傳圖片
                                    exports.uploadImage = async (req, res) => {

                                        let filePath;

                                        try {
                                            //取得圖片資料
                                            const file = req.file;

                                            //如果沒有圖片資料則回報錯誤
                                            if (!file) {
                                                return res.status(400).json({ message: '沒有收到圖片' });
                                            }

                                            filePath = file.path;

                                            const result = await cloudinary.uploader.upload(
                                                file.path, {
                                                    folder: 'testFolder',
                                                }
                                            );

                                            res.json({
                                                url: result.secure_url,
                                                public_id: result.public_id,
                                            });

                                        } catch (error) {
                                            console.error('圖片上傳失敗', error);
                                            res.status(500).json({ message: '圖片上傳失敗' });
                                        } finally {
                                            if (filePath) {
                                                //.unlink的意思是從硬碟上「刪除filePath的檔案」
                                                fs.unlink(filePath, (error) => {
                                                    if (error) {
                                                        console.error('刪除 temp 檔案失敗:', error);
                                                    }
                                                });
                                            }
                                        }
                                    };
                                    //#endregion

                                    //#region 覆蓋圖片
                                    exports.uploadImageChange = async (req, res) => {
                                        let filePath;

                                        try {
                                            //取出圖片資料
                                            const file = req.file;
                                            //取出圖片ID
                                            const { public_id } = req.body;

                                            //如果沒有圖片檔案或ID則回報錯誤
                                            if (!file || !public_id) {
                                                return res.status(400).json({
                                                    message: '缺少圖片或 public_id',
                                                });
                                            }
                                            //將圖片網址存於filePath
                                            filePath = file.path;

                                            const result = await cloudinary.uploader.upload(file.path, {
                                                public_id,        //指定同一張圖
                                                overwrite: true,  //允許覆蓋
                                                invalidate: true, //清 CDN 快取
                                            });

                                            res.json({
                                                message: '圖片已覆蓋成功',
                                                url: result.secure_url,
                                                public_id: result.public_id,
                                            });

                                        } catch (error) {
                                            console.error('覆蓋圖片失敗:', error);
                                            res.status(500).json({ message: '覆蓋圖片失敗' });
                                        } finally {
                                            if (filePath) {
                                                fs.unlink(filePath, () => {});
                                            }
                                        }
                                    };
                                    //#endregion

                                    //#region 刪除圖片
                                    exports.deleteImage = async (req, res) => {
                                        try {
                                            //取出圖片id
                                            const { public_id } = req.query;

                                            //圖果圖片id不存在則回報錯誤
                                            if (!public_id) {
                                                return res.status(400).json({ message: '缺少圖片public_id' });
                                            }

                                            //呼叫 Cloudinary 刪除圖片
                                            const result = await cloudinary.uploader.destroy(public_id);

                                            //如果結果不是ok則回報錯誤
                                            if (result.result !== 'ok') {
                                                return res.status(404).json({
                                                    message: '圖片不存在或已刪除',
                                                    cloudinaryResult: result,
                                                });
                                            }

                                            //成功
                                            res.json({
                                                message: '圖片已成功刪除',
                                            });

                                        } catch (error) {
                                            console.error('Cloudinary 刪除失敗:', error);
                                            res.status(500).json({ message: '圖片刪除失敗' });
                                        }
                                    };
                                    //#endregion
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>建立路由設定</p>
                    <p>routes/images/imagesRoutes.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');
                                    const router = express.Router();
                                    const multer = require('multer');
                                    //Node.js 的「檔案接收器」
                                    const upload = multer({ dest: 'temp/' });
                                    //圖片檔案會暫存在temp資料夾中

                                    const { getImages, 
                                            uploadImage,
                                            deleteImage, 
                                            uploadImageChange 
                                    } = require('../../controllers/images/imagesController');

                                    //#region
                                    //#endregion

                                    //#region 取得圖片
                                    router.get('/getImages', getImages);
                                    //#endregion

                                    //upload.single('image')代表只接收一個檔案且formData的名稱必須是image
                                    //接收完成的資訊會放在req.file中
                                    //#region 上傳圖片
                                    router.post('/upload', upload.single('image'), uploadImage);
                                    //#endregion

                                    //#region 修改圖片
                                    router.put('/uploadChange', upload.single('image'), uploadImageChange);
                                    //#endregion

                                    //#region 刪除圖片
                                    router.delete('/deleteImage', deleteImage);
                                    //#endregion

                                    module.exports = router;
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>在index.js中引入路由</p>
                    <p>index.js內容</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');
                                    // 載入 express 套件，建立後端伺服器框架
                                    const app = express();
                                    // 使用 express() 建立一個應用程式實例
                                    const pool = require('./db/db');
                                    // 載入我們自己寫的資料庫連線模組（也就是 db.js）
                                    const cors = require('cors');
                                    //匯入中介層套件工具
                                    require('dotenv').config();
                                    // 載入 dotenv 以支援 .env 環境變數
                                    app.use(express.json());
                                    // 解析 JSON 格式的 request body

                                    const imagesRoutes = require('./routes/images/imagesRoutes');
                                    // 引入上傳圖片路由

                                    //#region 
                                    //#endregion

                                    //中介層設定
                                    app.use(cors({
                                        origin: 'http://localhost:5173', // 允許的前端來源
                                        // methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'], // 可允許的方法
                                        credentials: true,
                                    }));
                                    //中介層設定


                                    //測試資料庫連線的路由
                                    app.get('/test-db', async (req, res) => {
                                    // 這個函式只會在使用者訪問 http://localhost:5100/test-db 時執行
                                    try {
                                    const result = await pool.query('SELECT NOW()');
                                    // 用 pool 發送 SQL 指令：取得目前資料庫時間
                                    res.json({ message: '連線成功', time: result.rows[0] });
                                    // 回傳 JSON 結果給使用者
                                    } catch (err) {
                                    console.error(err);
                                    res.status(500).send('連線失敗');
                                    // 若有錯誤，顯示在後端並告知前端
                                    //res表示伺服器要回傳給使用者的內容
                                    //.status(500)設定狀態碼為 500（伺服器錯誤）
                                    //傳送純文字 "連線失敗" 作為回應內容
                                    }
                                    });

                                    //#region 圖片系統相關路由
                                    app.use('/images', imagesRoutes);
                                    //#endregion

                                    // 啟動伺服器
                                    const PORT = process.env.PORT || 10000;

                                    app.listen(PORT, () => {
                                        console.log(\`伺服器啟動\`,PORT);
                                    });
                                `)   
                            }       
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
    
  );
}






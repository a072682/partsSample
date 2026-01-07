

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_文章系統伺服器端架設.scss';



export default function 文章系統伺服器端架設() {
  return (
    <div className='文章系統伺服器端架設'>
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
                                            │       └── articles/
                                            │               └── articlesController.js
                                            ├── db/
                                            │   └── db.js
                                            ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                            ├── routes/
                                            │       └── articles/
                                            │               └── articlesRoutes.js
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
                    <p>controllers/articles/articlesController.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const pool = require("../../db/db");
                                    const cloudinary = require("../../utils/cloudinary");

                                    //#region
                                    //#endregion

                                    //#region 取得所有文章
                                    exports.getAllArticles = async (req, res) => {
                                    try {
                                        const result = await pool.query(
                                        \`SELECT *
                                        FROM articles
                                        ORDER BY created_at DESC\`
                                        );

                                        res.json({
                                        message: "文章列表取得成功",
                                        articles: result.rows,
                                        });

                                    } catch (err) {
                                        console.error("取得文章列表失敗:", err);
                                        res.status(500).json({ error: "伺服器錯誤" });
                                    }
                                    };
                                    //#endregion

                                    //#region 取得單篇文章
                                    exports.getSingleArticle = async (req, res) => {
                                    try {
                                        // 從網址取得 id
                                        const { id } = req.params;

                                        // 檢查 id 是否存在
                                        if (!id) {
                                        return res.status(400).json({ message: "請提供文章 ID" });
                                        }

                                        // 取得該文章
                                        const articleResult = await pool.query(
                                            \`
                                                SELECT id, title, content, created_at
                                                FROM articles 
                                                WHERE id = $1
                                            \`,
                                            [id]
                                        );

                                        // 如果找不到文章則回報錯誤
                                        if (articleResult.rows.length === 0) {
                                        return res.status(404).json({ message: "找不到此文章" });
                                        }

                                        // 取得該文章的圖片清單
                                        const articleImgIdListData = await pool.query(
                                        \`SELECT cloud_id
                                        FROM images
                                        WHERE article_id = $1\`,
                                        [id]
                                        );

                                        // 回傳文章
                                        res.json({
                                        message: "文章取得成功",
                                        article: articleResult.rows[0],
                                        imgIdListData: articleImgIdListData.rows,
                                        });

                                    } catch (err) {
                                        console.error("取得單篇文章失敗:", err);
                                        res.status(500).json({ error: "伺服器錯誤" });
                                    }
                                    };
                                    //#endregion

                                    //#region 上傳文章
                                    exports.articleDataUpLoad = async (req, res) => {
                                    try {
                                        //從body中取出資料並解構
                                        const { title, content, contentImgIdListData, removedImgIdListData } = req.body;
                                        //如果沒有標題或內容則回報錯誤
                                        if (!title || !content) {
                                        return res.status(400).json({ message: "標題與內容為必填" });
                                        }

                                        // 先將多餘Cloudinary圖片進行刪除
                                        if (Array.isArray(removedImgIdListData)) {
                                            for (const img of removedImgIdListData) {
                                                try {
                                                    await cloudinary.uploader.destroy(img);
                                                } catch (cloudError) {
                                                    console.error("Cloudinary 刪除失敗:", img, cloudError);
                                                }
                                            }
                                        }
                                        

                                        //將文章寫入資料表
                                        const result = await pool.query(
                                            \`INSERT INTO articles (title, content)
                                                VALUES ($1, $2)
                                                RETURNING id, title, content, created_at\`,
                                            [title, content]
                                        );

                                        //取得文章id
                                        const articleId = result.rows[0].id;

                                        //如果contentImgIdListData是陣列且資料數量大於0則執行
                                        if (Array.isArray(contentImgIdListData) && contentImgIdListData.length > 0) {
                                            //把 imagePublicIds 這個陣列裡的東西每次拿一個並賦予名稱publicId在執行{}的內容
                                            for (const publicId of contentImgIdListData) {
                                                //在資料表images中新增資料
                                                await pool.query(
                                                    \`
                                                    INSERT INTO images (article_id, cloud_id)
                                                    VALUES ($1, $2)
                                                    \`,
                                                    [articleId, publicId.public_id]
                                                );
                                            }
                                        }

                                        //回傳成功訊息
                                        res.json({
                                            message: '文章新增成功！',
                                            article: result.rows[0],
                                        });

                                    } catch (err) {
                                        console.error('新增文章失敗:', err);
                                        res.status(500).json({ error: '伺服器錯誤' });
                                    }
                                    };
                                    //#endregion

                                    //#region 更新文章
                                    exports.updateArticle = async (req, res) => {
                                    try {
                                        // 取得文章id
                                        const { id } = req.params;
                                        // 解構來源資料
                                        const { title, content, contentImgIdListData } = req.body;

                                        // 檢查必要欄位
                                        if (!title || !content) {
                                        return res.status(400).json({ message: "標題與內容為必填" });
                                        }

                                        // 先確認文章是否存在
                                        const check = await pool.query(
                                        \`SELECT * FROM articles WHERE id = $1\`,
                                        [id]
                                        );

                                        //如果文章不存在則回報錯誤
                                        if (check.rows.length === 0) {
                                        return res.status(404).json({ message: "文章不存在" });
                                        }

                                        //查詢舊圖片列表
                                        const oldImagesResult = await pool.query(
                                        \`SELECT cloud_id FROM images WHERE article_id = $1\`,
                                        [id]
                                        );

                                        //舊圖片id列表
                                        const oldImageIds = oldImagesResult.rows.map((img) => 
                                            {
                                                return(
                                                    img.cloud_id
                                                )
                                            }
                                        );

                                        //宣告新圖片列表
                                        //contentImgIdListData 新圖片列表(前端附帶)
                                        //contentImgIdListData是否是陣列?
                                        //如果是則回報純文字陣列
                                        //如果不是則回報空陣列
                                        const newImageIds = Array.isArray(contentImgIdListData) ? contentImgIdListData.map(img => img.public_id) : [];

                                        //對舊圖片列表進行過濾
                                        //讓舊圖片列表中與新圖片列表的內容進行對比，舊圖片列表中只要有新圖片列表的內容就會被移除
                                        //好比說:oldImageIds = ["aaa", "bbb", "ccc"];
                                        //而newImageIds = ["aaa", "ccc", "ddd"];
                                        //最後結果removedImages = ["bbb"];
                                        //取得需要移除的圖片id列表
                                        const removedImages = oldImageIds.filter((oldId) => !newImageIds.includes(oldId));

                                        //依照需要移除的圖片id列表依序刪除圖片
                                        //for (const itemData of inputData)
                                        //陣列用for迴圈 
                                        for (const publicId of removedImages) {
                                        try {
                                            await cloudinary.uploader.destroy(publicId);
                                        } catch (err) {
                                            console.error("Cloudinary 刪除失敗:", publicId, err);
                                        }
                                        }

                                        // 先刪除images資料表中該文章的所有圖片id
                                        await pool.query(
                                        \`DELETE FROM images WHERE article_id = $1\`,
                                        [id]
                                        );

                                        // 根據新圖片列表的圖片id依序新增至images資料表
                                        for (const publicId of newImageIds) {
                                        await pool.query(
                                            \`
                                            INSERT INTO images (article_id, cloud_id)
                                            VALUES ($1, $2)
                                            \`,
                                            [id, publicId]
                                        );
                                        }

                                        // 更新文章資料
                                        const result = await pool.query(
                                        \`UPDATE articles
                                        SET title = $1, content = $2
                                        WHERE id = $3
                                        RETURNING *\`,
                                        [title, content, id]
                                        );

                                        // 回傳成功
                                        res.json({
                                        message: "文章更新成功",
                                        article: result.rows[0]
                                        });

                                    } catch (err) {
                                        console.error("更新文章失敗:", err);
                                        res.status(500).json({ error: "伺服器錯誤" });
                                    }
                                    };
                                    //#endregion

                                    //#region 刪除文章
                                    exports.deleteArticle = async (req, res) => {
                                    try {
                                        const { id } = req.params; // 從網址取得文章 ID

                                        // 先確認文章是否存在
                                        const check = await pool.query(
                                        \`SELECT * FROM articles WHERE id = $1\`,
                                        [id]
                                        );

                                        if (check.rows.length === 0) {
                                        return res.status(404).json({ message: "文章不存在" });
                                        }

                                        // 查詢該文章使用的圖片
                                        const imageResult = await pool.query(
                                        \`SELECT cloud_id FROM images WHERE article_id = $1\`,
                                        [id]
                                        );

                                        // 刪除 Cloudinary 圖片
                                        for (const img of imageResult.rows) {
                                        try {
                                            await cloudinary.uploader.destroy(img.cloud_id);
                                        } catch (cloudError) {
                                            console.error("Cloudinary 刪除失敗:", img.cloud_id, cloudError);
                                        }
                                        }

                                        // 執行刪除
                                        await pool.query(
                                            \`DELETE FROM articles WHERE id = $1\`, 
                                            [id]
                                        );

                                        res.json({
                                        message: "文章與圖片已成功刪除",
                                        deletedId: id
                                        });

                                    } catch (err) {
                                        console.error("刪除文章失敗:", err);
                                        res.status(500).json({ error: "伺服器錯誤" });
                                    }
                                    };
                                    //#endregion
                                `)   
                            }       
                        </code>
                    </pre>
                    <p>建立路由設定</p>
                    <p>routes/articles/articlesRoutes.js</p>
                    <pre className="language-html m-0 p-16">
                        <code className="language-html">
                            {   
                                dedent
                                (`
                                    const express = require('express');
                                    const router = express.Router();

                                    //從articlesController讀取articleDataUpLoad函式
                                    const { articleDataUpLoad, 
                                            getAllArticles, 
                                            getSingleArticle, 
                                            updateArticle, 
                                            deleteArticle } = require('../../controllers/articles/articlesController');

                                    //#region 
                                    //#endregion

                                    //#region 取得所有文章
                                    router.get('/getAllArticles', getAllArticles);
                                    //#endregion

                                    //#region 取得單一文章
                                    router.get('/getSingleArticle/:id', getSingleArticle);
                                    //#endregion

                                    //#region 上傳文章
                                    router.post('/articleDataUpLoad', articleDataUpLoad);
                                    //#endregion

                                    //#region 更新文章
                                    router.put('/updateArticle/:id', updateArticle);
                                    //#endregion

                                    //#region 刪除文章
                                    router.delete('/deleteArticle/:id', deleteArticle);
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
                                    const express = require('express');// 載入 express 套件，建立後端伺服器框架
                                    const app = express();// 使用 express() 建立一個應用程式實例
                                    const pool = require('./db/db');// 載入我們自己寫的資料庫連線模組（也就是 db.js）
                                    const cors = require('cors');//匯入中介層套件工具
                                    require('dotenv').config();// 載入 dotenv 以支援 .env 環境變數
                                    app.use(express.json());// 解析 JSON 格式的 request body

                                    const articlesRoutes = require('./routes/articles/articlesRoutes');
                                    //引入文章router檔案


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

                                    //#region 文章系統相關路由
                                    app.use('/articles', articlesRoutes);
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






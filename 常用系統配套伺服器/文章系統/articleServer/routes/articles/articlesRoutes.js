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

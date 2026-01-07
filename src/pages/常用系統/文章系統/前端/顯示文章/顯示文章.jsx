
import { Editor } from '@tinymce/tinymce-react';
import './_顯示文章.scss';
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 顯示文章() {

    //#region
    //#endregion

    //#region 取文章前 10 個純文字字元
    function getSnippet(html, maxLength = 10) {
        // 移除 HTML 標籤
        //<p> </p> <img src="xxx"> 等等 都會被移除
        const text = html.replace(/<[^>]+>/g, ""); 
        //如果字數大於maxLength 則顯示 內容...
        //如果小於maxLength則直接輸出
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }
    //#endregion

    //#region 取文章第一張圖片
    function getFirstImage(html) {
        const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
        return match ? match[1] : null;
    }
    //#endregion

    //#region 上傳圖片
    const handleUpload = async (file) => {
        //判斷是否有來源檔案
        //如果沒有則回報錯誤
        if (!file) {
            alert('請選擇圖片');
            return;
        }
        //宣告圖片檔案
        const formData = new FormData();
        formData.append('image', file);

        try {

            const handleUploadRes = await axios.post(`http://localhost:5100/images/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("圖片上傳成功",handleUploadRes.data);

            return handleUploadRes.data;
        } catch (error) {
            console.error(error);
            alert('上傳失敗');
        } 
    };
    //#endregion

    //#region 所有文章狀態宣告
    const[allArticlesData,setAllArticlesData]=useState([]);
    useEffect(()=>{
        console.log("所有文章內容",allArticlesData);
    },[allArticlesData]);
    //#endregion

    //#region 取得所有文章函式
    const handleGetAllArticles = async () => {
        try {
            const res = await axios.get("http://localhost:5100/articles/getAllArticles");
            console.log("取得文章資料成功：", res.data);
            setAllArticlesData(res.data.articles);
        } catch (error) {
            console.error("取得文章資料成功失敗：", error);
        }
    };
    //#endregion

    useEffect(()=>{
        handleGetAllArticles();
    },[])

    //#region 單一文章狀態宣告
    const [singleArticle, setSingleArticle] = useState(null);
    useEffect(()=>{
        console.log("單一文章內容",singleArticle);
    },[singleArticle]);
    //#endregion

    //#region 取得單一文章函式
    const getSingleArticle = async (id) => {
        try {
            const getSingleArticleRef = await axios.get(`http://localhost:5100/articles/getSingleArticle/${id}`);
            console.log("單一文章資料：", getSingleArticleRef.data);
            setSingleArticle(getSingleArticleRef.data.article);
        } catch (error) {
            console.error("取得單篇文章失敗", error);
        }
    };
    //#endregion

    //#region 刪除文章函式
    const deleteArticle = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5100/articles/deleteArticle/${id}`);
            console.log("刪除文章成功", res.data);
            setSingleArticle(null);
            handleGetAllArticles();
        } catch (error) {
            console.error("刪除文章失敗", error);
        }
    };
    //#endregion

    //#region 更新文章狀態
    const [editArticle, setEditArticle] = useState(null);
    useEffect(()=>{
        console.log("編輯中文章內容",editArticle);
    },[editArticle])
    //#endregion

    //#region 將文章content中取出圖片id列表
    const getContentImgIdListData = (html) => {
        //假設文章內容為以下
        // <p>圖片一</p>
        // <p>
        //     <img src="https://res.cloudinary.com/dve7s3koq/image/upload/v1766378126/articles/k0azs4jdzifu7hxohifv.jpg">
        // </p>
        // <p>圖片二</p>
        //經過過濾以後會得到以下內容
        // matches = [
        //     "/upload/v1766378126/articles/k0azs4jdzifu7hxohifv.jpg",
        // ];
        const imgUrlListData = html.match(/\/upload\/v\d+\/[^".]+\.\w+/g) || [];
        console.log("看看內容",imgUrlListData);
        //最後會得到
        // [
        //     "articles/k0azs4jdzifu7hxohifv",
        // ]
        return imgUrlListData.map((item) => { 
            return {
                public_id: item.replace(/\/upload\/v\d+\//, '').replace(/\.\w+$/, '')
            };
        });
    };
    //#endregion

    //#region 更新文章函式
    const editArticleUpLoad = async (id) => {
        try {

            //取出目前文章的圖片id列表
            const contentImgIdListData = getContentImgIdListData(editArticle.content);

            // 更新文章
            const editArticleUpLoadRef = await axios.put(
            `http://localhost:5100/articles/updateArticle/${id}`,
                {
                    title: editArticle.title,
                    content: editArticle.content,
                    contentImgIdListData,
                }
            );

            console.log("文章更新成功：", editArticleUpLoadRef.data);

            // 清理狀態
            setSingleArticle(null);
            setEditArticle(null);
            handleGetAllArticles();
        } catch (error) {
            console.error("文章更新失敗", error);
        }
    };
    //#endregion

    return (
        <>
            <article className='顯示文章'>
                <h3>顯示文章</h3>
                {/* 文章列表 */}
                <div className='articleListBox'>
                    <div>
                        <h4>文章列表</h4>
                        <button type="button" onClick={()=>{handleGetAllArticles();}}>取得所有文章</button>
                    </div>
                    <div className='titleBox'>
                        <div className='titleSet'>標題</div>
                        <div className='titleSet'>簡介</div>
                    </div>
                    <div className='contentBox'>
                    {
                        allArticlesData?.map((item,index)=>{
                            return(
                                <div key={index} 
                                    className='itemSet'
                                    onClick={() => getSingleArticle(item.id)} 
                                >
                                    <div className='itemTitle'>{item.title}</div>
                                    <div className='itemContent'>{getSnippet(item.content)}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                {/* 文章列表 */}

                {/* 文章區塊 */}
                <div className="articleContent">
                    <h4>文章區塊</h4>
                    <div>文章標題:{singleArticle?.title}</div>
                    <div>
                        <button type='button'
                                onClick={()=>{setEditArticle(singleArticle)}}>
                            編輯文章
                        </button>
                        <button type="button" 
                                onClick={()=>{deleteArticle(singleArticle?.id);}}>
                            刪除文章
                        </button>
                    </div>
                    <hr />
                    {/* 此為固定用法 */}
                    {/* <div dangerouslySetInnerHTML={{ __html: html字串 }} /> */}
                    {singleArticle ? (
                        <div className='articleBox'
                            dangerouslySetInnerHTML={{ __html: singleArticle.content }}
                        />
                    ) : (
                        <p>請選擇一篇文章</p>
                    )}
                </div>
                {/* 文章區塊 */}

                {/* 修改文章區塊 */}
                <div className='editArticleBox'>
                    <h4>編輯文章區塊</h4>
                    <button type='button'
                            onClick={()=>{editArticleUpLoad(editArticle?.id)}}>
                        修改文章
                    </button>
                    
                    {/* 標題輸入框 */}
                    <input
                        type="text"
                        value={editArticle?.title || ""}
                        onChange={(event) => {
                            setEditArticle({
                                ...editArticle,
                                title:event.target.value
                            })
                        }}
                    />
                    {/* 標題輸入框 */}

                    {/* TinyMCE 編輯器 */}
                    <Editor
                        className="tinymceSet"
                        apiKey="oolcf7lp0e9ytgb09urqt5u3833g65oqfntw2j1rfvsldoau"
                        value={editArticle?.content || ""}
                        onEditorChange={(newValue) => {
                            setEditArticle({
                                ...editArticle,
                                content:newValue,
                            })
                        }}
                        //編輯器初始化設定
                        init={{
                            // 使用官方穩定版本
                            cloudChannel: '6',
                            //編輯器最低高度
                            min_height: 300, 
                            //傳統選單列是否開啟 true/false
                            menubar: false,
                            //底部狀態列
                            statusbar: false,
                            content_style: `
                                body {
                                    //padding: 12px;
                                    font-family: "微軟正黑體";
                                }

                                p {
                                    //color:#ffffff;
                                    font-size: 16px;
                                }

                                img {
                                    max-width: 100%;
                                    border-radius: 8px;
                                }
                            `,
                            plugins: [
                                //有寫在這裡的 plugin，才可以在 toolbar 用對應的功能按鈕
                                "advlist",
                                "autolink",
                                "autoresize",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic underline | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent |" +
                                "image | removeformat | help",
                            
                            //自訂圖片處理
                            images_upload_handler: async (blobInfo, progress) => {
                                //blobInfo跟progress是TinyMCE的內建函數

                                //blobInfo 圖片資訊物件
                                //內容可以是以下
                                //blobInfo.blob() → 將圖片轉換為 Blob 物件
                                //blobInfo.filename() → 檔名 (例如 photo.jpg)
                                //blobInfo.base64() → Base64 字串

                                //progress 則是代表上傳進度

                                // 將原始圖片轉換為blob物件
                                const file = blobInfo.blob();

                                // 產生本地預覽用的 URL
                                // 臨時URL在更新文章等動作時都會刷新，會一直改變無法拿來做比對目標
                                //const localUrl = URL.createObjectURL(blob);

                                const { url: secure_url } = await handleUpload(file);

                                //判定是否有檔名
                                // if (blob && blob.name) {}

                                return Promise.resolve(
                                    secure_url
                                );

                                // TinyMCE 要求回傳 Promise<string>
                                // 這個字串就是 <img src="這個字串"> 的內容
                                //之所以使用Promise.resolve是TinyMCE考慮到有些人的設計
                                //這時候就要上傳雲端所以必須用非同步物件
                                //其作用跟單純的return localUrl;是相同的
                            },
                        }}
                    />
                    {/* TinyMCE 編輯器 */}
                </div>
                {/* 修改文章區塊 */}
                
            </article>
        </>
    );
  }
          
        
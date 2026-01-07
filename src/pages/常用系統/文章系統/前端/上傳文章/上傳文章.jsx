
import { Editor } from '@tinymce/tinymce-react';
import './_上傳文章.scss';
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 上傳文章() {

    //#region
    //#endregion

    //#region 文章上傳api流程圖
    // [開始]
    // ↓
    // [前端編輯文章]
    // ↓
    // [插入圖片 → 立即上傳 Cloudinary]
    // ↓
    // [tempImages 紀錄所有已上傳圖片 public_id]
    // ↓
    // [使用者刪除圖片（只影響 content，不影響 tempImages）]
    // ↓
    // [按下「送出文章」]
    // ↓
    // [前端解析 content]
    // ↓
    // [取得 contentImgIdListData（實際使用圖片）]
    // ↓
    // [與 tempImages 比對]
    // ↓
    // [計算 removedImgIdListData（多餘圖片）]
    // ↓
    // [POST /articles/articleDataUpLoad]
    // ├─ title
    // ├─ content
    // ├─ contentImgIdListData
    // └─ removedImgIdListData
    // ↓
    // [伺服器端接收請求]
    // ↓
    // [刪除 removedImgIdListData 中的 Cloudinary 圖片]
    // ↓
    // [INSERT articles（新增文章）]
    // ↓
    // [取得 article_id]
    // ↓
    // [INSERT images（只寫 contentImgIdListData）]
    // ↓
    // [回傳成功結果]
    // ↓
    // [結束]
    //#endregion



    //#region 標題狀態宣告
    const [title, setTitle] = useState("");
    //#endregion

    //#region 內容狀態宣告
    const [content, setContent] = useState("");
    useEffect(()=>{
        console.log("文章內容",content);
    },[content]);
    //#endregion

    //#region 目前這篇文章會用的圖片
    const [tempImages, setTempImages] = useState([]);
    useEffect(()=>{
        console.log("文章用圖片",tempImages);
    },[tempImages]);
    //#endregion 

    //#region 圖片基本處理相關狀態

        //#region 圖片狀態宣告
        const [file, setFile] = useState(null);
        useEffect(()=>{
            console.log("檔案",file);
        },[file]);
        //#endregion
        
        //#region 檔案狀態宣告
        const [imageData, setImageData] = useState(null);
        //#endregion

        //#region 選擇檔案函式
        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };
        //#endregion

    //#endregion

    //#region 圖片基本處理
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
                //記錄圖片
                setTempImages((prev) => [
                    ...prev,
                    {
                        url: handleUploadRes.data.url, 
                        public_id:handleUploadRes.data.public_id,
                    }
                ]);

                return handleUploadRes.data;
            } catch (error) {
                console.error(error);
                alert('上傳失敗');
            } 
        };
        //#endregion

        //#region 修改圖片
        const handleUploadChange = async () => {

            if (!file || !imageData?.public_id) {
                alert('請先選擇新圖片，且必須已有舊圖片');
                return;
            }

            const formData = new FormData();
            formData.append('image', file);
            formData.append('public_id', imageData?.public_id);

            try {

                const res = await axios.put(`http://localhost:5100/images/uploadChange`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log('圖片覆蓋成功', res.data);
                setImageData(res.data);
                setFile(null);

            } catch (error) {
                console.error(error);
                alert('上傳失敗');
            } 
        };
        //#endregion

        //#region 刪除圖片
        const handleDelete = async () => {
            if (!imageData?.public_id) {
                return;
            }

            try {
                const res = await axios.delete(`http://localhost:5100/images/deleteImage`,
                    {
                        params: {
                            public_id: imageData.public_id,
                        },
                    }
                );

                console.log("圖片刪除成功",res.data);
                setImageData(null);

            } catch (error) {
                console.error('刪除失敗',error);
            }
        };
        //#endregion
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

    //#region 取得差值函式
    const handleDeleteImgIdListData = () => {

        //取出目前文章真正使用的圖片id列表
        const contentImgIdListData = getContentImgIdListData(content).map((item)=>{return(item.public_id)});

        //取出所有圖片id列表
        const allImgIdListData = tempImages.map((item) => {return(item.public_id)});

        //取出差值列表
        const removedImgIdListData = allImgIdListData.filter((id) => {return(!contentImgIdListData.includes(id))});
        console.log("差值列表內容",removedImgIdListData);

        return removedImgIdListData;
    };
    //#endregion 

    //#region 文章上傳函式
    const handleSubmit = async () => {

        if (!title.trim() || !content.trim()) {
            alert("請輸入標題與內容");
            return;
        }

        try {
            //取出目前文章的圖片id列表
            const contentImgIdListData = getContentImgIdListData(content);

            //取得差值列表
            const removedImgIdListData = handleDeleteImgIdListData();

            // 送出文章（正式）
            const handleSubmitRes = await axios.post("http://localhost:5100/articles/articleDataUpLoad", {
                title,
                content,
                contentImgIdListData,
                removedImgIdListData,
            });

            console.log("送出成功：", handleSubmitRes.data);
            setTitle("");
            setContent("");
            console.log("文章已成功新增！");
        } catch (error) {
            console.log("文章上傳失敗",error);
        }
    };
    //#endregion

    

    return (
        <>
            <article className='上傳文章'>
                <h3>上傳文章</h3>
                <div className='boxSet'>

                    {/* 標題輸入框 */}
                    <input
                        type="text"
                        placeholder="請輸入文章標題"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* 標題輸入框 */}

                    {/* TinyMCE 編輯器 */}
                    <Editor
                        className="tinymceSet"
                        apiKey="oolcf7lp0e9ytgb09urqt5u3833g65oqfntw2j1rfvsldoau"
                        value={content}
                        onEditorChange={(newValue) => setContent(newValue)}
                        //編輯器初始化設定
                        init={{
                            // 使用官方穩定版本
                            cloudChannel: '6',
                            //編輯器高度
                            //height: 300,
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
                            min_height: 300, 
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

                                const { url: secure_url, public_id } = await handleUpload(file);

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
                                //return Promise.resolve(localUrl);
                            },
                        }}
                    />
                    {/* TinyMCE 編輯器 */}

                    {/* 送出按鈕 */}
                    <button
                        onClick={()=>{handleSubmit()}}
                    >
                        上傳文章
                    </button>
                    {/* 送出按鈕 */}
                </div>
                <h3>目前內容：</h3>
                <pre>{content}</pre>
            </article> 
        </>
    );
  }
          
        
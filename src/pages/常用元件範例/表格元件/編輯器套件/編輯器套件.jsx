
import { Editor } from '@tinymce/tinymce-react';
import './_編輯器套件.scss';
import { useEffect, useState } from 'react';
import axios from "axios";


export default function 編輯器套件() {

    //#region
    //#endregion

    const [content, setContent] = useState("");

    return (
        <>
            <article className='編輯器套件'>
                <h3>編輯器套件</h3>
                <p>react19可以用的套件</p>
                <p>npm install @tinymce/tinymce-react</p>
                <div className='boxSet'>
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
                            height: 300,
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
                                    line-height: 1.8;
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
                            images_upload_handler: (blobInfo, progress) => {
                                //blobInfo跟progress是TinyMCE的內建函數

                                //blobInfo 圖片資訊物件
                                //內容可以是以下
                                //blobInfo.blob() → 將圖片轉換為 Blob 物件
                                //blobInfo.filename() → 檔名 (例如 photo.jpg)
                                //blobInfo.base64() → Base64 字串

                                //progress 則是代表上傳進度

                                // 將原始圖片轉換為blob物件
                                const blob = blobInfo.blob();

                                // 產生本地預覽用的 URL
                                const localUrl = URL.createObjectURL(blob);

                                // TinyMCE 要求回傳 Promise<string>
                                // 這個字串就是 <img src="這個字串"> 的內容
                                //之所以使用Promise.resolve是TinyMCE考慮到有些人的設計
                                //這時候就要上傳雲端所以必須用非同步物件
                                //其作用跟單純的return localUrl;是相同的
                                return Promise.resolve(localUrl);
                            },
                        }}
                    />
                </div>
                <h3>目前內容：</h3>
                <pre>{content}</pre>
            </article>
            
        </>
    );
  }
          
        
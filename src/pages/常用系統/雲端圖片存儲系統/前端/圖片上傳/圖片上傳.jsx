
import { useEffect, useState } from 'react';//宣告狀態
import './_圖片上傳.scss';//引入指定樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import axios from 'axios';


export default function 圖片上傳() {

    //#region 圖片上傳函式

        //#region 上傳圖片檔案狀態宣告
        const [file, setFile] = useState(null);
        useEffect(()=>{
            console.log("檔案",file);
        },[file]);
        //#endregion

        //#region 選擇檔案函式
        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };
        //#endregion

        //#region 檔案狀態宣告
        const [imageData, setImageData] = useState(null);
        //#endregion

        //#region 上傳圖片
        const handleUpload = async () => {
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

                const handleUploadRes = await axios.post(`http://localhost:5200/images/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log("圖片上傳成功",handleUploadRes.data);
                setImageData(handleUploadRes.data.url);
                return handleUploadRes.data;
            } catch (error) {
                console.error(error);
                alert('上傳失敗');
            } 
        };
        //#endregion
    //#endregion

    return (
        <>
            <div className='圖片上傳'>
                <div className='圖片上傳box'>
                    <h3>圖片上傳</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    <button onClick={() =>  { handleUpload() }}>
                        上傳圖片
                    </button>
                    <h3>上傳的圖片</h3>
                    <img className='imgSet' src={imageData} alt="" />
                    <h4>api設定說明</h4>
                    <h5>return前設定</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const [file, setFile] = useState(null);
                                    useEffect(()=>{
                                        console.log("檔案",file);
                                    },[file]);
                                `)}
                        </code>
                    </pre>
                    <p>首先使用useState宣告一個狀態，這個狀態是用來儲存input所存入的檔案</p>
                    <p>useEffect則是實時更新並確認該檔案的內容</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const handleFileChange = (e) => {
                                        setFile(e.target.files[0]);
                                    };
                                `)}
                        </code>
                    </pre>
                    <p>此函式會將目標所存入的檔案儲存進state狀態內部</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const handleUpload = async () => {
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

                                            const handleUploadRes = await axios.post(\`http://localhost:5100/images/upload\`,
                                                formData,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                }
                                            );
                                            console.log("圖片上傳成功",handleUploadRes.data);
                                            setImageData(handleUploadRes.data.url);
                                            return handleUploadRes.data;
                                        } catch (error) {
                                            console.error(error);
                                            alert('上傳失敗');
                                        } 
                                    };
                                `)}
                        </code>
                    </pre>
                    <p>圖片上傳函式</p>
                    <p>formData.append('image', file)</p>
                    <p>宣告時image要跟伺服器端的.single('image')中的image名稱相同</p>
                    <h5>實際html內容</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {dedent(`
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                <button onClick={() =>  { handleUpload() }}>
                                    上傳圖片
                                </button>`)}
                        </code>
                    </pre>
                    <p>input負責讀取資料並存入狀態內部</p>
                    <p>上傳圖片實際執行者為按鈕</p>
                </div>
            </div>
        </>
    );
}

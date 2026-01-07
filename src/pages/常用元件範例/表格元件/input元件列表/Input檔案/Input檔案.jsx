

import { useState } from 'react';
import './_input檔案.scss';


export default function Input檔案 () {

    //#region
    //#endregion

    //#region 狀態宣告
    // 儲存 File 物件
    const [file, setFile] = useState(null);
    // 儲存圖片預覽 URL
    const [preview, setPreview] = useState(null);
    //#endregion

    //#region 讀取圖片
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // 產生可用於 <img> 顯示的預覽網址
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
    };
    //#endregion

    //#region 上傳處理
    const handleImgDataIn = () => {
        //如果沒有檔案則會報錯誤
        if (!file) {
            alert("請先選擇圖片");
            return;
        }

        //宣告檔案物件
        const formData = new FormData();
        formData.append("file", file);
    };

    return (
        <>
        <div className='input檔案'>
            <h3>Input檔案</h3>
            <input 
                type="file"
                onChange={(event)=>{handleFileChange(event)}}
            />
            <button onClick={()=>{handleImgDataIn()}}>
                上傳圖片
            </button>
            <img className='imgSet' src={preview} alt="" />
        </div>
        </>
    );
};


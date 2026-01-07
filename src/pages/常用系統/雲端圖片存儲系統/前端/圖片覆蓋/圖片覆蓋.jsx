
import { useEffect, useState } from 'react';//宣告狀態
import './_圖片覆蓋.scss';//引入指定樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import axios from 'axios';


export default function 圖片覆蓋() {

    //#region 取得所有圖片相關函式
        
        //#region 所有圖片檔案狀態宣告
        const [allImageData, setAllImageData] = useState(null);
        //#endregion

        //#region 取得所有圖片函式
        const handleGetAllImg = async () => {

            const folderName = "testFolder";

            if (!folderName) {
                console.log("需要宣告目標資料夾")
                return;
            }

            try {
                const handleGetAllImgRes = await axios.get(`http://localhost:5200/images/getImages`,
                    {
                        params: {
                            folder: folderName,
                        },
                    }
                );
                console.log('圖片取得成功', handleGetAllImgRes.data);
                setAllImageData(handleGetAllImgRes.data);
            } catch (error) {
                console.error('圖片取得失敗',error);
            } 
        };
        //#endregion

    //#endregion


    //#region 圖片覆蓋函式
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
        //#region 上傳圖片檔案狀態宣告
        const [changeImageData, setChangeImageData] = useState(null);
        useEffect(()=>{
            console.log("圖檔原資料",changeImageData);
        },[changeImageData]);
        //#endregion

        //#region 修改圖片
        const handleImgChange = async () => {

            if (!file || !changeImageData?.public_id) {
                alert('請先選擇新圖片，且必須已有舊圖片');
                return;
            }

            const formData = new FormData();
            formData.append('image', file);
            formData.append('public_id', changeImageData?.public_id);

            try {

                const handleImgChangeRes = await axios.put(`http://localhost:5200/images/uploadChange`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log('圖片覆蓋成功', handleImgChangeRes.data);
                await handleGetAllImg();
                setFile(null);
            } catch (error) {
                console.error('圖片覆蓋失敗',error);
            } 
        };
        //#endregion
    //#endregion

    return (
        <>
            <div className='圖片覆蓋'>
                <div className='圖片覆蓋box'>
                    <h3>取得圖片</h3>
                    <button type='button' onClick={()=>{handleGetAllImg()}}>
                        取得所有圖片
                    </button>
                    <h3>所有圖片</h3>
                    <div className='allImgBox'>
                    {
                        allImageData?.map((item)=>{
                            return(
                                <div className='imgBox' onClick={()=>{setChangeImageData(item)}}>
                                    <img className='imgSet' src={item.url} alt="" />
                                </div>
                            )
                        })
                    }
                    </div>

                    <h3>圖片覆蓋</h3>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    <button onClick={() =>  { handleImgChange() }}>
                        圖片覆蓋
                    </button>
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
                                    const [changeImageData, setChangeImageData] = useState(null);
                                    useEffect(()=>{
                                        console.log("圖檔原資料",changeImageData);
                                    },[changeImageData]);
                                `)}
                        </code>
                    </pre>
                    <p>使用useState宣告一個狀態，這個狀態是用來儲存需要覆蓋的圖片所存入的檔案</p>
                    <p>useEffect則是實時更新並確認該檔案的內容</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const handleImgChange = async () => {

                                        if (!file || !changeImageData?.public_id) {
                                            alert('請先選擇新圖片，且必須已有舊圖片');
                                            return;
                                        }

                                        const formData = new FormData();
                                        formData.append('image', file);
                                        formData.append('public_id', changeImageData?.public_id);

                                        try {

                                            const handleImgChangeRes = await axios.put(\`http://localhost:5100/images/uploadChange\`,
                                                formData,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                }
                                            );
                                            console.log('圖片覆蓋成功', handleImgChangeRes.data);
                                            await handleGetAllImg();
                                            setFile(null);
                                        } catch (error) {
                                            console.error('圖片覆蓋失敗',error);
                                        } 
                                    };
                                `)}
                        </code>
                    </pre>
                    <p>圖片上傳函式</p>
                    <p>formData.append('image', file);</p>
                    <p>formData.append('public_id', changeImageData?.public_id);</p>
                    <p>append的順序不可混亂</p>
                    <h5>實際html內容</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                                    <button onClick={() =>  { handleImgChange() }}>
                                        圖片覆蓋
                                    </button>
                                `)}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    );
}

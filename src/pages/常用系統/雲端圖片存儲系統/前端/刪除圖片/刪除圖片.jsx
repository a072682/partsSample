
import { useEffect, useState } from 'react';//宣告狀態
import './_刪除圖片.scss';//引入指定樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import axios from 'axios';


export default function 圖片刪除() {

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

    //#endregion
    //#region 上傳圖片檔案狀態宣告
    const [changeImageData, setChangeImageData] = useState(null);
    useEffect(()=>{
        console.log("圖檔原資料",changeImageData);
    },[changeImageData]);
    //#endregion

    //#region 刪除圖片
    const handleDelete = async () => {
        if (!changeImageData?.public_id) {
            return;
        }

        try {
            const handleDeleteRes = await axios.delete(`http://localhost:5200/images/deleteImage`,
                {
                    params: {
                        public_id: changeImageData.public_id,
                    },
                }
            );

            console.log("圖片刪除成功",handleDeleteRes.data);
            await handleGetAllImg();

        } catch (error) {
            console.error('刪除失敗',error);
        }
    };
    //#endregion

    return (
        <>
            <div className='圖片刪除'>
                <div className='圖片刪除box'>
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

                    <h3>圖片刪除</h3>
                    <button onClick={() =>  { handleDelete() }}>
                        圖片刪除
                    </button>
                    <h4>api設定說明</h4>
                    <h5>return前設定</h5>
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
                    <p>使用useState宣告一個狀態，這個狀態是用來儲存需要刪除的圖片所存入的檔案</p>
                    <p>useEffect則是實時更新並確認該檔案的內容</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const handleDelete = async () => {
                                        if (!changeImageData?.public_id) {
                                            return;
                                        }

                                        try {
                                            const handleDeleteRes = await axios.delete(\`http://localhost:5100/images/deleteImage\`,
                                                {
                                                    params: {
                                                        public_id: changeImageData.public_id,
                                                    },
                                                }
                                            );

                                            console.log("圖片刪除成功",handleDeleteRes.data);
                                            await handleGetAllImg();

                                        } catch (error) {
                                            console.error('刪除失敗',error);
                                        }
                                    };
                                `)}
                        </code>
                    </pre>
                    <p>圖片刪除函式</p>
                    <h5>實際html內容</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    <button onClick={() =>  { handleDelete() }}>
                                        圖片刪除
                                    </button>
                                `)}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    );
}

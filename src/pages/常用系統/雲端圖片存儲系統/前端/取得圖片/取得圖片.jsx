
import { useEffect, useState } from 'react';//宣告狀態
import './_取得圖片.scss';//引入指定樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import axios from 'axios';


export default function 取得圖片() {

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

        useEffect(()=>{
            handleGetAllImg();
        },[])
        //#endregion

    //#endregion

    return (
        <>
            <div className='取得圖片'>
                <div className='取得圖片box'>
                    <h3>取得圖片</h3>
                    <button type='button' onClick={()=>{handleGetAllImg()}}>
                        取得所有圖片
                    </button>
                    <h3>所有圖片</h3>
                    <div className='allImgBox'>
                    {
                        allImageData?.map((item)=>{
                            return(
                                <div className='imgBox'>
                                    <img className='imgSet' src={item.url} alt="" />
                                </div>
                            )
                        })
                    }
                    </div>
                    <h4>api設定說明</h4>
                    <h5>return前設定</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const [allImageData, setAllImageData] = useState(null);
                                `)
                            }
                        </code>
                    </pre>
                    <p>首先使用useState宣告一個狀態，這個狀態是用來儲存取得所有圖片函式所存入的檔案</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    const handleGetAllImg = async () => {
                                        const folderName = "testFolder";
                                        if (!folderName) {
                                            console.log("需要宣告目標資料夾")
                                            return;
                                        }
                                        try {
                                            const handleGetAllImgRes = await axios.get(\`http://localhost:5100/images/getImages\`,
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
                                `)
                            }
                        </code>
                    </pre>
                    <p>取得所有圖片函式</p>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    useEffect(()=>{
                                        handleGetAllImg();
                                    },[])
                                `)
                            }
                        </code>
                    </pre>
                    <p>每次重新整理時就會觸發取得所有圖片函式</p>
                    <h5>實際html內容</h5>
                    <pre className="language-html">
                        <code className="language-html">
                            {
                                dedent(`
                                    <button type='button' onClick={()=>{handleGetAllImg()}}>
                                        取得所有圖片
                                    </button>
                                    <h3>所有圖片</h3>
                                    <div className='allImgBox'>
                                    {
                                        allImageData?.map((item)=>{
                                            return(
                                                <div className='imgBox'>
                                                    <img className='imgSet' src={item.url} alt="" />
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                `)}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    );
}








import './_Button.scss';

import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function 貼圖按鈕範例() {

    //#region
    //#endregion

    return (
        <>
            {/* 元件最外圍 */}
            <article className='貼圖按鈕範例'>
                <h3>貼圖按鈕範例</h3>
                <button className="btnSet"></button>
                <p>提示:此按鈕設定時手機板請不要用hover容易卡住，直接使用active即可</p>

                <Accordion defaultActiveKey="" className="defaultReactAccordionContent my-24">
                    {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
                    <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                        <Accordion.Header className="defaultReactAccordionHeader">
                            程式碼說明
                        </Accordion.Header>
                        <Accordion.Body className="defaultReactAccordionBody p-0">
                            
                            <pre className="language-html m-0 p-16">
                                <div>HTML</div>
                                <code className="language-html">
                                    {
                                        dedent(
                                            `
                                            import { Link } from 'react-router-dom';//宣告連結元件
                                            import './_MessageItem.scss';//讀取樣式

                                            //元件前置宣告
                                            //放置於return上方
                                            //此為顯示內容
                                            const articleData = [
                                                {
                                                    class:"system",
                                                    content:"「收容測試」測試說明與常見問題解答",
                                                    time:"2025-06-10",
                                                },
                                                {
                                                    class:"system",
                                                    content:"「收容測試」正式揭密",
                                                    time:"2025-06-10",
                                                },
                                                {
                                                    class:"activity",
                                                    content:"《異環》二創徵集活動開跑！",
                                                    time:"2025-05-28",
                                                },
                                                {
                                                    class:"activity",
                                                    content:"《異環》創作者招募計畫啟動！",
                                                    time:"2025-05-19",
                                                },
                                                {
                                                    class:"gamenews",
                                                    content:"《異環》宣布將於2024東京電玩展首次參展 TGS玩家特派員招募開跑！",
                                                    time:"2024-09-05",
                                                },
                                            ]

                                            // 元件本體
                                            // 放置於return下方
                                            {/* 元件最外圍 */}
                                            <div className="MessageItemBox">
                                            {
                                                articleData?.map((item,index)=>{
                                                    return(
                                                        //訊息項目本體
                                                        <Link key={index} className='messageItem' href="">
                                                            {/* 類別設定 */}
                                                            <div className={\`class \${item.class}\`}>
                                                                {
                                                                    item.class === "system"? "系統"
                                                                    : item.class === "activity"? "活動"
                                                                    : item.class === "gamenews"? "新聞"
                                                                    : ""
                                                                }
                                                            </div>
                                                            {/* 類別設定 */}

                                                            {/* 內容設定 */}
                                                            <div className='content'>{item.content}</div>
                                                            {/* 內容設定 */}

                                                            {/* 時間設定 */}
                                                            <div className='time'>{item.time}</div>
                                                            {/* 時間設定 */}
                                                        </Link>
                                                        //訊息項目本體
                                                    )
                                                })
                                            }
                                            </div>
                                            {/* 元件最外圍 */}
                                            `
                                        )
                                    }       
                                </code>
                            </pre>
                            <pre className="language-html m-0 p-16">
                                <div>SCSS</div>
                                <code className="language-html">
                                    {
                                    dedent(
                                        `
                                        // 元件最外圍
                                        .MessageItemBox{
                                            border: 2px solid #000000;
                                            padding: 30px;
                                            border-radius: 8px;
                                            background-color: #2e2e2e;
                                            background: linear-gradient(
                                                    to bottom, 
                                                    rgba(0, 0, 0, 0.5) 0%,    /* 上：完全透明 */
                                                    rgb(0, 0, 0) 100%  /* 下：純紅色 */
                                                );
                                            // 訊息項目本體
                                            .messageItem{
                                                width: 100%;
                                                height: auto;
                                                padding: 12px 0px;
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: center;
                                                gap: 12px;
                                                border-bottom: 2px solid rgb(214, 214, 214);

                                                // 類別設定
                                                .class{
                                                    transform: skew(-15deg);
                                                    font-size: clamp(16px, 1.5vw, 20px);
                                                    padding: 0px 2%;
                                                    border-radius: 4px;
                                                    white-space: nowrap;//取消文字自動換行

                                                    &.system{
                                                        color: rgb(49, 49, 49);
                                                        background-color: rgb(177, 177, 177);
                                                    }

                                                    &.activity{
                                                        color: rgb(255, 255, 255);
                                                        background-color: rgb(254, 90, 149);
                                                    }

                                                    &.gamenews{
                                                        color: rgb(49, 49, 49);
                                                        background-color: rgb(109, 220, 237);
                                                    }
                                                }
                                                // 類別設定

                                                // 內容設定
                                                .content{
                                                    max-width: 60%;
                                                    margin-right: auto;
                                                    color: rgb(223, 223, 223);
                                                    font-size: clamp(16px, 1.5vw, 20px);
                                                    white-space: nowrap;//取消文字自動換行
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;//將多餘文字改為...
                                                }
                                                // 內容設定

                                                // 時間捨定
                                                .time{
                                                    color: rgb(223, 223, 223);
                                                    font-size: clamp(16px, 1.5vw, 20px);
                                                    white-space: nowrap;//取消文字自動換行
                                                }
                                                // 時間捨定
                                            }
                                            // 訊息項目本體
                                        }
                                        // 元件最外圍
                                        `
                                    )
                                    }       
                                </code>
                            </pre>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </article>
            
            {/* 元件最外圍 */}

            
        </>
    );
  }
          
        
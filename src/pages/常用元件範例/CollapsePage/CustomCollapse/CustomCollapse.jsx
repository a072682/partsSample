import { useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import './_CustomCollapse.scss';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式





export default function CustomCollapse() {

    // 狀態：控制客製化的 Collapse
    const [openCustom, setOpenCustom] = useState(false);

    return (
        <>
            <section className="CustomCollapse">
                {/* 元件最外圍 */}
                <div className="CollapseGroup">
                    {/* 元件標頭 */}
                    <button
                        className="btn btn-warning custom-collapse-button"
                        onClick={() => setOpenCustom(!openCustom)}
                        aria-controls="custom-collapse-text"
                        aria-expanded={openCustom}
                        >
                        客製化展開/收合
                    </button>
                    {/* 元件標頭 */}

                    {/* 元件下拉本體 */}
                    <Collapse className="Collapse" in={openCustom}>
                        {/* 內容外框 */}
                        <div    className="custom-collapse-content-box" 
                                style={{ overflow: 'hidden', transition: 'height 0.4s ease' }}>
                            {/* 內容本體 */}
                            <div id="custom-collapse-text" className="custom-collapse-content">
                                這是客製化樣式的 React-Bootstrap Collapse 區塊。
                            </div>
                            {/* 內容本體 */}
                        </div>
                        {/* 內容外框 */}
                    </Collapse>
                    {/* 元件下拉本體 */}
                </div>
                {/* 元件最外圍 */}
            </section>
            

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
                                        import { useState } from "react";//宣告狀態
                                        import { Collapse } from "react-bootstrap";//宣告元件
                                        import './_CustomCollapse.scss';//讀取樣式
                                        
                                        // 設定檔放置於return上方
                                        // 狀態：控制客製化的 Collapse
                                        const [openCustom, setOpenCustom] = useState(false);

                                        // 元件本體
                                        // 放置於return下方
                                        {/* 元件最外圍 */}
                                        <div className="CollapseGroup">
                                            {/* 元件標頭 */}
                                            <button
                                                className="btn btn-warning custom-collapse-button"
                                                onClick={() => setOpenCustom(!openCustom)}
                                                aria-controls="custom-collapse-text"
                                                aria-expanded={openCustom}
                                                >
                                                客製化展開/收合
                                            </button>
                                            {/* 元件標頭 */}

                                            {/* 元件下拉本體 */}
                                            <Collapse className="Collapse" in={openCustom}>
                                                {/* 內容外框 */}
                                                <div    className="custom-collapse-content-box" 
                                                        style={{ overflow: 'hidden', transition: 'height 0.4s ease' }}>
                                                    {/* 內容本體 */}
                                                    <div id="custom-collapse-text" className="custom-collapse-content">
                                                        這是客製化樣式的 React-Bootstrap Collapse 區塊。
                                                    </div>
                                                    {/* 內容本體 */}
                                                </div>
                                                {/* 內容外框 */}
                                            </Collapse>
                                            {/* 元件下拉本體 */}
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
                                        /* 元件最外圍 */
                                        .CollapseGroup{

                                            /* 元件標頭 */
                                            .custom-collapse-button {
                                                font-size: 1.2rem;
                                                font-weight: bold;
                                                color: #fff;
                                                background-color: #ff9800;
                                                border: none;
                                                padding: 0.75rem 1.5rem;
                                                border-radius: 8px;
                                            }

                                            /* 元件下拉本體 */
                                            .Collapse{

                                                /* 內容外框 */
                                                .custom-collapse-content-box{

                                                    /* 內容本體 */
                                                    .custom-collapse-content {
                                                        width: 600px;
                                                        height: 100px;
                                                        overflow-y: auto;
                                                        background-color: #ffe0b2;
                                                        color: #e65100;
                                                        font-size: 1.2rem;
                                                        border: 2px solid #ff9800;
                                                        padding: 1.5rem;
                                                        margin-top: 10px;
                                                        position: relative;
                                                        left: 50px;
                                                        transition: all 0.4s ease;
                                                    
                                                        /* 滾動條客製化 */
                                                        /* scrollbar-width: thin;
                                                        scrollbar-color: #ff9800 #ffe0b2; */
                                                    }

                                                    /* Chrome/Edge/Safari */
                                                    .custom-collapse-content::-webkit-scrollbar {
                                                        width: 8px;
                                                    }
                                                    .custom-collapse-content::-webkit-scrollbar-track {
                                                        background: #ffe0b2;
                                                        border-radius: 10px;
                                                    }
                                                    .custom-collapse-content::-webkit-scrollbar-thumb {
                                                        background-color: #ff9800;
                                                        border-radius: 10px;
                                                        border: 2px solid #ffe0b2;
                                                    }
                                                    .custom-collapse-content::-webkit-scrollbar-thumb:hover {
                                                        background-color: #e65100;
                                                    }
                                                }
                                            }
                                        }
                                        `
                                    )
                                }       
                            </code>
                        </pre>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

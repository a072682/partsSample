import { useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式






export default function DefaultCollapse() {

    // 狀態：控制預設的 Collapse
    const [openDefault, setOpenDefault] = useState(false);

    return (
        <>
            {/* 元件最外圍 */}
            <div className="CollapseGroup">
                {/* 元件標頭 */}
                <button
                    className="btn btn-primary"
                    onClick={() => setOpenDefault(!openDefault)}
                    aria-controls="default-collapse-text"
                    aria-expanded={openDefault}
                    >
                    預設展開/收合
                </button>
                {/* 元件標頭 */}

                {/* 元件下拉本體 */}
                <Collapse in={openDefault}>
                    {/* 內容外框 */}
                    <div id="default-collapse-text" className="mt-3">
                        {/* 內容本體 */}
                        <div className="card card-body">
                            這是預設樣式的 React-Bootstrap Collapse 區塊。
                        </div>
                        {/* 內容本體 */}
                    </div>
                    {/* 內容外框 */}
                </Collapse>
                {/* 元件下拉本體 */}
            </div>
            {/* 元件最外圍 */}

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
                                        
                                        // 設定檔放置於return上方
                                        // 狀態：控制預設的 Collapse
                                        const [openDefault, setOpenDefault] = useState(false);

                                        // 元件本體
                                        // 放置於return下方
                                        {/* 元件最外圍 */}
                                        <div className="CollapseGroup">
                                            {/* 元件標頭 */}
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setOpenDefault(!openDefault)}
                                                aria-controls="default-collapse-text"
                                                aria-expanded={openDefault}
                                                >
                                                預設展開/收合
                                            </button>
                                            {/* 元件標頭 */}

                                            {/* 元件下拉本體 */}
                                            <Collapse in={openDefault}>
                                                {/* 內容外框 */}
                                                <div id="default-collapse-text" className="mt-3">
                                                    {/* 內容本體 */}
                                                    <div className="card card-body">
                                                        這是預設樣式的 React-Bootstrap Collapse 區塊。
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

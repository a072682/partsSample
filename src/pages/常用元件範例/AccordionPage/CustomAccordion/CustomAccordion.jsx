import { Accordion } from 'react-bootstrap';
import './_CustomAccordion.scss';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function CustomAccordion() {
  return (
    <>
        <section className='CustomAccordion'>
            {/* 客製化樣式的 React-Bootstrap Accordion */}
            {/* 元件最外圍 */}
            <Accordion defaultActiveKey="" className="custom-ReactAccordion mb-24">
                {/* 預設不打開任何一個	<Accordion defaultActiveKey=""> */}
                {/* 元件項目外圍 */}
                <Accordion.Item eventKey="0" className="custom-ReactAccordionItem">
                    {/* 元件標頭 */}
                    <Accordion.Header className="custom-ReactAccordionHeader">
                        客製化樣式 - 標題 #1
                    </Accordion.Header>
                    {/* 元件標頭 */}

                    {/* 元件本體 */}
                    <Accordion.Body className="custom-ReactAccordionBody">
                        這是客製化樣式的 React-Bootstrap 手風琴內容。
                    </Accordion.Body>
                    {/* 元件本體 */}
                </Accordion.Item>
                {/* 元件項目外圍 */}
            </Accordion>
            {/* 元件最外圍 */}
        </section>
        

        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
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
                                import { Accordion } from 'react-bootstrap'; //宣告元件
                                import './_CustomAccordion.scss';//讀取樣式

                                // 元件本體
                                // 放置於return下方
                                {/* 元件最外圍 */}
                                <Accordion defaultActiveKey="" className="custom-ReactAccordion mb-24">
                                    {/* 預設不打開任何一個	<Accordion defaultActiveKey=""> */}
                                    {/* 元件項目外圍 */}
                                    <Accordion.Item eventKey="0" className="custom-ReactAccordionItem">
                                        {/* 元件標頭 */}
                                        <Accordion.Header className="custom-ReactAccordionHeader">
                                            客製化樣式 - 標題 #1
                                        </Accordion.Header>
                                        {/* 元件標頭 */}

                                        {/* 元件本體 */}
                                        <Accordion.Body className="custom-ReactAccordionBody">
                                            這是客製化樣式的 React-Bootstrap 手風琴內容。
                                        </Accordion.Body>
                                        {/* 元件本體 */}
                                    </Accordion.Item>
                                    {/* 元件項目外圍 */}
                                </Accordion>
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
                                /* 客製化整體手風琴 */

                                /* 元件最外圍 */
                                .custom-ReactAccordion {
                                    max-width: 600px;
                                    height: auto;
                                    border: 2px solid #ff5722; // 橘色外框
                                    border-radius: 10px;
                                    background-color: #fff3e0; // 淺橘色背景
                                    padding: 1rem;

                                    /* 元件項目外圍 */
                                    .custom-ReactAccordionItem {
                                        border: none; // 移除原本邊框

                                        /* 元件標頭 */
                                        .custom-ReactAccordionHeader {

                                            /* 元件標頭內部樣式 */
                                            .accordion-button {
                                                /*未展開時元件標頭設定*/
                                                background-color: burlywood; //按鈕背景顏色
                                                box-shadow: none;
                                                color: #424242; //按鈕字體顏色
                                                box-shadow: none; // ✅ 移除點擊時的藍色外框陰影
                                                outline: none;     // ✅ 移除可能的 outline
                                                box-shadow: none;  // 本底底部白色邊緣
                                                font-size: 1.5rem; //文字設定
                                                font-weight: bold; //文字設定
                                                padding: 1rem; 
                                                box-shadow: none; // ✅ 移除點擊時的藍色外框陰影
                                                outline: none;     // ✅ 移除可能的 outline
                                                box-shadow: none;  // 本底底部白色邊緣

                                                &:not(.collapsed) {
                                                    /*展開時元件標頭設定*/
                                                    /*在custom-ReactAccordion之下的.accordion-button在沒有.collapsed狀態下套用以下設定*/
                                                    background-color: #ff00b3; // 展開時背景顏色
                                                    color: #1bbf0c; // 展開時字體顏色
                                                }
                                            }
                                        }

                                        /* 元件本體 */
                                        .custom-ReactAccordionBody {
                                            background-color: #700101; // 內容背景顏色
                                            color: #6200ff;            // 內容字體顏色
                                            font-size: 1.1rem;
                                            padding: 1.5rem;
                                            border-radius: 0 0 10px 10px;
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

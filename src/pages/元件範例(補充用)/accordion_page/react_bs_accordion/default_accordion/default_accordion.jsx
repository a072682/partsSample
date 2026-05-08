import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function DefaultAccordion() {
  return (
    <>
        {/* 元件最外圍 */}
        <Accordion defaultActiveKey="" className="Accordion mb-24">
            {/* 預設打開哪一個	<Accordion defaultActiveKey="0"> */}
            {/* 元件項目外圍 */}
            <Accordion.Item className='AccordionItem' eventKey="0">
                {/* 元件標頭 */}
                <Accordion.Header className='AccordionHeader'>預設樣式 - 標題 #1</Accordion.Header>
                {/* 元件標頭 */}

                {/* 元件本體 */}
                <Accordion.Body className='AccordionBody'>
                    這是預設樣式的 React-Bootstrap 手風琴內容。
                </Accordion.Body>
                {/* 元件本體 */}
            </Accordion.Item>
            {/* 元件項目本體 */}
        </Accordion>
        {/* 元件最外圍 */}
        
        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
            {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
            <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                <Accordion.Header className="defaultReactAccordionHeader">
                程式碼說明
                </Accordion.Header>
                <Accordion.Body className="defaultReactAccordionBody p-0">
                
                <pre className="language-html m-0 p-16">
                    <div>HTML說明</div>
                    <code className="language-html">
                    {
                        dedent(
                        `
                            import { Accordion } from 'react-bootstrap'; //宣告元件

                            // 元件本體
                            // 放置於return下方
                            {/* 元件最外圍 */}
                            <Accordion defaultActiveKey="" className="Accordion mb-24">
                                {/* 預設打開哪一個	<Accordion defaultActiveKey="0"> */}
                                {/* 元件項目外圍 */}
                                <Accordion.Item className='AccordionItem' eventKey="0">
                                    {/* 元件標頭 */}
                                    <Accordion.Header className='AccordionHeader'>預設樣式 - 標題 #1</Accordion.Header>
                                    {/* 元件標頭 */}

                                    {/* 元件本體 */}
                                    <Accordion.Body className='AccordionBody'>
                                        這是預設樣式的 React-Bootstrap 手風琴內容。
                                    </Accordion.Body>
                                    {/* 元件本體 */}
                                </Accordion.Item>
                                {/* 元件項目本體 */}
                            </Accordion>
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

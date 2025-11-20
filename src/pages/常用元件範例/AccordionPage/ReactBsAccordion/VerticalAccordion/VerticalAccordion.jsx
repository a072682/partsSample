import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import './_VerticalAccordion.scss';



export default function VerticalAccordion() {

    //垂直
        //垂直判斷用
        const [horizontalOpen, setHorizontalOpen] = useState(false);
    //垂直

    return (
        <>
            <div className="horizontal-accordion-wrapper mb-24">
                <div className="horizontal-accordion-header" onClick={() => setHorizontalOpen(!horizontalOpen)}>
                    左邊標題（點我展開）
                </div>
                <div className={`horizontal-accordion-body ${horizontalOpen ? 'open' : ''}`}>
                    <div className="accordion-body-content">
                        這是橫向展開的 Accordion 內容喔！<br/>
                        可以塞很多文字、圖片...
                    </div>
                </div>
            </div>

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
                                //使用時要先在return前加入狀態宣告
                                //此狀態用來控制開合
                                const [horizontalOpen, setHorizontalOpen] = useState(false);

                                //return內部內容:
                                <div className="horizontal-accordion-wrapper mb-24">
                                    <div  className="horizontal-accordion-header" 
                                        onClick={() => setHorizontalOpen(!horizontalOpen)}
                                        //點選後會寫入反向結果控制開合
                                    >
                                    左邊標題（點我展開）
                                    </div>
                                    <div  className={\`horizontal-accordion-body \${horizontalOpen ? 'open' : ''}\`}>
                                        //根據horizontalOpen狀態來決定要寫入哪一個className(三元判斷)
                                    <div className="accordion-body-content">
                                        這是橫向展開的 Accordion 內容
                                    </div>
                                    </div>
                                </div>
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
                                // 垂直 Accordion 區塊
                                .horizontal-accordion-wrapper {
                                    display: flex;
                                    align-items: stretch;
                                    border: 2px solid #ff9800;//外框顏色
                                    width: 600px;
                                    height: 200px;
                                    overflow: hidden;

                                    .horizontal-accordion-header {
                                        background-color: #ffe0b2;//標題背景顏色
                                        color: #e65100;//標題字體顏色
                                        padding: 1rem;
                                        font-size: 1.2rem;
                                        font-weight: bold;
                                        cursor: pointer;
                                        width: 200px;
                                        text-align: center;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }

                                    .horizontal-accordion-body {
                                        width: 0;
                                        background-color: #fff3e0;//展開內容背景顏色
                                        overflow-y: hidden;
                                        overflow-x: auto;
                                        opacity: 0;
                                        transition: all 0.5s ease;

                                        &.open {
                                            width: 400px;
                                            opacity: 1;
                                        }

                                        .accordion-body-content {
                                            padding: 1.5rem;
                                            font-size: 1rem;
                                            color: #6d4c41;//展開內容字體顏色
                                            height: 100%;
                                            overflow: hidden;
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

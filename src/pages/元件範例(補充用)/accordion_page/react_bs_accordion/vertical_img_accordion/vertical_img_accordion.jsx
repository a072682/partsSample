import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import './_VerticalImgAccordion.scss';


export default function VerticalImgAccordion() {

    //多個垂直合併案例
      const [active, setActive] = useState(false);   // 控制是否展開
      const [closing, setClosing] = useState(false);  // 控制是否正在收合

      const handleToggle = () => {
          if (active) {
            // 現在是開啟的，點擊代表要關閉
            setClosing(true);        // Step1: 加上 closing
            setTimeout(() => {
              setClosing(false);     // Step2: 等0.5秒動畫跑完
              setActive(false);      // Step3: 正式關掉
            }, 500);
          } else {
            // 現在是關閉的，點擊打開
            setActive(true);         // 直接打開
          }
      };
  //多個垂直合併案例

    return (
        <>
            {/* 多個垂直合併案例 */}
            <div className="horizontal-accordion-wrapper02 mb-24">
                <div className="horizontal-accordion-item">
                    <div
                    className="horizontal-accordion-header"
                    onClick={() => handleToggle()}
                    >
                        可愛貓咪
                    </div>

                    <div
                    className={`horizontal-accordion-body
                        ${active ? 'open' : ''}
                        ${closing ? 'closing' : ''}
                    `}
                    >
                    <img src='https://picsum.photos/id/1025/400/200' alt="" className="accordion-image" />
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
                            const [active, setActive] = useState(false);   // 控制是否展開
                            const [closing, setClosing] = useState(false);  // 控制是否正在收合
                            //控制函式
                            const handleToggle = () => {
                                if (active) {
                                    // 現在是開啟的，點擊代表要關閉
                                    setClosing(true);        // Step1: 加上 closing
                                    setTimeout(() => {
                                    setClosing(false);     // Step2: 等0.5秒動畫跑完
                                    setActive(false);      // Step3: 正式關掉
                                    }, 500);
                                } else {
                                    // 現在是關閉的，點擊打開
                                    setActive(true);         // 直接打開
                                }
                            };

                            //return內部內容:
                            <div className="horizontal-accordion-wrapper02 mb-24">
                                <div className="horizontal-accordion-item">
                                    <div
                                        className="horizontal-accordion-header"
                                        onClick={() => handleToggle()}
                                    >
                                        可愛貓咪
                                    </div>

                                    <div
                                        className={\`horizontal-accordion-body
                                        \${active ? 'open' : ''}
                                        \${closing ? 'closing' : ''}
                                        \`}
                                    >
                                        <img src='https://picsum.photos/id/1025/400/200' alt="" className="accordion-image" />
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
                            .horizontal-accordion-wrapper02 {//整體元件
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                                width: 600px; //設定寬度
                                
                                .horizontal-accordion-item {
                                display: flex;
                                align-items: stretch;//確保子元素同等高
                                border: 2px solid #ff9800; //整體外框顏色
                                overflow: hidden;

                                .horizontal-accordion-header {
                                    background-color: #ffe0b2;//標題背景顏色
                                    color: #e65100;//標題字體顏色
                                    padding: 1rem;
                                    width: 200px;
                                    height: 200px;
                                    font-size: 1.2rem;
                                    font-weight: bold;
                                    text-align: center;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;
                                    user-select: none;//標題文字無法被選取
                                }

                                .horizontal-accordion-body {
                                    width: 0;
                                    overflow: hidden;
                                    background-color: #fff3e0;
                                    transition: width 0.5s ease-in-out, height 0.5s ease-in-out, opacity 0.5s ease-in-out;
                                    opacity: 0;

                                    &.open {//設定開啟時的寬度
                                    height: 600px;
                                    width: 400px;
                                    opacity: 1;
                                    }

                                    &.closing {//設定關閉時的寬度
                                    height: 600px;
                                    width: 0px;
                                    opacity: 0;
                                    }

                                    .accordion-image {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
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

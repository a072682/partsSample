import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function BootstrapTabs() {
    return (
      <>
        <div className="container mt-4">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      首頁
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      關於我們
                    </button>
                </li>
            </ul>
      
            <div className="tab-content pt-3">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <p>這是首頁內容。</p>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <p>這是關於我們的內容。</p>
              </div>
            </div>
        </div>

        <Accordion defaultActiveKey="" className="defaultAccordionContent mt-24 mb-24">
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
                                    <div className="container mt-4">
                                        {/* nav-tabs 是 Bootstrap 提供的分頁選單樣式 */}
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            
                                            {/* 第一個分頁按鈕 */}
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"         // 設定此分頁按鈕為啟用狀態（預設顯示）
                                                    id="home-tab"                        // 分頁按鈕的唯一 ID（用來跟 aria-labelledby 對應）
                                                    data-bs-toggle="tab"                 // 告訴 Bootstrap 這是用來切換分頁的
                                                    data-bs-target="#home"               // 對應下方 .tab-pane 的 id="home"
                                                    type="button"                        // 按鈕型態
                                                    role="tab"                           // ARIA 無障礙角色，標明這是 Tab
                                                    aria-controls="home"                 // 指定它控制的內容面板（對應 id="home"）
                                                    aria-selected="true"                 // 是否為選中狀態
                                                >
                                                    首頁
                                                </button>
                                            </li>

                                            {/* 第二個分頁按鈕 */}
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"                 // 預設沒有 active，所以不會先顯示
                                                    id="profile-tab"                     // 唯一 ID（對應 aria-labelledby）
                                                    data-bs-toggle="tab"                 // 告訴 Bootstrap 這是用來切換分頁的
                                                    data-bs-target="#profile"            // 對應下方 .tab-pane 的 id="profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="profile"              // 指定它控制的內容面板（對應 id="profile"）
                                                    aria-selected="false"                // 預設不是選中狀態
                                                >
                                                    關於我們
                                                </button>
                                            </li>
                                        </ul>

                                        {/* 分頁內容區塊 */}
                                        <div className="tab-content pt-3">
                                            
                                            {/* 第一個內容面板 */}
                                            <div
                                            className="tab-pane fade show active"  // fade 讓切換有漸變效果，show active 表示預設顯示
                                            id="home"                              // 對應上方 data-bs-target="#home"
                                            role="tabpanel"                        // ARIA 無障礙角色，標明這是分頁面板
                                            aria-labelledby="home-tab"             // 對應上方分頁按鈕的 id
                                            >
                                                <p>這是首頁內容。</p>
                                            </div>

                                            {/* 第二個內容面板 */}
                                            <div
                                            className="tab-pane fade"
                                            id="profile"                           // 對應上方 data-bs-target="#profile"
                                            role="tabpanel"
                                            aria-labelledby="profile-tab"          // 對應上方分頁按鈕的 id
                                            >
                                                <p>這是關於我們的內容。</p>
                                            </div>
                                        </div>
                                    </div>
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
  
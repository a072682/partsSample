
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import './_ReactTab.scss';

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function ReactTab() {

    const [activeTab, setActiveTab] = useState('one');//tab控制

    const tabdata = [
        {
            title:"one",
            key:"one",
            pageData:"one",
            disabled: false,
        },
        {
            title:"two",
            key:"two",
            pageData:"two",
            disabled: false,
        },
        {
            title:"three",
            key:"three",
            pageData:"three",
            disabled: true,
        },
    ]

  return (
    <>  
        {/* 最外框 */}
        <div className="app-tabs">
            {/* 控制層 顯示元素不存在 */}
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                {/* Tab 選單區 */}
                <Nav className='d-flex flex-row tab-box'>
                    {
                        tabdata?.map((item)=>{
                            return(
                                <>
                                    {/* 選項按鈕外層 */}
                                    <Nav.Item key={item.key} className='tab-item'>
                                        {/* 選項按鈕本體 */}
                                        <Nav.Link   className={`tab-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                    aria-disabled={item.disabled} 
                                                    eventKey={item.key}>
                                            {item.title}
                                        </Nav.Link>
                                        {/* 選項按鈕本體 */}
                                    </Nav.Item>
                                    {/* 選項按鈕外層 */}
                                </>
                            )
                        })
                    }
                </Nav>
                {/* Tab 選單區 */}

                {/* Tab 內容區 */}
                <Tab.Content className='h-100'>
                    {
                        tabdata?.map((item)=>{
                            return(
                                <>
                                    {/* 內容外層 */}
                                    <Tab.Pane   key={item.key} 
                                                eventKey={item.key}>
                                        {item.pageData}
                                    </Tab.Pane>
                                    {/* 內容外層 */}
                                </>
                            )
                        })
                    }
                </Tab.Content>
                {/* Tab 內容區 */}
            </Tab.Container>
            {/* 控制層 顯示元素不存在 */}
        </div>
        {/* 最外框 */}

        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mt-24 mb-24">
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
                                    import { Tab, Nav } from 'react-bootstrap';//宣告元件
                                    import { useState } from 'react';//宣告狀態
                                    import './_ReactTabs02.scss';//引入指定樣式

                                    const [activeTab, setActiveTab] = useState('one');//預設開啟的頁面

                                    
                                    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
                                        {
                                            title:"one",
                                            key:"one",
                                            pageData:"one",
                                            disabled: false,
                                        },
                                        {
                                            title:"two",
                                            key:"two",
                                            pageData:"two",
                                            disabled: false,
                                        },
                                        {
                                            title:"three",
                                            key:"three",
                                            pageData:"three",
                                            disabled: true,
                                        },
                                    ]

                                    {/* 最外框 */}
                                    <div className="app-tabs">
                                        {/* 控制層 顯示元素不存在 */}
                                        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                                            {/* Tab 選單區 */}
                                            <Nav className='d-flex flex-row tab-box'>
                                                {
                                                    tabdata?.map((item)=>{
                                                        return(
                                                            <>
                                                                {/* 選項按鈕外層 */}
                                                                <Nav.Item key={item.key} className='tab-item'>
                                                                    {/* 選項按鈕本體 */}
                                                                    <Nav.Link   className={\`tab-link \${item.disabled ? 'is-disabled' : ''}\`} 
                                                                                aria-disabled={item.disabled} 
                                                                                eventKey={item.key}>
                                                                        {item.title}
                                                                    </Nav.Link>
                                                                    {/* 選項按鈕本體 */}
                                                                </Nav.Item>
                                                                {/* 選項按鈕外層 */}
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Nav>
                                            {/* Tab 選單區 */}

                                            {/* Tab 內容區 */}
                                            <Tab.Content className='h-100'>
                                                {
                                                    tabdata?.map((item)=>{
                                                        return(
                                                            <>
                                                                {/* 內容外層 */}
                                                                <Tab.Pane   key={item.key} 
                                                                            eventKey={item.key}>
                                                                    {item.pageData}
                                                                </Tab.Pane>
                                                                {/* 內容外層 */}
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Tab.Content>
                                            {/* Tab 內容區 */}
                                        </Tab.Container>
                                        {/* 控制層 顯示元素不存在 */}
                                    </div>
                                    {/* 最外框 */}
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
                                    /* =========================
                                        Tabs 元件常用樣式（巢狀版）
                                        作用範圍：限定在 .app-tabs 容器內
                                        ========================= */
                                        .app-tabs {
                                            /* ─ 外框容器：整個 Tabs 區域的排版/背景/間距 ─ */
                                            display: block;                /* 外框為區塊元素 */
                                            background: #f7f9fb;           /* 淺底色，襯托分頁 */
                                            border-radius: 12px;           /* 外框圓角 */
                                            padding: 16px;                 /* 外框內距 */
                                            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06); /* 淺陰影提層次 */

                                            /* ─ 選單列（你的 <Nav class="tab-box">） ─ */
                                            .tab-box {
                                                display: flex;
                                                gap: 10px;                   /* 分頁按鈕之間的間距 */
                                                border-bottom: 2px solid #000000; /* 底線區隔選單與內容 */
                                                padding: 4px 6px;            /* 選單列內距 */
                                                background-color: #cccccc;            /* 選單列背景 */
                                                border-radius: 10px 10px 0 0;/* 上方圓角（貼合外框） */

                                                /* ─ 每個分頁項目（<Nav.Item class="tab-item">） ─ */
                                                .tab-item {
                                                    list-style: none;          /* 保險：移除列表樣式 */
                                                    display: inline-flex;
                                                    align-items: stretch;

                                                    /* ─ 分頁按鈕（<Nav.Link class="tab-link">） ─ */
                                                    .tab-link {
                                                        position: relative;        /* 方便做底線/微裝飾 */
                                                        display: inline-flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        padding: 10px 14px;        /* 觸控友善 */
                                                        font-weight: 600;          /* 半粗體，易讀 */
                                                        font-size: 14px;
                                                        color: #556070;            /* 預設字色 */
                                                        background: transparent;   /* 預設透明底 */
                                                        border: 0;                 /* 清除預設邊線 */
                                                        border-radius: 8px;        /* 按鈕圓角 */
                                                        cursor: pointer;
                                                        transition: all 0.2s ease; /* 動畫過渡 */

                                                        /* hover 狀態：滑過提示 */
                                                        &:hover {
                                                            color: #0d6efd;
                                                            background: rgba(13, 110, 253, 0.08);
                                                        }

                                                        /* focus 可及性：鍵盤導覽可見框 */
                                                        &:focus-visible {
                                                            outline: 2px solid #0d6efd;
                                                            outline-offset: 2px;
                                                        }

                                                        /* active 狀態：目前選中的分頁 */
                                                        &.active {
                                                            color: #fff;
                                                            background: #0d6efd;
                                                            box-shadow: 0 6px 14px rgba(13, 110, 253, 0.25);
                                                        }

                                                        /* disabled 狀態（若有需要） */
                                                        &.disabled,&.is-disabled {
                                                            opacity: 0.5;
                                                            cursor: not-allowed;
                                                            pointer-events: none;
                                                        }
                                                    }
                                                }
                                            }    

                                            /* ─ 內容區（React-Bootstrap 的 .tab-content） ─ */
                                            .tab-content {
                                                background: #fff;            /* 內容底色 */
                                                border: 1px solid #e5e9ef;   /* 細邊框 */
                                                border-top: 0;               /* 與選單列貼齊，去掉上邊 */
                                                border-radius: 0 0 10px 10px;/* 下方圓角 */
                                                padding: 16px;               /* 內容內距 */

                                                /* 內容外層（.tab-pane） */
                                                .tab-pane {

                                                    /* 顯示/隱藏的過渡可交給 Bootstrap 的 .fade/.show */
                                                    &.fade {
                                                        transition: opacity 0.2s ease;
                                                    }
                                                }
                                            }

                                            /* ─ RWD：小尺寸螢幕優化 ─ */
                                            @media (max-width: 576px) {
                                                padding: 12px;

                                                .tab-box {
                                                gap: 6px;
                                                .tab-link {
                                                    padding: 8px 10px;
                                                    font-size: 13px;
                                                }
                                                }

                                                .tab-content {
                                                padding: 12px;
                                                }
                                            }

                                            /* ─ 可選：深色主題支援（若你的頁面有 .dark 容器） ─ */
                                            .dark & {
                                                background: #111418;
                                                box-shadow: none;

                                                .tab-box {
                                                background: #161b22;
                                                border-bottom-color: #2a2f36;

                                                .tab-link {
                                                    color: #c9d1d9;

                                                    &:hover {
                                                    color: #58a6ff;
                                                    background: rgba(88, 166, 255, 0.12);
                                                    }

                                                    &.active {
                                                    color: #0b1220;
                                                    background: #58a6ff;
                                                    box-shadow: 0 6px 14px rgba(88, 166, 255, 0.25);
                                                    }
                                                }
                                                }

                                                .tab-content {
                                                background: #161b22;
                                                border-color: #2a2f36;
                                                color: #c9d1d9;
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

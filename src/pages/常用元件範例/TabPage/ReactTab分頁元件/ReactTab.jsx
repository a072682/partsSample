
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
        <section className='ReactTab'>
            {/* 最外框 */}
            <div className="appTabs">
                {/* 控制層 顯示元素不存在 */}
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                    {/* Tab 選單區 */}
                    <Nav className='tabBox'>
                        {/* 選項按鈕外層 */}
                        <Nav.Item  className='tabItem'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    /* 選項按鈕本體 */
                                    <Nav.Link   key={item.key}
                                                className={`tabLink ${item.disabled ? 'disabled' : ''}`} 
                                                aria-disabled={item.disabled} 
                                                eventKey={item.key}>
                                        {item.title}
                                    </Nav.Link>
                                    /* 選項按鈕本體 */  
                                )
                            })
                        }
                        </Nav.Item>
                        {/* 選項按鈕外層 */}
                    </Nav>
                    {/* Tab 選單區 */}

                    {/* Tab 內容區 */}
                    <Tab.Content className='tabContent'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    /* 內容外層 */
                                    <Tab.Pane   className='tabPane'
                                                key={item.key} 
                                                eventKey={item.key}>
                                        {item.pageData}
                                    </Tab.Pane>
                                    /* 內容外層 */  
                                )
                            })
                        }
                    </Tab.Content>
                    {/* Tab 內容區 */}
                </Tab.Container>
                {/* 控制層 顯示元素不存在 */}
            </div>
            {/* 最外框 */}
        </section>
        

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
                                    //最外框
                                    .appTabs {

                                        /* Tab 選單區 */
                                        .tabBox {
                                            border: 2px solid #000000;
                                            
                                            /* 選項按鈕外層 */
                                            .tabItem {
                                                border: 2px solid red;
                                                display: flex;
                                                /* 選項按鈕本體 */
                                                .tabLink {
                                                    color: #000000;
                                                    /* hover 狀態*/
                                                    &:hover {
                                                        color: #ffffff;
                                                        background: #0d6efd;
                                                    }

                                                    /* active 狀態 */
                                                    &.active {
                                                        color: #fff;
                                                        background: #0d6efd;
                                                    }

                                                    /* disabled 狀態 */
                                                    &.disabled {
                                                        opacity: 0.5;
                                                        cursor: not-allowed;
                                                        pointer-events: none;
                                                    }
                                                }
                                                /* 選項按鈕本體 */
                                            }
                                            /* 選項按鈕外層 */
                                        }
                                        /* Tab 選單區 */

                                        /* Tab 內容區 */
                                        .tabContent {
                                            background: #fff;            /* 內容底色 */
                                            border: 1px solid #e5e9ef;   /* 細邊框 */
                                            border-top: 0;               /* 與選單列貼齊，去掉上邊 */
                                            border-radius: 0 0 10px 10px;/* 下方圓角 */
                                            padding: 16px;               /* 內容內距 */

                                            /* 內容外層（.tab-pane） */
                                            .tabPane {

                                            }
                                        }
                                    }
                                    //最外框
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

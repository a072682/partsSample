import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態

import 會員系統架構 from './系統架構/會員系統架構';
import 會員系統伺服器端頁面 from './伺服器端/會員系統伺服器端頁面';
import 會員系統前端頁面 from './前端/會員系統前端頁面';
import 會員系統資料庫端 from './資料庫端/會員系統資料庫端';


export default function 會員系統() {

    const [activeTab, setActiveTab] = useState('系統架構');//預設開啟的頁面

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"系統架構",
            key:"系統架構",
            pageData:<會員系統架構 />,
            disabled: false,
        },
        {
            title:"前端API",
            key:"前端",
            pageData:<會員系統前端頁面 />,
            disabled: false,
        },
        {
            title:"伺服器端API",
            key:"伺服器端",
            pageData:<會員系統伺服器端頁面 />,
            disabled: false,
        },
        {
            title:"資料庫端",
            key:"資料庫端",
            pageData:<會員系統資料庫端 />,
            disabled: false,
        },
    ]

    return (
        <>
        <div className='常用系統範例'>
            {/* 最外框 */}
            <div className="appTabs">
                {/* 控制層 顯示元素不存在 */}
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                    {/* Tab 選單區 */}
                    <Nav className='tabBox'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    
                                    /* 選項按鈕外層 */
                                    <Nav.Item key={item.key} className='tabItem'>
                                        {/* 選項按鈕本體 */}
                                        <Nav.Link   className={`tabLink ${item.disabled ? 'disabled' : ''}`} 
                                                    aria-disabled={item.disabled} 
                                                    eventKey={item.key}>
                                            {item.title}
                                        </Nav.Link>
                                        {/* 選項按鈕本體 */}
                                    </Nav.Item>
                                    /* 選項按鈕外層 */
                                
                                )
                            })
                        }
                    </Nav>
                    {/* Tab 選單區 */}

                    {/* Tab 內容區 */}
                    <Tab.Content className='tabContent'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    
                                    /* 內容外層 */
                                    <Tab.Pane
                                        className='tabPane'
                                        key={item.key} 
                                        eventKey={item.key}
                                    >
                                        {
                                            item.pageData
                                        }
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
        </div>
        
        </>
    );
}

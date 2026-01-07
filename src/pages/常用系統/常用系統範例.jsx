import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態
import './_常用系統範例.scss';//引入指定樣式

import 文章系統 from './文章系統/文章系統';
import 雲端圖片存儲系統 from './雲端圖片存儲系統/雲端圖片存儲系統';
import 會員系統 from './會員系統/會員系統';







export default function 常用系統範例() {

    const [activeTab, setActiveTab] = useState('會員系統');//預設開啟的頁面

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"會員系統",
            key:"會員系統",
            pageData:<會員系統 />,
            disabled: false,
        },
        {
            title:"文章系統",
            key:"文章系統",
            pageData:<文章系統 />,
            disabled: false,
        },
        {
            title:"雲端圖片存儲系統",
            key:"雲端圖片存儲系統",
            pageData:<雲端圖片存儲系統 />,
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
                                            item.key === "輪播片"? 
                                            (activeTab === "輪播片" && <輪播片元件 />)
                                            : item.pageData
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

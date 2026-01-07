import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態

import 資料表分析 from './資料表分析/資料表分析';
import 資料表建立終端機版 from './資料表建立終端機版/資料表建立終端機版';
import 資料表建立Dbeaver from './資料表建立Dbeaver/資料表建立Dbeaver';
import 資料表備份轉移 from './資料表備份轉移/資料表備份轉移';




export default function 資料表建立() {


    const [activeTab, setActiveTab] = useState('資料表分析');//預設開啟的頁面

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"資料表分析",
            key:"資料表分析",
            pageData:<資料表分析 />,
            disabled: false,
        },
        {
            title:"資料表建立(終端機)",
            key:"資料表建立終端機",
            pageData:<資料表建立終端機版 />,
            disabled: false,
        },
        {
            title:"資料表建立(dbeaver)",
            key:"資料表建立dbeaver",
            pageData:<資料表建立Dbeaver />,
            disabled: false,
        },
        {
            title:"資料表備份轉移",
            key:"資料表備份轉移",
            pageData:<資料表備份轉移 />,
            disabled: false,
        },
    ]

    return (
        <>
        <div className='資料表建立'>
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

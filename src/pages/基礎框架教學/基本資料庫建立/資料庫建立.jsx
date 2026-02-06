import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useState } from 'react';//宣告狀態
import './_資料庫建立.scss';//引入指定樣式

import 本地端資料庫建立 from './資料庫本地端建立/本地端資料庫建立';
import 資料表建立 from './資料表建立方法/資料表建立';
import 資料庫docker端建立 from './資料庫Docker端建立/資料庫Docker端建立';


export default function 資料庫建立() {


    const [activeTab, setActiveTab] = useState('資料庫本地端');//預設開啟的頁面

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"資料庫建立(本地端)",
            key:"資料庫本地端",
            pageData:<本地端資料庫建立 />,
            disabled: false,
        },
        {
            title:"資料庫建立(docker)",
            key:"資料庫docker端",
            pageData:<資料庫docker端建立 />,
            disabled: false,
        },
        {
            title:"資料表建立方法",
            key:"資料表",
            pageData:<資料表建立 />,
            disabled: false,
        },
    ]

    return (
        <>
        <div className='資料庫建立'>
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

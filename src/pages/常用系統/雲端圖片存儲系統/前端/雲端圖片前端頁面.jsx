
import { useEffect, useState } from 'react';//宣告狀態
import { Tab, Nav } from 'react-bootstrap';//宣告元件
import './_雲端圖片前端頁面.scss';//引入指定樣式
import 圖片上傳 from './圖片上傳/圖片上傳';
import 取得圖片 from './取得圖片/取得圖片';
import 圖片覆蓋 from './圖片覆蓋/圖片覆蓋.JSX';
import 圖片刪除 from './刪除圖片/刪除圖片';



export default function 雲端圖片前端頁面() {

    const [activeTab, setActiveTab] = useState('圖片上傳');//預設開啟的頁面
    
    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"圖片上傳",
            key:"圖片上傳",
            pageData:<圖片上傳 />,
            disabled: false,
        },
        {
            title:"取得圖片",
            key:"取得圖片",
            pageData:<取得圖片 />,
            disabled: false,
        },
        {
            title:"圖片覆蓋",
            key:"圖片覆蓋",
            pageData:<圖片覆蓋 />,
            disabled: false,
        },
        {
            title:"刪除圖片",
            key:"刪除圖片",
            pageData:<圖片刪除 />,
            disabled: false,
        },
    ]

    return (
        <>
            <div className='雲端圖片前端頁面'>
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

import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態

import API攔截器寫法 from './API攔截器寫法/API攔截器寫法';
import 新增會員 from './新增會員/新增會員';
import 登入會員 from './登入會員/登入會員';
import 登出API from './登出/登出';
import 登入確認 from './登入確認/登入確認';
import GOOGLE登入 from './google登入/google登入';





export default function 會員系統前端頁面() {

    const [activeTab, setActiveTab] = useState('新增會員');//預設開啟的頁面

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"api攔截器",
            key:"api攔截器",
            pageData:<API攔截器寫法 />,
            disabled: false,
        },
        {
            title:"新增會員",
            key:"新增會員",
            pageData:<新增會員 />,
            disabled: false,
        },
        {
            title:"登入會員",
            key:"登入會員",
            pageData:<登入會員 />,
            disabled: false,
        },
        {
            title:"登出",
            key:"登出",
            pageData:<登出API />,
            disabled: false,
        },
        {
            title:"登入確認",
            key:"登入確認",
            pageData:<登入確認 />,
            disabled: false,
        },
        {
            title:"GOOGLE登入",
            key:"GOOGLE登入",
            pageData:<GOOGLE登入 />,
            disabled: false,
        },
    ]

    return (
        <>
        <div className='前端頁面'>
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

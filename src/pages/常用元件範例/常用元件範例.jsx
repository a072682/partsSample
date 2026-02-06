import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態
import './_常用元件範例.scss';//引入指定樣式

import { useLocation } from 'react-router-dom';
import 下拉選單元件 from './下拉式選單元件/下拉選單元件';
import 管風琴元件 from './管風琴元件/管風琴元件';
import 摺疊功能元件 from './摺疊功能/摺疊功能元件';
import 輪播片元件 from './輪播片元件/輪播片元件';
import Tab分頁元件 from './Tab分頁元件/Tab分頁元件';
import 表格元件 from './表格元件/表格元件';
import 按鈕元件 from './按鈕元件/按鈕元件';
import 常用動畫元件範例 from './常用動畫範例/常用動畫元件範例';






export default function 常用元件範例() {

    //讀取路徑
    const location = useLocation();
    //location的內容如下
    //{
    // pathname: "/常用元件範例",
    // search: "?tab=輪播片",
    // hash: "",
    // ...
    // }

    //讓location.search 變得可以讀取的狀態
    const params = new URLSearchParams(location.search);
    //此時params會很像
    // params = {
    //     "tab": "輪播片"
    // }
    
    const queryTab = params.get("tab");
    //這時候queryTab會等於"輪播片"

    const [activeTab, setActiveTab] = useState('管風琴');//預設開啟的頁面

    // 🚀 只要網址上的 tab 改變，就切換 activeTab
    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab);
        }
    }, [queryTab]);

    

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"管風琴元件",
            key:"管風琴",
            pageData:<管風琴元件 />,
            disabled: false,
        },
        {
            title:"摺疊功能",
            key:"摺疊",
            pageData:<摺疊功能元件 />,
            disabled: false,
        },
        {
            title:"下拉式選單元件",
            key:"下拉式選單",
            pageData:<下拉選單元件 />,
            disabled: false,
        },
        {
            title:"輪播片元件",
            key:"輪播片",
            pageData:<輪播片元件 />,
            disabled: false,
        },
        {
            title:"分頁選單元件",
            key:"分頁選單",
            pageData:<Tab分頁元件 />,
            disabled: false,
        },
        {
            title:"表格元件",
            key:"表格",
            pageData:<表格元件 />,
            disabled: false,
        },
        {
            title:"按鈕元件",
            key:"按鈕",
            pageData:<按鈕元件 />,
            disabled: false,
        },
        {
            title:"常用動畫元件",
            key:"動畫",
            pageData:<常用動畫元件範例 />,
            disabled: false,
        },
    ]

    return (
        <>
        <div className='常用範例最外層'>
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

import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態
import './_常用元件範例.scss';//引入指定樣式
import CustomAccordion from './AccordionPage/CustomAccordion/CustomAccordion';
import CustomCollapse from './CollapsePage/CustomCollapse/CustomCollapse';
import ReactCustomDropdown from './DropdownPage/ReactCustomDropdown/ReactCustomDropdown';
import ReactTab from './TabPage/ReactTab分頁元件/ReactTab';
import UseForm from './useForm範例/UseForm範例';
import SwiperSample from './SwiperPage/Swiper';




export default function 常用元件範例() {

    const [activeTab, setActiveTab] = useState('管風琴');//預設開啟的頁面

    

    const tabdata = [ //將資料分離讓程式碼可以用.map讓程式碼更加簡潔
        {
            title:"管風琴元件",
            key:"管風琴",
            pageData:<CustomAccordion />,
            disabled: false,
        },
        {
            title:"摺疊功能",
            key:"摺疊",
            pageData:<CustomCollapse />,
            disabled: false,
        },
        {
            title:"下拉式選單元件",
            key:"下拉式選單",
            pageData:<ReactCustomDropdown />,
            disabled: false,
        },
        {
            title:"輪播片元件",
            key:"輪播片",
            pageData:<SwiperSample activeTab={activeTab}/>,
            disabled: false,
        },
        {
            title:"分頁選單元件",
            key:"分頁選單",
            pageData:<ReactTab />,
            disabled: false,
        },
        {
            title:"表格元件",
            key:"表格",
            pageData:<UseForm />,
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
                                            (activeTab === "輪播片" && <SwiperSample />)
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

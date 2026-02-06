import { Tab, Nav } from 'react-bootstrap';//宣告元件
import { useEffect, useState } from 'react';//宣告狀態
import './_常用標籤.scss';//引入指定樣式
import SVG貼圖範例 from './SVG貼圖範例/SVG貼圖範例';








export default function 常用標籤() {

    //#region
    //#endregion

    //#region tab控制
    const [activeTab, setActiveTab] = useState('svg貼圖範例');
    //#endregion

    //#region tab顯示設定
    const tabdata = [
        {
            title:"svg貼圖範例",
            key:"svg貼圖範例",
            pageData:<SVG貼圖範例 />,
            disabled: false,
        },
    ]
    //#endregion

    return (
        <>
        <div className='常用標籤'>
            <h2>常用標籤</h2>
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



import { useState } from "react";
import { Tab, Nav } from 'react-bootstrap';
import D3DonutChart from "./圓環圖/D3DonutChart";
import D3BarChart from "./長條圖/D3BarChart";
import D3LineChart from "./折線圖/D3LineChart";
import D3DonutChartText from "./圓環圖/D3DonutChartText";
import D3BarChartSText from "./長條圖/D3BarChartSText";
import D3LineChartText from "./折線圖/D3LineChartText";




export default function D3() {

    //#region
    //#endregion

    const [activeTab, setActiveTab] = useState('D3DonutChart');//tab控制
        
    const tabdata = [
        {
            title:"D3DonutChart",
            key:"D3DonutChart",
            pageData:<D3DonutChart />,
            text:<D3DonutChartText />,
            disabled: false,
        },
        {
            title:"D3BarChart",
            key:"D3BarChart",
            pageData:<D3BarChart />,
            text:<D3BarChartSText />,
            disabled: false,
        },
        {
            title:"D3LineChart",
            key:"D3LineChart",
            pageData:<D3LineChart />,
            text:<D3LineChartText />,
            disabled: true,
        },
    ]

    return (
        <>
            {/* 控制層 顯示元素不存在 */}
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                {/* 最外層外框 */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Tab 選單區 */}
                            <Nav className='d-flex flex-row tab-box'>
                                {
                                    tabdata?.map((item)=>{
                                        return(
                                            <>
                                                {/* 選項按鈕外層 */}
                                                <Nav.Item key={item.key} className='tab-item'>
                                                    {/* 選項按鈕本體 */}
                                                    <Nav.Link   className={`tab-link ${item.disabled ? 'is-disabled' : ''}`} 
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
                        </div>
                        <div className="col-6 mx-auto">
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
                        </div>
                        <div className="col-12">
                            {/* Tab 內容區 */}
                            <Tab.Content className='h-100'>
                                {
                                    tabdata?.map((item)=>{
                                        return(
                                            <>
                                                {/* 內容外層 */}
                                                <Tab.Pane   key={item.key} 
                                                            eventKey={item.key}>
                                                    {item.text}
                                                </Tab.Pane>
                                                {/* 內容外層 */}
                                            </>
                                        )
                                    })
                                }
                            </Tab.Content>
                            {/* Tab 內容區 */}
                        </div>
                    </div>
                </div>
                {/* 最外層外框 */}
            </Tab.Container>
            {/* 控制層 顯示元素不存在 */}
        </>
    )    
}



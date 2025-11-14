
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import DonutChart from "./圓環圖/DonutChart";
import BarChart from "./長條圖/barChart";
import LineChart from "./折線圖/LineChart";
import DonutChartText from "./圓環圖/DonutChartText";
import BarChartText from './長條圖/BarChartText';
import LineChartText from './折線圖/LineChartText';


export default function ChartTest() {

    //#region
    //#endregion

    const [activeTab, setActiveTab] = useState('DonutChart');//tab控制
    
    const tabdata = [
        {
            title:"DonutChart",
            key:"DonutChart",
            pageData:<DonutChart />,
            text:<DonutChartText />,
            disabled: false,
        },
        {
            title:"BarChart",
            key:"BarChart",
            pageData:<BarChart />,
            text:<BarChartText />,
            disabled: false,
        },
        {
            title:"LineChart",
            key:"LineChart",
            pageData:<LineChart />,
            text:<LineChartText />,
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
  );
}

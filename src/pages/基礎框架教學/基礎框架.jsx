import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_基礎框架.scss';


import ReactBasic from './ReactBasic/ReactBasic';
import NextBasic from './NextBasic/NextBasic';
import NodeJsExpressBasic from './NodeJsExpressBasic/NodeJsExpressBasic';
import 資料庫建立 from './基本資料庫建立/資料庫建立';


export default function 基礎框架() {

    //#region
    //#endregion

    //#region tab控制
    const [activeTab, setActiveTab] = useState('ReactBasic');
    //#endregion

    //#region tab顯示設定
    const tabdata = [
        {
            title:"ReactBasic",
            key:"ReactBasic",
            pageData:<ReactBasic />,
            disabled: false,
        },
        {
            title:"NextBasic",
            key:"NextBasic",
            pageData:<NextBasic />,
            disabled: false,
        },
        {
            title:"NodeJsExpress",
            key:"NodeJsExpress",
            pageData:<NodeJsExpressBasic />,
            disabled: false,
        },
        {
            title:"資料庫建立",
            key:"資料庫建立",
            pageData:<資料庫建立 />,
            disabled: false,
        },
    ]
    //#endregion

  return (
    <>
        <section className="基礎框架">
            {/* 最外框 */}
            <div className="appTabs">
                {/* 控制層 顯示元素不存在 */}
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                    {/* Tab 選單區 */}
                    <Nav className='tabBox'>
                        {/* 選項按鈕外層 */}
                        <Nav.Item  className='tabItem'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    /* 選項按鈕本體 */
                                    <Nav.Link   key={item.key}
                                                className={`tabLink ${item.disabled ? 'disabled' : ''}`} 
                                                aria-disabled={item.disabled} 
                                                eventKey={item.key}>
                                        {item.title}
                                    </Nav.Link>
                                    /* 選項按鈕本體 */  
                                )
                            })
                        }
                        </Nav.Item>
                        {/* 選項按鈕外層 */}
                    </Nav>
                    {/* Tab 選單區 */}

                    {/* Tab 內容區 */}
                    <Tab.Content className='tabContent'>
                        {
                            tabdata?.map((item)=>{
                                return(
                                    /* 內容外層 */
                                    <Tab.Pane   className='tabPane'
                                                key={item.key} 
                                                eventKey={item.key}>
                                        {item.pageData}
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
        </section>
    </>
  );
}

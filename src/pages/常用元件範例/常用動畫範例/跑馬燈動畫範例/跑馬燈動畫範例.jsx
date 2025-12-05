
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_ReactTab.scss';
import 跑馬燈範例一 from './範例一/跑馬燈範例一';
import 跑馬燈範例二 from './範例二/跑馬燈範例二';


export default function 跑馬燈動畫範例() {

    //#region
    //#endregion

    //#region tab控制
    const [marqueeActiveTab, setMarqueeActiveTab] = useState('範例一');
    //#endregion

    //#region tab顯示設定
    const marqueeTabdata = [
        {
            title:"範例一",
            key:"範例一",
            pageData:<跑馬燈範例一 />,
            disabled: false,
        },
        {
            title:"範例二",
            key:"範例二",
            pageData:<跑馬燈範例二 />,
            disabled: false,
        },
    ]
    //#endregion

    return (
        <>
            

            <article className='跑馬燈動畫範例'>
                <h3>跑馬燈動畫範例</h3>
                {/* 控制層 顯示元素不存在 */}
                <Tab.Container activeKey={marqueeActiveTab} onSelect={(key) => setMarqueeActiveTab(key)}>

                    {/* Tab 選單區 */}
                    <Nav className='tabBox'>
                        {/* 選項按鈕外層 */}
                        <Nav.Item  className='tabItem'>
                        {
                            marqueeTabdata?.map((item)=>{
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
                            marqueeTabdata?.map((item)=>{
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
            </article>
        </>
    );
}

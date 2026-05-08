
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_ReactTab.scss';

import DefaultExample from './基本範例/DefaultExample';
import TriggerEnterAnimation from './進場立即觸發/TriggerEnterAnimation';
import 觸發型範例 from './觸發型範例/觸發型範例';




export default function FramerMotion() {

    //#region
    //#endregion

    //#region tab控制
    const [framerActiveTab, setFramerActiveTab] = useState('基礎範例');
    //#endregion

    //#region tab顯示設定
    const framerTabdata = [
        {
            title:"基礎範例",
            key:"基礎範例",
            pageData:<DefaultExample />,
            disabled: false,
        },
        {
            title:"進場立即觸發範例",
            key:"進場立即觸發範例",
            pageData:<TriggerEnterAnimation />,
            disabled: false,
        },
        {
            title:"觸發型範例",
            key:"觸發型範例",
            pageData:<觸發型範例 />,
            disabled: false,
        },
    ]
    //#endregion
    

    return (
        <article className='FramerMotion套件範例'>
            <h3>FramerMotion說明</h3>
            {/* 控制層 顯示元素不存在 */}
            <Tab.Container activeKey={framerActiveTab} onSelect={(key) => setFramerActiveTab(key)}>

                {/* Tab 選單區 */}
                <Nav className='tabBox'>
                    {/* 選項按鈕外層 */}
                    <Nav.Item  className='tabItem'>
                    {
                        framerTabdata?.map((item)=>{
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
                        framerTabdata?.map((item)=>{
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
  );
}

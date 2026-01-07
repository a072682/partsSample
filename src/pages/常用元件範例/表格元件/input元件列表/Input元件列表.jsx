

import { Tab, Nav } from 'react-bootstrap';
import './_input元件列表.scss';
import { useState } from 'react';
import Input文字 from './Input文字/Input文字';
import Input多選框 from './Input多選框/Input多選框';
import Input信箱 from './Input信箱/Input信箱';
import Input密碼 from './Input密碼/Input密碼';
import Input單選框 from './Input單選框/Input單選框';
import Input搜尋欄 from './Input搜尋欄/Input搜尋欄';
import Input電話 from './Input電話/Input電話';
import Input數字 from './Input數字/Input數字';
import Input檔案 from './Input檔案/Input檔案';
import textarea元件 from './textarea元件/textarea元件';



export default function Input元件列表 () {

    //#region
    //#endregion

    //#region tab控制
    const [activeTab, setActiveTab] = useState('Input文字');
    //#endregion

    //#region tab顯示設定
    const tabdata = [
        {
            title:"Input文字",
            key:"Input文字",
            pageData:<Input文字 />,
            disabled: false,
        },
        {
            title:"Input信箱",
            key:"Input信箱",
            pageData:<Input信箱 />,
            disabled: false,
        },
        {
            title:"Input密碼",
            key:"Input密碼",
            pageData:<Input密碼 />,
            disabled: false,
        },
        {
            title:"Input電話",
            key:"Input電話",
            pageData:<Input電話 />,
            disabled: false,
        },
        {
            title:"Input數字",
            key:"Input數字",
            pageData:<Input數字 />,
            disabled: false,
        },
        {
            title:"Input單選框",
            key:"Input單選框",
            pageData:<Input單選框 />,
            disabled: false,
        },
        {
            title:"Input多選框",
            key:"Input多選框",
            pageData:<Input多選框 />,
            disabled: false,
        },
        {
            title:"Input搜尋欄",
            key:"Input搜尋欄",
            pageData:<Input搜尋欄 />,
            disabled: false,
        },
        {
            title:"Input檔案",
            key:"Input檔案",
            pageData:<Input檔案 />,
            disabled: false,
        },
        {
            title:"textarea元件",
            key:"textarea",
            pageData:<textarea元件 />,
            disabled: false,
        },
    ]
    //#endregion

    return (
        <>
        <article className='input元件列表'>
            <h3>input元件列表</h3>
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
        </article>
        </>
    );
};


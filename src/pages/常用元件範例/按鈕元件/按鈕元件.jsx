import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_ReactTab.scss';

import 貼圖按鈕範例 from "./貼圖按鈕範例/貼圖按鈕範例";
import 圓角按鈕範例 from './圓角範例/圓角範例';





export default function 按鈕元件() {

  //#region
  //#endregion

  //#region tab控制
  const [btnActiveTab, setBtnActiveTab] = useState('貼圖按鈕');
  //#endregion

  //#region tab顯示設定
  const btnTabdata = [
      {
          title:"貼圖按鈕範例",
          key:"貼圖按鈕",
          pageData:<貼圖按鈕範例 />,
          disabled: false,
      },
      {
          title:"圓角按鈕範例",
          key:"圓角按鈕範例",
          pageData:<圓角按鈕範例 />,
          disabled: false,
      },
  ]
  //#endregion

  return (
    <section className="按鈕元件">
      <h2>按鈕元件常用範例</h2>
      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={btnActiveTab} onSelect={(key) => setBtnActiveTab(key)}>

          {/* Tab 選單區 */}
          <Nav className='tabBox'>
              {/* 選項按鈕外層 */}
              <Nav.Item  className='tabItem'>
              {
                  btnTabdata?.map((item)=>{
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
                  btnTabdata?.map((item)=>{
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
    </section>
  );
}
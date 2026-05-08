

import { Tab, Nav } from 'react-bootstrap';
import './_threeJs.scss';

import { useState } from 'react';
import 一般模型範例 from './一般模型範例/一般模型範例';
import 粒子模型範例 from './粒子模型範例/粒子模型範例';



export default function ThreeJs() {

  //#region
  //#endregion

  //#region tab控制
  const [swiperActiveTab, setSwiperActiveTab] = useState('一般模型範例');
  //#endregion

  //#region tab顯示設定
  const swiperTabdata = [
      {
          title:"一般模型範例",
          key:"一般模型範例",
          pageData:( swiperActiveTab === "一般模型範例" && <一般模型範例 /> ),
          disabled: false,
      },
      {
          title:"粒子模型範例",
          key:"粒子模型範例",
          pageData:( swiperActiveTab === "粒子模型範例" && <粒子模型範例 /> ),
          disabled: false,
      },
  ]
  //#endregion

  


  return (
    <section className="ThreeJs範例">
      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={swiperActiveTab} onSelect={(key) => setSwiperActiveTab(key)}>

        {/* 標題設定 */}
        <h2>ThreeJs範例</h2>
        {/* 標題設定 */}

        {/* 元件外層 */}
        <div className="appTabs">
          {/* Tab 選單區 */}
          <Nav className='tabBox'>
              {/* 選項按鈕外層 */}
              <Nav.Item  className='tabItem'>
              {
                  swiperTabdata?.map((item)=>{
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
                  swiperTabdata?.map((item)=>{
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
        </div>
        {/* 元件外層 */}
        
      </Tab.Container>
      {/* 控制層 顯示元素不存在 */}
    </section>
  );
}






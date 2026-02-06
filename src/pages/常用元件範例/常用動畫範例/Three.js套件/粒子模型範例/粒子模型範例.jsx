

import { Tab, Nav } from 'react-bootstrap';
import './_粒子模型範例.scss';

import { useState } from 'react';
import 復數模型展示 from './復數模型展示/復數模型展示';
import 星際穿梭特效展示 from './星際穿梭特效展示/星際穿梭特效展示';


export default function 粒子模型範例() {

  //#region
  //#endregion

  //#region tab控制
  const [swiperActiveTab, setSwiperActiveTab] = useState('復數模型展示');
  //#endregion

  //#region tab顯示設定
  const swiperTabdata = [
      {
          title:"復數模型展示",
          key:"復數模型展示",
          pageData:( swiperActiveTab === "復數模型展示" && <復數模型展示 /> ),
          disabled: false,
      },
      {
          title:"星際穿梭特效展示",
          key:"星際穿梭特效展示",
          pageData:( swiperActiveTab === "星際穿梭特效展示" && <星際穿梭特效展示 /> ),
          disabled: false,
      },
  ]
  //#endregion


  return (
    <section className="粒子模型範例">
      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={swiperActiveTab} onSelect={(key) => setSwiperActiveTab(key)}>

        {/* 標題設定 */}
        <h2>粒子模型範例</h2>
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






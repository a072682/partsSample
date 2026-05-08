import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_react_tab.scss';

import BackGroundAnimation from './背景動畫/back_ground_animation';
import StopMotionAnimation from './骨牌動畫/stop_motion_animation';
import 跑馬燈動畫範例 from './跑馬燈動畫範例/跑馬燈動畫範例';
import threeJs from './threetest.js套件/three_js';
import FramerMotion from './framer_motion/framer_motion';
import 通道影片範例 from './通道影片範例/通道影片範例';
import 進退場動畫範例 from './進退場動畫範例/進退場動畫範例';
import 雜訊介面範例 from './雜訊介面範例/雜訊介面範例';
import gasptest範例 from './gasptest範例/gasptest範例';





export default function 常用動畫元件範例() {

  //#region
  //#endregion

  //#region tab控制
  const [animationActiveTab, setAnimationActiveTab] = useState('背景動畫');
  //#endregion

  //#region tab顯示設定
  const animationTabdata = [
      {
          title:"背景動畫範例",
          key:"背景動畫",
          pageData:<BackGroundAnimation />,
          disabled: false,
      },
      {
          title:"骨牌動畫範例",
          key:"骨牌動畫",
          pageData:<StopMotionAnimation />,
          disabled: false,
      },
      {
          title:"跑馬燈動畫範例",
          key:"跑馬燈動畫",
          pageData:<跑馬燈動畫範例 />,
          disabled: false,
      },
      {
          title:"threeJs套件範例",
          key:"threeJs",
          pageData:(animationActiveTab === "threeJs" && <threeJs />),
          disabled: false,
      },
      {
          title:"FramerMotion套件範例",
          key:"FramerMotion",
          pageData:<FramerMotion />,
          disabled: false,
      },
      {
          title:"通道影片範例",
          key:"通道影片範例",
          pageData:(animationActiveTab === "通道影片範例" && <通道影片範例 />),
          disabled: false,
      },
      {
          title:"進退場動畫範例",
          key:"進退場動畫範例",
          pageData:(animationActiveTab === "進退場動畫範例" && <進退場動畫範例 />),
          disabled: false,
      },
      {
          title:"雜訊介面範例",
          key:"雜訊介面範例",
          pageData:(animationActiveTab === "雜訊介面範例" && <雜訊介面範例 />),
          disabled: false,
      },
      {
          title:"範例",
          key:"gasptest範例",
          pageData:(animationActiveTab === "gasptest範例" && <gasptest範例 />),
          disabled: false,
      },
  ]
  //#endregion

  return (
    <section className="常用動畫元件範例">
      <h2>常用動畫元件範例</h2>
      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={animationActiveTab} onSelect={(key) => setAnimationActiveTab(key)}>

          {/* Tab 選單區 */}
          <Nav className='tabBox'>
              {/* 選項按鈕外層 */}
              <Nav.Item  className='tabItem'>
              {
                  animationTabdata?.map((item)=>{
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
                  animationTabdata?.map((item)=>{
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
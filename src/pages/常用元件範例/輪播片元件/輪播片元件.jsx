

import { Tab, Nav } from 'react-bootstrap';
import './_swiperTab.scss';

import DefaultSwiper from './預設基礎Swiper範本/DefaultSwiper';
import EffectFadeSwiper from './淡入淡出版本/EffectFadeSwiper';
import SwiperWithTab from './搭配tab元件swiper範例/SwiperWithTab';
import SwiperDoubleSample from './大圖連結縮圖版本/SwiperDoubleSample';
import NoAnimationVer from './無動畫版本/noAnimationVer';
import VerticalSwiper from './垂直輪播範例/verticalSwiper';
import { useState } from 'react';



export default function 輪播片元件() {

  //#region
  //#endregion

  //#region tab控制
  const [swiperActiveTab, setSwiperActiveTab] = useState('預設Swiper');
  //#endregion

  //#region tab顯示設定
  const swiperTabdata = [
      {
          title:"預設基礎Swiper範本",
          key:"預設Swiper",
          pageData:<DefaultSwiper />,
          disabled: false,
      },
      {
          title:"無動畫基礎Swiper範本",
          key:"無動畫swiper",
          pageData:(swiperActiveTab === "無動畫swiper" && <NoAnimationVer />),
          disabled: false,
      },
      {
          title:"淡入淡出Swiper範本",
          key:"淡入淡出Swiper",
          pageData:(swiperActiveTab === "淡入淡出Swiper" && <EffectFadeSwiper />),
          disabled: false,
      },
      {
          title:"搭配tab元件swiper範本",
          key:"tab元件Swiper",
          pageData:(swiperActiveTab === "tab元件Swiper" && <SwiperWithTab />),
          disabled: false,
      },
      {
          title:"縮圖swiper連結大圖swiper範例",
          key:"swiper連結swiper",
          pageData:(swiperActiveTab === "swiper連結swiper" && <SwiperDoubleSample/>),
          disabled: false,
      },
      {
          title:"垂直Swiper範本",
          key:"垂直Swiper",
          pageData:(swiperActiveTab === "垂直Swiper" && <VerticalSwiper />),
          disabled: false,
      },
  ]
  //#endregion


  return (
    <section className="輪播片元件">
      <h2>預設Swiper範例</h2>

      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={swiperActiveTab} onSelect={(key) => setSwiperActiveTab(key)}>

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
      </Tab.Container>
      {/* 控制層 顯示元素不存在 */}
    </section>
  );
}






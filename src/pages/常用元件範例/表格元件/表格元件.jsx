import { useEffect, useState } from "react";
import { Tab, Nav } from 'react-bootstrap';
import './_ReactTab.scss';
import UseForm from "./useForm範例/UseForm範例";
import CustomRadio from "./自定義radio範例/CustomRadio";
import NumberInputGroup from "./自訂義input群組(帶按鈕)/NumberInputGroup";
import ReactPagination from "./頁碼元件範例/使用層/ReactPagination";
import MessageItem from "./訊息列表範例/訊息列表";
import DefaultForm from "./簡單表格範例/DefaultForm";
import Input元件列表 from "./input元件列表/Input元件列表.jsx";
import 編輯器套件 from "./編輯器套件/編輯器套件";


export default function 表格元件() {
  
  //#region
  //#endregion

  //#region 宣告自訂義input群組(帶按鈕)初始數值
  const[numData,setNumData] = useState(0);
  useEffect(()=>{console.log(numData);},[numData])
  //#endregion

  //#region tab控制
  const [formTabActiveTab, setFormTabActiveTab] = useState('簡單表格');
  //#endregion

  //#region tab顯示設定
  const formTabdata = [
    {
        title:"簡單表格範例",
        key:"簡單表格",
        pageData:<DefaultForm />,
        disabled: false,
    },
    {
        title:"Input元件列表",
        key:"Input元件",
        pageData:<Input元件列表 />,
        disabled: false,
    },
    {
        title:"UseForm範例",
        key:"UseForm",
        pageData:<UseForm />,
        disabled: false,
    },
    {
        title:"自定義radio範例",
        key:"自定義radio",
        pageData:<CustomRadio />,
        disabled: false,
    },
    {
        title:"自訂義input群組(帶按鈕)",
        key:"自訂義inputWithBtn",
        pageData:(
        <NumberInputGroup 
            id="keyId" //定義的id
            title="自定義"  //label的內容
            value={numData} //初始數值
            unit="mm" //顯示的單位
            dataOutput={(num) => setNumData(num)} //內部的數值有更新會寫入numData狀態中
            min = {0} //最低數值
            max = {50} //最高數值
        />
        ),
        disabled: false,
    },
    {
        title:"頁碼元件範例",
        key:"頁碼元件",
        pageData:<ReactPagination />,
        disabled: false,
    },
    {
        title:"訊息列表範例",
        key:"訊息列表",
        pageData:<MessageItem />,
        disabled: false,
    },
    {
        title:"編輯器套件",
        key:"編輯器套件",
        pageData:<編輯器套件 />,
        disabled: false,
    },
  ]
  //#endregion

  

  return (
    <section className="表格元件">
      <h2>表格元件常用範例</h2>
      {/* 控制層 顯示元素不存在 */}
      <Tab.Container activeKey={formTabActiveTab} onSelect={(key) => setFormTabActiveTab(key)}>

          {/* Tab 選單區 */}
          <Nav className='tabBox'>
              {/* 選項按鈕外層 */}
              <Nav.Item  className='tabItem'>
              {
                  formTabdata?.map((item)=>{
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
                  formTabdata?.map((item)=>{
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
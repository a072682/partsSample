
import { useEffect, useState } from 'react';
import './_InputGroup.scss';
import NumberInputGroup from './NumberInputGroup/NumberInputGroup';
import CustomRadio from './自定義radio/CustomRadio';
import MessageItem from './訊息Item/訊息item';
import ReactPagination from './頁碼元件/ReactPagination';


import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { div } from 'framer-motion/client';


export default function InputGroup() {


    const[numData,setNumData] = useState(0);
    useEffect(()=>{console.log(numData);},[numData])

    //#region
    //#endregion

    //#region 頁碼元件控制用
      //#region 模擬來源資料
      const inputData = [
        "item01","item02","item03","item04","item05","item06","item07","item08","item09","item010","item011","item012",
      ]
      //#endregion

      //#region 當前頁面，初始為第 1 頁
      const [currentPage, setCurrentPage] = useState(1);
      //#endregion

      //#region 一頁中顯示項目上限
      const itemsPerPage = 4;
      //#endregion

      //#region 總頁數設定
      //計算總頁數
      //inputData.length 為來源資料的數量除以一頁中顯示上限
      //例如有12筆資料 則 一頁上限為4 那麼就會有3頁
      //Math.ceil的意思是:無條件進位
      //Math.ceil(3.1) 取得 4 
      const totalPages = Math.ceil(inputData.length / itemsPerPage);
      //#endregion

      //#region 計算當前要顯示的項目
      //startIndex代表當前顯示的那一頁開始的資料編號
      //假設一頁顯示4項資料則index為 1~3 第二頁為4~7
      //計算方法為當前頁數-1在乘上該頁數量限制
      //第一頁 1-1*4 = 0 = startIndex 
      //第一頁 0 + 4 = 4 = endIndex
      //endIndex代表當前顯示的那一頁開始的資料編號
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      //使用.slice 顯示區間段的資料
      //slice(0, 4) => index: 0,1,2,3 這 4 筆
      //currentItems 為最終內容顯示陣列
      const currentItems = inputData.slice(startIndex, endIndex);
      //#endregion
    //#endregion

    return (
      <div className="ExampleBox">
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h4 className="mb-4">InputGroup範例</h4>
              {/* 自訂義input群組 */}
              <div className="inputGroup custom">
                  {/* 自訂義標題 */}
                  <label htmlFor="custom-input" className="customLabel">自訂義標題</label>
                  {/* 自訂義標題 */}

                  {/* 自訂義input */}
                  <input
                      type="text"
                      id="custom-input"
                      className="customInput"
                      placeholder="請輸入帳號名稱"
                  />
                  {/* 自訂義input */}
              </div>
              {/* 自訂義input群組 */}

              <Accordion defaultActiveKey="" className="defaultReactAccordionContent my-24">
                  {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
                  <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                      <Accordion.Header className="defaultReactAccordionHeader">
                          程式碼說明
                      </Accordion.Header>
                      <Accordion.Body className="defaultReactAccordionBody p-0">
                          
                          <pre className="language-html m-0 p-16">
                              <div>HTML</div>
                              <code className="language-html">
                                  {
                                  dedent(
                                      `
                                      import { useForm } from 'react-hook-form';//宣告元件
                                      import './_useForm.scss';//讀取樣式

                                      //元件設定
                                      // 放置於return上方

                                      // 元件本體
                                      // 放置於return下方
                                      {/* 自訂義input群組 */}
                                      <div className="inputGroup custom">
                                          {/* 自訂義標題 */}
                                          <label htmlFor="custom-input" className="customLabel">自訂義標題</label>
                                          {/* 自訂義標題 */}

                                          {/* 自訂義input */}
                                          <input
                                              type="text"
                                              id="custom-input"
                                              className="customInput"
                                              placeholder="請輸入帳號名稱"
                                          />
                                          {/* 自訂義input */}
                                      </div>
                                      {/* 自訂義input群組 */}
                                      `
                                  )
                                  }       
                              </code>
                          </pre>
                          <pre className="language-html m-0 p-16">
                              <div>SCSS</div>
                              <code className="language-html">
                                  {
                                      dedent(
                                          `
                                          //自訂義input群組
                                          .inputGroup {
                                              display: flex;
                                              flex-direction: column;
                                              gap: 12px;

                                              &.custom{

                                                //自訂義label標題
                                                .customLabel {
                                                  font-size: 16px;
                                                  font-weight: 600;
                                                  color: #4a148c;
                                                }
                                                //自訂義label標題

                                                //自訂義input
                                                .customInput{
                                                  padding: 16px;
                                                  font-size: 16px;
                                                  border: 2px solid #ba68c8;
                                                  border-radius: 8px;
                                                  background-color: #fffafc;
                                                  color: #4a148c;
                                                  box-shadow: none;
                                                  outline: none;

                                                  //input的placeholder字體顏色
                                                  &::placeholder{
                                                    color: #ce93d8;
                                                  }
                                                  //input的placeholder字體顏色

                                                  //點擊input時觸發的樣式
                                                  &:focus{
                                                    border: 2px solid #7b1fa2;
                                                  }
                                                  //點擊input時觸發的樣式
                                                }
                                                //自訂義input
                                              }
                                              
                                          }
                                          //自訂義input群組
                                          `
                                      )
                                  }       
                              </code>
                          </pre>
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
            </div>
            <div className='col-12 mt-24'>
              <h4 className="mb-4">搜尋欄範例</h4>
              {/* 搜尋欄範例 */}
              <div className="searchBar">
                {/* input區塊 */}
                <input
                  type="text"
                  className="searchInput"
                  placeholder="搜尋"
                />
                {/* input區塊 */}

                {/* 按鈕區塊 */}
                <button className="searchBtn">
                  <span class="material-symbols-outlined iconSet">
                    search
                  </span>
                </button>
                {/* 按鈕區塊 */}
              </div>
              {/* 搜尋欄範例 */}

              <Accordion defaultActiveKey="" className="defaultReactAccordionContent my-24">
                  {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
                  <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                      <Accordion.Header className="defaultReactAccordionHeader">
                          程式碼說明
                      </Accordion.Header>
                      <Accordion.Body className="defaultReactAccordionBody p-0">
                          
                          <pre className="language-html m-0 p-16">
                              <div>HTML</div>
                              <code className="language-html">
                                  {
                                  dedent(
                                      `
                                      import { useForm } from 'react-hook-form';//宣告元件
                                      import './_useForm.scss';//讀取樣式

                                      //元件設定
                                      // 放置於return上方

                                      // 元件本體
                                      // 放置於return下方
                                      {/* 自訂義input群組 */}
                                      <div className="inputGroup custom">
                                          {/* 自訂義標題 */}
                                          <label htmlFor="custom-input" className="customLabel">自訂義標題</label>
                                          {/* 自訂義標題 */}

                                          {/* 自訂義input */}
                                          <input
                                              type="text"
                                              id="custom-input"
                                              className="customInput"
                                              placeholder="請輸入帳號名稱"
                                          />
                                          {/* 自訂義input */}
                                      </div>
                                      {/* 自訂義input群組 */}
                                      `
                                  )
                                  }       
                              </code>
                          </pre>
                          <pre className="language-html m-0 p-16">
                              <div>SCSS</div>
                              <code className="language-html">
                                  {
                                      dedent(
                                          `
                                          //自訂義input群組
                                          .inputGroup {
                                              display: flex;
                                              flex-direction: column;
                                              gap: 12px;

                                              &.custom{

                                                //自訂義label標題
                                                .customLabel {
                                                  font-size: 16px;
                                                  font-weight: 600;
                                                  color: #4a148c;
                                                }
                                                //自訂義label標題

                                                //自訂義input
                                                .customInput{
                                                  padding: 16px;
                                                  font-size: 16px;
                                                  border: 2px solid #ba68c8;
                                                  border-radius: 8px;
                                                  background-color: #fffafc;
                                                  color: #4a148c;
                                                  box-shadow: none;
                                                  outline: none;

                                                  //input的placeholder字體顏色
                                                  &::placeholder{
                                                    color: #ce93d8;
                                                  }
                                                  //input的placeholder字體顏色

                                                  //點擊input時觸發的樣式
                                                  &:focus{
                                                    border: 2px solid #7b1fa2;
                                                  }
                                                  //點擊input時觸發的樣式
                                                }
                                                //自訂義input
                                              }
                                              
                                          }
                                          //自訂義input群組
                                          `
                                      )
                                  }       
                              </code>
                          </pre>
                      </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
            </div>
            <div className='col-12 mt-24'>
              <h4 className="mb-4">InputGroup(帶按鈕)</h4>
              <NumberInputGroup id="keyId" 
                                title="自定義" 
                                value={numData} 
                                unit="mm" 
                                dataOutput={(num) => setNumData(num)}
              />
            </div>
            <div className='col-12 mt-24'>
              <h4 className="mb-4">自定義radio</h4>
              <CustomRadio />
            </div>
            <div className='col-12 mt-24'>
              <h4 className="mb-4">訊息item</h4>
              <MessageItem />
            </div>
            <div className='col-12 mt-24'>
              <h4 className="mb-4">頁碼元件</h4>
              <div className='showBox'>
                {
                  currentItems?.map((data,index)=>{
                    return(
                      <div key={index} className='itemBox'>{data}</div>
                    )
                  })
                }
              </div>
              <ReactPagination 
                currentPage={currentPage}//當前頁碼
                totalPages={totalPages}//總頁碼
                onPageChange={setCurrentPage}//判斷是否更新當前頁碼
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  

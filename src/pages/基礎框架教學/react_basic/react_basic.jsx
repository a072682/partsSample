

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import dedent from 'dedent';//去除多餘空白保持縮排格式
import './_react_basic.scss';



export default function ReactBasic() {
  return (
    <div className='ReactBasic'>
      <div className="container">
        <div className='row'>
            <div className='col'>
                <h3 className='mb-24'>基礎React+Vite前端架構和創建流程</h3>
                <div className="DefaultReact">
                  <p className='fw-bold fs-20'>安裝環境</p>
                  <p className='fw-bold'>npm create vite@latest</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact01.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>詢問是否要開啟專案。</p>
                  <p>選擇y(同意)</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact02.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>輸入專案資料夾名稱</p>
                  <p>這邊不管輸入大小寫都會轉為小寫</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact03.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>選擇專案框架</p>
                  <p>選擇react</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact04.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>選擇專案支援的語言，根據需求選擇。</p>
                  <p>選擇JavaScript</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact05.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>詢問是否要使用最新的仍「實驗性」的打包器</p>
                  <p>選擇no，使用穩定版。</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact06.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>詢問是否現在就要使用npm 安裝套件並啟動專案</p>
                  <p>選擇yes</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact07.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>出現此畫面代表專案建立完成且運行成功</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact08.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>建立完成後的環境</p>
                  <div className='imgBox my-24'>
                    <img className='imgSet' src="/images/基礎框架教學/ReactBasic/DefaultReact09.png" alt="" />    
                  </div>
                  <p className='fw-bold fs-20'>將多餘資料刪除後的剩餘結構</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              專案資料夾/
                                  ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                  ├── public/ //放「不需要經過打包處理」的靜態檔案，logo/圖片等等
                                  ├── src/ //真正寫程式的地方
                                  │    ├──App.jsx
                                  │    └──main.jsx
                                  ├── .gitignore //告訴 Git：哪些檔案不要上傳
                                  ├── eslint.config.js //程式碼規則檢查設定，不影響執行。
                                  ├── index.html
                                  ├── package-lock.json //套件實際安裝版本
                                  ├── package.json //套件清單
                                  ├── README.md
                                  └── vite.config.js //Vite 的設定檔
                            `)   
                          }       
                      </code>
                  </pre>
                  <p className='fw-bold fs-20'>建議安裝套件</p>
                  <p>BS5套件</p>
                  <p className='fs-20 fw-bold'>npm install react-bootstrap</p>
                  <p>react-BS套件</p>
                  <p className='fs-20 fw-bold'>npm install react-bootstrap bootstrap</p>
                  <p>react-router套件</p>
                  <p className='fs-20 fw-bold'>npm install react-router-dom@6</p>
                  <p>ReduxToolkit套件</p>
                  <p className='fs-20 fw-bold'>npm install @reduxjs/toolkit</p>
                  <p className='fs-20 fw-bold'>npm install react-redux</p>
                  <p>動畫效果套件</p>
                  <p className='fs-20 fw-bold'>npm install framer-motion</p>
                  <p>輪播片套件</p>
                  <p className='fs-20 fw-bold'>npm install swiper</p>
                  <p>表單套件</p>
                  <p className='fs-20 fw-bold'>npm install react-hook-form</p>
                  <p>GitHubPage上傳套件</p>
                  <p className='fs-20 fw-bold'>npm install GitHub Pages</p>
                  <p>命令請求套件</p>
                  <p className='fs-20 fw-bold'>npm i axios</p>
                  <p></p>
                  <p className='fw-bold fs-20'>安裝基礎套件後的檔案結構</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              專案資料夾/
                                  ├── node_modules //套件存儲位置，系統自動新增，此位置不會使用
                                  ├── public/
                                  │     └──images/
                                  ├── src 
                                  │    ├──assets/
                                  │    ├──styles/
                                  │    │    ├── helpers/
                                  │    │    │      ├──_variables-dark.scss
                                  │    │    │      └──_variables.scss
                                  │    │    ├── Universal/
                                  │    │    │      └──_Universal.scss
                                  │    │    └──all.scss
                                  │    │
                                  │    ├──components/
                                  │    │    └──common/
                                  │    │        ├──Header/
                                  │    │        │  ├──_Header.scss
                                  │    │        │  └──Header.jsx
                                  │    │        ├──Footer/
                                  │    │        │    ├──_Footer.scss
                                  │    │        │    └──Footer.jsx
                                  │    │        ├──Modal/
                                  │    │        │    ├──TestModal/
                                  │    │        │    │  ├──_TestModal.scss
                                  │    │        │    │  └──TestModal.jsx
                                  │    │        │    └──TestModa2/
                                  │    │        │      ├──_TestModal02.scss
                                  │    │        │      └──TestModal02.jsx
                                  │    │        └──ModalRoot/
                                  │    │            └──ModalRoot.jsx
                                  │    │
                                  │    ├──layouts/
                                  │    │   └──FrontLayout.jsx
                                  │    │
                                  │    ├──pages/
                                  │    │    ├──IndexPage.jsx
                                  │    │    ├──Page0.jsx
                                  │    │    └──Page1.jsx
                                  │    │
                                  │    ├──router/
                                  │    │    └──index.jsx
                                  │    │ 
                                  │    │
                                  │    ├──slice/
                                  │    │    ├──modalSlice.js
                                  │    │    └──testSlice.js
                                  │    │ 
                                  │    └──store.js
                                  
                                  │    ├──App.jsx
                                  │    └──main.jsx
                                  ├──.env
                                  ├── .gitignore //告訴 Git：哪些檔案不要上傳
                                  ├── eslint.config.js //程式碼規則檢查設定，不影響執行。
                                  ├── index.html
                                  ├── package-lock.json //套件實際安裝版本
                                  ├── package.json //套件清單
                                  ├── README.md
                                  └── vite.config.js //Vite 的設定檔
                            `)   
                          }       
                      </code>
                  </pre>
                  <p className='fw-bold fs-20'>新增的檔案內容</p>
                  <p>src/components/common/Header/Header.jsx</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              import { Link, NavLink } from "react-router-dom";
                              import { useState } from "react";
                              import { Nav, Navbar } from "react-bootstrap";

                              import './_header.scss';



                              function Header(){

                                  //#region
                                  //#endregion
                                  
                                  //#region 側邊狀態
                                      //側邊狀態
                                          // const [onOpen, setOnOpen] = useState(false); // 控制 offcanvas 開關
                                          // useEffect(()=>{},[onOpen]);

                                          // const handleOpen = () => setOnOpen(true);
                                          // const handleClose = () => setOnOpen(false);
                                      //側邊狀態
                                  //#endregion

                                  const [expanded, setExpanded] = useState(false);
                                  
                                  return(
                                      <>
                                          {/* 元件最外圍 */}
                                          <Navbar expand="lg" className="navBg-set" expanded={expanded} id="siteHeader">
                                              {/* /*內容本體區塊*/}
                                              <div className='navbar-box'>
                                                  {/* 左上角 Logo */}
                                                  <Link to="/" className='navbarLogo-box'>
                                                      <img className="navbarLogoImg-set" src={\`\${import.meta.env.BASE_URL}assets/images/Header/logo.png\`} alt="home-section2-1" />
                                                  </Link>
                                                  {/* 左上角 Logo */}

                                                  
                                                  {/* lg 以上選項區塊 */}
                                                  <div className="navbarItem-box d-none d-lg-flex">
                                                      {/* link選項 */}
                                                      <Nav.Link as={NavLink} to="/Page0" className="navbarItem-set">Page0</Nav.Link>
                                                      <Nav.Link as={NavLink} to="/Page1" className="navbarItem-set">Page1</Nav.Link>
                                                      {/* link選項 */}
                                                  </div>
                                                  {/* lg 以上選項區塊 */}

                                                  {/* lg 以上會員頭像 */}
                                                  <button className="userImg-box d-none d-lg-flex">
                                                      <img className="userImg-set" src={\`\${import.meta.env.BASE_URL}assets/images/Header/log01.png\`} alt="log01" />
                                                  </button>
                                                  
                                                  {/* lg 以下的右上角：漢堡選單按鈕 */}
                                                  <div className="navbarMenuIcon-box d-flex d-lg-none">
                                                      <button className="MenuIconBtn-set">
                                                          <img className="MenuIconImg-set" src={\`\${import.meta.env.BASE_URL}assets/images/Header/齒輪.png\`} alt="齒輪" />
                                                      </button>
                                                  </div>
                                                  {/* lg 以下的右上角：漢堡選單按鈕 */}
                                              </div>
                                              {/* /*內容本體區塊*/}
                                          </Navbar>
                                          {/* 元件最外圍 */}
                                          {/* <OffcanvasPage onOpen={onOpen} handleClose={handleClose} loginState={loginState}/> */}
                                      </>
                                  )
                              }

                              export default Header;
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/Header/_Header.scss</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              /* 元件最外圍 */
                              .navbar.navBg-set{ 
                                  width: 100%;
                                  position: fixed;
                                  top: 0;
                                  z-index: 100;

                                  /*背景*/
                                  background:linear-gradient(90deg, #000000, #60003A);
                                  /*背景*/

                                  /*邊框設定*/
                                  border-bottom: 5px solid;
                                  border-image: linear-gradient(90deg, #ffb3f7 0%, #40003a 30%,#f93b5c 100%) 1;
                                  /*邊框設定*/
                                  padding: 8px 0px;

                                  /*內容本體區塊*/
                                  .navbar-box{
                                      width: 100%;
                                      display: flex;
                                      justify-content: space-between;
                                      align-items: center;
                                      /* 左上角 Logo */
                                      .navbarLogo-box{
                                          width: 185px;
                                          height: auto;
                                          .navbarLogoImg-set{
                                              max-width: 100%;
                                              height: auto;
                                              object-fit: cover;
                                          }
                                      }
                                      /* 左上角 Logo */

                                      /* lg 以上選項區塊 */
                                      .navbarItem-box{
                                          justify-content: center;
                                          align-items: center;
                                          gap: 24px;
                                          // link選項
                                          .navbarItem-set{
                                              font-size: 16px;
                                              padding: 12px 8px 9px 8px;
                                              border-bottom:3px solid transparent;
                                              color: #ffffff;

                                              &:hover{
                                                  border-bottom:3px solid #E22288;
                                              }

                                              &.active{
                                                  border-bottom:3px solid #E22288;
                                              }
                                          }
                                          // link選項
                                      }
                                      /* lg 以上選項區塊 */

                                      /* lg 以上會員頭像 */
                                      .userImg-box{
                                          width: 48px;
                                          height: 48px;
                                          border: none;
                                          padding: 0px;
                                          background-color: transparent;
                                          display: flex;
                                          justify-content: center;
                                          align-items: center;
                                          .userImg-set{
                                              width: 100%;
                                              height: auto;
                                              object-fit: cover;
                                              border-radius:50%;
                                          }
                                      }
                                      /* lg 以上會員頭像 */

                                      /* lg 以下的右上角：漢堡選單按鈕 */
                                      .navbarMenuIcon-box{
                                          display: flex;
                                          justify-content: center;
                                          align-items: center;
                                          .MenuIconBtn-set{
                                              width: 48px;
                                              height: 48px;
                                              border: none;
                                              background-color: transparent;
                                              .MenuIconImg-set{
                                                  max-width: 100%;
                                                  height: auto;
                                                  object-fit: cover;
                                                  color: #ffffff;
                                                  animation: spin 10s linear infinite;

                                                  /* 旋轉動畫 */
                                                  @keyframes spin {
                                                  to { transform: rotate(360deg); }
                                                  }
                                              }
                                          }
                                      }
                                  }
                                  /*內容本體區塊*/

                              }
                              /* 元件最外圍 */
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/Modal/TestModal/TestModal.jsx</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              import { useNavigate } from "react-router-dom";
                              import { useDispatch, useSelector } from "react-redux";
                              import './_TestModal.scss';

                              //setHandleLoginPageModal,loginModalShow,setLoginModalShow 都移除

                              function TestModal ({onClose, onSwitch}){

                                  //#region
                                  //#endregion

                                  //#region 跳轉網址前置宣告
                                      const navigate = useNavigate();
                                  //#endregion

                                  //#region 讀取中央函式前置宣告
                                      const dispatch = useDispatch();
                                  //#endregion
                                  
                                  //#region 點背景遮罩時Modal關閉,點內容不關
                                      const handleBackdropClick = (e) => {
                                          if (e.target === e.currentTarget) onClose?.();
                                      };
                                  //#endregion

                                  return(
                                      <>
                                          {/* 遮罩 */}
                                          <div
                                              className="testModal test01 show" 
                                              role="dialog"
                                              onClick={handleBackdropClick}
                                              aria-modal="true"
                                              tabIndex={-1}
                                          >

                                              {/* 定位至置中效果 */}
                                              <div className="modalDialog">

                                                  {/* model整體元件 */}
                                                  <div className="modalContent border-0 ">

                                                      {/* header設定 */}
                                                      <div className="modalHeader LoginModalHeaderBgSet">
                                                          header內容
                                                      </div>

                                                      {/* model本體背景 */}
                                                      <div className="LoginModalBodySet">
                                                          本體內容 test01
                                                          <button type="button"
                                                                  onClick={() => {onSwitch?.();}}
                                                          >
                                                              測試切換功能
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </>
                                  )
                              }
                              export default TestModal
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/Modal/TestModal/_TestModal.scss</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              .testModal{ 
                                  width: 100%;
                                  min-height: 100dvh;
                                  background-color: rgba(0,0,0,0.5);
                                  position: fixed;   /* 覆蓋視窗 */
                                  inset: 0;          /* top/right/bottom/left: 0 */
                                  z-index: 2000;     /* 確保比 header 等都高；> 1055 即可 */
                                  display: flex;     /* 用 flex 置中內容（不依賴 bootstrap 的 class） */
                                  align-items: center;
                                  justify-content: center;
                                  overflow-y: auto;             /* 🔥 遮罩本身可上下滾動 */
                                  -webkit-overflow-scrolling: touch; /* iOS 慣性滾動 */
                                  /* 手機上不要垂直置中，否則標題常被吃掉且無法往上捲 */
                                  @media (max-width: 576px){
                                      align-items: flex-start;    /* 🔥 靠上排列 */
                                      padding: 12px;
                                  }
                                  &.test01{
                                      //定位效果
                                      .modalDialog{

                                          // model整體元件
                                          .modalContent{

                                              //header設定
                                              .modalHeader{
                                                  border: none;
                                                  // header背景設定
                                                  &.LoginModalHeaderBgSet{
                                                      background-color: #6E002C;
                                                  }
                                                  
                                              }

                                              //model本體設定
                                              .LoginModalBodySet{
                                                  display: flex;
                                                  flex-direction: column;
                                                  justify-content: center;
                                                  align-items: center;
                                                  background: linear-gradient(90deg, #000000 0%,#60003A 100%);
                                                  border-radius: 0 0 5px 5px;
                                                  border:none;
                                                  padding: 32px;
                                                  gap: 12px;
                                                  color: #ffffff;
                                              }
                                          }
                                      }
                                  }  
                              }
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/Modal/TestModal/TestModal02.jsx</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              import { useNavigate } from "react-router-dom";
                              import { useDispatch, useSelector } from "react-redux";
                              import './_TestModal02.scss';

                              //setHandleLoginPageModal,loginModalShow,setLoginModalShow 都移除

                              function TestModal02 ({onClose, onSwitch}){

                                  //#region
                                  //#endregion

                                  //#region 跳轉網址前置宣告
                                      const navigate = useNavigate();
                                  //#endregion

                                  //#region 讀取中央函式前置宣告
                                      const dispatch = useDispatch();
                                  //#endregion
                                  

                                  //#region 點背景遮罩時Modal關閉,點內容不關
                                      const handleBackdropClick = (e) => {
                                          if (e.target === e.currentTarget) onClose?.();
                                      };
                                  //#endregion

                                  return(
                                      <>
                                          {/* 遮罩 */}
                                          <div
                                              className="testModal test02 show" 
                                              role="dialog"
                                              onClick={handleBackdropClick}
                                              aria-modal="true"
                                              tabIndex={-1}
                                          >

                                              {/* 定位至置中效果 */}
                                              <div className="modalDialog">

                                                  {/* model整體元件 */}
                                                  <div className="modalContent border-0 ">

                                                      {/* header設定 */}
                                                      <div className="modalHeader LoginModalHeaderBgSet">
                                                          header內容
                                                      </div>

                                                      {/* model本體背景 */}
                                                      <div className="LoginModalBodySet">
                                                          本體內容 test02
                                                          <button type="button"
                                                                  onClick={() => {onSwitch?.();}}
                                                          >
                                                              測試切換功能
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </>
                                  )
                              }
                              export default TestModal02
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/Modal/TestModal02/_TestModal02.scss</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              .testModal{
                                  width: 100%;
                                  min-height: 100dvh;
                                  background-color: rgba(0,0,0,0.5);
                                  position: fixed;   /* 覆蓋視窗 */
                                  inset: 0;          /* top/right/bottom/left: 0 */
                                  z-index: 2000;     /* 確保比 header 等都高；> 1055 即可 */
                                  display: flex;     /* 用 flex 置中內容（不依賴 bootstrap 的 class） */
                                  align-items: center;
                                  justify-content: center;
                                  overflow-y: auto;             /* 🔥 遮罩本身可上下滾動 */
                                  -webkit-overflow-scrolling: touch; /* iOS 慣性滾動 */
                                  /* 手機上不要垂直置中，否則標題常被吃掉且無法往上捲 */
                                  @media (max-width: 576px){
                                      align-items: flex-start;    /* 🔥 靠上排列 */
                                      padding: 12px;
                                  }
                                  &.test02{
                                      //定位效果
                                      .modalDialog{

                                          // model整體元件
                                          .modalContent{

                                              //header設定
                                              .modalHeader{
                                                  border: none;
                                                  // header背景設定
                                                  &.LoginModalHeaderBgSet{
                                                      background-color: #6E002C;
                                                  }
                                                  
                                              }

                                              //model本體設定
                                              .LoginModalBodySet{
                                                  display: flex;
                                                  flex-direction: column;
                                                  justify-content: center;
                                                  align-items: center;
                                                  background: linear-gradient(90deg, #000000 0%,#60003A 100%);
                                                  border-radius: 0 0 5px 5px;
                                                  border:none;
                                                  padding: 32px;
                                                  gap: 12px;
                                                  color: #ffffff;
                                              }
                                          }
                                      }
                                  }  
                              }
                            `)   
                          }       
                      </code>
                  </pre>
                  <p>src/components/common/ModalRoot/ModalRoot.jsx</p>
                  <pre className="language-html m-0 p-16">
                      <code className="language-html">
                          {   
                            dedent(`
                              import { useEffect, useMemo } from "react";
                              import { createPortal } from "react-dom";
                              import { useDispatch, useSelector } from "react-redux";
                              import { close, open, MODALS } from "../../../slice/modalSlice";
                              import TestModal from "../Modal/TestModal/TestModal";
                              import TestModal02 from "../Modal/TestModal02/TestModal02";

                              export default function ModalRoot() {

                                  //#region 讀取中央函式前置宣告
                                      const dispatch = useDispatch();
                                  //#endregion

                                  //#region 讀取中央登入資料
                                      //讀取中央資料
                                      const active = useSelector((state)=>{
                                          return(
                                              state.modal.activeModal
                                          )
                                      })
                                      useEffect(()=>{},[active])
                                  //#endregion

                                  //#region 有開任何一個 modal 時，鎖 body 滾動
                                  useEffect(() => {
                                      const prev = document.body.style.overflow;
                                      if (active) {
                                          document.body.style.overflow = "hidden";
                                          console.log("滾動鎖住");
                                      }else{
                                          document.body.style.overflow = prev || "auto";
                                          console.log("滾動解除");
                                      } 
                                      return () => { 
                                          document.body.style.overflow = prev || "auto"; 
                                      };
                                  }, [active]);
                                  //#endregion

                                  //#region ⎋ 按 ESC 關閉（可選）
                                    useEffect(() => {
                                        //如果modal為關閉則跳出
                                        if (!active) return;
                                        //如果modal為關閉則跳出

                                        //如果目標案件為esc則關閉
                                        const onKey = (event) => {
                                            if (event.key === "Escape") {
                                                dispatch(close());
                                            }
                                        };
                                        //如果目標案件為esc則關閉

                                        //案鍵被按下的那一刻觸發(addEventListener)
                                        window.addEventListener("keydown", onKey);
                                        //案鍵被按下的那一刻觸發(addEventListener)

                                        //組件卸載時觸發(removeEventListener)
                                        return () => window.removeEventListener("keydown", onKey);
                                        //組件卸載時觸發(removeEventListener)
                                    }, [active, dispatch]);
                                  //#endregion

                                  // 依名稱決定要渲染哪個 modal 內容
                                  const content = useMemo(() => {
                                    //如果狀態名稱是LOGIN
                                    if (active === MODALS.TESTMODAL) {
                                      return (
                                        <TestModal
                                          //如果要關閉就使用 onClose?()即可並不是onClose執行完就會執行onSwitch
                                          onClose={() => dispatch(close())}
                                          //如果要關閉就使用 onClose?()即可並不是onClose執行完就會執行onSwitch
                                          onSwitch={() => dispatch(open(MODALS.TESTMODAL02))}
                                        />
                                      );
                                    }
                                    //如果狀態名稱是REGISTER
                                    if (active === MODALS.TESTMODAL02) {
                                      return (
                                        <TestModal02
                                          onClose={() => dispatch(close())}
                                          onSwitch={() => dispatch(open(MODALS.TESTMODAL))}
                                        />
                                      );
                                    }
                                    return null;
                                  }, [active, dispatch]);

                                  // 沒有任何 modal，要回傳 null（不渲染）
                                  if (!active) return null;

                                // 透過 Portal 掛到 body，避免被父層 overflow/z-index 影響
                                return createPortal(
                                  content,
                                  document.body
                                );
                              }
                            `)   
                          }       
                      </code>
                  </pre>
                </div>
            </div>
        </div>
      </div>
    </div>
    
  );
}






import { useEffect, useState } from 'react';
import './_ReactCustomDropdown.scss';
import { Accordion, Dropdown } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式


function ReactCustomDropdown() {

  //元件判斷是否展開狀態
  const [show, setShow] = useState(false);
  //元件判斷是否展開狀態

  //元件標頭狀態
  const [selectedValue, setSelectedValue] = useState("標頭內容");
  //元件標頭狀態
  
  //元件內部第二層是否展開判斷狀態
  const [activeMain, setActiveMain] = useState(null);
  //元件內部第二層是否展開判斷狀態

  //元件內部第三層是否展開判斷狀態
  const [activeSub, setActiveSub] = useState(null);
  //元件內部第三層是否展開判斷狀態

  //元件展開內容
  const options = [
    {
      label: "第一層選項1",
      children: [
        { label: "第二層選項1", children: ["第三層選項1", "第三層選項2", "第三層選項3"] },
        { label: "第二層選項2", children: ["第三層選項4", "第三層選項5", "第三層選項6"] }
      ]
    },
    {
      label: "第一層選項2",
      children: [
        { label: "第二層選項3", children: ["第三層選項7", "第三層選項8", "第三層選項9"] },
        { label: "第二層選項4", children: ["第三層選項10", "第三層選項11", "第三層選項12"] }
      ]
    }
  ];
  //元件展開內容

  const handleSelect = (main, sub, leaf) => {
    setSelectedValue(`${main} > ${sub} > ${leaf}`);
    setShow(false);
    setActiveMain(null);
    setActiveSub(null);
  };

  useEffect(()=>{},[show])

  return (
    <>
      {/* 元件最外層 */}
      <Dropdown className='Dropdown' show={show} onToggle={(isOpen) => setShow(isOpen)}>

        {/* 元件標頭 */}
        <Dropdown.Toggle className='DropdownHeader' as="div" onClick={() => {setShow(!show);setActiveMain(null)}}> 
            {selectedValue}
        </Dropdown.Toggle>
        {/* 元件標頭 */}

        {/* 元件本體 */}
        <Dropdown.Menu className="triple-dropdown-menu">
          {/* 內部第一層 */}
          <div className="menu-column main-menu">
            {
              options.map((main, i) => (
                /* 內部第一層選項設定 */
                <button key={i} className='menu-btn' onClick={() => {
                  setActiveMain(main.label);
                  setActiveSub(null); // ✅ 切換主選單時重置子選單
                }}>
                  {main.label}
                </button>
                /* 內部第一層選項設定 */
              ))
            }

            {activeMain && (
              /* 內部第二層 */
              <div className="menu-column sub-menu">
                {
                  options.find(m => m.label === activeMain)?.children.map((sub, i) => (
                    /* 內部第二層選項設定 */
                    <button key={i} className='menu-btn' onClick={() => {
                      setActiveSub(sub.label);
                      setSelectedValue("請選擇發票資訊"); // ✅ 重新選擇中間層時重設已選
                    }}>
                      {sub.label}
                    </button>
                    /* 內部第二層選項設定 */
                  ))
                }

                {activeSub && (
                  /* 內部第三層 */
                  <div className="menu-column leaf-menu">
                    {
                      options
                        .find(m => m.label === activeMain)
                        ?.children.find(s => s.label === activeSub)
                        ?.children.map((leaf, i) => (
                          /* 內部第三層選項設定 */
                          <button key={i} className='menu-btn leaf' onClick={() => handleSelect(activeMain, activeSub, leaf)}>
                            {leaf}
                          </button>
                          /* 內部第三層選項設定 */
                        ))
                    }
                  </div>
                  /* 內部第三層 */
                )}
              </div>
              /* 內部第二層 */
            )}
          </div>
          {/* 內部第一層 */}
        </Dropdown.Menu>
        {/* 元件本體 */}
      </Dropdown>
      {/* 元件最外層 */}

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
                              import { useEffect, useState } from 'react';//宣告狀態
                              import './_ReactCustomDropdown.scss';//讀取樣式
                              import { Dropdown } from 'react-bootstrap';//宣告元件
                              
                              // 設定檔放置於return上方

                                //元件判斷是否展開狀態
                                  const [show, setShow] = useState(false);
                                //元件判斷是否展開狀態

                                //元件標頭狀態
                                  const [selectedValue, setSelectedValue] = useState("標頭內容");
                                //元件標頭狀態

                                //元件展開內容
                                const options = [
                                  {
                                    label: "第一層選項1",               
                                  },
                                  {
                                    label: "第一層選項2",
                                  }
                                ];
                                //元件展開內容

                              // 元件本體
                              // 放置於return下方
                              {/* 元件最外層 */}
                              <Dropdown className='Dropdown' show={show} onToggle={(isOpen) => setShow(isOpen)}>

                                {/* 元件標頭 */}
                                <Dropdown.Toggle className='DropdownHeader' as="div" onClick={() => {setShow(!show);setActiveMain(null)}}> 
                                    {selectedValue}
                                </Dropdown.Toggle>
                                {/* 元件標頭 */}

                                {/* 元件本體 */}
                                <Dropdown.Menu className="triple-dropdown-menu">
                                  {
                                    options.map((main, i) => (
                                      /* 內部第一層選項設定 */
                                      <button key={i} className='menu-btn' onClick={() => {
                                        setActiveMain(main.label);
                                        setActiveSub(null); // ✅ 切換主選單時重置子選單
                                      }}>
                                        {main.label}
                                      </button>
                                      /* 內部第一層選項設定 */
                                    ))
                                  }
                                </Dropdown.Menu>
                                {/* 元件本體 */}
                              </Dropdown>
                              {/* 元件最外層 */}
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
                              // 元件最外層
                              .Dropdown{

                                /* 元件標頭 */
                                .DropdownHeader{

                                  width: 100%;
                                  padding: 0.75rem 1rem;
                                  border: 2px solid #90caf9;
                                  background-color: #e3f2fd;
                                  border-radius: 8px;
                                  font-size: 1rem;
                                  cursor: pointer;
                                  text-align: left;
                                  position: relative;
                                  color: #0d47a1;
                                }
                                
                                /* 元件本體 */
                                .triple-dropdown-menu,.dropdown-menu {

                                  display: none;
                                  padding: 0.5rem;
                                  background-color: white;
                                  border: 1px solid #ccc;
                                  min-width: 600px;
                                  gap: 1rem;

                                  &.show{
                                    display: flex;
                                  }

                                  /* 內部第一層選項設定 */
                                  .menu-btn {
                                  
                                    padding: 0.5rem 1rem;
                                    text-align: left;
                                    background: none;
                                    border: none;
                                    cursor: pointer;
                                    font-size: 14px;
                                    transition: background-color 0.2s;

                                    &:hover {
                                      background-color: #f0f0f0;
                                    }
                                  }
                                }
                              }
                              `
                            )
                          }       
                      </code>
                  </pre>
              </Accordion.Body>
          </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ReactCustomDropdown;

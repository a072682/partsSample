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
  useEffect(()=>{},[show])
  //元件判斷是否展開狀態

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

  

  return (
    <>
      <section className='ReactCustomDropdown'>
        <div className='testDropdownBox'>
          <p>測試用最外層</p>
          {/* 元件最外層 */}
          <Dropdown className='CustomDropdown' 
                    show={show} onToggle={(isOpen) => setShow(isOpen)}
          >
            {/* 元件標頭 */}
            <Dropdown.Toggle className='DropdownHeader' as="div" onClick={() => {setShow(!show);}}> 
                {/* 要放置的元件 */}
                <div className='key'>
                  放置的元件
                </div>
                {/* 要放置的元件 */}
            </Dropdown.Toggle>
            {/* 元件標頭 */}

            {/* 元件本體 */}
            <Dropdown.Menu  className="dropdownMenuSet">
              {
                options.map((main, index) => (
                  /* 內部第一層選項設定 */
                  <button key={index} 
                          className='menuItemSet' 
                          onClick={() => {
                            setShow(!show);
                          }}
                  >
                    {main.label}
                  </button>
                  /* 內部第一層選項設定 */
                ))
              }
            </Dropdown.Menu>
            {/* 元件本體 */}
          </Dropdown>
          {/* 元件最外層 */}
        </div>
        
      </section>
      

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

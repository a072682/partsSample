import './OriginalAccordion.scss';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援

import dedent from 'dedent';//去除多餘空白保持縮排格式


function OriginalAccordion() {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="container my-5">

      {/* 第一個：預設樣式的手風琴 */}
      <h3 className='mt-24 mb-24'>預設手風琴項目(bs5)</h3>
      <div className="accordion mb-24" id="defaultAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              預設手風琴項目 #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#defaultAccordion"
          >
            <div className="accordion-body">
              這是預設的 Bootstrap 5 手風琴內容。
            </div>
          </div>
        </div>
      </div>

      <Accordion defaultActiveKey="" className="defaultAccordionContent mb-24">
        {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
        <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
          <Accordion.Header className="defaultReactAccordionHeader">
            程式碼說明
          </Accordion.Header>
          <Accordion.Body className="defaultReactAccordionBody p-0">
            
            <pre className="language-html m-0 p-16">
              <div>HTML說明</div>
              <code className="language-html">
                {
                  dedent(
                    `
                      <div className="accordion" id="defaultAccordion">  // 元件外框，id 提供父子關聯與折疊控制用
                        <div className="accordion-item">  // Accordion 的一個項目（可有多個）
                          <h2 className="accordion-header" id="headingOne">  // 標題欄位，用來包裹按鈕與標題文字
                            <button
                              className="accordion-button collapsed"  // 按鈕：collapsed 表示預設為收合狀態
                              type="button" 
                              data-bs-toggle="collapse"  // Bootstrap 的資料屬性：表示點擊會觸發折疊行為
                              data-bs-target="#collapseOne"  // 要展開或收合的目標區塊 ID（搭配下方 id 使用）
                              aria-expanded="true"  // 無障礙屬性：表示是否展開（true/false）
                              aria-controls="collapseOne"  // 無障礙屬性：控制哪個元素的展開（對應下方的 id）
                            >
                              預設手風琴項目 #1  // 顯示在按鈕上的文字（即小標題）
                            </button>
                          </h2>
                          <div
                            id="collapseOne"  // 被折疊/展開的內容區塊，id 需對應 data-bs-target
                            className="accordion-collapse collapse"  // collapse 表示收合中；展開時會自動加上 show 類別
                            aria-labelledby="headingOne"  // 無障礙屬性：指出該內容是由哪個標題控制（對應上方的headingOne）
                            data-bs-parent="#defaultAccordion"  // 指定父層容器，讓同一父層只能有一個展開（手風琴效果）
                          >
                            <div className="accordion-body">  // 折疊後顯示的內容區塊
                              這是預設的 Bootstrap 5 手風琴內容。  // 實際內容，這裡可以放任意文字、圖片或其他元素
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                  )
                }       
              </code>
            </pre>
            <pre className="language-html m-0 p-16">
              <div>SCSS說明(巢狀)</div>
              <code className="language-html">
                {
                  dedent(
                    `
                      .accordion {
                        // ✅ 元件外框：可控制整個 Accordion 外觀（如寬度、邊距、背景色等）
                        // 可控制整體手風琴外觀
                        // margin、padding、max-width、border 等


                        // ✅ Accordion 項目區塊：可控制每一項的外框樣式
                        .accordion-item {
                          // 可設定每個項目的邊框、間距、背景、hover 效果等

                          // ✅ 標題容器：主要是按鈕的包覆區塊
                          .accordion-header {
                            // 若需要自訂 h2 本身樣式（如間距、排版）可寫在這裡

                            // ✅ 按鈕樣式
                            .accordion-button {
                              // 控制按鈕外觀：背景、文字大小、顏色、padding、icon 等
                              // 例如：font-weight, background-color, color, box-shadow 等

                              &.collapsed {
                                // 控制按鈕在「收合狀態」下的樣式（例如箭頭方向、透明度）
                              }

                              // 可再針對 hover、focus 狀態設定
                              &:hover {
                                // hover 效果
                              }

                              &:focus {
                                // focus 效果，如去除藍框
                              }
                            }
                          }

                          // ✅ 被展開/折疊的內容容器（會有動畫）
                          .accordion-collapse {
                            // 控制展開區塊的動畫、邊界、overflow 等
                            // Bootstrap 展開時會自動加上 .show，可以進一步設定過渡效果

                            &.collapse {
                              // 初始（收合）狀態時的樣式
                            }

                            &.show {
                              // 展開時的樣式，例如改變 opacity 或 max-height
                            }

                            // ✅ 內部內容區塊：顯示實際內容
                            .accordion-body {
                              // 控制文字樣式、行距、padding、背景、排版等
                              // 通常會是你放內容最多的區塊
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

      


      {/* 第二個：客製化樣式的手風琴 */}
      <h3 className='mt-24 mb-24'>客製化手風琴項目(bs5)</h3>
      <div className="accordion custom-accordion mb-24" id="customAccordion">
        <div className="accordion-item custom-accordion-item">
          <h2 className="accordion-header" id="customHeading">
            <button
              className="accordion-button custom-accordion-button button-SpecialEffects collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#customCollapse"
              aria-expanded="true"
              aria-controls="customCollapse"
            >
              客製化手風琴項目 #1
            </button>
          </h2>
          <div
            id="customCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="customHeading"
            data-bs-parent="#customAccordion"
          >
            <div className="accordion-body custom-accordion-body">
              這是經過自訂樣式後的手風琴內容。
            </div>
          </div>
        </div>
      </div>
      <Accordion defaultActiveKey="" className="defaultAccordionContent mb-24">
        {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
        <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
          <Accordion.Header className="defaultReactAccordionHeader">
            程式碼說明
          </Accordion.Header>
          <Accordion.Body className="defaultReactAccordionBody p-0">
            
            <pre className="language-html m-0 p-16">
              <div>HTML說明</div>
              <code className="language-html">
                {
                  dedent(
                    `
                      <div className="accordion custom-accordion mb-24" id="customAccordion">
                        <div className="accordion-item custom-accordion-item">
                          <h2 className="accordion-header" id="customHeading">
                            <button
                              className="accordion-button custom-accordion-button button-SpecialEffects collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#customCollapse"
                              aria-expanded="true"
                              aria-controls="customCollapse"
                            >
                              客製化手風琴項目 #1
                            </button>
                          </h2>
                          <div
                            id="customCollapse"
                            className="accordion-collapse collapse"
                            aria-labelledby="customHeading"
                            data-bs-parent="#customAccordion"
                          >
                            <div className="accordion-body custom-accordion-body">
                              這是經過自訂樣式後的手風琴內容。
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                  )
                }       
              </code>
            </pre>
            <pre className="language-html m-0 p-16">
              <div>SCSS說明(巢狀)</div>
              <code className="language-html">
                {
                  dedent(
                    `
                      // ✅ 移除點擊時的藍色外框陰影
                      .button-SpecialEffects.button-SpecialEffects.button-SpecialEffects{
                          &:focus {
                            // 預設點擊特效重要度較高因此要重複宣告進行覆蓋
                            box-shadow: none; // ✅ 移除點擊時的藍色外框陰影
                            outline: none;     // ✅ 移除可能的 outline
                          }
                      }
                      // 整個客製化手風琴
                      .custom-accordion {// 整體元件背景
                        max-width: 600px;
                        min-height: auto;
                        border: 2px solid #4caf50; // 綠色外框
                        background-color: #f0f9f0; // 淺綠背景
                        padding: 10px;

                        // 自訂手風琴每一項
                        &-item {
                          border: none; // 移除原本的 item 邊框
                        }

                        // 只影響 custom-accordion 底下的 button
                        &-button {

                          &.custom-accordion-button {
                            background-color: brown;
                            color: #2e7d32; // 標題顏色
                            font-weight: bold;
                            font-size: 1.25rem;
                            padding: 1rem;
                            box-shadow: none; // 移除預設陰影
                            border: none;     // 取消按鈕邊框

                            // 只影響展開的按鈕
                            &:not(.collapsed) {
                              background-color: #760eff; // 標題背景顏色
                              color: #afffb5; // 標題文字顏色
                            }
                          }
                        }

                        // 只影響 custom-accordion 底下的 body
                        &-body {
                          background-color: #1c20fc; // 內容背景顏色
                          color: #e23232; // 內容文字顏色
                          font-size: 1rem;
                          border-radius: 0 0 8px 8px;
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
      <h3 className='mt-24 mb-24'>備註:<span>需要特別設定不然點開後無法關閉</span></h3>
    </div>
  );
};

export default OriginalAccordion;

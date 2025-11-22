import { useEffect, useMemo, useRef, useState } from 'react';
import './_CustomRadio.scss';
import { Collapse } from 'react-bootstrap';

import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function CustomRadio() {

    //#region
    //#endregion


    //#region 付款方式狀態
    const [selectedPayment, setSelectedPayment] = useState("");
    //#endregion

    //#region 處理選擇付款方式的變化
    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };
    //#endregion

    return (
        <>
            {/* 元件最外圍 */}
            <div className="CustomRadioBox">
                {/* radio群組設定(item01) */}
                <div className="radioBox item01">
                    {/* input本體 */}
                    <input  id="item01" 
                            type="radio" 
                            name="item01" 
                            value="item01" 
                            checked={selectedPayment === "item01"} 
                            onChange={handlePaymentChange}
                    />
                    {/* input本體 */}
                    {/* 標題設定 */}
                    <label htmlFor="item01" className="customCheckoutLabel">
                        選項1
                    </label>
                    {/* 標題設定 */}
                </div>
                {/* radio群組設定(item01) */}
                
                {/* radio群組設定(item02) */}
                <div className="radioBox item02">
                    {/* input本體 */}
                    <input  id="item02" 
                            type="radio" 
                            name="item02" 
                            value="item02" 
                            checked={selectedPayment === "item02"} 
                            onChange={handlePaymentChange}
                    />
                    {/* input本體 */}
                    {/* 標題設定 */}
                    <label htmlFor="item02" className="customCheckoutLabel">
                        選項2
                    </label>
                    {/* 標題設定 */}
                </div>
                {/* radio群組設定(item02) */}
                
                {/* radio群組設定(item03) */}
                <div className="radioBox item03">
                    <input
                        id="item03"
                        type="radio"
                        name="item03"
                        value="item03"
                        checked={selectedPayment === "item03"}
                        onChange={handlePaymentChange}
                        data-bs-toggle="collapse"
                        data-bs-target="#creditCardInputTest"
                        aria-expanded={selectedPayment === "item03"}
                        aria-controls="creditCardInputTest"
                    />
                    <label htmlFor="item03" className="customCheckoutLabel">
                        Apple Pay
                    </label>
                </div>
                <Collapse in={selectedPayment === "item03"}>
                    <div id="creditCardInputTest" className="card card-body mt-2 custom-collapse">
                        <label htmlFor="creditCardNumber" className="form-label">
                            信用卡號碼
                        </label>
                        <input
                            type="text"
                            id="creditCardNumber"
                            name="creditCardNumber"
                            className="form-control"
                            placeholder="請輸入信用卡號"
                        />
                    </div>
                </Collapse> 
                {/* radio群組設定(item03) */}
            </div>
            {/* 元件最外圍 */}

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
                                    import { useState } from 'react';//宣告狀態
                                    import './_CustomRadio.scss';//讀取樣式
                                    import { Collapse } from 'react-bootstrap';//宣告展開元件

                                    //元件前置宣告
                                    //放置於return上方
                                    //#region 付款方式狀態
                                    const [selectedPayment, setSelectedPayment] = useState("");
                                    //#endregion

                                    //#region 處理選擇付款方式的變化
                                    const handlePaymentChange = (event) => {
                                        setSelectedPayment(event.target.value);
                                    };
                                    //#endregion

                                    // 元件本體
                                    // 放置於return下方
                                    {/* 元件最外圍 */}
                                    <div className="CustomRadioBox">
                                        {/* radio群組設定(item01) */}
                                        <div className="radioBox item01">
                                            {/* input本體 */}
                                            <input  id="item01" 
                                                    type="radio" 
                                                    name="item01" 
                                                    value="item01" 
                                                    checked={selectedPayment === "item01"} 
                                                    onChange={handlePaymentChange}
                                            />
                                            {/* input本體 */}
                                            {/* 標題設定 */}
                                            <label htmlFor="item01" className="customCheckoutLabel">
                                                選項1
                                            </label>
                                            {/* 標題設定 */}
                                        </div>
                                        {/* radio群組設定(item01) */}
                                        
                                        {/* radio群組設定(item02) */}
                                        <div className="radioBox item02">
                                            {/* input本體 */}
                                            <input  id="item02" 
                                                    type="radio" 
                                                    name="item02" 
                                                    value="item02" 
                                                    checked={selectedPayment === "item02"} 
                                                    onChange={handlePaymentChange}
                                            />
                                            {/* input本體 */}
                                            {/* 標題設定 */}
                                            <label htmlFor="item02" className="customCheckoutLabel">
                                                選項2
                                            </label>
                                            {/* 標題設定 */}
                                        </div>
                                        {/* radio群組設定(item02) */}
                                        
                                        {/* radio群組設定(item03) */}
                                        <div className="radioBox item03">
                                            <input
                                                id="item03"
                                                type="radio"
                                                name="item03"
                                                value="item03"
                                                checked={selectedPayment === "item03"}
                                                onChange={handlePaymentChange}
                                                data-bs-toggle="collapse"
                                                data-bs-target="#creditCardInputTest"
                                                aria-expanded={selectedPayment === "item03"}
                                                aria-controls="creditCardInputTest"
                                            />
                                            <label htmlFor="item03" className="customCheckoutLabel">
                                                Apple Pay
                                            </label>
                                        </div>
                                        <Collapse in={selectedPayment === "item03"}>
                                            <div id="creditCardInputTest" className="card card-body mt-2 custom-collapse">
                                                <label htmlFor="creditCardNumber" className="form-label">
                                                    信用卡號碼
                                                </label>
                                                <input
                                                    type="text"
                                                    id="creditCardNumber"
                                                    name="creditCardNumber"
                                                    className="form-control"
                                                    placeholder="請輸入信用卡號"
                                                />
                                            </div>
                                        </Collapse> 
                                        {/* radio群組設定(item03) */}
                                    </div>
                                    {/* 元件最外圍 */}
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
                                    .CustomRadioBox{

                                        // radio群組設定
                                        .radioBox{

                                            //input本體
                                            input[type="radio"] {
                                                display: none; /* 隱藏 radio 按鈕 */
                                            }
                                            
                                            //點選 radio 時，顯示 ::before
                                            //:checked：選中狀態
                                            //+：相鄰兄弟選擇器（label 緊貼著 input）
                                            input[type="radio"]:checked + .customCheckoutLabel::before {
                                                display: block;
                                            }
                                            //input本體

                                        
                                            //label本體
                                            .customCheckoutLabel {
                                                color: #000000;
                                                padding-left: 28px;
                                                //左邊留出空間
                                                cursor: pointer;
                                                position: relative;

                                                /*自訂樣式的圓形 radio 樣式*/
                                                /* 基本的 ::before 和 ::after 設置 */
                                                &::after, &::before {
                                                    content: "";
                                                    top: 50%;
                                                    position: absolute;
                                                    border-radius: 50%;
                                                }

                                                //設定外框
                                                &::after {
                                                    left: 0px;
                                                    transform: translateY(-50%);
                                                    width: 20px;
                                                    height: 20px;
                                                    border: 1px solid #000000; /* 設定邊框顏色 */
                                                }
                                                //設定外框

                                                // 設定圓心
                                                &::before {
                                                    display: none;
                                                    left: 10px;
                                                    transform: translate(-50%, -50%);
                                                    width: 14px;
                                                    height: 14px;
                                                    background-color: #000000; /* 設定圓心顏色 */
                                                }
                                                // 設定圓心
                                            }
                                            //label本體
                                        }
                                        // radio群組設定
                                    }
                                    // 元件最外層
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
          
        
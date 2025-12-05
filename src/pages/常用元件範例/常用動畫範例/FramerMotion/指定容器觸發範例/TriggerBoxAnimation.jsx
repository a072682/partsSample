// ✅ Next.js App Router 需要這行，確保這個檔案是 Client Component
"use client";

import { motion, useInView } from "framer-motion";
import './_TriggerBoxAnimation.scss';

import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

import { useRef } from "react";
import TestBox from "./TestBox/TestBox";





export default function TriggerBoxAnimation() {

    //目標判定視窗容器
    const panelRef = useRef(null);

    //建立元件
    function RevealInPanel({ panelRef, children, className = "motionBox" }) {
        const ref = useRef(null);

        // 這段就是原本你每次重複的 useInView
        const inView = useInView(ref, {
            root: panelRef,               
            margin :"0% 0px -50% 0px",                       
            amount : 0,                       
            once : false,                         
        });

        // 回傳 motion.div（已內建動畫控制）
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                // 用 inView（布林）切換兩種狀態
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={className}       
            >
                {children}
            </motion.div>
        );
    }

    return (
        <>
        {/* 最外框模擬外圍容器 */}
        <div className="wrap">
            {/* 外框 */}
            <div ref={panelRef} className="scroll-panel">

                <div className="box">
                    <div className="box01">
                        <RevealInPanel panelRef={panelRef}>
                            <div className="box01-1">內容 1</div>
                        </RevealInPanel>

                        <RevealInPanel panelRef={panelRef}>
                            <div className="box01-2">內容 2</div>
                        </RevealInPanel>
                    </div>
                    <RevealInPanel panelRef={panelRef}>
                        <div className="box02">內容 3</div>
                    </RevealInPanel>

                    <RevealInPanel panelRef={panelRef}>
                        <div className="box03">內容 4</div>
                    </RevealInPanel>

                    <RevealInPanel panelRef={panelRef}>
                        <TestBox />
                    </RevealInPanel>
                </div>
            
            </div>
        </div>
        {/* 最外框模擬外圍容器 */}

        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
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
                            import { motion } from "framer-motion";//宣告元件
                            import './_DefaultExample.scss';//讀取樣式

                            // 元件設定
                            // 放置於return上方

                            //目標判定視窗容器
                            const panelRef = useRef(null);

                            //建立元件
                            function RevealInPanel({ panelRef, children, className = "motionBox" }) {
                                const ref = useRef(null);

                                // 這段就是原本你每次重複的 useInView
                                const inView = useInView(ref, {
                                    root: panelRef,               
                                    margin :"0% 0px -50% 0px",                       
                                    amount : 0,                       
                                    once : false,                         
                                });

                                // 回傳 motion.div（已內建動畫控制）
                                return (
                                    <motion.div
                                        ref={ref}
                                        initial={{ opacity: 0, y: 30 }}
                                        // 用 inView（布林）切換兩種狀態
                                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={className}       
                                    >
                                        {children}
                                    </motion.div>
                                );
                            }

                            // 元件本體
                            // 放置於return下方
                            {/* 最外框模擬外圍容器 */}
                            <div className="wrap">
                                {/* 外框 */}
                                <div ref={panelRef} className="scroll-panel">

                                    <div className="box">
                                        <div className="box01">
                                            <RevealInPanel panelRef={panelRef}>
                                                <div className="box01-1">內容 1</div>
                                            </RevealInPanel>

                                            <RevealInPanel panelRef={panelRef}>
                                                <div className="box01-2">內容 2</div>
                                            </RevealInPanel>
                                        </div>
                                        <RevealInPanel panelRef={panelRef}>
                                            <div className="box02">內容 3</div>
                                        </RevealInPanel>

                                        <RevealInPanel panelRef={panelRef}>
                                            <div className="box03">內容 4</div>
                                        </RevealInPanel>

                                        <RevealInPanel panelRef={panelRef}>
                                            <TestBox />
                                        </RevealInPanel>
                                    </div>
                                
                                </div>
                            </div>
                            {/* 最外框模擬外圍容器 */}
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
                                        /* 最外框模擬外圍容器 */
                                        .wrap {
                                            position: relative;
                                            padding: 16px;

                                            //視窗容器    
                                            .scroll-panel {
                                                border: 2px solid red;
                                                height: 50vh;          /* 固定視窗高度 */
                                                overflow: auto;        /* 在這個容器內捲動 */
                                                background: #fafafa;
                                                position: relative;
                                                    //內容
                                                    .box{
                                                        background-color: #ffffff;
                                                        width: 100%;
                                                        height: 100vh;
                                                        display: flex;
                                                        flex-direction: column;
                                                        border: 5px solid rgb(116, 116, 116);
                                                        .box01{
                                                            display: flex;
                                                            .box01-1,.box01-2{
                                                                width: 100%;
                                                                margin: 30px;
                                                                background-color: aqua;
                                                                min-height: 200px;
                                                                display: flex;
                                                                justify-content: center;
                                                                align-items: center;
                                                            }
                                                            
                                                        }
                                                        .box02{
                                                            margin: 30px;
                                                            flex: 1 1 0;
                                                            padding: 30px;
                                                            background-color: red;
                                                            border: 5px solid black;
                                                        }

                                                        .box03{
                                                            flex: 1 1 0; 
                                                            margin: 30px;
                                                            padding: 30px;
                                                            background-color: rgb(0, 47, 255);
                                                            border: 5px solid black;
                                                        }
                                                    }
                                                
                                            }
                                        }
                                        /* 最外框模擬外圍容器 */

                                        // 元件外框
                                        .motionBox{
                                            width: 100%;
                                            height: 100%;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                        }
                                        // 元件外框
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

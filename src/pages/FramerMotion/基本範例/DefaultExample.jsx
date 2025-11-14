


import { motion } from "framer-motion";
import './_DefaultExample.scss';
import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function DefaultExample() {
  return (
    <>
      
        <motion.div
            className="motionBox"
            //元件「初始狀態」的樣式
            //距離單位為px
            initial={{ opacity: 0, y: 40 }}
            //元件「初始狀態」的樣式值

            //元件最終狀態的樣式
            //觸發條件由viewport決定
            //雙向行為：預設是可逆的（進來 → 播進場；離開 → 播回去）
            whileInView={{ opacity: 1, y: 0 }}
            //元件最終狀態的樣式

            //元件動畫流程樣式
            //duration為動畫運行時間（單位是秒）
            //ease為動畫的運行方式(easeOut為先快後慢)
            transition={{ duration: 0.6, ease: "easeOut" }}
            //元件動畫流程樣式
            
            //元件的觸發位置
            //margin 作用是可視區設定
            //這個可視區作用於螢幕的範圍
            //once 作用為是否只在第一次進入可視區時觸發，之後忽略
            //once: false 可反覆觸發（進來播、離開回、再進來再播）
            //once: true 只播一次
            //amount 作用為目標標籤有多少比例在可視區範圍內才觸發動畫
            //amount: 0 只要標籤觸碰到可視區即觸發動畫
            //amount: 0.5：至少有 50% 面積進入才算。
            //amount: "some"：相當於一小部分（接近 0.5，版本略有差異）。
            //amount: "all"：整個元素都在可視區才算。
            viewport={{ margin: "-10% 0px 0px 0px", once: false, amount: 0 }}
            //元件的觸發位置
        >
            <div className="box">
                當我滾到視窗正中線附近才會觸發
            </div>
        </motion.div>

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

                                    // 元件本體
                                    // 放置於return下方
                                    {/* 元件最外圍 */}
                                    <motion.div
                                        className="motionBox"
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        viewport={{ margin: "-10% 0px 0px 0px", once: false, amount: 0 }}
                                    >
                                        {/* 內容元件最外圍 */}
                                        <div className="box">
                                            我是內容元素
                                        </div>
                                        {/* 內容元件最外圍 */}
                                    </motion.div>
                                    {/* 元件最外圍 */}

                                    {/* 元件說明 */}
                                        {/* 元件最外圍 */}
                                        <motion.div
                                            className="motionBox"
                                            //元件「初始狀態」的樣式
                                            //距離單位為px
                                            initial={{ opacity: 0, y: 40 }}
                                            //元件「初始狀態」的樣式值

                                            //元件最終狀態的樣式
                                            //觸發條件由viewport決定
                                            //雙向行為：預設是可逆的（進來 → 播進場；離開 → 播回去）
                                            whileInView={{ opacity: 1, y: 0 }}
                                            //元件最終狀態的樣式

                                            //元件動畫流程樣式
                                            //duration為動畫運行時間（單位是秒）
                                            //ease為動畫的運行方式(easeOut為先快後慢)
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            //元件動畫流程樣式
                                            
                                            //元件的觸發位置
                                            //margin 作用是可視區設定
                                            //這個可視區作用於螢幕的範圍
                                            //once 作用為是否只在第一次進入可視區時觸發，之後忽略
                                            //once: false 可反覆觸發（進來播、離開回、再進來再播）
                                            //once: true 只播一次
                                            //amount 作用為目標標籤有多少比例在可視區範圍內才觸發動畫
                                            //amount: 0 只要標籤觸碰到可視區即觸發動畫
                                            //amount: 0.5：至少有 50% 面積進入才算。
                                            //amount: "some"：相當於一小部分（接近 0.5，版本略有差異）。
                                            //amount: "all"：整個元素都在可視區才算。
                                            viewport={{ margin: "-10% 0px 0px 0px", once: false, amount: 0 }}
                                            //元件的觸發位置
                                        >
                                            {/* 內容元件最外圍 */}
                                            <div className="box">
                                                我是內容元素
                                            </div>
                                            {/* 內容元件最外圍 */}
                                        </motion.div>
                                        {/* 元件最外圍 */}
                                    {/* 元件說明 */}
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

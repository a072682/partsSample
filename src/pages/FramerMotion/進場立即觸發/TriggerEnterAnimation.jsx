


import { motion } from "framer-motion";
import './_TriggerEnterAnimation.scss';
import { Accordion } from 'react-bootstrap';
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function TriggerEnterAnimation() {
  return (
    <>
      
        <motion.div
            className="motionBox"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}  
        >
            <div className="box">
                進場立即觸發
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
                                    >
                                        {/* 內容元件最外圍 */}
                                        <div className="box">
                                            進場立即觸發
                                        </div>
                                        {/* 內容元件最外圍 */}
                                    </motion.div>
                                    {/* 元件最外圍 */}

                                    {/* 元件說明 */}
                                        {/* 元件最外圍 */}
                                        <motion.div
                                            className="motionBox"
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }} 
                                            //移除viewport可視區設定代表入場即觸發
                                        >
                                            {/* 內容元件最外圍 */}
                                            <div className="box">
                                                進場立即觸發
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

import { motion } from "framer-motion";
import "./_觸發型範例.scss";
import 元件化內容 from "./元件化內容/元件化內容";



export default function 觸發型範例() {


    const rowContainer = {
        hidden: { opacity: 0 },                 // 父層只當觸發器，不做淡入
        show: {
            opacity: 1,
            transition: {
                duration: 0,                        // 0：不要讓父層自己動畫造成等待
                delayChildren: 0.08,
                staggerChildren: 0.06,
            // 想骨牌再開：delayChildren: 0.08, staggerChildren: 0.06,
            },
        },
    };

  const fadeLeft  = { hidden:{opacity:0,x:-40}, show:{opacity:1,x:0, transition:{duration:0.6, ease:"easeOut"}} };
  const fadeRight = { hidden:{opacity:0,x: 40}, show:{opacity:1,x:0, transition:{duration:0.6, ease:"easeOut"}} };
  const fadeUp    = { hidden:{opacity:0,y: 40}, show:{opacity:1,y:0, transition:{duration:0.6, ease:"easeOut"}} };
  const fadeUp02    = { hidden:{opacity:0,y: 40}, show:{opacity:1,y:0, transition:{duration:0.6, ease:"easeOut", delay:0.3}} };

  return (
    <>
        <div className="觸發型範例">
            <h4>觸發型範例</h4>
            {/* 元件外圍(充當觸發器) */}
            <motion.div
                className="outBox"
                variants={rowContainer}
                initial="hidden"
                whileInView="show"                       // ✅ 用 whileInView 才會吃 viewport
                viewport={{ amount: 0, margin: "0% 0px -80% 0px" }} // 中線帶
            >
                {/* 背景box(紅) */}
                <motion.div 
                    className="boxSet01"
                    variants={fadeUp}
                />
                {/* 背景box(紅) */}

                {/* 背景box(藍) */}
                <motion.div 
                    className="boxSet02"
                    variants={fadeUp02}
                />
                {/* 背景box(藍) */}

                {/* 內容區塊 */}
                <div className="contentBox">
                    {/* 上半部區塊 */}
                    <div className="topBox">
                        {/* 左邊區塊 */}
                        <motion.div className="leftBoxSet" 
                                    variants={fadeLeft}
                        >
                            <div className="imgBox">
                                <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                            </div>
                        </motion.div>
                        {/* 左邊區塊 */}

                        {/* 右邊區塊 */}
                        <motion.div className="rightBoxSet"
                                    variants={fadeRight}
                        >
                            <div className="videoBox">
                                <video
                                    className="bgVideo"
                                    autoPlay //載入後自動播放（行動裝置要搭配 muted 才會生效）
                                    muted //把影片靜音（多數瀏覽器要求靜音才允許自動播放）
                                    loop //播完自動重頭再播
                                    playsInline //在手機上「行內播放」，不會跳全螢幕
                                    preload="auto" //盡量預先載入影片（加快開始播放的速度）
                                    poster="" //影片尚未播放或載入時顯示的封面圖
                                >
                                    <source src="/images/動畫/背景動畫/nte_pmain_20250514.mp4" type="video/mp4" />
                                    您的瀏覽器不支援影片
                                </video>
                            </div>
                        </motion.div>
                        {/* 右邊區塊 */}
                    </div>
                    {/* 上半部區塊 */}

                    {/* 下半部區塊 */}
                    <motion.div className="buttomBox"
                                variants={fadeUp}
                    >
                        <div />
                    </motion.div>
                    {/* 下半部區塊 */}
                </div>
                {/* 內容區塊 */}

                
            </motion.div>
            {/* 元件外圍(充當觸發器) */}

            {/* 外部引進內容 */}
            <元件化內容 />
            {/* 外部引進內容 */}

            <p>外部的motion想要控制內層的motion</p>
            <p>內層的motion需要使用<span className="fw-bold fs-20">variants</span></p>
        </div>
    </>
  );
}

import { motion } from "framer-motion";
import "./_test.scss";

export default function Test() {
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
      <motion.div
        className="testBg"
        variants={rowContainer}
        initial="hidden"
        whileInView="show"                       // ✅ 用 whileInView 才會吃 viewport
        viewport={{ amount: 0, margin: "0% 0px -80% 0px" }} // 中線帶
      >
        <motion.div className="testBg01" variants={fadeUp}/>
        <motion.div className="testBg02" variants={fadeUp02}/>

        <div className="contentBox">
          <div className="box01">
            {/* 這兩個是 flex item：class 放在 motion 上即可 */}
            <motion.div className="box01-1" variants={fadeLeft }>
              <div className="imgBox">
                <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
              </div>
            </motion.div>
            <motion.div className="box01-2" variants={fadeRight }>
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
          </div>

          <motion.div className="box02" variants={fadeUp}>
            <div />
          </motion.div>
        </div>
      </motion.div>
      <hr />
      <div className="testBg02">
        <div className="test02imgbox">
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
        <div className="panel"></div>
        <div className="corner"></div>
      </div>
      <hr />
      <div className="testBg03">
        <div className="test03imgbox">
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
        <div className="boxShape">
            <button type="button" className="boxBtn">按鈕</button>
            <div className="corner02"></div>
        </div>
        <div className="corner01"></div>
        
      </div>
      <hr />
      <div className="testBg04">
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-4 h-100">
                    <div className="box01">
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-4 h-100">
                    <div className="box02">
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className="col-4 h-100">
                    <div className="box03">
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                        <div className="imgBox">
                            <img className="imgSet" src="/images/framerMotion/測試/01.png" alt="" />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
      </div>
      
    </>
  );
}

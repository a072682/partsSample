import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MotionBoxRightToLeftDownToUp.css';

export default function MotionBoxRightToLeftDownToUp() {
  const [isVisible, setIsVisible] = useState(false);

  // 設定面板動畫
  const panelVariants = {
    hiddenBottom: {
      y: -500,
      x:"-50%",
      opacity: 0,
    },
    visible: {
      y: "-50%",
      x:"-50%",
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exitBottom: {
      y: 500,
      x:"-50%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mt-5 text-center position-relative" style={{ height: '300px', overflow: 'hidden' }}>
      <button className="btn btn-success" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '關閉面板' : '開啟面板'}
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="sliding-up-box"
            variants={panelVariants}
            initial="hiddenBottom"
            animate="visible"
            exit="exitBottom"
            
          >
            ⬆️ 我是下往上滑入的面板
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

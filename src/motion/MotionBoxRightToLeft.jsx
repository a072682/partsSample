

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MotionBoxRightToLeft.css';

export default function MotionBoxRightToLeft() {
  const [isVisible, setIsVisible] = useState(false);

  // 定義動畫狀態（進場、離場）
  const panelVariants = {
    hiddenRight: {
      x: 1000,
      opacity: 0,
    },
    visible: {
      x:"-50%",
      opacity: 1,
      transition: { type: 'tween', duration: 0.5 },
    },
    exitLeft: {
      x: -500,
      opacity: 0,
      transition: { type: 'tween', duration: 0.5 },
    },
  };

  return (
    <div className="container mt-5 text-center">
      <button className="btn btn-primary" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '關閉面板' : '開啟面板'}
      </button>

      <div className="position-relative" style={{ height: '200px', overflow: 'hidden', marginTop: '2rem' }}>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="sliding-box"
              variants={panelVariants}
              initial="hiddenRight"
              animate="visible"
              exit="exitLeft"
            >
              👋 我是滑入面板
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


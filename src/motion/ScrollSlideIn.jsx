// （滑入動畫）

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './ScrollAnimations.css';

export default function ScrollSlideIn({ direction = 'right',children }) {
    // direction 預設為'right'
  const ref = useRef();
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px', once: false });
    //useInView(ref...)觀察ref在畫面上的位置
    //margin：調整「進入畫面」的判斷條件
    // 上邊界縮小 40%
    // 下邊界縮小 40%
    // 左右不變
    //once: true（預設）：動畫只觸發一次（第一次滑進來）
    //once: false：每次滑進來都會觸發動畫

  const initialX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
  const initialY = direction === 'up' ? 100 : direction === 'down' ? -100 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : { x: initialX, y: initialY, opacity: 0 }}
      transition={{ duration: 0.6 }}
        // duration	動畫持續的時間（秒）
        // delay	動畫延遲多久後開始（秒）
        // ease	動畫的速度變化曲線（加速/減速）
        // type	動畫類型（tween, spring 等）
        // stiffness、damping	（spring 類型用）彈性阻尼
      className="scroll-box"
    >
       {children}
       {/* 外部內容 */}
    </motion.div>
  );
}

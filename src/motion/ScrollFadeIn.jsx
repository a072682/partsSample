// （淡入動畫）

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './ScrollAnimations.css';

export default function ScrollFadeIn() {
  const ref = useRef();
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px', once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="scroll-box"
    >
      👀 我是淡入動畫
    </motion.div>
  );
}

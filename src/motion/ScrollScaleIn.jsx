// （放大動畫）

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './ScrollAnimations.css';

export default function ScrollScaleIn() {
  const ref = useRef();
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px', once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="scroll-box"
    >
      🔍 放大進場動畫
    </motion.div>
  );
}

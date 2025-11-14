import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function SlideWhenInView() {
  const ref = useRef();
  const isInView = useInView(ref, {
    margin: '-40% 0px -40% 0px', // ✅ 元素進入視窗中央時才觸發
    once: true, // 只觸發一次
  });

  return (
    <div style={{ height: '150vh', paddingTop: '50vh' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 200 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          background: '#81ecec',
          padding: '2rem',
          borderRadius: '12px',
          fontSize: '1.2rem',
          textAlign: 'center',
        }}
      >
        ✨ 我在畫面中央時才滑入！
      </motion.div>
    </div>
  );
}

export default SlideWhenInView;

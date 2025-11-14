import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './DiagonalParallelograms.css';

export default function DiagonalParallelograms() {
  const ref = useRef();
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px', once: false });

  // const shapeStyle = {
  //   transform: 'skew(-20deg)', 
  // };
  // 讓 skew 不被覆蓋

  return (
    <div className="diagonal-container" ref={ref}>
      {/* 1. 從右上滑入 */}
      <motion.div
          className="parallelogram"
          initial={{ x: 123, y: -338, opacity: 0 }}
          animate={
            inView
              ? { x: 0, y: 0, opacity: 1 }
              : {} 
          }
          transition={{ duration: 0.6, delay: 0}}
          //duration: 0.6動畫運行時間
          //delay: 延遲時間(秒)
          transformTemplate={(transform,transformString) => `skew(-20deg) ${transformString}`}
      >
        <div className="unskew-box">
          <img src="https://picsum.photos/id/1025/400/200" alt="圖" />
        </div>
      </motion.div>
          


      {/* 2. 從左下滑入 */}
      <motion.div
        className="parallelogram"
        // style={shapeStyle}
        initial={{ x: -123, y: 338, opacity: 0 }}
        animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        transformTemplate={(transform,transformString) => `skew(-20deg) ${transformString}`}
      >
        <div className="unskew-box">
          <img src="https://picsum.photos/id/1025/400/200" alt="圖" />
        </div>
      </motion.div>

      {/* 3. 從右上滑入 */}
      <motion.div
          className="parallelogram"
          initial={{ x: 123, y: -338, opacity: 0 }}
          animate={
            inView
              ? { x: 0, y: 0, opacity: 1 }
              : {} 
          }
          transition={{ duration: 0.6, delay: 0.4 }}
          transformTemplate={(transform,transformString) => `skew(-20deg) ${transformString}`}
      >
        <div className="unskew-box">
          <img src="https://picsum.photos/id/1025/400/200" alt="圖" />
        </div>
      </motion.div>
          


      {/* 4. 從左下滑入 */}
      <motion.div
        className="parallelogram"
        // style={shapeStyle}
        initial={{ x: -123, y: 338, opacity: 0 }}
        animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        transformTemplate={(transform,transformString) => `skew(-20deg) ${transformString}`}
      >
        <div className="unskew-box">
          <img src="https://picsum.photos/id/1025/400/200" alt="圖" />
        </div>
      </motion.div>

      {/* 3. 放大 */}
      <motion.div
        className="parallelogram"
        // style={shapeStyle}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* 4. 淡入 */}
      <motion.div
        className="parallelogram"
        // style={shapeStyle}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}

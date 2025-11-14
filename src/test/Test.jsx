import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './ScrollAnimations.css';
import CenteredSwiper from '../components/Swiper/CenteredSwiper';

export default function Test({ direction = 'right' }) {
  const testRef = useRef();
  const inView = useInView(testRef, { margin: '-40% 0px -40% 0px', once: true });

  const initialX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
  const initialY = direction === 'up' ? 100 : direction === 'down' ? -100 : 0;

  return (
    <motion.div
      ref={testRef}
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className=""
    >
        <CenteredSwiper />
    </motion.div>
  );
}
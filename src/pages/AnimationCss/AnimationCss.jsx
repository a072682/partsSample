
import './_animationCss.scss';
import ThreeJs from './Three.js套件/ThreeJs';
import BackGroundAnimation from './背景動畫/BackGroundAnimation';
import StopMotionAnimation from './骨牌動畫/StopMotionAnimation';


export default function AnimationCss() {

    return (
        <div className="container">
            <h1>動畫</h1>
            <StopMotionAnimation />
            <hr />
            <BackGroundAnimation />
            <hr />
            <ThreeJs />
            <hr />
        </div>
  );
}



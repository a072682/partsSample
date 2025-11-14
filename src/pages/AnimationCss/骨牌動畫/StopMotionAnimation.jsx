
import { useRef } from 'react';
import './_StopMotionAnimation.scss';

export default function StopMotionAnimation() {
    
    //宣告動畫群組方便控制
    const groupRef = useRef(null);
    const group2Ref = useRef(null);
    //宣告動畫群組方便控制

    //控制函式
    const handlePlay = () => {
        const animationGroup = groupRef.current;
        const animationGroup2 = group2Ref.current;
        if (!animationGroup) return;
        // 重新觸發動畫（移除再加回 .play）
        animationGroup.classList.remove("play");
        animationGroup2.classList.remove("play");
        // 強制 reflow
        void animationGroup.offsetWidth;
        void animationGroup2.offsetWidth;
        animationGroup.classList.add("play");
        animationGroup2.classList.add("play");
    };
    //控制函式

    return (
        <>
            <h4>骨牌動畫</h4>
            {/* 元件最外框 */}
            <div className='btnGroup'>
                {/* 觸發按鈕 */}
                <button className='btn btn-primary btnSet' type='button' onClick={handlePlay}>測試動畫</button>
                {/* 觸發按鈕 */}

                {/* 動畫群組01 */}
                <div className='animationGroup' ref={groupRef}>
                    {/* 動畫細項 */}
                    <img className='animationItem01' src="/images/動畫/骨牌動畫/動畫群組01/city_shadow1.png" alt="" />
                    <img className='animationItem02' src="/images/動畫/骨牌動畫/動畫群組01/city_shadow2.png" alt="" />
                    <img className='animationItem03' src="/images/動畫/骨牌動畫/動畫群組01/city_shadow3.png" alt="" />
                    <img className='animationItem04' src="/images/動畫/骨牌動畫/動畫群組01/city_shadow4.png" alt="" />
                    {/* 動畫細項 */}
                </div>
                {/* 動畫群組01 */}

                {/* 動畫群組02 */}
                <div className='animationGroup2' ref={group2Ref}>
                    {/* 動畫細項 */}
                    <img className='animationItem05' src="/images/動畫/骨牌動畫/動畫群組02/shadow1.png" alt="" />
                    <img className='animationItem06' src="/images/動畫/骨牌動畫/動畫群組02/shadow2.png" alt="" />
                    <img className='animationItem07' src="/images/動畫/骨牌動畫/動畫群組02/shadow3.png" alt="" />
                    <img className='animationItem08' src="/images/動畫/骨牌動畫/動畫群組02/shadow4.png" alt="" />
                    {/* 動畫細項 */}
                </div>
                {/* 動畫群組02 */}
            </div>
            {/* 元件最外框 */}
        </>
    );
}



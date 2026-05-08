
import './_GASP範例.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//gsap加入功能(ScrollTrigger)
gsap.registerPlugin(ScrollTrigger);


export default function GASP範例() {

    const boxRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {

        gsap.to(boxRef.current, {
            x: "-50%",
            scrollTrigger: {
                //目標標籤
                trigger: containerRef.current,
                //前者為目標標籤的上緣 後者為螢幕的上緣
                start: "top top",
                //前者為目標標籤的下緣 後者為螢幕的下緣
                end: "bottom bottom",
                //動畫不自己播放，會根據scrollTrigger決定動畫進度
                scrub: true,
            },
        });

    }, []);

    // useEffect(() => {

    //     const blink = gsap.to(boxRef.current, {
    //         opacity: 0,
    //         duration: 0.2,
    //         repeat: -1,
    //         yoyo: true,
    //         paused: true,
    //     });

    //     let scrollTimeout;

    //     const handleScroll = () => {
    //         // 滾動發生 → 播放閃爍
    //         blink.play();

    //         // 清除之前的 timeout
    //         clearTimeout(scrollTimeout);

    //         // 設定 100ms 沒滾動就停止
    //         scrollTimeout = setTimeout(() => {
    //         blink.pause();
    //         }, 100);
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     gsap.to(boxRef.current, {
    //         x: 400,
    //         scrollTrigger: {
    //         trigger: containerRef.current,
    //         start: "top top",
    //         end: "bottom bottom",
    //         scrub: true,
    //         }
    //     });

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };

    // }, []);

    return (
        <article className='GASP範例'>
            <h3>GASP範例</h3>
            {/* 元件最外圍 */}
            <div className='gaspBox'
                ref={containerRef}>
                {/* 跑馬燈外框 */}
                <div className='MarqueePage'>
                    {/* 跑馬燈內容 */}
                    <div className="track" ref={boxRef}>

                            {/* 內容群組 */}
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-1.jpg" alt="" />
                            </div>
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-2.jpg" alt="" />
                            </div>
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-3.jpg" alt="" />
                            </div>
                            {/* 內容群組 */}

                            {/* 內容群組複製顯示用 */}
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-1.jpg" alt="" />
                            </div>
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-2.jpg" alt="" />
                            </div>
                            <div className='box'>
                                <img className="imgSet" src="/images/swiper/thumbsSwiper/c-3.jpg" alt="" />
                            </div>
                            {/* 內容群組複製顯示用 */}

                    </div>
                    {/* 跑馬燈內容 */}
                </div>
                {/* 跑馬燈外框 */}
            </div>
            {/* 元件最外圍 */}
        </article>
    );
}



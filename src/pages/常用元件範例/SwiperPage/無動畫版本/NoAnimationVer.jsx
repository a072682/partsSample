import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import './_noAnimationVer.scss'; // 引入強化樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { Accordion } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';

export default function NoAnimationVer() {

    // 儲存swiper數據資料狀態宣告
    const [swiperData, setSwiperData] = useState(null);
    useEffect(()=>{},[swiperData])
    // 儲存swiper數據資料狀態宣告

    //指定pagination狀態宣告
    const paginationRef = useRef(null);
    //指定pagination狀態宣告

    return (
        <>
            {/* 元件最外圍 */}
            <Swiper
                className='noAnimationSwiper'
                modules={[Navigation, Pagination, Autoplay, EffectFade]}//需要用到的模組
                autoplay={{
                    delay: 3000,        // 每 3 秒換一張
                    disableOnInteraction: false, // 滑動後仍然會繼續自動播放
                }}
                onSwiper={(swiper) => {
                    // 更新 state
                    setSwiperData({ ...swiper });

                    // 重新綁定 pagination 的 DOM
                    swiper.params.pagination.el = paginationRef.current;

                    // 重新初始化 pagination（重要）
                    swiper.pagination.init();
                    swiper.pagination.render();
                    swiper.pagination.update();
                }}
                onSlideChange={(swiper) => setSwiperData({ ...swiper })}
                slidesPerView={1}//顯示的輪播片數量
                centeredSlides={true}//輪播片置中
                loop={false}//關閉loop
                rewind={true}//開啟循環
                speed={0}//動畫時間為0確保瞬間切換
                effect="fade"//搭配瞬間切換效果
                spaceBetween={8}//輪播片間隔距離(單位:px)
                pagination={{
                    //讓頁碼按鈕可以被點擊
                    clickable: true,
                    //頁碼按鈕
                    el: paginationRef.current,
                }}
                navigation={{
                    //右頁按鈕
                    nextEl: '.swiper-button-next',
                    //左頁按鈕
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    //斷點
                    992: {
                    spaceBetween: 40,
                    slidesPerView: 1,
                    }
                }}
            >
            {[1,2,3,4,5,6,7].map((item,num) => (
                // 輪播片本體
                <SwiperSlide key={num} className='swiperSlide'>
                    {/* 輪播片內容 */}
                    <div className='slide-item'>
                        內容:{item}
                    </div>
                    {/* 輪播片內容 */}
                </SwiperSlide>
                // 輪播片本體
            ))}
                
                {/* 頁碼按鈕 */}
                {/* 空的為正常 */}
                {/* 套件會自動填充 */}
                <div ref={paginationRef}  className="swiper-pagination"></div>
                {/* 頁碼按鈕 */}

                {/* 左右頁按鈕 */}
                <button className="swiper-button-prev d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </button>
                <button className="swiper-button-next d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button >
                {/* 左右頁按鈕 */}
            </Swiper>
            {/* 元件最外圍 */}
            <div>目前顯示第幾張輪播片 {swiperData?.realIndex + 1}</div>
            <div>總輪播數{swiperData?.slides.length}</div>
            
            

            <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
                {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
                <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                    <Accordion.Header className="defaultReactAccordionHeader">
                        程式碼說明
                    </Accordion.Header>
                    <Accordion.Body className="defaultReactAccordionBody p-0">
                        
                        <pre className="language-html m-0 p-16">
                            <div>HTML</div>
                            <code className="language-html">
                                {
                                    dedent(
                                        `
                                        import 'swiper/css';//宣告基礎樣式
                                        import { Swiper, SwiperSlide } from 'swiper/react';//宣告元件
                                        import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';//宣告使用的模組
                                        import './_noAnimationVer.scss'; //讀取樣式
                                        
                                        // 元件前置宣告
                                        // 放置於return上方

                                            // 儲存swiper數據資料狀態宣告
                                            const [swiperData, setSwiperData] = useState(null);
                                            useEffect(()=>{},[swiperData])
                                            // 儲存swiper數據資料狀態宣告

                                            //指定pagination狀態宣告
                                            const paginationRef = useRef(null);
                                            //指定pagination狀態宣告

                                        // 元件本體
                                        // 放置於return下方
                                        {/* 元件最外圍 */}
                                        <Swiper
                                            className='noAnimationSwiper'
                                            modules={[Navigation, Pagination, Autoplay, EffectFade]}//需要用到的模組
                                            autoplay={{
                                                delay: 3000,        // 每 3 秒換一張
                                                disableOnInteraction: false, // 滑動後仍然會繼續自動播放
                                            }}
                                            onSwiper={(swiper) => {
                                                // 更新 state
                                                setSwiperData({ ...swiper });

                                                // 重新綁定 pagination 的 DOM
                                                swiper.params.pagination.el = paginationRef.current;

                                                // 重新初始化 pagination（重要）
                                                swiper.pagination.init();
                                                swiper.pagination.render();
                                                swiper.pagination.update();
                                            }}
                                            onSlideChange={(swiper) => setSwiperData({ ...swiper })}
                                            slidesPerView={1}//顯示的輪播片數量
                                            centeredSlides={true}//輪播片置中
                                            loop={false}//關閉loop
                                            rewind={true}//開啟循環
                                            speed={0}//動畫時間為0確保瞬間切換
                                            effect="fade"//搭配瞬間切換效果
                                            spaceBetween={8}//輪播片間隔距離(單位:px)
                                            pagination={{
                                                //讓頁碼按鈕可以被點擊
                                                clickable: true,
                                                //頁碼按鈕
                                                el: paginationRef.current,
                                            }}
                                            navigation={{
                                                //右頁按鈕
                                                nextEl: '.swiper-button-next',
                                                //左頁按鈕
                                                prevEl: '.swiper-button-prev',
                                            }}
                                            breakpoints={{
                                                //斷點
                                                992: {
                                                spaceBetween: 40,
                                                slidesPerView: 1,
                                                }
                                            }}
                                        >
                                        {[1,2,3,4,5,6,7].map((item,num) => (
                                            // 輪播片本體
                                            <SwiperSlide key={num} className='swiperSlide'>
                                                {/* 輪播片內容 */}
                                                <div className='slide-item'>
                                                    內容:{item}
                                                </div>
                                                {/* 輪播片內容 */}
                                            </SwiperSlide>
                                            // 輪播片本體
                                        ))}
                                            
                                            {/* 頁碼按鈕 */}
                                            {/* 空的為正常 */}
                                            {/* 套件會自動填充 */}
                                            <div ref={paginationRef}  className="swiper-pagination"></div>
                                            {/* 頁碼按鈕 */}

                                            {/* 左右頁按鈕 */}
                                            <button className="swiper-button-prev d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                                                <span className="material-symbols-outlined">
                                                    arrow_back
                                                </span>
                                            </button>
                                            <button className="swiper-button-next d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                                                <span className="material-symbols-outlined">
                                                    arrow_forward
                                                </span>
                                            </button >
                                            {/* 左右頁按鈕 */}
                                        </Swiper>
                                        {/* 元件最外圍 */}
                                        <div>目前顯示第幾張輪播片 {swiperData?.realIndex + 1}</div>
                                        <div>總輪播數{swiperData?.slides.length}</div>
                                        `
                                    )
                                }       
                            </code>
                        </pre>
                        <pre className="language-html m-0 p-16">
                            <div>SCSS</div>
                            <code className="language-html">
                                {
                                    dedent(
                                        `
                                        /* 元件最外圍 */
                                        .noAnimationSwiper{
                                            width: 100%;
                                            position: relative;
                                            height: 50vh;
                                            //輪播本體
                                            .swiperSlide{

                                                /* 輪播片內容 */
                                                .slide-item {
                                                    width: 100%;
                                                    height: 100%;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                }
                                                /* 輪播片內容 */
                                            }
                                            //輪播本體
                                            
                                            
                                            //頁碼按鈕
                                            .swiper-pagination {
                                                position: absolute;
                                                width: 100%;
                                                height: auto;
                                                bottom: 66px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                display: flex;
                                                gap: 8px;
                                                z-index: 15;
                                                justify-content: center;
                                                align-items: center;

                                                .swiper-pagination-bullet {
                                                    width: 24px;
                                                    height: 8px;
                                                    border-radius: 100px;
                                                    background-color: #bbb;
                                                    opacity: 1;
                                                    cursor: pointer;
                                                }
                                                .swiper-pagination-bullet-active {
                                                    background-color: #007bff;
                                                }
                                            }
                                            //左右頁按鈕
                                            .swiper-button-prev,
                                            .swiper-button-next {
                                                position: absolute;
                                                top: 50%;
                                                transform: translateY(-50%);
                                                width: 56px;
                                                height: 56px;
                                                background-color: #ffffff;
                                                color:#0068ff ;
                                                border-radius: 12px;
                                                z-index: 10;
                                                &:hover{
                                                    background-color: #0068ff;
                                                    color:#ffffff ;
                                                }
                                            }

                                            .swiper-button-prev {
                                                left: 20px;
                                            }

                                            .swiper-button-next {
                                                right: 20px;
                                            }
                                        }
                                        /* 元件最外圍 */
                                        `
                                    )
                                }       
                            </code>
                        </pre>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

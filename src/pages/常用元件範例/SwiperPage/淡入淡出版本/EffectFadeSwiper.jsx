import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import './_EffectFadeSwiper.scss'; // 引入強化樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { Accordion } from 'react-bootstrap';

export default function EffectFadeSwiper() {

    const swiperItemData = [
        {
            color:"#ff0000",
        },
        {
            color:"#bbff00",
        },
        {
            color:"#00ff40",
        },
        {
            color:"#0400ff",
        },
        {
            color:"#ff00d4",
        },
    ]

    return (
    <>
        {/* 元件最外圍 */}
        <Swiper
            className='EffectFadeSwiper'
            modules={[Navigation, Pagination, EffectFade]}  //需要用到的模組
            slidesPerView={1}                               //顯示的輪播片數量
            centeredSlides={true}                           //輪播片置中
            loop={true}                                     //開啟輪播片循環
            effect="fade"                                   //啟用淡入淡出
            fadeEffect={{ crossFade: true }}                // 可選：交錯漸變更順
            speed={600}                                     // 可選：動畫時間(毫秒)
            spaceBetween={0}                                //輪播片間隔距離(單位:px)
            pagination={{
                //讓頁碼按鈕可以被點擊
                clickable: true,
                //頁碼按鈕
                el: '.my-pagination',
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
                spaceBetween: 12,
                slidesPerView: 1,
                centeredSlides:true,
                }
            }}
        >
        {swiperItemData?.map((item,num) => (
            // 輪播片本體
            <SwiperSlide key={num} className='swiperSlide'>
                {/* 輪播片內容 */}
                <div    className='slide-item' 
                        style={{backgroundColor: item.color}}
                        // 或是這樣寫style={{ backgroundColor: `rgba(255, 136, 0, 0.6)` }}
                >
                    內容:{num}
                </div>
                {/* 輪播片內容 */}
            </SwiperSlide>
            // 輪播片本體
        ))}
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

        {/* 頁碼按鈕 */}
        {/* 空的為正常 */}
        {/* 套件會自動填充 */}
        <div className="my-pagination"></div>
        {/* 頁碼按鈕 */}

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
                                    import 'swiper/css/effect-fade';//宣告樣式
                                    import { Swiper, SwiperSlide } from 'swiper/react';//宣告元件
                                    import { EffectFade, Navigation, Pagination } from 'swiper/modules';//宣告使用的模組
                                    import './_EffectFadeSwiper.scss'; //讀取樣式
                                    
                                    //資料設定檔
                                    //放置於return上方

                                    const swiperItemData = [
                                        {
                                            color:"#ff0000",
                                        },
                                        {
                                            color:"#bbff00",
                                        },
                                        {
                                            color:"#00ff40",
                                        },
                                        {
                                            color:"#0400ff",
                                        },
                                        {
                                            color:"#ff00d4",
                                        },
                                    ]

                                    // 元件本體
                                    // 放置於return下方
                                    {/* 元件最外圍 */}
                                    <Swiper
                                        className='EffectFadeSwiper'
                                        modules={[Navigation, Pagination, EffectFade]}  //需要用到的模組
                                        slidesPerView={1}                               //顯示的輪播片數量
                                        centeredSlides={true}                           //輪播片置中
                                        loop={true}                                     //開啟輪播片循環
                                        effect="fade"                                   //啟用淡入淡出
                                        fadeEffect={{ crossFade: true }}                // 可選：交錯漸變更順
                                        speed={600}                                     // 可選：動畫時間(毫秒)
                                        spaceBetween={0}                                //輪播片間隔距離(單位:px)
                                        pagination={{
                                            //讓頁碼按鈕可以被點擊
                                            clickable: true,
                                            //頁碼按鈕
                                            el: '.swiper-pagination',
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
                                    {swiperItemData?.map((item,num) => (
                                        // 輪播片本體
                                        <SwiperSlide key={num} className='swiperSlide'>
                                            {/* 輪播片內容 */}
                                            <div    className='slide-item' 
                                                    style={{backgroundColor: item.color}}
                                                    // 或是這樣寫style={{ backgroundColor: \`rgba(255, 136, 0, 0.6)\` }}
                                            >
                                                內容:{num}
                                            </div>
                                            {/* 輪播片內容 */}
                                        </SwiperSlide>
                                        // 輪播片本體
                                    ))}
                                        {/* 頁碼按鈕 */}
                                        {/* 空的為正常 */}
                                        {/* 套件會自動填充 */}
                                        <div className="swiper-pagination"></div>
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
                                    .swiper{
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

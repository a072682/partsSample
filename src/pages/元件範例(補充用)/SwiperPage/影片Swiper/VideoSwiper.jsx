import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import './_VideoSwiper.scss'; // 引入強化樣式
import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式
import { Accordion } from 'react-bootstrap';

export default function VideoSwiper() {


    // 讓大圖輪播跟縮圖輪播同步用狀態
    const [videoSwiper, setVideoSwiper] = useState(null);

    const [mainSwiper, setMainSwiper] = useState(null);

    // 輪播顯示資料
    const swiperItemData = [
        {
            video:"/images/swiper/thumbs範例/大圖/nte_pbgv_nanali_20250513.mp4",
            imgSm:"/images/swiper/thumbs範例/縮圖/factions1_nav1.jpg",
        },
        {
            video:"/images/swiper/thumbs範例/大圖/nte_pbgv_zaowu_20250513.mp4",
            imgSm:"/images/swiper/thumbs範例/縮圖/factions1_nav2.jpg",
        },
        {
            video:"/images/swiper/thumbs範例/大圖/nte_pbgv_nanzhu_20250621.mp4",
            imgSm:"/images/swiper/thumbs範例/縮圖/factions1_nav3.jpg",
        },
        {
            video:"/images/swiper/thumbs範例/大圖/nte_pbgv_nvzhu_20250621.mp4",
            imgSm:"/images/swiper/thumbs範例/縮圖/factions1_nav4.jpg",
        },
    ];

    const w_swiperItemData = [...swiperItemData,...swiperItemData];
    
  return (
    <>  
        {/* 背景 */}
        <div className='backGround'>
            {/* 大圖輪播 */}
            {/* <Swiper
                className='thumbsSwiper'
                modules={[Thumbs]}//需要用到的模組
                slidesPerView={1}//顯示的輪播片數量
                centeredSlides={true}//輪播片置中
                loop={true}//開啟輪播片循環
                //rewind={true}
                spaceBetween={0}//輪播片間隔距離(單位:px)
                onSwiper={setMainSwiper}//與縮圖輪播同步
                //讓主圖能追蹤縮圖進度
                watchSlidesProgress={true} 
                speed={500}// 可選：動畫時間(毫秒)
                allowTouchMove={false}//禁滑主圖
                //Swiper建立的瞬間 會自動執行一次
                onInit={(swiper) => {
                    //slides = <SwiperSlide> 輪播片本體列表是個陣列
                    const slides = swiper.slides;
                    //查這張裡面的影片，讓它播放；其他張停掉
                    slides.forEach((slide, i) => {
                        //找第一個 class = bgVideo 的元素
                        const video = slide.querySelector('.bgVideo'); 
                        if (!video) return;
                        
                        // 現在這張 → 播放
                        if (i === swiper.activeIndex) {
                            // 播放，回傳 Promise物件 或 undefined
                            const result = video.play();
                            // 如果是Promise物件 那就會產生.catch
                            // 因此使用result?.catch判斷
                            if (result?.catch) {
                                //讓資料直接消失
                                result.catch(() => null);
                            }
                        } else {
                            //暫停播放
                            video.pause();
                            //重新跳到開頭
                            video.currentTime = 0;
                        }
                    });
                }}
                //每次切換輪播片就會觸發這段程式
                onSlideChange={(swiper) => {
                    //slides = <SwiperSlide> 輪播片本體列表是個陣列
                    const slides = swiper.slides;
                    //查這張裡面的影片，讓它播放；其他張停掉
                    slides.forEach((slide, i) => {
                        //找第一個 class = bgVideo 的元素
                        const video = slide.querySelector('.bgVideo'); 
                        if (!video) return;
                        
                        // 現在這張 → 播放
                        if (i === swiper.activeIndex) {
                            // 播放，回傳 Promise物件 或 undefined
                            const result = video.play();
                            // 如果是Promise物件 那就會產生.catch
                            // 因此使用result?.catch判斷
                            if (result?.catch) {
                                //讓資料直接消失
                                result.catch(() => null);
                            }
                        } else {
                            //暫停播放
                            video.pause();
                            //重新跳到開頭
                            video.currentTime = 0;
                        }
                    });
                }}
            >
            {
                swiperItemData?.map((item, index) => (
                    <SwiperSlide key={`thumb-${index}`} className='swiperSlide'>
                        // {/* <div className="videoSet">
                        //     <video
                        //         className="bgVideo"
                        //         autoPlay //載入後自動播放（行動裝置要搭配 muted 才會生效）
                        //         muted //把影片靜音（多數瀏覽器要求靜音才允許自動播放）
                        //         loop //播完自動重頭再播
                        //         playsInline //在手機上「行內播放」，不會跳全螢幕
                        //         preload="auto" //盡量預先載入影片（加快開始播放的速度）
                        //         poster="" //影片尚未播放或載入時顯示的封面圖
                        //     >
                        //         <source src={item.video} type="video/mp4" />
                        //         您的瀏覽器不支援影片
                        //     </video>
                        // </div> */}
                        {/* <button     type="button" className='imgBox'
                                    style={{ backgroundImage: `url(${item.imgSm})` }}
                        />
                    </SwiperSlide>
                ))
            }
            </Swiper> */} 

            <Swiper
                className="thumbsSwiper"
                modules={[Thumbs]}
                onSwiper={setVideoSwiper}
                watchSlidesProgress        // 跟 loop 一起使用，讓 active 狀態正確
                slidesPerView={1}
                spaceBetween={8}
            >
                {w_swiperItemData.map((src, i) => (
                <SwiperSlide key={`thumb-${i}`} className='swiperSlide'>
                    <div className="videoSet">
                        <video
                            className="bgVideo"
                            autoPlay //載入後自動播放（行動裝置要搭配 muted 才會生效）
                            muted //把影片靜音（多數瀏覽器要求靜音才允許自動播放）
                            loop //播完自動重頭再播
                            playsInline //在手機上「行內播放」，不會跳全螢幕
                            preload="auto" //盡量預先載入影片（加快開始播放的速度）
                            poster="" //影片尚未播放或載入時顯示的封面圖
                        >
                            <source src={src.video} type="video/mp4" />
                            您的瀏覽器不支援影片
                        </video>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
            {/* 大圖輪播 */}
            
            {/* 控制欄 */}
            <div className='controlItemBox'>

                {/* 左按鈕 */}
                <button className='thumbsSwiper-button-prev'>
                </button>
                {/* 左按鈕 */}

                {/* 縮圖輪播外框 */}
                <div className='swiperBox'>
                    {/* 縮圖輪播 */}
                    {/* <Swiper
                        className="thumbsThumbnailSwiper"
                        modules={[Thumbs,Navigation]}
                        //儲存輪播狀態
                        onSwiper={setVideoSwiper}
                        //與大圖輪播同步
                        thumbs={{ swiper: mainSwiper && !mainSwiper.destroyed ? mainSwiper : null }}
                        //開啟輪播片循環
                        loop={true}
                        //輪播片置中
                        centeredSlides={true}
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation={{
                            //左右頁按鈕
                            nextEl: '.thumbsSwiper-button-next',
                            prevEl: '.thumbsSwiper-button-prev',
                        }}
                        // rewind={true}
                        //initialSlide={1}
                        //在最左邊或最右邊不夠內容可以置中時
                        //wiper 會「貼齊邊界」顯示，而不是硬把中間空出一塊。
                        //centeredSlidesBounds={true}
                        //複製額外的輪播片
                        //loopAdditionalSlides={3}
                        // preventClicksPropagation={false}
                        //點到哪張縮圖，就把那張捲到可視中心並設為 active。             
                        // slideToClickedSlide={true}
                    >
                        {
                            swiperItemData?.map((item, index) => (
                                <SwiperSlide    key={index} 
                                                className='swiperSlide'
                                                onClick={() => {videoSwiper?.slideToLoop(index);}}
                                >
                                    <button     type="button" className='imgBox'
                                                style={{ backgroundImage: `url(${item.imgSm})` }}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper> */}
                    <Swiper
                        className="thumbsThumbnailSwiper"
                        modules={[Navigation, Thumbs]}
                        onSwiper={setMainSwiper}
                        spaceBetween={16}                 // 主視窗間距
                        loop={true}                        // 需要與 thumbs 一起用 watchSlidesProgress
                        navigation={{
                        nextEl: '.thumbsSwiper-button-next',
                        prevEl: '.thumbsSwiper-button-prev',
                        }}
                        // Swiper v9+ 安全寫法：避免 destroyed 造成錯誤
                        thumbs={{ swiper: videoSwiper && !videoSwiper.destroyed ? videoSwiper : null }}
                        slidesPerView={3}
                        centeredSlides
                    >
                        {w_swiperItemData.map((src, i) => (
                            <SwiperSlide    className='swiperSlide'
                                            key={i}
                                            onClick={() => {mainSwiper?.slideToLoop(i);}}
                                            style={{ cursor: 'pointer' }}
                            >
                                <button     type="button" className='imgBox'
                                            style={{ backgroundImage: `url(${src.imgSm})` }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* 縮圖輪播 */}
                </div>
                {/* 縮圖輪播外框 */}

                {/* 右按鈕 */}
                <button className='thumbsSwiper-button-next'>
                </button>
                {/* 右按鈕 */}
            </div>
            {/* 控制欄 */}
        </div>
        {/* 背景 */}

        {/* 元件最外圍 */}
        

        
        
        {/* 元件最外圍 */}

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
                                    import { Navigation, Pagination } from 'swiper/modules';//宣告使用的模組
                                    import './_DefaultSwiper.scss'; //讀取樣式
                                    

                                    // 元件本體
                                    // 放置於return下方
                                    {/* 元件最外圍 */}
                                    <Swiper
                                    className='swiper'
                                    modules={[Navigation, Pagination]}//需要用到的模組
                                    slidesPerView={1}//顯示的輪播片數量
                                    centeredSlides={true}//輪播片置中
                                    loop={true}//開啟輪播片循環
                                    spaceBetween={8}//輪播片間隔距離(單位:px)
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
                                    {[1,2,3,4,5].map((item,num) => (
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

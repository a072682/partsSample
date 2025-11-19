import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import './_test.scss'; // 引入強化樣式


export default function Test() {


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
        <div><p>測試一下</p></div>
        <div><p>測試一下02</p></div>
        <div><p>測試一下03</p></div>
        <div><p>測試一下04</p></div>
        {/* 大輪播圖背景 */}
        <div className='testBackGround'>
            {/* 大圖輪播 */}
            <Swiper
                className="testSwiper"
                onSwiper={setVideoSwiper}
                loop={true} 
                slidesPerView={1.5}
                spaceBetween={10}
                centeredSlides
                onSlideChange={(swiper) => {
                    mainSwiper?.slideToLoop(swiper.realIndex);
                }}
            >
                {w_swiperItemData.map((src, i) => (
                    <SwiperSlide key={i} className='swiperSlide'>
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
        </div>
        {/* 大輪播圖背景 */}

        {/* 小圖輪播背景 */}
        <div className='backGroundSecond'>
            {/* 控制欄 */}
            <div className='controlItemBox'>

                {/* 左按鈕 */}
                <button className='testSwiper-button-prev' onClick={() => videoSwiper?.slidePrev()}>
                </button>
                {/* 左按鈕 */}

                {/* 縮圖輪播外框 */}
                <div className='swiperBox'>
                    {/* 縮圖輪播 */}
                    <Swiper
                        className="thumbsThumbnailSwiper"
                        modules={[Navigation]}
                        onSwiper={setMainSwiper}
                        spaceBetween={16}                 
                        loop={true}                       
                        navigation={{
                            nextEl: '.testSwiper-button-next',
                            prevEl: '.testSwiper-button-prev',
                        }}
                        slidesPerView={3}
                        centeredSlides
                    >
                        {w_swiperItemData.map((src, i) => (
                            <SwiperSlide    className='swiperSlide'
                                            key={i}
                                            onClick={() => {mainSwiper?.slideToLoop(i);videoSwiper?.slideToLoop(i);}}
                                            //onClick={() => {mainSwiper?.slideTo(i);videoSwiper?.slideTo(i);}}
                                            
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
                <button className='testSwiper-button-next' onClick={() => videoSwiper?.slideNext()}>
                </button>
                {/* 右按鈕 */}
            </div>
            {/* 控制欄 */}
        </div>
        {/* 小圖輪播背景 */}
    </>
  );
}



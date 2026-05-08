import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { useState } from 'react';
import './_ThumbsSwiper.scss';

// 假資料：可換成你的圖片
const images = [
    'images/swiper/thumbsSwiper/c-1.jpg',
    'images/swiper/thumbsSwiper/c-2.jpg',
    'images/swiper/thumbsSwiper/c-3.jpg',
    'images/swiper/thumbsSwiper/c-4.jpg',
    'images/swiper/thumbsSwiper/c-5.jpg',
    ];

export default function ThumbsSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [mainSwiper, setMainSwiper] = useState(null);

  return (
    <div className="thumbs-swiper-wrap">
      {/* 主視窗 */}
      <Swiper
        className="main-swiper"
        modules={[Navigation, FreeMode, Thumbs]}
        onSwiper={setMainSwiper}
        spaceBetween={16}                 // 主視窗間距
        loop={true}                        // 需要與 thumbs 一起用 watchSlidesProgress
        navigation={{
          nextEl: '.thumbs-next',
          prevEl: '.thumbs-prev',
        }}
        // Swiper v9+ 安全寫法：避免 destroyed 造成錯誤
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        slidesPerView={3}
        centeredSlides
      >
        {images.map((src, i) => (
            <SwiperSlide    key={i}
                            onClick={() => {mainSwiper?.slideToLoop(i);}}
            style={{ cursor: 'pointer' }}
            >
                <div className="main-slide">
                <img src={src} alt={`slide-${i}`} />
                </div>
            </SwiperSlide>
        ))}

        {/* 左右鍵 */}
        <button className="thumbs-prev nav-btn" aria-label="prev">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button className="thumbs-next nav-btn" aria-label="next">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </Swiper>

      {/* 縮圖列 */}
      <Swiper
        className="thumbs-swiper"
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress        // 跟 loop 一起使用，讓 active 狀態正確
        freeMode                   // 自由滾動，手感比較像縮圖列
        slidesPerView={1}
        spaceBetween={8}
      >
        {images.map((src, i) => (
          <SwiperSlide key={`thumb-${i}`}>
            <button className="thumb-btn" aria-label={`thumb-${i}`}>
              <img src={src} alt={`thumb-${i}`} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}




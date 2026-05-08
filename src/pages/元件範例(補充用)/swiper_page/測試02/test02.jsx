import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './_test02.scss'; // 引入強化樣式


export default function Test02() {

    
  return (
    <>  
        {/* 元件最外圍 */}
        <Swiper
            className='test02Swiper'
            modules={[Navigation, Pagination]}//需要用到的模組
            slidesPerView={3}//顯示的輪播片數量
            centeredSlides={true}//輪播片置中
            loop={true}//開啟輪播片循環
            spaceBetween={12}//輪播片間隔距離(單位:px)
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
    </>
  );
}

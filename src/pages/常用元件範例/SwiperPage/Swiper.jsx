


import DefaultSwiper from './預設基礎Swiper範本/DefaultSwiper';
import EffectFadeSwiper from './淡入淡出版本/EffectFadeSwiper';
import SwiperWithTab from './搭配tab元件swiper範例/SwiperWithTab';


export default function SwiperSample() {
  return (
    <div className="container">
        <div className='row'>
            <div className='col'>
                <h3>預設Swiper範例</h3>
                <DefaultSwiper />
                <hr />
                <h3>淡入淡出Swiper範例</h3>
                <EffectFadeSwiper />
                <hr />
                <h3>搭配tab元件swiper範例</h3>
                <SwiperWithTab />
                <hr />
            </div>
        </div>
    </div>
  );
}






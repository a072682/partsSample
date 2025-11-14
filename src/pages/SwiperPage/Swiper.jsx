


import DefaultSwiper from './PackageSwiper/DefaultSwiper';
import ThumbsSwiper from './Thumbs範例/ThumbsSwiper';
import VideoSwiper from './影片Swiper/VideoSwiper';
import EffectFadeSwiper from './淡入淡出版本/EffectFadeSwiper';
import Test from './測試/Test';
import Test02 from './測試02/Test02';


export default function Swiper() {
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
                <h3>ThumbsSwiper範例</h3>
                <ThumbsSwiper />
                <hr />
                <h3>影片Swiper範例</h3>
                <VideoSwiper />
                <hr />
                <h3>測試範例</h3>
                <Test />
                <hr />
                <Test02 />
            </div>
        </div>
    </div>
  );
}






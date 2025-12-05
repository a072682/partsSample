
import './_範例一.scss';//引入指定樣式

export default function 跑馬燈範例一() {

    return (
        <>
            {/* 範例一 */}
            <div className='範例一'>
                <h4>跑馬燈範例一</h4>
                {/* 跑馬燈外框 */}
                <div className='MarqueePage'>
                    {/* 跑馬燈內容 */}
                    <div className="track">

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
            {/* 範例一 */}
        </>
    );
}

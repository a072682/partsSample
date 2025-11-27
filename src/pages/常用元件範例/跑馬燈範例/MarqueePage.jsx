
import './_MarqueePage.scss';//引入指定樣式





export default function MarqueePage() {

    return (
        <>
            {/* 範例一 */}
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

            {/* 範例二 */}
            {/* 外框 */}
            <div className='outBox'>
                {/* 水平跑跑馬燈外框 */}
                <div className='MarqueePage02'>
                    {/* 跑馬燈內容 */}
                    <div className="track">

                            {/* 內容群組 */}
                            <div className='contentBox'></div>
                            {/* 內容群組 */}

                            {/* 內容群組複製顯示用 */}
                            <div className='contentBox'></div>
                            {/* 內容群組複製顯示用 */}

                    </div>
                    {/* 跑馬燈內容 */}
                </div>
                {/* 跑馬燈外框 */}

                <div className='flexBox'>
                    {/* 垂直跑跑馬燈外框 */}
                    <div className='MarqueePage03'>
                        {/* 跑馬燈內容 */}
                        <div className="track">

                                {/* 內容群組 */}
                                <div className='contentBox'></div>
                                {/* 內容群組 */}

                                {/* 內容群組複製顯示用 */}
                                <div className='contentBox'></div>
                                {/* 內容群組複製顯示用 */}

                        </div>
                        {/* 跑馬燈內容 */}
                    </div>
                    {/* 跑馬燈外框 */}

                    <div className='inBox'>
                        <div className='MarqueeBox'>
                            {/* 垂直跑跑馬燈外框 */}
                            <div className='MarqueePage04'>
                                {/* 跑馬燈內容 */}
                                <div className="track">

                                        {/* 內容群組 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組 */}

                                        {/* 內容群組複製顯示用 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組複製顯示用 */}

                                </div>
                                {/* 跑馬燈內容 */}
                            </div>
                            {/* 跑馬燈外框 */}
                            {/* 垂直跑跑馬燈外框 */}
                            <div className='MarqueePage04'>
                                {/* 跑馬燈內容 */}
                                <div className="track">

                                        {/* 內容群組 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組 */}

                                        {/* 內容群組複製顯示用 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組複製顯示用 */}

                                </div>
                                {/* 跑馬燈內容 */}
                            </div>
                            {/* 跑馬燈外框 */}

                            {/* 垂直跑跑馬燈外框 */}
                            <div className='MarqueePage04'>
                                {/* 跑馬燈內容 */}
                                <div className="track">

                                        {/* 內容群組 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組 */}

                                        {/* 內容群組複製顯示用 */}
                                        <div className='contentBox'></div>
                                        {/* 內容群組複製顯示用 */}

                                </div>
                                {/* 跑馬燈內容 */}
                            </div>
                            {/* 跑馬燈外框 */}
                        </div>

                        <div className='testBox02'></div>


                        

                        
                        <div className='testBox03'></div>
                    </div>
                </div>
                
            </div>
            {/* 外框 */}
            
        </>
    );
}



import { useEffect, useRef, useState } from 'react';
import './_進退場動畫範例.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


export default function 進退場動畫範例() {

    //#region
    //#endregion

    //#region swiper顯示資料
    const swiperData = [
        {
            id:"1-1",
            thumb:`/images/動畫/進退場動畫範例/01/endministrator2.f0bbf4fa.png`,
            img2d:`/images/動畫/進退場動畫範例/01/endministrator2.1ec20a16.png`,
        },
        {
            id:"1-2",
            thumb:`/images/動畫/進退場動畫範例/02/endministrator1.3efd4769.png`,
            img2d:`/images/動畫/進退場動畫範例/02/endministrator1.ec409283.png`,
        },
        {
            id:"1-3",
            thumb:`/images/動畫/進退場動畫範例/03/snowshine.844ed0a4.png`,
            img2d:`/images/動畫/進退場動畫範例/03/snowshine.1f6d3a0e.png`,
        },
        {
            id:"1-4",
            thumb:`/images/動畫/進退場動畫範例/04/wulfgard.b9d580b2.png`,
            img2d:`/images/動畫/進退場動畫範例/04/wulfgard.53a6686b.png`,
        },
    ];
    const w_swiperData = [...swiperData,...swiperData,...swiperData];
    //#endregion

    //#region 舊內容過場動畫設定
    const [oldAnimation, setOldAnimation] = useState(false);
    useEffect(()=>{
        //console.log("舊內容轉場動畫狀態",oldAnimation)
    },[oldAnimation]);
    //#endregio

    //#region 新內容過場動畫設定
    const [newAnimation, setNewAnimation] = useState(false);
    useEffect(()=>{
        //console.log("新內容轉場動畫狀態",newAnimation)
        if(newAnimation){
            // 冷卻結束（例如 300ms）
            const timer = setTimeout(() => {
                setNewAnimation(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    },[newAnimation]);
    //#endregio

    //#region 宣告處理上一張函式
    const handlePrevClick = () => {
        // 正在冷卻
        if (oldAnimation || newAnimation) {
            return;
        }         
        // 進入冷卻
        setOldAnimation(true);        

        // 冷卻結束（例如 300ms）
        const timer = setTimeout(() => {
            //縮圖輪播片上一頁          
            thumbSwiper?.slidePrev();
            setOldAnimation(false);
            setNewAnimation(true);
        }, 1000);

        return () => clearTimeout(timer);
    };
    //#endregion

    //#region 宣告處理下一張函式
    const handleNextClick = () => {

        // 正在冷卻
        if (oldAnimation || newAnimation) {
            return;
        }         
        // 進入冷卻
        setOldAnimation(true);   

        // 冷卻結束（例如 300ms）
        const timer = setTimeout(() => {
            //縮圖輪播片上一頁          
            thumbSwiper?.slideNext();
            setOldAnimation(false);
            setNewAnimation(true);
        }, 1000);

        return () => clearTimeout(timer);
    };
    //#endregion

    //#region 宣告處理縮圖點擊函式
    const handleThumbClick = (index) => {
        // 正在冷卻
        if (oldAnimation || newAnimation) {
            return;
        }         
        // 進入冷卻
        setOldAnimation(true);        

        // 冷卻結束（例如 300ms）
        const timer = setTimeout(() => {
            thumbSwiper?.slideToLoop(index);
            setOldAnimation(false);
            setNewAnimation(true);
        }, 1000);

        return () => clearTimeout(timer);
    };
    //#endregion

    //#region 縮圖swiper相關

        const [swiperReady, setSwiperReady] = useState(false);

        useEffect(() => {
            // 等瀏覽器完成一次 layout
            requestAnimationFrame(() => {
                setSwiperReady(true);
            });
        }, []);

        //#region 縮圖輪播片儲存狀態宣告
        const [thumbSwiper,setThumbSwiper] = useState(null);
        useEffect(()=>{
            //console.log("內容",thumbSwiper);
        },[thumbSwiper]);
        //#endregion

        //#region 儲存swiper數據資料狀態宣告
        const [thumbSwiperData, setThumbSwiperData] = useState(null);
        useEffect(()=>{
            //console.log("內容",thumbSwiperData?.realIndex);
        },[thumbSwiperData])
        //#endregion

        //#region 左右按鈕宣告
        const prevRefs = useRef(null);
        const nextRefs = useRef(null);
        //#endregion

    //#endregion
    

    return (
        <>
            <article className='進退場動畫範例'>
                <h3>進退場動畫範例</h3>
                
                {/* 內容顯示區塊 */}
                <div className="showBoxSet" >
                    <div className='show2DBox'>
                        <div className="widthBox">
                            <div className="heightBox">
                                <img className={`
                                    imgSet 
                                    ${oldAnimation ? 'old' : ''}
                                    ${newAnimation ? 'new' : ''}
                                `} 
                                    src={w_swiperData[thumbSwiperData?.realIndex || 0].img2d} 
                                    alt="img2dData" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 內容顯示區塊 */}
               
                {/* 縮圖顯示區塊 */}
                <div className='thumbViewBox'>
                    {/* 左右按鈕列表 */}
                
                    {/* 左按鈕設定 */}
                    <button className="prevBtn active" 
                            ref={prevRefs}
                            onClick={()=>{handlePrevClick()}}>
                    </button>
                    {/* 左按鈕設定 */}

                    {/* 右按鈕設定 */}
                    <button className="nextBtn active"
                            ref={nextRefs}
                            onClick={()=>{handleNextClick()}}>    
                    </button>
                    {/* 右按鈕設定 */}   
                    
                    {/* 左右按鈕列表 */}
                    
                    {/* 縮圖資料顯示區 */}
                    <div className='thumbBox'>
                        {
                            swiperReady && (
                                <Swiper
                                    className="thumbsSwiper"
                                    modules={[Navigation]}
                                    spaceBetween={8}                 
                                    loop={true}                       
                                    slidesPerView={3}
                                    centeredSlides
                                    observer={true}
                                    observeParents={true}
                                    watchSlidesProgress={true}
                                    onSwiper={(swiper) => {
                                        setThumbSwiper(swiper);
                                    }}
                                    onSlideChange={(swiper) => {
                                        setThumbSwiperData({...swiper});
                                    }}
                                >
                                    {
                                        w_swiperData?.map((item, index) => (
                                            <SwiperSlide    className='swiperSlide'
                                                            key={index}
                                            >
                                                <button type="button" 
                                                        className='imgBox'
                                                        onClick={() => {
                                                            handleThumbClick(index);
                                                        }}
                                                >
                                                    <img className='imgSet' src={item.thumb} alt="thumbData" />
                                                </button>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            )
                        }
                        
                    </div>
                    {/* 縮圖資料顯示區 */}
                </div>
                {/* 縮圖顯示區塊 */}

            </article>
            
        </>
    );
}



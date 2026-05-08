
// 放置邏輯相關

//#region 
// 引入狀態
import { useEffect, useRef, useState } from 'react';
// 引入靜態資料
import { tabData } from './_SwiperDoubleSample.data';
//#endregion

//#region
// 將狀態/函式寫入同一個函式並將此函式輸出
export function useSwiperDouble() {

    //#region tab控制
    const [activeTab, setActiveTab] = useState('01');
    //#endregion

    //#region 主輪播片儲存狀態
    const [mainSwiper, setMainSwiper] = useState(null);
    //#endregion

    //#region 縮圖輪播片儲存狀態
    const [thumbSwiper, setThumbSwiper] = useState(null);
    //#endregion

    //#region 左右按鈕宣告
    // 左按鈕
    const prevRefs = useRef([]);
    // 右按鈕
    const nextRefs = useRef([]);
    //#endregion

    //#region 冷卻狀態
    const [cooldown, setCooldown] = useState(false);
    //#endregion

    //#region 將左右按鈕重新綁定給縮圖輪播片
    useEffect(() => {
        // 如果縮圖輪播狀態跟主輪播狀態都為空則跳出
        if (!thumbSwiper || !mainSwiper) {
            return;
        }

        // 取出index的內容
        // 從 tabData 陣列裡，找出 key 等於目前 activeTab 的那一筆
        const index = tabData.findIndex(tab => tab.key === activeTab);
        // 將主輪播狀態給予swiper
        const swiper = thumbSwiper;

        // 把prevRefs按鈕綁定swiper上一頁按鈕
        swiper.params.navigation.prevEl = prevRefs.current[index];
        // 把nextRefs按鈕綁定swiper下一頁按鈕
        swiper.params.navigation.nextEl = nextRefs.current[index];
        // 將上下頁按鈕初始化
        swiper.navigation.init();
        // 更新按鈕狀態(記錄按鈕狀態)
        swiper.navigation.update();

    }, [thumbSwiper]);
    //#endregion

    //#region 上一張
    const handlePrevClick = () => {
        // 如果冷卻狀態為true則跳出
        if (cooldown) {
            return;
        }
        //冷卻狀態寫入true
        setCooldown(true);
        //縮圖輪播播放上一張
        thumbSwiper?.slidePrev();
        //主輪播播放上一張
        mainSwiper?.slidePrev();
        //延遲0.5秒將冷卻狀態寫入false
        setTimeout(() => setCooldown(false), 500);
    };
    //#endregion

    //#region 下一張
    const handleNextClick = () => {
        // 如果冷卻狀態為true則跳出
        if (cooldown) {
            return;
        }
        //冷卻狀態寫入true
        setCooldown(true);
        //縮圖輪播播放下一張
        thumbSwiper?.slideNext();
        //主輪播播放下一張
        mainSwiper?.slideNext();
        //延遲0.5秒將冷卻狀態寫入false
        setTimeout(() => setCooldown(false), 500);
    };
    //#endregion

    // 統一回傳，jsx 需要什麼就拿什麼
    return {
        // tab狀態
        activeTab, 
        setActiveTab,
        // 主輪播片狀態
        mainSwiper, 
        setMainSwiper,
        // 縮圖輪播片狀態
        thumbSwiper, 
        setThumbSwiper,
        // 左右按鈕
        prevRefs, nextRefs,
        // 冷卻時間狀態
        cooldown,
        // 上一頁&下一頁函式
        handlePrevClick, handleNextClick,
    };
}
//#endregion
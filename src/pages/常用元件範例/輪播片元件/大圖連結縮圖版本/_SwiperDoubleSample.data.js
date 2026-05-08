
// 放置靜態資料

//#region 縮圖輪播顯示資料
const ThumbSwiperData01 = [
    {
        id:"1-1",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions1_nav1.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions1_role1_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nanali_20250513_opt.webm`,
    },
    {
        id:"1-2",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions1_nav2.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions1_role2_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_zaowu_20250513_opt.webm`,
    },
    {
        id:"1-3",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions1_nav3.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions1_role3_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nanzhu_20250621_opt.webm`,
    },
    {
        id:"1-4",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions1_nav4.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions1_role3_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nvzhu_20250621_opt.webm`,
    },
];

const w_ThumbSwiperData01 = [...ThumbSwiperData01, ...ThumbSwiperData01, ...ThumbSwiperData01];

const ThumbSwiperData02 = [
    {
        id:"2-1",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions2_nav1.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions2_role1_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_bohe_20250513_opt.webm`,
    },
    {
        id:"2-2",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions2_nav2.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions2_role2_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_anhunqu_20250513_opt.webm`,
    },
    {
        id:"2-3",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions2_nav3.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions2_role3_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_fadiya_20250513_opt.webm`,
    },
    {
        id:"2-4",
        imgSm:`/images/swiper/背景圖連結縮圖範例/factions2_nav4.jpg`,
        role:`/images/swiper/背景圖連結縮圖範例/factions2_role4_des.png`,
        video:`/images/swiper/背景圖連結縮圖範例/nte_pbgv_baizang_20250621_opt.webm`,
    },
];

const w_ThumbSwiperData02 = [...ThumbSwiperData02, ...ThumbSwiperData02, ...ThumbSwiperData02];
//#endregion

//#region 
// 輸出tab顯示資料
export const tabData = [
    {
        key: "01",
        class: "tabBtn01",
        swiperData: w_ThumbSwiperData01,
    },
    {
        key: "02",
        class: "tabBtn02",
        swiperData: w_ThumbSwiperData02,
    },
];
//#endregion
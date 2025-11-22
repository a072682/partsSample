import { Fragment, useEffect, useRef, useState } from 'react';
import { Tab, Nav, Accordion } from 'react-bootstrap';
import './_SwiperDoubleSample.scss'; // 引入強化樣式

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,EffectFade } from 'swiper/modules';

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式

export default function SwiperDoubleSample() {

    //#region
    //#endregion

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

    const w_ThumbSwiperData01 = [...ThumbSwiperData01,...ThumbSwiperData01,...ThumbSwiperData01];

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

    const w_ThumbSwiperData02 = [...ThumbSwiperData02,...ThumbSwiperData02,...ThumbSwiperData02];
    //#endregion

    //#region tab控制
    const [activeTab, setActiveTab] = useState('01');
    //#endregion

    //#region tab顯示資料
    const tabData = [
        {
            key:"01",
            class:"tabBtn01",
            swiperData:w_ThumbSwiperData01,
        },
        {
            key:"02",
            class:"tabBtn02",
            swiperData:w_ThumbSwiperData02,
        },
    ]
    //#endregion

    //#region 左右按鈕宣告
    const prevRefs = useRef([]);
    const nextRefs = useRef([]);
    //#endregion

    //#region 主輪播片儲存狀態宣告
    const [mainSwiper,setMainSwiper] = useState(null);
    //#endregion

    //#region 縮圖輪播片儲存狀態宣告
    const [thumbSwiper,setThumbSwiper] = useState(null);
    //#endregion
    
    //#region 將左右按鈕重新綁定給縮圖輪播片
    useEffect(() => {
        //如果沒有抓到輪播片資料則跳出程序
        if (!thumbSwiper || !mainSwiper) {
            return;
        }
        if (thumbSwiper) {

            // 取得index數字
            const index = tabData.findIndex(tab => tab.key === activeTab);

            //將swiper資料指定給swiper
            const swiper = thumbSwiper;

            // 重新綁定 navigation
            swiper.params.navigation.prevEl = prevRefs.current[index];
            swiper.params.navigation.nextEl = nextRefs.current[index];
            
            // 重新初始化 navigation（重要）
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [thumbSwiper]);
    //#endregion

    //#region 宣告冷卻儲存狀態
    const [cooldown, setCooldown] = useState(false);
    //#endregion

    //#region 宣告處理上一張函式
    const handlePrevClick = () => {
        // 正在冷卻
        if (cooldown) {
            return;
        }         
        // 進入冷卻
        setCooldown(true);
        //縮圖輪播片上一頁          
        thumbSwiper?.slidePrev();
        //主輪播片上一頁
        mainSwiper?.slidePrev();

        // 冷卻結束（例如 300ms）
        setTimeout(() => setCooldown(false), 500);
    };
    //#endregion

    //#region 宣告處理下一張函式
    const handleNextClick = () => {
        // 正在冷卻
        if (cooldown) {
            return;
        }           
        // 進入冷卻
        setCooldown(true);
        //縮圖輪播片下一頁            
        thumbSwiper?.slideNext();
        //主輪播片下一頁
        mainSwiper?.slideNext();

        // 冷卻結束（例如 300ms）
        setTimeout(() => setCooldown(false), 500);
    };
    //#endregion

  return (
    <>
        {/* 控制層 顯示元素不存在 */}
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
            {/* 元件最外層 */}
            <div className="SwiperDoubleSampleBox">
                {/* 背景顯示區塊 */}
                <div className='viewBox'>
                    {/* Tab 內容區 */}
                    <Tab.Content className='tabContent'>
                        {
                            tabData?.map((item)=>{
                                return(
                                    /* 內容外層 */
                                    <Tab.Pane   className='tabPane'
                                                key={item.key} 
                                                eventKey={item.key}>
                                        {
                                            //只顯示單一輪播
                                            activeTab === item.key && (
                                                /* 大圖輪播 */
                                                <Swiper
                                                    className="bgSwiper"
                                                    modules={[EffectFade]}
                                                    onSwiper={(swiper) => {
                                                        setMainSwiper(swiper);
                                                    }}
                                                    loop={true} 
                                                    slidesPerView={1}
                                                    effect="fade"                                   //啟用淡入淡出
                                                    fadeEffect={{ crossFade: true }}                // 可選：交錯漸變更順
                                                    speed={600}                                     // 可選：動畫時間(毫秒)
                                                    spaceBetween={10}
                                                    centeredSlides
                                                    observer={true}
                                                    observeParents={true}
                                                    onSlideChange={(swiper) => {
                                                        thumbSwiper?.slideToLoop(swiper.realIndex);
                                                    }}
                                                >
                                                    {
                                                        item.swiperData?.map((itemIn, i) => {
                                                            return(
                                                                <SwiperSlide key={i} className='swiperSlide'>

                                                                    {/* 背景輪播 */}
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
                                                                            <source src={itemIn.video} type="video/webm" />
                                                                            您的瀏覽器不支援影片
                                                                        </video>
                                                                    </div>
                                                                    {/* 背景輪播 */}

                                                                    {/* 角色說明最外圍 */}
                                                                    {/* 背景 */}
                                                                    <div className='profileBox'>
                                                                        <div className='profileContentBox'>

                                                                            <div className='profileImgBox'>
                                                                                <img className='imgSet' src={itemIn.role} alt="" />
                                                                            </div>
                                                                            
                                                                        </div>    
                                                                    </div>
                                                                    {/* 背景 */}
                                                                    {/* 角色說明最外圍 */}
                                                                    
                                                                </SwiperSlide>
                                                            )
                                                        })
                                                    }
                                                </Swiper>
                                                /* 大圖輪播 */
                                            )
                                            //只顯示單一輪播
                                        }
                                        
                                    </Tab.Pane>
                                    /* 內容外層 */  
                                )
                            })
                        }
                    </Tab.Content>
                    {/* Tab 內容區 */}
                </div>
                {/* 背景顯示區塊 */}

                <div className='d-flex box'>
                    {/* tab顯示區塊 */}
                    <div className='tabViewBox'>
                        {/* Tab 選單區 */}
                        <Nav className='tabBox'>
                            {/* 選項按鈕外層 */}
                            <Nav.Item  className='tabItem'>
                            {
                                tabData?.map((item)=>{
                                    return(
                                        /* 選項按鈕本體 */
                                        <Nav.Link   key={item.key}
                                                    className={`tabLink ${item.class}`} 
                                                    eventKey={item.key}>
                                        </Nav.Link>
                                        /* 選項按鈕本體 */  
                                    )
                                })
                            }
                            </Nav.Item>
                            {/* 選項按鈕外層 */}
                        </Nav>
                        {/* Tab 選單區 */}
                    </div>
                    {/* tab顯示區塊 */}

                    {/* 縮圖顯示區塊 */}
                    <div className='thumbViewBox'>
                        {/* 左右按鈕列表 */}
                        {
                            tabData?.map((item,index)=>{
                                return(
                                    <Fragment key={index}>
                                        {/* 左按鈕設定 */}
                                        <button    disabled={cooldown}
                                                className={`prevBtn ${item.key === activeTab ?("active"):("")}`} 
                                                ref={(prevBtn) => (prevRefs.current[index] = prevBtn)}
                                                onClick={()=>{handlePrevClick()}}
                                        >    
                                        </button>
                                        {/* 左按鈕設定 */}

                                        {/* 右按鈕設定 */}
                                        <button    disabled={cooldown}
                                                className={`nextBtn ${item.key === activeTab ?("active"):("")}`} 
                                                ref={(extBtn) => (nextRefs.current[index] = extBtn)}
                                                onClick={()=>{handleNextClick()}}
                                        >
                                        </button>
                                        {/* 右按鈕設定 */}
                                    </Fragment>
                                )
                            })
                        }
                        {/* 左右按鈕列表 */}
                        
                        {/* 縮圖資料顯示區 */}
                        <div className='thumbBox'>
                            {/* Tab 內容區 */}
                            <Tab.Content className='tabContent'>
                                {
                                    tabData?.map((item)=>{
                                        return( 
                                            
                                            // 內容外層
                                            <Tab.Pane   className='tabPane'
                                                        key={item.key} 
                                                        eventKey={item.key}
                                            >
                                            {
                                                // 只顯示一個輪播
                                                activeTab === item.key && (
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
                                                    >
                                                        {item.swiperData.map((src, i) => (
                                                            <SwiperSlide    className='swiperSlide'
                                                                            key={i}
                                                            >
                                                                <button type="button" 
                                                                        className='imgBox'
                                                                        onClick={() => {
                                                                            mainSwiper?.slideToLoop(i);
                                                                            thumbSwiper?.slideToLoop(i);
                                                                        }}
                                                                        style={{ backgroundImage: `url(${src.imgSm})` }}
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                )
                                                // 只顯示一個輪播
                                            }
                                            </Tab.Pane>
                                            // 內容外層
                                        )
                                    })
                                }
                            </Tab.Content>
                            {/* Tab 內容區 */}
                        </div>
                        {/* 縮圖資料顯示區 */}
                    </div>
                    {/* 縮圖顯示區塊 */}
                </div>
            </div>
            {/* 元件最外層 */}
        </Tab.Container>
        {/* 控制層 顯示元素不存在 */}

        <Accordion defaultActiveKey="" className="defaultReactAccordionContent mb-24">
            {/* 不打開任何一個	<Accordion defaultActiveKey=""> */}
            <Accordion.Item eventKey="0" className="defaultReactAccordionItem">
                <Accordion.Header className="defaultReactAccordionHeader">
                    程式碼說明
                </Accordion.Header>
                <Accordion.Body className="defaultReactAccordionBody p-0">
                    
                    <pre className="language-html m-0 p-16">
                        <div>HTML</div>
                        <code className="language-html">
                            {
                                dedent(
                                    `
                                    import { Fragment, useEffect, useRef, useState } from 'react';//宣告狀態
                                    import { Tab, Nav } from 'react-bootstrap';//宣告tab元件
                                    import './_SwiperDoubleSample.scss'; // 引入強化樣式

                                    import 'swiper/css';//引入基本swiper樣式
                                    import 'swiper/css/navigation';//引入模組樣式
                                    import 'swiper/css/effect-fade';//引入模組樣式
                                    import { Swiper, SwiperSlide } from 'swiper/react';//宣告元件
                                    import { Navigation,EffectFade } from 'swiper/modules';//宣告使用的模組
                                    
                                    //資料設定檔
                                    //放置於return上方

                                    //#region 縮圖輪播顯示資料
                                    const ThumbSwiperData01 = [
                                        {
                                            id:"1-1",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions1_nav1.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions1_role1_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nanali_20250513_opt.webm\`,
                                        },
                                        {
                                            id:"1-2",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions1_nav2.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions1_role2_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_zaowu_20250513_opt.webm\`,
                                        },
                                        {
                                            id:"1-3",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions1_nav3.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions1_role3_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nanzhu_20250621_opt.webm\`,
                                        },
                                        {
                                            id:"1-4",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions1_nav4.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions1_role3_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_nvzhu_20250621_opt.webm\`,
                                        },
                                    ];

                                    const w_ThumbSwiperData01 = [...ThumbSwiperData01,...ThumbSwiperData01,...ThumbSwiperData01];

                                    const ThumbSwiperData02 = [
                                        {
                                            id:"2-1",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions2_nav1.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions2_role1_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_bohe_20250513_opt.webm\`,
                                        },
                                        {
                                            id:"2-2",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions2_nav2.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions2_role2_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_anhunqu_20250513_opt.webm\`,
                                        },
                                        {
                                            id:"2-3",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions2_nav3.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions2_role3_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_fadiya_20250513_opt.webm\`,
                                        },
                                        {
                                            id:"2-4",
                                            imgSm:\`/images/swiper/背景圖連結縮圖範例/factions2_nav4.jpg\`,
                                            role:\`/images/swiper/背景圖連結縮圖範例/factions2_role4_des.png\`,
                                            video:\`/images/swiper/背景圖連結縮圖範例/nte_pbgv_baizang_20250621_opt.webm\`,
                                        },
                                    ];

                                    const w_ThumbSwiperData02 = [...ThumbSwiperData02,...ThumbSwiperData02,...ThumbSwiperData02];
                                    //#endregion

                                    //#region tab控制
                                    const [activeTab, setActiveTab] = useState('01');
                                    //#endregion

                                    //#region tab顯示資料
                                    const tabData = [
                                        {
                                            key:"01",
                                            class:"tabBtn01",
                                            swiperData:w_ThumbSwiperData01,
                                        },
                                        {
                                            key:"02",
                                            class:"tabBtn02",
                                            swiperData:w_ThumbSwiperData02,
                                        },
                                    ]
                                    //#endregion

                                    //#region 左右按鈕宣告
                                    const prevRefs = useRef([]);
                                    const nextRefs = useRef([]);
                                    //#endregion

                                    //#region 主輪播片儲存狀態宣告
                                    const [mainSwiper,setMainSwiper] = useState(null);
                                    //#endregion

                                    //#region 縮圖輪播片儲存狀態宣告
                                    const [thumbSwiper,setThumbSwiper] = useState(null);
                                    //#endregion
                                    
                                    //#region 將左右按鈕重新綁定給縮圖輪播片
                                    useEffect(() => {
                                        //如果沒有抓到輪播片資料則跳出程序
                                        if (!thumbSwiper || !mainSwiper) {
                                            return;
                                        }
                                        if (thumbSwiper) {

                                            // 取得index數字
                                            const index = tabData.findIndex(tab => tab.key === activeTab);

                                            //將swiper資料指定給swiper
                                            const swiper = thumbSwiper;

                                            // 重新綁定 navigation
                                            swiper.params.navigation.prevEl = prevRefs.current[index];
                                            swiper.params.navigation.nextEl = nextRefs.current[index];
                                            
                                            // 重新初始化 navigation（重要）
                                            swiper.navigation.init();
                                            swiper.navigation.update();
                                        }
                                    }, [thumbSwiper]);
                                    //#endregion

                                    //#region 宣告冷卻儲存狀態
                                    const [cooldown, setCooldown] = useState(false);
                                    //#endregion

                                    //#region 宣告處理上一張函式
                                    const handlePrevClick = () => {
                                        // 正在冷卻
                                        if (cooldown) {
                                            return;
                                        }         
                                        // 進入冷卻
                                        setCooldown(true);
                                        //縮圖輪播片上一頁          
                                        thumbSwiper?.slidePrev();
                                        //主輪播片上一頁
                                        mainSwiper?.slidePrev();

                                        // 冷卻結束（例如 300ms）
                                        setTimeout(() => setCooldown(false), 500);
                                    };
                                    //#endregion

                                    //#region 宣告處理下一張函式
                                    const handleNextClick = () => {
                                        // 正在冷卻
                                        if (cooldown) {
                                            return;
                                        }           
                                        // 進入冷卻
                                        setCooldown(true);
                                        //縮圖輪播片下一頁            
                                        thumbSwiper?.slideNext();
                                        //主輪播片下一頁
                                        mainSwiper?.slideNext();

                                        // 冷卻結束（例如 300ms）
                                        setTimeout(() => setCooldown(false), 500);
                                    };
                                    //#endregion

                                    // 元件本體
                                    // 放置於return下方
                                    {/* 最外框 */}
                                    <div className="appTabs">
                                        {/* 控制層 顯示元素不存在 */}
                                        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                                            {/* Tab 選單區 */}
                                            <Nav className='tabBox'>
                                                {/* 選項按鈕外層 */}
                                                <Nav.Item  className='tabItem'>
                                                {
                                                    tabdata?.map((item)=>{
                                                        return(
                                                            /* 選項按鈕本體 */
                                                            <Nav.Link   key={item.key}
                                                                        className={\`tabLink \${item.disabled ? 'disabled' : ''}\`} 
                                                                        aria-disabled={item.disabled} 
                                                                        eventKey={item.key}>
                                                                {item.title}
                                                            </Nav.Link>
                                                            /* 選項按鈕本體 */  
                                                        )
                                                    })
                                                }
                                                </Nav.Item>
                                                {/* 選項按鈕外層 */}
                                            </Nav>
                                            {/* Tab 選單區 */}

                                            {/* Tab 內容區 */}
                                            <Tab.Content className='tabContent'>
                                                {
                                                    tabdata?.map((item,index)=>{
                                                        return(
                                                            /* 內容外層 */
                                                            <Tab.Pane   className='tabPane swiperContentBox'
                                                                        key={item.key} 
                                                                        eventKey={item.key}>
                                                                {
                                                                    activeTab === item.key && (
                                                                        /* 元件最外圍 */
                                                                        <Swiper
                                                                            className='swiper'
                                                                            modules={[Navigation, Pagination]}//需要用到的模組
                                                                            onSwiper={(swiper) => {
                                                                                // 儲存swiper
                                                                                setMainSwiper(swiper);
                                                                                // 更新 state
                                                                                setSwiperData({ ...swiper });
                                                                            }}
                                                                            onSlideChange={(swiper) => setSwiperData({ ...swiper })}
                                                                            slidesPerView={1}//顯示的輪播片數量
                                                                            centeredSlides={true}//輪播片置中
                                                                            loop={true}//開啟輪播片循環
                                                                            spaceBetween={8}//輪播片間隔距離(單位:px)
                                                                        >
                                                                        {item.swiperImgData?.map((imgData,index) => (
                                                                            // 輪播片本體
                                                                            <SwiperSlide key={imgData.id} className='swiperSlide'>
                                                                                <img className='slide-item' src={imgData.imgData} alt="" />
                                                                            </SwiperSlide>
                                                                            // 輪播片本體
                                                                        ))}
                                                                        </Swiper>
                                                                        /* 元件最外圍 */
                                                                    )
                                                                }   
                                                            </Tab.Pane>
                                                            /* 內容外層 */  
                                                        )
                                                    })
                                                }
                                            </Tab.Content>
                                            {/* Tab 內容區 */}

                                            <div className='d-flex'>
                                                {/* 外部按鈕區 */}
                                                <div className='btnContentBox'>
                                                    {
                                                        tabdata?.map((item,index)=>{
                                                            return(
                                                                <Fragment key={index}>
                                                                    <div    className={\`prevBtn \${item.key === activeTab ?("active"):("")} \${item.btnSet}\`} 
                                                                            ref={(prevBtn) => (prevRefs.current[index] = prevBtn)}>    
                                                                    </div>
                                                                    <div    className={\`PaginationBox \${item.key === activeTab ?("active"):("")}\`} 
                                                                            ref={(pagination) => (paginationRefs.current[index] = pagination)}>        
                                                                    </div>
                                                                    <div    className={\`nextBtn \${item.key === activeTab ?("active"):("")} \${item.btnSet}\`} 
                                                                            ref={(extBtn) => (nextRefs.current[index] = extBtn)}>
                                                                    </div>
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {/* 外部按鈕區 */}

                                                {/* 輪播片數量 */}
                                                <div className='swiperNum'>
                                                    <div>目前顯示第幾張輪播片 {swiperData?.realIndex + 1}</div>
                                                    <div>總輪播數{swiperData?.slides.length}</div>
                                                </div>
                                                {/* 輪播片數量 */}
                                            </div>
                                        </Tab.Container>
                                        {/* 控制層 顯示元素不存在 */}
                                    </div>
                                    {/* 最外框 */}
                                    `
                                )
                            }       
                        </code>
                    </pre>
                    <pre className="language-html m-0 p-16">
                        <div>SCSS</div>
                        <code className="language-html">
                            {
                                dedent(
                                    `
                                    // 元件最外層
                                    .SwiperDoubleSampleBox{
                                        width: 100%;
                                        height: auto;
                                        // 背景輪播顯示區塊
                                        .viewBox{
                                            width: 100%;
                                            height: 50vh;
                                            border: 2px solid #000000;
                                            border-radius: 8px;
                                            padding: 20px;
                                            position: relative;

                                            /* Tab 內容區 */
                                            .tabContent {
                                                
                                                /* 內容外層（.tab-pane） */
                                                .tabPane {
                                                    
                                                    /* 大圖輪播 */
                                                    .bgSwiper{
                                                        width: calc(100% - 40px);
                                                        height: calc(100% - 40px);
                                                        position: absolute;
                                                        top:20px;
                                                        left: 20px;
                                                        z-index: 1;
                                                        //輪播本體
                                                        .swiperSlide{
                                                            width: 100%;
                                                            height: 100%;
                                                            position: relative;

                                                            /* 輪播片內容 */
                                                            .videoSet{
                                                                position: absolute;
                                                                top: 0;
                                                                left: 0;
                                                                z-index: 1;
                                                                width: 100%;
                                                                height: 100%;
                                                                .bgVideo {
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    object-fit: cover; // 跟背景圖 cover 一樣，充滿且裁切
                                                                }
                                                            }
                                                            /* 輪播片內容 */

                                                            //角色說明最外圍
                                                            /* 背景 */
                                                            .profileBox{
                                                                position: absolute;
                                                                top:0;
                                                                left: 0;
                                                                z-index: 2;
                                                                width: 100%;
                                                                height: 100%;
                                                                display: flex;
                                                                justify-content: start;
                                                                align-items: start;
                                                                //background-color: rgba(255, 0, 0, 0.5);
                                                                .profileContentBox{
                                                                    position: absolute;
                                                                    top: 45%;
                                                                    left: 32%;
                                                                    width: 50%;
                                                                    height: auto;
                                                                    //background-color: rgb(0, 255, 255,0.5);
                                                                    transform: translate(-50%,-50%);
                                                                    @media (max-width: 1400px) {
                                                                        top: 50%;
                                                                        left: 35%;
                                                                        width: 50%;
                                                                    }
                                                                    .profileImgBox{
                                                                        width: 100%;
                                                                        height: auto;
                                                                        aspect-ratio: 936 / 459;
                                                                        .imgSet{
                                                                            max-width: 100%;
                                                                            height: auto;
                                                                            object-fit: cover;
                                                                        }
                                                                    }

                                                                    .textBox{
                                                                        width: 65%;
                                                                        height: 100px;
                                                                        overflow: hidden;
                                                                        overflow-y: auto;   // ← 讓右側捲軸出現
                                                                        overflow-x: hidden; // ← 水平不要捲軸
                                                                        flex-shrink: 0;

                                                                        // 捲軸的寬度
                                                                        &::-webkit-scrollbar {
                                                                            width: 8px;
                                                                        }

                                                                        // 捲軸的軌道（背景）
                                                                        &::-webkit-scrollbar-track {
                                                                            background: transparent;
                                                                            border-radius: 4px;
                                                                        }

                                                                        // 捲軸本體（可以拉動的部分）
                                                                        &::-webkit-scrollbar-thumb {
                                                                            background: #999;
                                                                            border-radius: 4px;
                                                                        }

                                                                        // 滑鼠 hover 在捲軸上
                                                                        &::-webkit-scrollbar-thumb:hover {
                                                                            background: #999;
                                                                        }
                                                                        .textSet{
                                                                            font-size: 16px;
                                                                            color:rgb(175, 175, 175);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            /* 背景 */
                                                            //角色說明最外圍
                                                        }
                                                        //輪播本體
                                                    }
                                                    /* 大圖輪播 */
                                                }
                                            }
                                            /* Tab 內容區 */

                                        }
                                        // 背景輪播顯示區塊

                                        .box{
                                            //tab顯示區塊
                                            .tabViewBox{
                                                width: 40%;
                                                height: auto;
                                                border: 2px solid #000000;
                                                border-radius: 8px;
                                                padding: 10px;

                                                /* Tab 選單區 */
                                                .tabBox {
                                                    width: 100%;
                                                    height: 100%;
                                                    /* 選項按鈕外層 */
                                                    .tabItem {
                                                        width: 100%;
                                                        height: 100%;
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        gap: 24px;
                                                        /* 選項按鈕本體 */
                                                        .tabLink {
                                                            
                                                            &.tabBtn01{
                                                                width: 20%;
                                                                height: auto;
                                                                aspect-ratio: 83 / 66;
                                                                background-position: center 0;      /* 左上角 */
                                                                background-size: 100% 100%;    /* 寬度填滿，高度等比 */
                                                                background-repeat: no-repeat;
                                                                background-color: transparent;
                                                                padding: 0px;
                                                                border: none;
                                                                background-image: url('/images/swiper/背景圖連結縮圖範例/01.png');
                                                            }

                                                            &.tabBtn02{
                                                                width: 20%;
                                                                height: auto;
                                                                aspect-ratio: 83 / 66;
                                                                background-position: center 0;      /* 左上角 */
                                                                background-size: 100% 100%;    /* 寬度填滿，高度等比 */
                                                                background-repeat: no-repeat;
                                                                background-color: transparent;
                                                                padding: 0px;
                                                                border: none;
                                                                background-image: url('/images/swiper/背景圖連結縮圖範例/02.png');
                                                            }

                                                            /* disabled 狀態 */
                                                            &.disabled {
                                                                opacity: 0.5;
                                                                cursor: not-allowed;
                                                                pointer-events: none;
                                                            }
                                                        }
                                                        /* 選項按鈕本體 */
                                                    }
                                                    /* 選項按鈕外層 */
                                                }
                                                /* Tab 選單區 */
                                            }
                                            //tab顯示區塊

                                            //縮圖顯示區塊
                                            .thumbViewBox{
                                                width: 40%;
                                                height: auto;
                                                aspect-ratio: 4 / 1;
                                                border: 2px solid #000000;
                                                border-radius: 8px;
                                                padding: 10px;
                                                position: relative;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                
                                                // 左右案件設定
                                                .prevBtn,.nextBtn{
                                                    display: none;
                                                    position: absolute;
                                                    transform: translateY(-50%);
                                                    top:50%;
                                                    width: 15%;
                                                    height: auto;
                                                    aspect-ratio: 54 / 52;
                                                    background-position: center 0;      /* 左上角 */
                                                    background-size: 100% 200%;    /* 寬度填滿，高度等比 */
                                                    background-repeat: no-repeat;
                                                    background-color: transparent;
                                                    padding: 0px;
                                                    border: none;
                                                    
                                                    &.active{
                                                        display: block;
                                                    }
                                                    &:hover{
                                                        background-position-y: 100%;
                                                    }
                                                    &:disabled {
                                                        background-position-y: 0%;
                                                        opacity: 0.5;
                                                    }
                                                }
                                                .prevBtn{
                                                    left: 0%;
                                                    background-image: url('/images/swiper/背景圖連結縮圖範例/factionsPrev.png');
                                                }
                                                .nextBtn{
                                                    left: auto;
                                                    right: 0%;
                                                    background-image: url('/images/swiper/背景圖連結縮圖範例/factionsNext.png');
                                                }
                                                // 左右案件設定

                                                // 縮圖資料顯示區
                                                .thumbBox{
                                                    width: 70%;
                                                    height: 100%;
                                                    border: 2px solid red;
                                                    position: relative;
                                                    /* Tab 內容區 */
                                                    .tabContent {
                                                        width: 100%;
                                                        height: 100%;
                                                        padding: 0px;
                                                        /* 內容外層 */
                                                        .tabPane {
                                                            width: 100%;
                                                            height: 100%;
                                                            
                                                            /* 縮圖輪播 */
                                                            .thumbsSwiper{
                                                                position: absolute;
                                                                top: 0;
                                                                left: 0;
                                                                width: 100%;
                                                                height: 100%;
                                                                pointer-events: auto;
                                                                //輪播本體
                                                                .swiper-slide.swiperSlide{
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    display: flex;
                                                                    justify-content: center;
                                                                    align-items: center;
                                                                    /* 輪播片內容 */
                                                                    .imgBox{
                                                                        width: 100%; // 根據圖片大小調整
                                                                        height: auto;
                                                                        object-fit: cover;
                                                                        aspect-ratio: 191 / 86;
                                                                        background-color: transparent;
                                                                        background-position: center 0;      /* 左上角 */
                                                                        background-size: 100% 200%;    /* 寬度填滿，高度等比 */
                                                                        background-repeat: no-repeat;
                                                                        border: 2px solid #949494;
                                                                        padding: 0px;
                                                                        transition: transform 0.2s ease;
                                                                        
                                                                        &:hover {
                                                                            background-position-y: 100%;
                                                                        }
                                                                    }
                                                                    /* 輪播片內容 */

                                                                    // 被選重的輪播片
                                                                    &.swiper-slide-active{
                                                                        /* 輪播片內容 */
                                                                        .imgBox{
                                                                            width: 100%; // 根據圖片大小調整
                                                                            // max-width: 191px;
                                                                            aspect-ratio: 191 / 86;
                                                                            background-color: transparent;
                                                                            background-position: center 0;      /* 左上角 */
                                                                            background-position-y: 100%;
                                                                            background-size: 100% 200%;    /* 寬度填滿，高度等比 */
                                                                            background-repeat: no-repeat;
                                                                            padding: 0px;
                                                                            transition: transform 0.2s ease;
                                                                            border: 2px solid #ffffff;
                                                                        }
                                                                        /* 輪播片內容 */
                                                                    }
                                                                    // 被選重的輪播片
                                                                }
                                                                //輪播本體
                                                            }
                                                            /* 縮圖輪播 */
                                                        }
                                                        /* 內容外層 */
                                                    }
                                                    /* Tab 內容區 */
                                                }
                                                // 縮圖資料顯示區
                                            }
                                            //縮圖顯示區塊
                                        }   
                                    }
                                    // 元件最外層
                                    `
                                )
                            }       
                        </code>
                    </pre>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>
    
  );
}


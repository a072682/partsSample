import { Fragment, useEffect, useRef, useState } from 'react';
import { Tab, Nav, Accordion } from 'react-bootstrap';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './_SwiperWithTab.scss'; // 引入強化樣式

import 'prismjs/themes/prism-tomorrow.css'; // 主題樣式
import Prism from 'prismjs';                // 核心功能
import 'prismjs/components/prism-jsx';      // JSX 支援
import 'prismjs/components/prism-markup';   // HTML 支援
import dedent from 'dedent';//去除多餘空白保持縮排格式


export default function SwiperWithTab() {

    //#region
    //#endregion

    //#region tab控制
    const [activeTab, setActiveTab] = useState('swiper01');
    //#endregion

    
    //#region tab顯示資料
    const tabdata = [
        {
            title:"swiper01",
            key:"swiper01",
            btnSet:"red",
            disabled: false,
            swiperImgData:[
                {
                    id:"1-1",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand1-1.jpg`
                },
                {
                    id:"1-2",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand1-2.jpg`
                },
            ]
        },
        {
            title:"swiper02",
            key:"swiper02",
            btnSet:"blue",
            disabled: false,
            swiperImgData:[
                {
                    id:"2-1",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand2-1.jpg`
                },
                {
                    id:"2-2",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand2-2.jpg`
                },
                {
                    id:"2-3",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand3-1.jpg`
                },
            ]
        },
        {
            title:"swiper03",
            key:"swiper03",
            btnSet:"block",
            disabled: false,
            swiperImgData:[
                {
                    id:"3-1",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand3-1.jpg`
                },
                {
                    id:"3-2",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand3-2.jpg`
                },
                {
                    id:"3-3",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand1-1.jpg`
                },
                {
                    id:"3-4",
                    imgData:`/images/swiper/搭配tab元件swiper範例/brand1-2.jpg`
                },
            ]
        },
    ]
    //#endregion

    //#region 儲存swiper數據狀態宣告
    const [swiperData,setSwiperData] = useState(null);
    //#endregion

    //#region swiper綁定狀態宣告
    const [mainSwiper,setMainSwiper] = useState(null);
    //#endregion

    //#region 左右按鈕綁定宣告
    const prevRefs = useRef([]);
    const nextRefs = useRef([]);
    //#endregion


    //#region pagination按鈕綁定宣告
    const paginationRefs = useRef([]);
    //#endregion

    //dom掛載完成後由useEffect重新綁定宣告
    useEffect(() => {
        if (!mainSwiper) {
            return;
        }
        if (mainSwiper && paginationRefs.current) {

            // 取得index數字
            const index = tabdata.findIndex(tab => tab.key === activeTab);

            //將swiper資料指定給swiper
            const swiper = mainSwiper;

            // 重新綁定 navigation
            swiper.params.navigation.prevEl = prevRefs.current[index];
            swiper.params.navigation.nextEl = nextRefs.current[index];

            // 重新綁定 pagination
            swiper.params.pagination.el = paginationRefs.current[index];
            swiper.params.pagination.clickable = true;
            
            // 重新初始化 navigation（重要）
            swiper.navigation.init();
            swiper.navigation.update();
            // 重新初始化 pagination（重要）
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
        }
    }, [mainSwiper]);
    //dom掛載完成後由useEffect重新綁定宣告
    
  
    return (
        <>
            <article className="搭配tab元件swiper範本">
                <h3>搭配tab元件swiper範本</h3>
                {/* 最外框 */}
                <div className="SwiperWithTab">
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
                                                    className={`tabLink ${item.disabled ? 'disabled' : ''}`} 
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
                                                <div    className={`prevBtn ${item.key === activeTab ?("active"):("")} ${item.btnSet}`} 
                                                        ref={(prevBtn) => (prevRefs.current[index] = prevBtn)}>    
                                                </div>
                                                <div    className={`PaginationBox ${item.key === activeTab ?("active"):("")}`} 
                                                        ref={(pagination) => (paginationRefs.current[index] = pagination)}>        
                                                </div>
                                                <div    className={`nextBtn ${item.key === activeTab ?("active"):("")} ${item.btnSet}`} 
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
            </article>

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
                                        import { Fragment, useEffect, useRef, useState } from 'react';宣告狀態
                                        import { Tab, Nav } from 'react-bootstrap';//宣告tab元件
                                        import 'swiper/css';//引入基本swiper樣式
                                        import { Swiper, SwiperSlide } from 'swiper/react';//宣告元件
                                        import { Navigation, Pagination } from 'swiper/modules';//宣告使用的模組
                                        import './_SwiperWithTab.scss'; // 引入強化樣式
                                        
                                        //資料設定檔
                                        //放置於return上方

                                        //tab控制
                                        const [activeTab, setActiveTab] = useState('swiper01');
                                        //tab控制
                                        
                                        //tab顯示資料
                                        const tabdata = [
                                            {
                                                title:"swiper01",
                                                key:"swiper01",
                                                btnSet:"red",
                                                disabled: false,
                                                swiperImgData:[
                                                    {
                                                        id:"1-1",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand1-1.jpg\`
                                                    },
                                                    {
                                                        id:"1-2",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand1-2.jpg\`
                                                    },
                                                ]
                                            },
                                            {
                                                title:"swiper02",
                                                key:"swiper02",
                                                btnSet:"blue",
                                                disabled: false,
                                                swiperImgData:[
                                                    {
                                                        id:"2-1",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand2-1.jpg\`
                                                    },
                                                    {
                                                        id:"2-2",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand2-2.jpg\`
                                                    },
                                                    {
                                                        id:"2-3",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand3-1.jpg\`
                                                    },
                                                ]
                                            },
                                            {
                                                title:"swiper03",
                                                key:"swiper03",
                                                btnSet:"block",
                                                disabled: false,
                                                swiperImgData:[
                                                    {
                                                        id:"3-1",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand3-1.jpg\`
                                                    },
                                                    {
                                                        id:"3-2",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand3-2.jpg\`
                                                    },
                                                    {
                                                        id:"3-3",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand1-1.jpg\`
                                                    },
                                                    {
                                                        id:"3-4",
                                                        imgData:\`/images/swiper/搭配tab元件swiper範例/brand1-2.jpg\`
                                                    },
                                                ]
                                            },
                                        ]
                                        //tab顯示資料

                                        //紀錄swiper數據狀態宣告
                                        const [swiperData,setSwiperData] = useState(null);
                                        //紀錄swiper數據狀態宣告

                                        //紀錄swiper本身狀態宣告
                                        const [mainSwiper,setMainSwiper] = useState(null);
                                        //紀錄swiper本身狀態宣告

                                        //左右按鈕宣告
                                        const prevRefs = useRef([]);
                                        const nextRefs = useRef([]);
                                        //左右按鈕宣告

                                        //pagination按鈕宣告
                                        const paginationRefs = useRef([]);
                                        //pagination按鈕宣告

                                        //dom掛載完成後由useEffect重新綁定宣告
                                        useEffect(() => {
                                            if (!mainSwiper) {
                                                return;
                                            }
                                            if (mainSwiper && paginationRefs.current) {

                                                // 取得index數字
                                                const index = tabdata.findIndex(tab => tab.key === activeTab);

                                                //將swiper資料指定給swiper
                                                const swiper = mainSwiper;

                                                // 重新綁定 navigation
                                                swiper.params.navigation.prevEl = prevRefs.current[index];
                                                swiper.params.navigation.nextEl = nextRefs.current[index];

                                                // 重新綁定 pagination
                                                swiper.params.pagination.el = paginationRefs.current[index];
                                                swiper.params.pagination.clickable = true;
                                                
                                                // 重新初始化 navigation（重要）
                                                swiper.navigation.init();
                                                swiper.navigation.update();
                                                // 重新初始化 pagination（重要）
                                                swiper.pagination.init();
                                                swiper.pagination.render();
                                                swiper.pagination.update();
                                            }
                                        }, [mainSwiper]);
                                        //dom掛載完成後由useEffect重新綁定宣告

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
                                        //最外框
                                        .appTabs {
                                            width: 100%;
                                            height: 50vh;
                                            background-color: #ff0000;
                                            /* Tab 選單區 */
                                            .tabBox {
                                                border: 2px solid #000000;
                                                
                                                /* 選項按鈕外層 */
                                                .tabItem {
                                                    border: 2px solid red;
                                                    display: flex;
                                                    /* 選項按鈕本體 */
                                                    .tabLink {
                                                        color: #000000;
                                                        /* hover 狀態*/
                                                        &:hover {
                                                            color: #ffffff;
                                                            background: #0d6efd;
                                                        }

                                                        /* active 狀態 */
                                                        &.active {
                                                            color: #fff;
                                                            background: #0d6efd;
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

                                            /* Tab 內容區 */
                                            .tabContent {

                                                /* 內容外層（.tab-pane） */
                                                .tabPane.swiperContentBox{
                                                    width: 100%;
                                                    height: 50vh;
                                                    background-color: #92b8f0;
                                                    
                                                    /* 元件最外圍 */
                                                    .swiper{
                                                        position: relative;
                                                        height: 50vh;
                                                        //輪播本體
                                                        .swiperSlide{

                                                            /* 輪播片內容 */
                                                            .slide-item {
                                                                width: 100%;
                                                                height: 100%;
                                                                display: flex;
                                                                justify-content: center;
                                                                align-items: center;
                                                            }
                                                            /* 輪播片內容 */
                                                        }
                                                        //輪播本體
                                                    }
                                                    /* 元件最外圍 */
                                                    
                                                }
                                            }

                                            // 外部按鈕區
                                            .btnContentBox{
                                                width: 50%;
                                                height: 10%;
                                                border: 2px solid #000000;
                                                border-radius: 8px;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                gap: 48px;

                                                // 左右按鈕設定
                                                .prevBtn,.nextBtn{
                                                    display: none;
                                                    width: 10%;
                                                    height: auto;
                                                    aspect-ratio: 2 / 1;
                                                    
                                                    border-radius: 4px;
                                                    background-position: center 0;      /* 左上角 */
                                                    background-size: 100% 200%;    /* 寬度填滿，高度等比 */
                                                    background-repeat: no-repeat;
                                                    cursor: pointer;

                                                    &:hover {
                                                        background-position-y: 100%;
                                                    }

                                                    &.active{
                                                        display: block;
                                                    }

                                                    &.red{
                                                        border: 2px solid #ff0000;
                                                    }

                                                    &.blue{
                                                        border: 2px solid #006eff;
                                                    }

                                                    &.block{
                                                        border: 2px solid #000000;
                                                    }
                                                }
                                                // 左右按鈕設定

                                                // 左按鈕
                                                .prevBtn{
                                                    background-image: url('/images/swiper/搭配tab元件swiper範例/brandPrev.png');
                                                }
                                                // 左按鈕

                                                // 右按鈕
                                                .nextBtn{
                                                    background-image: url('/images/swiper/搭配tab元件swiper範例/brandNext.png');
                                                }
                                                // 右按鈕

                                                //pagination設定
                                                .PaginationBox{
                                                    display: none;
                                                    width: 30%;
                                                    height: auto;
                                                    aspect-ratio: 4 / 1;
                                                    border: 2px solid #ff0000;

                                                    &.active{
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        gap: 12px;
                                                        .swiper-pagination-bullet{
                                                            display: block;
                                                            &.swiper-pagination-bullet-active{
                                                                background-color: #4fe5fb;
                                                            }
                                                        }
                                                    }

                                                    .swiper-pagination-bullet {
                                                        display: none;
                                                        width: 12px;
                                                        height: auto;
                                                        aspect-ratio: 1 / 1;
                                                        border-radius: 50%;
                                                        background-color: #616161;
                                                        opacity: 1;
                                                        border: 1 solid #000;
                                                        cursor: pointer;
                                                    }
                                                }
                                                //pagination設定
                                            }
                                            // 外部按鈕區

                                            // 輪播片數量
                                            .swiperNum{
                                                width: 50%;
                                                height: auto;
                                                border: 1px solid black;
                                            }
                                            // 輪播片數量
                                        }
                                        //最外框
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


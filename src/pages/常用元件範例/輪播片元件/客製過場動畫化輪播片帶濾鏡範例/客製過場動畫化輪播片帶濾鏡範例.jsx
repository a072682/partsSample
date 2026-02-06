

import './_客製過場動畫化輪播片帶濾鏡範例.scss';
import { useState } from 'react'

export default function 客製過場動畫化輪播片帶濾鏡範例() {

    //#region
    //#endregion

    //目錄數字資料
    const [index, setIndex] = useState(0)
    //控制動畫是否執行
    const [animating, setAnimating] = useState(false)
    //控制filter濾鏡是否執行
    const [filterTime, setFilterTime] = useState(false)
    //紀錄關鍵字
    const [direction, setDirection] = useState('next')

    //顯示資料列表
    const slides = [
        { title: 'Slide One', img: '/images/常用元件範例/輪播片元件/客製過場動畫化輪播片帶濾鏡範例/01.aae95e75.png' },
        { title: 'Slide Two', img: '/images/常用元件範例/輪播片元件/客製過場動畫化輪播片帶濾鏡範例/02.e58f9497.png' },
        { title: 'Slide Three', img: '/images/常用元件範例/輪播片元件/客製過場動畫化輪播片帶濾鏡範例/03.722342c9.png' },
    ]

    const changeSlide = (dir) => {
        if (animating) {
            return;
        }
        //執行動畫
        setAnimating(true)
        //紀錄關鍵字
        setDirection(dir)

        //到了0.4秒才會執行函式
        setTimeout(() => {
            setIndex((indexNum) => {
                return(
                    dir === 'next'? 
                    ((indexNum + 1) % slides.length) 
                    :
                    ((indexNum - 1 + slides.length) % slides.length) 
                )
            })
            
        }, 250);

        //到了1秒黑色轉場片消失
        setTimeout(() => {
            setAnimating(false);
        }, 1000);

        setTimeout(() => {
            setFilterTime(true);
        }, 500);

        //到了0.8秒黑色轉場片消失
        setTimeout(() => {
            setFilterTime(false)
        }, 1500);
    }

    return (
        <>
            <div className="客製過場動畫化輪播片帶濾鏡範例">
            {/* 元件外圍 */}
            <div className="stage">

                {/* 黑色轉場片&黃色轉場片 */}
                {animating && (
                    <div className={`panel-group ${direction}`}>
                        <div className="black-panel" />
                        <div className="yellow-panel" />
                    </div>
                )}
                {/* 黑色轉場片&黃色轉場片 */}
                
                {/* 濾色遮罩 */}
                <img className={`filter-panel ${direction} ${filterTime?("d-block"):("d-none")}`} 
                    src={slides[index].img} 
                    alt={slides[index].title} />
                {/* 濾色遮罩 */}
                
                {/* 圖片設定 */}
                <img    className='imgSet'
                        src={slides[index].img}
                        alt={slides[index].title}
                />
                {/* 圖片設定 */}

                {/* 按鈕設定 */}
                <button onClick={() => changeSlide('prev')} className='btnSet prev'>
                    上一張
                </button>
                <button onClick={() => changeSlide('next')} className='btnSet next'>
                    下一張
                </button>
                {/* 按鈕設定 */}
            </div>
            {/* 元件外圍 */}
        </div>
        
        {/* 圖片顏色設定 */}
        <svg width="0" height="0" aria-hidden="true">
            <filter id="white-to-yellow" colorInterpolationFilters="sRGB">

                {/* 轉為黑灰白圖片 */}
                <feColorMatrix
                    type="matrix"
                    values="
                        0.333 0.333 0.333 0 0
                        0.333 0.333 0.333 0 0
                        0.333 0.333 0.333 0 0
                        0     0     0     1 0
                    "
                />

                {/* 轉為2分灰階 */}
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0 1"/>
                    <feFuncG type="discrete" tableValues="0 1"/>
                    <feFuncB type="discrete" tableValues="0 1"/>
                </feComponentTransfer>

                {/* 白 → 黃，黑 → 黑 */}
                <feColorMatrix
                    type="matrix"
                    values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0
                    "
                />

                {/* 再把白映射成黃 */}
                <feComponentTransfer>
                    <feFuncR type="table" tableValues="0 1"/>
                    <feFuncG type="table" tableValues="0 0.84"/>
                    <feFuncB type="table" tableValues="0 0"/>
                </feComponentTransfer>

            </filter>
        </svg>
        {/* 圖片顏色設定 */}
        </>
        
    );
}



import { useEffect, useRef } from 'react';
import './_通道影片範例.scss';
import * as PIXI from 'pixi.js';


export default function 通道影片範例() {

    //#region
    //#endregion

    //#region 基本參數設定

        //#region 取得顯示視窗
        const containerRef = useRef(null);
        //#endregion

        //#region Pixi畫面系統放置容器
        const appRef = useRef(null);
        //#endregion

        //#region 影片來源
        const videoSource = [
            {
                source01:"images/動畫/通道影片範例/enter.0a2d0e.mp4",
                source02:"images/動畫/通道影片範例/idle.810977.mp4",
            }
        ]
        //#endregion

        //#region 影像Shader 設定
        const videoShader = `
            // 變數宣告
            // 宣告變數vTextureCoord 型別為vec2
            // 包含 (x, y)，範圍是 0.0 ~ 1.0
            varying vec2 vTextureCoord;
            // 宣告變數uSampler 型別為sampler2D(2D 貼圖) 數值為uniform
            uniform sampler2D uSampler;

            void main() {
                //宣告一個新變數uv並賦予初始值為vTextureCoord
                vec4 data = texture2D(uSampler, vTextureCoord);

                // 取亮度當 alpha
                float luma = (data.r + data.g + data.b) / 3.0;

                // 左邊顏色 + 右邊亮度當透明度
                gl_FragColor = vec4(1.0, 1.0, 1.0, luma);
            }
        `;
        //#endregion

        //#region 設定中斷信號
        const cancelledRef = useRef(false);
        //#endregion

    //#endregion

    //#region Pixi 初始化設定
    const init = async () => {

        //#region 建立新的Pixi畫面元件
        const app = new PIXI.Application({
            //監聽顯示視窗
            resizeTo: containerRef.current,
            //解析度設定
            resolution:window.devicePixelRatio || 2,
            //設置背景為透明（0=透明，1=不透明）
            backgroundAlpha: 0,
            //抗鋸齒
            antialias: true,
            autoDensity: true,
        });
        //#endregion

        //#region 建立影片(video)初始化設定

            // 建立名為video的標籤讓Pixi可以使用影片內容
            const video = document.createElement('video');
            //建立影片來源 
            video.src = videoSource?.[0].source01;
            //靜音 
            video.muted = true;
            //迴圈
            video.loop = false;
            //行動裝置可播
            video.playsInline = true;
            // 播放影片
            await video.play();

            //如果中斷信號此時為真則跳出
            //此為保險機制
            if (cancelledRef.current) {
                return;
            }

            // 若影片播放完成後觸發
            video.addEventListener('ended', () => {
                // 切換成 idle
                video.src = videoSource?.[0].source02;
                video.loop = true;     // idle 要循環
                video.play();
            });
            
        //#endregion

        //#region 將影片(video)內容進行設定
            
            // 建立影片基本素材
            // 每一幀影片轉換為Texture(Pixi可編輯狀態)
            // texture是素材狀態無法顯示
            const baseTexture = PIXI.Texture.from(video);

            //#region 右半邊遮罩影片設定

                // 複製影片基本素材
                const maskTexture = baseTexture.clone();
                //擷取右半邊影片
                maskTexture.frame = new PIXI.Rectangle(baseTexture.width / 2,0,baseTexture.width / 2,baseTexture.height);

                //顯示右半邊影片
                const maskSprite = new PIXI.Sprite(maskTexture);
                //設定遮罩影片長寬
                maskSprite.width  = app.screen.width;
                maskSprite.height = app.screen.height;

                //建立Filter檔案(Shader)
                const lumaFilter = new PIXI.Filter( null, videoShader, );

                //套用Filter濾鏡
                maskSprite.filters = [lumaFilter];

            //#endregion

            //#region 左半邊畫面設定

                // 複製影片基本素材
                const colorTexture = baseTexture.clone();

                //擷取左半邊畫面
                //.frame 意思是設定 裁切區域
                //PIXI.Rectangle 意思是定義裁切範圍
                colorTexture.frame = new PIXI.Rectangle(0,0,baseTexture.width / 2,baseTexture.height);
                //Sprite才是最後真正顯示的畫面內容
                const colorSprite = new PIXI.Sprite(colorTexture);

                //畫面長寬設定
                //colorSprite.width / height 代表要顯示的影片長寬
                //app.screen.width / height 代表影片實際的長寬
                colorSprite.width  = app.screen.width;
                colorSprite.height = app.screen.height;

                //利用maskSprite影片當作遮罩
                colorSprite.mask = maskSprite;

            //#endregion
            
        //#endregion

        //#region 把影片內容加入Pixi畫面元件
            app.stage.addChild(maskSprite);
            app.stage.addChild(colorSprite);
        //#endregion

        //#region 根據canvas大小重新計算畫面尺寸
            app.renderer.on('resize', () => {
                colorSprite.width  = app.screen.width;
                colorSprite.height = app.screen.height;

                maskSprite.width  = app.screen.width;
                maskSprite.height = app.screen.height;
            });
        //#endregion

        //如果中斷信號此時為真則跳出
        //此為保險機制
        if (cancelledRef.current) {
            return;
        }
        //將Pixi畫面系統放到appRef容器中
        appRef.current = app;
        //先將顯示區塊內的canvas等其他內容給清除乾淨
        containerRef.current.innerHTML = '';
        // 把 Pixi 產生的 canvas(app.view)，插進這個 containerRef 容器裡顯示
        containerRef.current.appendChild(app.view);
    };
    //#endregion

    //#region 頁面載入執行影像
    useEffect(() => {

        //設定中斷信號
        cancelledRef.current = false;

        //如果沒有取得顯示視窗則跳出
        if (!containerRef.current) {
            return;
        }

        //如果中斷信號為真則跳出
        if (cancelledRef.current) {
            return;
        };

        init();

        return () => {
            //離開時中斷信號為真
            cancelledRef.current = true;

            if (appRef.current) {
                //清除Pixi 建立的 <canvas>並把內部資料一起清除
                appRef.current.destroy(true, true);
                //將其本身也清除
                appRef.current = null;
            }
        };

    }, []);
    

    return (
        <>
            <article className='通道影片範例'>
                <h3>通道影片範例</h3>
                {/* 元件最外框 */}
                <div className='videoBox'>
                    <p>我是背景</p>
                    {/* 影片設定 */}
                    <div className="show3DBox" 
                        ref={containerRef}>
                    </div>
                    {/* 影片設定 */}
                </div>
                
                {/* 元件最外框 */}
            </article>
            
        </>
    );
}



'use client';

import './_復數模型展示.scss';
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// 載入 .gltf / .glb 模型
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// 在模型表面隨機取點
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

export default function 復數模型展示() {

    //#region
    //#endregion

    //#region 前置參數設定

        // 模型清單
        const modelList = [
            { id: "1", path: "/images/動畫/ThreeJs/粒子模型範例/復數模型展示/3DMode/mode01/mode01.gltf" },
            { id: "2", path: "/images/動畫/ThreeJs/粒子模型範例/復數模型展示/3DMode/mode02/mode02.gltf" },
            { id: "3", path: "/images/動畫/ThreeJs/粒子模型範例/復數模型展示/3DMode/mode03/mode03.gltf" },
            { id: "4", path: "/images/動畫/ThreeJs/粒子模型範例/復數模型展示/3DMode/mode04/mode04.gltf" },
        ];

        //紀錄目前顯示模型id(預設為0)
        const [activeIndex, setActiveIndex] = useState(0);

        //取得顯示區塊標籤
        const mountRef = useRef(null);

        //取得圖片標籤
        const imgRef = useRef(null);

        // 全域旋轉角度（弧度）
        const rotationAngleRef = useRef(0);

        // 取得向左/右轉按鈕標籤
        const rotateRef = useRef({ left: false, right: false });

        // 是否滑鼠正在模型上
        const hoverRef = useRef(false);

        // 是否正在拖曳
        const draggingRef = useRef(false);

        // 記錄上一次滑鼠 X
        const lastMouseXRef = useRef(0);

        // 模型自動旋轉速度控制
        const rotationSpeedRef = useRef({
            base: 0.002,   // 預設慢速
            boost: 0.02,   // 加速旋轉
            current: 0.002 // 目前旋轉速度
        });
        
        // 儲存Three初始化後內部的物件(攝影機/場景/等等)
        const threeRef = useRef({
            scene: null,
            camera: null,
            renderer: null,

            slicePass: null,
            composer: null,

            pointGeometry: null,
            pointMaterial: null,
            points: null,

            lineGeometry: null,
            lineMaterial: null,
            lines:null,
        });

        // 宣告動畫開始時間變數
        const animationRef = useRef({
            startTime: null,
            finished: false,
        });
        // 粒子動畫總消耗時間設定
        const ANIMATION_DURATION = 5;
        // 粒子數量（效能核心）
        const MAX_POINTS = 30000;
        // 粒子數量（少量粒子）
        const LOW_POINTS = 300;
        // 限制模型顯示時的最大邊單位
        // 假設原本模型的長寬高為1.6 / 1.2 / 2.0
        // TARGET_SIZE設定為2的話 就會將模型修改為 1.6 / 1.2 / 2.0
        const TARGET_SIZE = 1.5;
        // 爆散時粒子跑多遠（越大越炸）
        const SHELL_STRENGTH = 0.35;

        //#region 雜訊插件設定
            const SliceGlitchShader = {
                uniforms: {
                    tDiffuse: { value: null },
                    uStrength: { value: 0.02 }, // 影像錯位強度
                    uTime: { value: 0 },
                    uProgress: { value: 1 },
                },
                
                //後製畫面預設設定
                vertexShader: `
                    //傳送變數給FragmentShader

                        varying vec2 vUv;
                    
                    //傳送變數給FragmentShader

                    void main() {
                        //ShaderPass引入時就帶有uv跟position兩個變數
                        //uv代表UV 座標
                        //position代表 畫面大小(總共會有六個像素點資料會有兩點重複分別記錄左上右上左下右下)
                        //-1,  1/1,  1/-1, -1/1, -1 四個頂點資料
                        vUv = uv;
                        gl_Position = vec4(position, 1.0);
                    }
                `,
                //後製畫面繪製設定
                fragmentShader: `
                    //上一偵的畫面
                    uniform sampler2D tDiffuse;
                    //偏移強度
                    uniform float uStrength;
                    //時間軸
                    uniform float uTime;
                    //進度軸
                    uniform float uProgress;

                    //畫面座標
                    varying vec2 vUv;

                    // 亂數函式

                        float hash(float n) {
                            //fract(x) 意思是指保留小數部分
                            return fract(sin(n) * 43758.5453123);
                        }

                    // 亂數函式

                    void main() {

                        vec2 uv = vUv;


                        //建立絕對觸發雜訊區塊

                            //smoothstep(a, b, x)代表當 x 從 a 走到 b，回傳值會 平滑地從 0 → 1
                            float progressMask = smoothstep(0.8, 0.81, uProgress) * 
                            (1.0 - smoothstep(0.90, 0.91, uProgress));

                        //建立絕對觸發雜訊區塊

                        // 切割畫面

                            // 切成幾份
                            float sliceCount = 80.0;                     
                            //floor代表小於等於 x 的最大整數意思是取個位數的數字為準
                            //uv.x 代表垂直線切割 uv.y 代表水平線切割
                            float sliceX = floor(uv.x * sliceCount);
                            float sliceY = floor(uv.y * sliceCount);

                            //將水平線/垂直線切割跟切成幾份的參數整合
                            //選擇的畫面在整體畫面的位置
                            float sliceIndex = sliceX + sliceY * sliceCount;

                            // 對每一個被切割的畫面給予編號，這個編號由亂數決定
                            // 範圍為0.0~1.0
                            float sliceRand = hash(sliceIndex * 12.9898);

                            // 只有部分切片「有資格」 glitch
                            //step()會傳0/1 0.8>sliceRand輸出1 反之為0
                            // 0.8 代表80%的區塊畫面忽略 20%區塊畫面選中
                            float sliceMask = step(0.9, sliceRand);

                        // 切割畫面

                        // 取得時間亂數

                            // 設定慢速參數
                            float blockSpeed = 0.6;
                            // 把時間切成「慢速、不連續的時間段」
                            float timeBlock = floor(uTime * blockSpeed);

                            //建立進度條起始點
                            float blockStartTime = timeBlock / blockSpeed;

                            //建立進度條終點
                            float blockElapsed = uTime - blockStartTime;

                            //進度條的運行時間
                            float blockDuration = 1.0 / blockSpeed;

                            //將進度條轉換為0~1
                            float blockT = clamp(blockElapsed / blockDuration, 0.0, 1.0);

                            // 每個時間區塊固定一次亂數
                            float timeRand = hash(timeBlock * 78.233);

                            // 只有少數時間真的 glitch
                            float timeMask = step(0.80, timeRand);

                        // 取得時間亂數

                        // 只要「條件成立」觸發雜訊
                        //max(a,b) 會回傳較大的數值
                        float glitchMask = max(timeMask, progressMask);

                        // 如果完全沒有 glitch，直接回傳原畫面
                        if (glitchMask <= 0.0) {
                            gl_FragColor = texture2D(tDiffuse, uv);
                            return;
                        }

                        // 隨機選一種雜訊方式

                            //將timeBlock隨機化
                            float variantRand = hash(timeBlock * 19.19);
                            //儲存雜訊方式變數
                            float offsetX = 0.0;
                            float offsetY = 0.0;

                            //三種雜訊方式中選一種
                            if (variantRand < 0.33) {
                                // Variant A：輕微偏移
                                if(blockT < 0.5){
                                    offsetX =  uStrength * 0.6;
                                }else{
                                    offsetX =  -uStrength * 0.6;
                                }
                            } else if (variantRand < 0.66) {
                                // Variant B：反向撕裂
                                if(blockT < 0.5){
                                    offsetX = -uStrength * 1.2;
                                }else{
                                    offsetX =  uStrength * 1.2;
                                }
                            } else {
                                // Variant C：不規則 jitter
                                float jitter = hash(sliceIndex * 91.7);
                                if(blockT < 0.5){
                                    offsetX = uStrength * mix(-1.5, 1.5, jitter);
                                }else{
                                    offsetX = -uStrength * mix(-1.5, 1.5, jitter);
                                }
                                
                            }

                            offsetX *= sliceMask * glitchMask;
                            offsetY *= sliceMask * glitchMask * 0.5;
                            
                        //三種雜訊方式中選一種

                        //水平偏移
                        uv.x += offsetX;
                        //垂直偏移
                        //uv.y += offsetY;

                        //畫面渲染
                        gl_FragColor = texture2D(tDiffuse, uv);
                    }
                `
            };
        //#endregion

        //#region 粒子Shader 設定
            //粒子移動設定
            const pointVertexShader = `

                //精度宣告

                    precision highp float;

                //精度宣告

                // ===== three.js 內建 =====
                //把「物件座標」轉成「攝影機視角座標」的矩陣
                //uniform mat4 modelViewMatrix;
                //把 3D 空間「投影」到 2D 螢幕的矩陣
                //uniform mat4 projectionMatrix;

                // JS端引入參數

                    // JS 傳進來的「動畫進度 0 → 1」

                        uniform float uProgress;

                    // JS 傳進來的「動畫進度 0 → 1」

                    // JS 傳進來的目前時間（秒）數據

                        uniform float uTime;

                    // JS 傳進來的目前時間（秒）數據

                // JS端引入參數

                //粒子位置參數設定

                    // 舊模型的粒子位置

                        //attribute vec3 position;

                    // 舊模型的粒子位置

                    // 新模型的粒子位置

                        attribute vec3 positionTarget;

                    // 新模型的粒子位置

                    // 爆散時的殼狀位置

                        attribute vec3 positionShell;

                    // 爆散時的殼狀位置

                //粒子位置參數設定

                // 傳給fragmentShader的參數

                    // 舊模型粒子高度
                    varying float oldModeHeight;
                    // 舊模型粒子寬度
                    varying float oldModeWidth;
                    // 舊模型粒子深度(前後)
                    varying float oldModeDepth;

                    // 新模型最終高度    
                    varying float newModeHeight;
                    // 新模型最終寬度    
                    varying float newModeWidth;  
                    // 新模型最終深度(前後) 
                    varying float newModeDepth;

                // 傳給 fragmentShader的參數

                // vec3是資料型別代表有三個數字資料
                // ease為函式名稱
                vec3 ease(vec3 a, vec3 b, float t) {
                    // smoothstep(0.0, 1.0, t) 讓動作流程看起來不那麼硬
                    // mix(a, b, x) =>
                    // x = 0 輸出a
                    // x = 1 輸出b
                    // 算出 a 到 b 中間的位置，然後把這個位置交出去。
                    return mix(a, b, smoothstep(0.0, 1.0, t));
                }

                void main() {
                    //設定進度條 0~1
                    float globalT = uProgress;
                    
                    //儲存粒子位置資訊

                        vec3 point;

                    //儲存粒子位置資訊

                    // 設定參數傳送給fragmentShader

                        // 舊模型粒子高度
                        oldModeHeight = position.y;
                        // 舊模型粒子寬度
                        oldModeWidth = position.x;
                        // 舊模型粒子深度(前後)
                        oldModeDepth = position.z;

                        // 新模型最終高度    
                        newModeHeight = positionTarget.y;
                        // 新模型最終寬度    
                        newModeWidth = positionTarget.x;
                        // 新模型最終深度(前後) 
                        newModeDepth  = positionTarget.z;

                    // 設定參數傳送給fragmentShader

                    //對舊模型粒子進行獨立標記

                        //將舊模型的粒子位置分開抽離

                            //高度
                            //下到上
                            float yOldKey = clamp(
                                oldModeHeight,
                                0.0,
                                1.0
                            );
                            //上到下
                            // float yOldKey = 1.0 - clamp(
                            //     (oldModeHeight - heightMin) / (heightMax - heightMin),
                            //     0.0,
                            //     1.0
                            // );
                            //高度

                            //寬度
                            //左到右
                            float xOldKey = clamp(
                                oldModeWidth,
                                0.0,
                                1.0
                            );
                            //右到左
                            // float xOldKey = 1.0 - clamp(
                            //     oldModeWidth,
                            //     0.0,
                            //     1.0
                            // );
                            //寬度

                            //深度(前後)
                            //後到前
                            float zOldKey = clamp(
                                oldModeDepth,
                                0.0,
                                1.0
                            );
                            //前到後
                            // float zOldKey = 1.0 - clamp(
                            //     oldModeDepth,
                            //     0.0,
                            //     1.0
                            // );
                            //深度(前後)

                        //將舊模型的粒子位置分開抽離

                        //將舊模型粒子位置進行合併

                            float oldScanKey = yOldKey;

                            oldScanKey = clamp(oldScanKey, 0.0, 1.0);

                        //將舊模型粒子位置進行合併

                    //對舊模型粒子進行獨立標記

                    //對新模型粒子進行獨立標記

                        //將新模型的粒子位置分開抽離

                            //高度
                            //下到上
                            float yKey = clamp(
                                newModeHeight,
                                0.0,
                                1.0
                            );
                            //上到下
                            // float yKey = 1.0 - clamp(
                            //     (newModeHeight - heightMin) / (heightMax - heightMin),
                            //     0.0,
                            //     1.0
                            // );
                            //高度

                            //寬度
                            //左到右
                            float xKey = clamp(
                                newModeWidth,
                                0.0,
                                1.0
                            );
                            //右到左
                            // float xKey = 1.0 - clamp(
                            //     newModeWidth,
                            //     0.0,
                            //     1.0
                            // );
                            //寬度

                            //深度(前後)
                            //後到前
                            float zKey = clamp(
                                newModeDepth,
                                0.0,
                                1.0
                            );
                            //前到後
                            // float zKey = 1.0 - clamp(
                            //     newModeDepth,
                            //     0.0,
                            //     1.0
                            // );
                            //深度(前後)

                        //將新模型的粒子位置分開抽離

                        //將新模型粒子位置進行合併

                            float newScanKey = xKey * 0.33 + yKey * 0.34 + zKey * 0.33;

                            newScanKey = clamp(newScanKey, 0.0, 1.0);

                        //將新模型粒子位置進行合併

                    //對新模型粒子進行獨立標記

                    //建立進度條，將0.0~0.4的進度 轉換為0~1

                        float localT = globalT / 0.4;

                    //建立進度條，將0.0~0.4的進度 轉換為0~1

                    //建立進度條，將0.4~1的進度 轉換為0~1

                        float lastGlobalT = (globalT - 0.4) / 0.6;

                    //建立進度條，將0.4~1的進度 轉換為0~1

                    // 每顆粒子落下移動時間

                        float moveDuration = 0.3;

                    // 每顆粒子落下移動時間

                    //粒子運動軌跡設定

                        //掃描設定公式說明
                        //float 粒子本身的動畫進度(localT) = (進度條參數(lastGlobalT) - 轉換過後的粒子參數(scanKey)) / 粒子動畫時間(moveDuration);
                        //float localT = ( lastGlobalT - scanKey ) / moveDuration;
                        //將粒子本身的動畫進度也過濾為0~1的數據
                        //localT = clamp(localT, 0.0, 1.0);
                        //掃描設定公式說明

                        // 第一段：原模型 → 爆散
                        // if (uProgress < 0.4) {
                        //     point = ease(position, positionShell, uProgress / 0.4);

                        // // 第二段：爆散 → 新模型
                        // } else {
                        //     point = ease(positionShell, positionTarget, (uProgress - 0.4) / 0.6);
                        // }

                        // 第一段
                        if (uProgress < 0.4) {

                            //粒子位置
                            point = ease(position, position, uProgress / 0.4);

                        } else if(uProgress < 0.8){
                            // 第二段

                            //粒子位置
                            point = ease(positionTarget, positionTarget, (globalT - 0.4) / 0.4);
                        } else {
                            // 第三段

                            //粒子位置
                            point = positionTarget;
                        }

                    //粒子運動軌跡設定

                    // 呼吸感設定
                    
                        // 建立一個變數名稱為breathe，型別為float
                        // float為 單一浮點數（小數）
                        // sin(x)代表輸出永遠是-1.0 ～ +1.0
                        // uTime * 0.5 根據現實時間來判定速度
                        // p.y * 4.0 粒子的y軸位置造成差值
                        // * 0.005 控制波動幅度
                        float breathe = sin(uTime * 0.5 + point.y * 4.0) * 0.005;

                        //normalize()代表將向量長度變為1，簡單的說就是將距離重新拉到為1
                        // 結果為目前位置加上微小的偏移
                        point += normalize(point) * breathe;

                    // 呼吸感設定

                    //將世界座標轉換為攝影機座標

                        //modelViewMatrix意思是將世界座標轉換為攝影機座標
                        vec4 mvData = modelViewMatrix * vec4(point, 1.0);

                    //將世界座標轉換為攝影機座標

                    //粒子大小設定

                        // 2.0：粒子「基礎大小」
                        // (1.0 / -mvData.z) 代表離鏡頭越近，點越大
                        float baseSize = 2.0 * (1.0 / -mvData.z);

                        float scale = 1.0;

                        //最終粒子大小
                        gl_PointSize = baseSize * scale;

                    //粒子大小設定
                    
                    // 將3D畫面轉換為2D畫面

                        //projectionMatrix 將3D畫面轉換為2D畫面
                        //gl_Position將2D畫面顯示在螢幕上
                        gl_Position = projectionMatrix * mvData;

                    // 將3D畫面轉換為2D畫面
                }
            `;
            //粒子狀態設定
            const pointFragmentShader = `
                //精度宣告
                //代表float型別的資料都要用高精度為標準計算
                precision highp float;

                // 從 vertex shader 接收資料
                
                //varying代表連接vertexShader
                
                    //float代表型別
                    //vHeight代表名稱
                    // 舊模型粒子高度
                    varying float oldModeHeight;
                    // 舊模型粒子寬度
                    varying float oldModeWidth;
                    // 舊模型粒子深度(前後)
                    varying float oldModeDepth;

                    // 新模型最終高度    
                    varying float newModeHeight;
                    // 新模型最終寬度    
                    varying float newModeWidth;  
                    // 新模型最終深度(前後) 
                    varying float newModeDepth;
                    
                //varying代表連接vertexShader

                //uniform代表從js中引入
                // 動畫進度 0 → 1
                uniform float uProgress;

                // 模型高度範圍（依你的模型實際調）
                const float heightMin = 0.0;
                const float heightMax = 1.5;

                void main() {

                    //粒子透明度
                    float alpha;

                    //確認是否掃描完成參數
                    float hit;

                    //宣告一個變數名為d型別是 float
                    //distance(a,b)為計算兩點的距離
                    //gl_PointCoord是在計算目前這個 fragment 在這顆點面積的相對位置(0~1)
                    //vec2(0.5) 是指兩個資料都是0.5 等價於vec2(0.5, 0.5)
                    //d儲存每個位置到正中央的距離

                    // 粒子形狀（圓形）

                        float d = distance(gl_PointCoord, vec2(0.5));
                        //如果距離超過0.5則刪除
                        if (d > 0.5) discard;

                    // 粒子形狀（圓形）
                    
                    // 第一段：原模型 → 爆散
                    if (uProgress < 0.4) {

                        //建立進度條，將0~0.4的進度 轉換為0~1

                            float localT = uProgress / 0.4;

                        //建立進度條，將0~0.4的進度 轉換為0~1

                        //設定粒子消失時間

                            float fadeDuration = 0.3;

                        //設定粒子消失時間

                        //將舊模型的粒子位置分開抽離

                            //高度
                            //clamp(x, min, max)意思是將x「限制」在 min 和 max
                            //也就是將高度限定在0~1之間
                            //如果x > max 則回報max 如 x < min 則回報min 如x在min跟max之間則回報x
                            //下到上
                            float yKey = clamp(
                                (oldModeHeight - heightMin) / (heightMax - heightMin),
                                0.0,
                                1.0
                            );
                            //上到下
                            // float yKey = 1.0 - clamp(
                            //     (oldModeHeight - heightMin) / (heightMax - heightMin),
                            //     0.0,
                            //     1.0
                            // );
                            //高度

                            //寬度
                            //左到右
                            float xKey = clamp(
                                oldModeWidth,
                                0.0,
                                1.0
                            );
                            //右到左
                            // float xKey = 1.0 - clamp(
                            //     oldModeWidth,
                            //     0.0,
                            //     1.0
                            // );
                            //寬度

                            //深度(前後)
                            //後到前
                            float zKey = clamp(
                                oldModeDepth,
                                0.0,
                                1.0
                            );
                            //前到後
                            // float zKey = 1.0 - clamp(
                            //     oldModeDepth,
                            //     0.0,
                            //     1.0
                            // );
                            //深度(前後)

                        //將舊模型的粒子位置分開抽離

                        //將舊模型粒子位置進行合併

                            //float scanKey = xKey * 0.33 + yKey * 0.34 + zKey * 0.33;
                            float scanKey = yKey;

                            scanKey = clamp(scanKey, 0.0, 1.0);

                        //將舊模型粒子位置進行合併

                        //執行掃描

                            //smoothstep(a, b, x)意思是x 從 a 走到 b
                            //回傳值會從 0「平滑地」變到 1
                            //如果x ≤ a 回傳 0  而x ≥ b 回傳1 而x在中間回傳 0~1(平滑曲線)

                            float fadeT = localT - scanKey;
                            //abs() 代表取絕對值
                            hit = clamp(fadeT / fadeDuration, 0.0, 1.0);
                            alpha = 1.0 - clamp(fadeT / fadeDuration, 0.0, 1.0);


                        //執行掃描

                    } else if(uProgress < 0.8){
                        // 第二段：爆散 → 新模型

                        //建立進度條，將0.4~0.8的進度 轉換為0~1

                            float localT = (uProgress - 0.4) / 0.4;

                        //建立進度條，將0.4~0.8的進度 轉換為0~1
                        
                        //設定粒子顯示時間

                            float fadeDuration = 0.3;

                        //設定粒子顯示時間

                        //將新模型的粒子位置分開抽離

                            //高度
                            //clamp(x, min, max)意思是將x「限制」在 min 和 max
                            //也就是將高度限定在0~1之間
                            //如果x > max 則回報max 如 x < min 則回報min 如x在min跟max之間則回報x
                            //下到上
                            float yKey = clamp(
                                (newModeHeight - heightMin) / (heightMax - heightMin),
                                0.0,
                                1.0
                            );
                            //上到下
                            // float yKey = 1.0 - clamp(
                            //     (newModeHeight - heightMin) / (heightMax - heightMin),
                            //     0.0,
                            //     1.0
                            // );
                            //高度

                            //寬度
                            //左到右
                            float xKey = clamp(
                                newModeWidth,
                                0.0,
                                1.0
                            );
                            //右到左
                            // float xKey = 1.0 - clamp(
                            //     newModeWidth,
                            //     0.0,
                            //     1.0
                            // );
                            //寬度

                            //深度(前後)
                            //後到前
                            float zKey = clamp(
                                newModeDepth,
                                0.0,
                                1.0
                            );
                            //前到後
                            // float zKey = 1.0 - clamp(
                            //     newModeDepth,
                            //     0.0,
                            //     1.0
                            // );
                            //深度(前後)

                        //將新模型的粒子位置分開抽離

                        //將新模型粒子位置進行合併

                            float scanKey = yKey;

                            scanKey = clamp(scanKey, 0.0, 1.0);

                        //將新模型粒子位置進行合併

                        //執行掃描

                            float fadeT = localT - scanKey;
                            alpha = clamp(fadeT / fadeDuration, 0.0, 1.0);

                        //執行掃描
                    } else {
                        alpha = 1.0;
                    }

                    //最終繪製粒子顏色

                        //白色
                        vec3 white = vec3(1.0);

                        //黃色
                        vec3 yellow = vec3(1.0, 1.0, 0.2);

                        // 被掃到時變黃
                        //vec3 color = mix(white, yellow, hit);
                        vec3 color;
                        if(hit > 0.7){
                            color = yellow;
                        }else{
                            color = white;
                        }

                        // 套用顏色透明度
                        gl_FragColor = vec4(color, alpha);

                    //最終繪製粒子顏色
                }
            `;
        //#endregion

        //#region 線條Shader 設定
            //線條移動設定
            const lineVertexShader = `
                //精度宣告

                    precision highp float;

                //精度宣告

                // ===== three.js 內建 =====
                //把「物件座標」轉成「攝影機視角座標」的矩陣
                //uniform mat4 modelViewMatrix;
                //把 3D 空間「投影」到 2D 螢幕的矩陣
                //uniform mat4 projectionMatrix;

                // JS端引入參數

                    // JS 傳進來的「動畫進度 0 → 1」

                        uniform float uProgress;

                    // JS 傳進來的「動畫進度 0 → 1」

                    // JS 傳進來的目前時間（秒）數據

                        uniform float uTime;

                    // JS 傳進來的目前時間（秒）數據

                    // 舊模型的起始/終點位置

                        //attribute vec3 position;

                    // 舊模型的起始/終點位置

                    // 起點粒子陣列(一次只讀取一個點(x.y.z))

                        attribute vec3 aStart;

                    // 起點粒子陣列(一次只讀取一個點(x.y.z))

                    // 終點粒子陣列(一次只讀取一個點(x.y.z))

                        attribute vec3 aEnd;

                    // 終點粒子陣列(一次只讀取一個點(x.y.z))
               
                // JS端引入參數

                // 傳給fragmentShader的參數

                    varying float vLineKey;

                    varying float scanLineKey;

                // 傳給fragmentShader的參數
                
                void main() {

                    //儲存粒子位置資訊

                        vec3 point;

                    //儲存粒子位置資訊

                    //判斷目前粒子是起點還是終點

                        //bool型別為真/假 只能儲存true/false
                        //變數名稱為isStart
                        //float(變數) 意思是將變數轉為浮點數 如果是1/2/3會轉換為1.0/2.0/3.0
                        //mod(變數,除數) 意思是取餘數 其結果只有0.0跟1.0
                        //判斷目前粒子是起點還是終點
                        //偶數 = 起點，奇數 = 終點
                        bool isStart = mod(float(gl_VertexID), 2.0) < 1.0;

                        vec3 modelPos = isStart ? aStart : aEnd;

                    //判斷目前粒子是起點還是終點
                    
                    // 模型高度範圍（依你的模型實際調）
                    const float heightMin = 0.0;
                    const float heightMax = 1.5;

                    //將起點模型的粒子位置分開抽離

                        //高度
                        //下到上
                        float yKey = clamp(
                            (aStart.y - heightMin) / (heightMax - heightMin),
                            0.0,
                            1.0
                        );
                        //上到下
                        // float yKey = 1.0 - clamp(
                        //     (aStart.y - heightMin) / (heightMax - heightMin),
                        //     0.0,
                        //     1.0
                        // );
                        //高度

                        //寬度
                        //左到右
                        float xKey = clamp(
                            aStart.x,
                            0.0,
                            1.0
                        );
                        //右到左
                        // float xKey = 1.0 - clamp(
                        //     aStart.x,
                        //     0.0,
                        //     1.0
                        // );
                        //寬度

                        //深度(前後)
                        //後到前
                        float zKey = clamp(
                            aStart.z,
                            0.0,
                            1.0
                        );
                        //前到後
                        // float zKey = 1.0 - clamp(
                        //     aStart.z,
                        //     0.0,
                        //     1.0
                        // );
                        //深度(前後)

                    //將舊模型的粒子位置分開抽離

                    //將舊模型粒子位置進行合併

                        scanLineKey = yKey;

                        scanLineKey = clamp(scanLineKey, 0.0, 1.0);

                    //將舊模型粒子位置進行合併

                    // 定義動畫時間

                        float lineTime = 0.15;

                    // 定義動畫時間

                    //第一階段
                    if (uProgress < 0.4) {
                        point = modelPos;
                    }else if (uProgress < 0.8){

                        //建立進度條，將0.4~0.8的進度 轉換為0~1

                            float lineT = clamp((uProgress - 0.4) / 0.4, 0.0, 1.0);

                        //建立進度條，將0.4~0.8的進度 轉換為0~1

                        float localT = 1.0 - clamp((lineT - scanLineKey) / lineTime, 0.0, 1.0);

                        if(isStart){
                            point = mix(aStart, aEnd, localT);
                            //point = modelPos;
                        }else{
                            //point = mix(aStart, aEnd, localT);
                            point = modelPos;
                        }
                    }else {

                        point = modelPos;

                    }

                    //gl_Position將2D畫面顯示在螢幕上
                    //modelViewMatrix意思是將世界座標轉換為攝影機座標
                    //projectionMatrix 將3D畫面轉換為2D畫面
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
                }
            `;
            const lineFragmentShader = `
                precision highp float;

                uniform float uProgress;
                varying float scanLineKey;

                void main() {

                    vec3 color = vec3(1.0, 0.25, 0.25);

                    float scanStart    = 0.4;
                    float scanDuration = 0.4;   // 對應 vertex
                    float visibleDelay = 0.08;  // 拉完後停留（用 lineT 空間）
                    float fadeDuration = 0.15;  // 淡出（用 lineT 空間）

                    // 尚未進入掃描
                    if (uProgress < scanStart) {
                        gl_FragColor = vec4(color, 0.0);
                        return;
                    }

                    // 全域掃描進度（0~1）
                    float lineT = clamp(
                        (uProgress - scanStart) / scanDuration,
                        0.0,
                        1.0
                    );

                    // 這條線「被掃描到的時間」
                    float appearT   = scanLineKey;
                    float fadeStart = appearT + visibleDelay;

                    float alpha;

                    // 還沒掃到
                    if (lineT < appearT) {
                        alpha = 0.0;
                    }
                    // 顯示中
                    else if (lineT < fadeStart) {
                        alpha = 1.0;
                    }
                    // 淡出
                    else {
                        float fadeT = (lineT - fadeStart) / fadeDuration;
                        alpha = 1.0 - clamp(fadeT, 0.0, 1.0);
                    }

                    gl_FragColor = vec4(color, alpha);
                }
            `;
        //#endregion

        
    //#endregion

    //#region 滑鼠事件設定
        useEffect(() => {

            //滑鼠拖拽狀態設定
            const onMouseMove = (event) => {
                //如果滑鼠非拖拽狀態則跳出
                if (!draggingRef.current) {
                    return;
                }
                //deltaX為計算x軸的變化量
                const deltaX = event.clientX - lastMouseXRef.current;
                //目前x軸資料
                lastMouseXRef.current = event.clientX;
                //目前旋轉角度+x軸變化量轉成「旋轉量」
                //滑鼠移得越多 → 轉得越多
                rotationAngleRef.current += deltaX * 0.005;
            };

            const onMouseUp = () => {
                //滑鼠拖拽狀態設定為假
                draggingRef.current = false;
            };

            //滑鼠只要有移動就會觸發
            window.addEventListener('mousemove', onMouseMove);
            //滑鼠按鍵「放開」的那一瞬間就會觸發
            window.addEventListener('mouseup', onMouseUp);

            return () => {
                //解除監視事件
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };
        }, []);
    //#endregion

    //#region 基本3D世界畫布設置函式
        //Three.js初始化設定
        const initThree = ()=>{

            //#region 取得顯示區塊標籤
                const mount = mountRef.current;
                // 如果沒有取得標籤則退出
                if (!mount) {
                    return;
                }
                // 防止多個 canvas
                mount.innerHTML = '';
            //#endregion

            //#region 世界設定
                // 創建一個模型世界，燈光、模組、素材、攝影機等都能放入內部
                const scene = new THREE.Scene();
            //#endregion

            //#region 攝影機設定
                // 建立攝影機並設定
                const camera = new THREE.PerspectiveCamera(
                    35, // 視角（越小越像望遠鏡）
                    mount.clientWidth / mount.clientHeight, // 顯示區塊長寬比例
                    0.1, // 最近可看到距離(米)
                    50 // 最遠可看到距離(米)
                );

                // 鏡頭位置(x, y, z) = (左右, 上下, 前後)
                camera.position.set(0, 0.9, 3);

                // 鏡頭朝向設定(看像目標)(x, y, z) = (左右, 上下, 前後)
                camera.lookAt(0, 0.65, 0);
            //#endregion

            //#region 設定渲染器
                //所有素材最後要經過這個渲染器才能顯示在畫面上
                const renderer = new THREE.WebGLRenderer({
                    antialias: true,// 抗鋸齒
                    alpha: true// 背景透明
                });

                //設定背景透明度 0 = 完全透明 / 1 = 完全不透明
                renderer.setClearAlpha(0);
                //設定顯示區的實際尺寸 長寬會根據顯示區塊標籤的長寬決定
                renderer.setSize(mount.clientWidth, mount.clientHeight);
                //畫面像素數量設定，越多越精細 
                //目前設定上限為2
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            //#endregion

            //#region 建立畫面處理流程控制器
                // 將渲染器得到的畫面進一步使用插件修改後再輸出
                // 控制器本身不處理畫面只有處理插件，像是插件的先後順序等等
                const composer = new EffectComposer(renderer);

                //將渲染器得到的畫面先往控制器內部送
                composer.addPass(new RenderPass(scene, camera));
            //#endregion
            
            //#region 建立客製化雜訊畫面處理插件
                const slicePass = new ShaderPass(SliceGlitchShader);

                // 將插件送往控制器內
                composer.addPass(slicePass);
            //#endregion

            // const glitchPass = new GlitchPass();
            // composer.addPass(glitchPass);

            //#region 渲染器影像插入顯示器
                // 將設定完成後的渲染器放入顯示區塊標籤讓畫面可以看到東西
                mount.appendChild(renderer.domElement);
            //#endregion

            //#region 3D模型設定
                
                //#region 粒子系統設定

                    // 建立3D模型空間，可以儲存一個模型形狀粒子資訊(不含貼圖素材)
                    const pointGeometry = new THREE.BufferGeometry();

                    // 粒子系統自訂渲染貼圖素材設定(引入自己建立的shader)
                    const pointMaterial = new THREE.ShaderMaterial({
                        //shader中建立一個uProgress的變數而初始值為1
                        uniforms: { 
                            uProgress: { 
                                value: 1,
                            },
                            uTime: { 
                                value: 0, 
                            },
                        },
                        //引入vertexShader的shader控制「粒子變化規則」
                        vertexShader:pointVertexShader,
                        //引入fragmentShader的shader控制「粒子本身的形狀」
                        fragmentShader:pointFragmentShader,
                        //允許透明度
                        transparent: true,
                        //顏色「疊加發光」
                        blending: THREE.AdditiveBlending,
                        //不要寫入深度意思是不會遮住其他物件
                        depthWrite: false,
                    });

                    //結合模型形狀(geometry)和貼圖(material)來合成最後的粒子畫面
                    const points = new THREE.Points(pointGeometry, pointMaterial);

                    //在攝影機畫面內的東西才渲染，畫面外則忽略
                    points.frustumCulled = true; 

                    //在模型世界中加入這個粒子模型
                    scene.add(points);

                //#endregion
                
                //#region 線條系統設定

                    // 建立3D模型空間，可以儲存一個模型形狀線條資訊(不含貼圖素材)
                    const lineGeometry  = new THREE.BufferGeometry();

                    // 畫線系統自訂渲染貼圖素材設定(引入自己建立的shader)
                    const lineMaterial = new THREE.ShaderMaterial({
                        //shader中建立一個uProgress的變數而初始值為1
                        uniforms: { 
                            uProgress: { 
                                value: 0,
                            },
                            uTime: { 
                                value: 0, 
                            },
                        },
                        //引入vertexShader的shader控制「粒子變化規則」
                        vertexShader:lineVertexShader,
                        //引入fragmentShader的shader控制「粒子本身的形狀」
                        fragmentShader:lineFragmentShader,
                        //允許透明度
                        transparent: true,
                        //不要寫入深度意思是不會遮住其他物件
                        depthWrite: false,
                    });

                    //結合模型形狀(geometry)和貼圖(material)來合成最後的線條畫面
                    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

                    //在攝影機畫面內的東西才渲染，畫面外則忽略
                    lines.frustumCulled = true;
                    
                    //在模型世界中加入這個線條模型
                    scene.add(lines);

                //#endregion

            //#endregion

            //#region 物件函數轉移設定
                //將上述設定的粒子模型/攝影機/渲染器等物件放入threeRef中
                //讓這些物件可以在外部使用
                threeRef.current = {
                    //世界元件
                    scene,
                    //攝影機元件
                    camera,
                    //渲染器元件
                    renderer,

                    //插件控制器元件
                    composer,
                    //雜訊畫面處理插件
                    slicePass,

                    //3D模型形狀粒子系統資料
                    pointGeometry,
                    //粒子系統自訂貼圖資料
                    pointMaterial,
                    //3D模型粒子模型資料
                    points,

                    //3D模型形狀線條系統資料
                    lineGeometry,
                    //線條系統自訂貼圖資料
                    lineMaterial,
                    //3D模型線條模型資料
                    lines,
                };
            //#endregion
        }

        // 動畫流程設定(確保畫面每一偵都在更新)
        function startAnimationLoop() {

            //#region 儲存偵數編號
                let rafId;
            //#endregion
            
            //#region 動畫設定
            const animate = () => {

                //#region 對資料來源(threeRef)進行解構
                    const { scene, 
                            camera, 
                            renderer,
                            composer,
                            slicePass,
                            pointGeometry,
                            lineGeometry,
                            pointMaterial, 
                            lineMaterial, 
                            points,
                            lines,
                    } = threeRef.current;

                    if (!renderer){
                        return;
                    } 
                //#endregion

                //#region 設定初始參數數值
                    //將目前時間（秒）數據傳入uTime
                    pointMaterial.uniforms.uTime.value = performance.now() * 0.001;
                    lineMaterial.uniforms.uTime.value = performance.now() * 0.001;
                    slicePass.uniforms.uTime.value = performance.now() * 0.001;
                //#endregion

                //#region 設定計時器函式

                    //#region 宣告狀態儲存"計時開始"跟"計時結束/計時重製"資料
                        const start = animationRef.current.startTime;
                        const finished = animationRef.current.finished;
                    //#endregion

                    //#region 設定"計時開始"
                    if (start !== null) {
                        //performance.now()意思為此刻的高精度時間（毫秒）
                        //now代表現在當下的時間點
                        const now = performance.now();
                        //animationStartTime代表用動畫開始那一刻的時間點（毫秒）
                        const elapsed = (now - start) / 1000; // 轉成秒
                        //把『已經過的秒數』換算成『0～1 的動畫進度』，而且最多只能到 1
                        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                        //將進度數據給予uProgress
                        pointMaterial.uniforms.uProgress.value = progress;
                        lineMaterial.uniforms.uProgress.value = progress;
                        slicePass.uniforms.uProgress.value = progress;
                        

                        // 當進度條過半則觸發
                        if (progress >= 0.41 && !finished) {
                            
                            animationRef.current.finished = true;

                            // 旋轉速度回到預設數值
                            rotationSpeedRef.current.current = rotationSpeedRef.current.base;

                            // position粒子位置更新為positionTarget終點粒子位置
                            pointGeometry.setAttribute(
                                'position',
                                pointGeometry.getAttribute('positionTarget')
                            );
                            //這個物件佔用空間的範圍在哪讓引擎不要亂把它裁掉
                            pointGeometry.computeBoundingSphere();
                        }
                    }
                    //#endregion
                //#endregion

                //#region 自動旋轉設定
                    //如果滑鼠沒有在顯示區塊上且滑鼠為非拖拽狀態
                    if (!hoverRef.current && !draggingRef.current) {
                        //將 全域旋轉角度 加上 目前旋轉速度
                        rotationAngleRef.current += rotationSpeedRef.current.current;
                    }
                    //粒子模型角度 = 全域旋轉角度
                    points.rotation.y = rotationAngleRef.current;
                    //線條模型角度 = 全域旋轉角度
                    lines.rotation.y = rotationAngleRef.current;
                //#endregion

                // 同步外部貼圖旋轉
                if (imgRef.current) {
                    imgRef.current.style.transform = `rotate(${rotationAngleRef.current}rad)`;
                }

                //#region 滑鼠動作設定

                    //角度參數設定
                    const manualRotateSpeed = 0.02;

                    //滑鼠點左鍵，模型y軸負旋轉
                    if (rotateRef.current.left) {
                        rotationAngleRef.current -= manualRotateSpeed;
                    }
                    //滑鼠點右鍵，模型y軸正旋轉
                    if (rotateRef.current.right) {
                        rotationAngleRef.current += manualRotateSpeed;
                    } 
                //#endregion

                //#region 重新渲染畫面
                if (composer) {
                    //使用雜訊特效畫面
                    composer.render();
                } else {
                    //原始畫面
                    renderer.render(scene, camera);
                }
                //#endregion

                rafId = requestAnimationFrame(animate);
            };
            //#endregion

            //執行動畫函式
            animate();

            return () => {
                cancelAnimationFrame(rafId);
            }
        }
    //#endregion

    //#region 視窗尺寸改變時，讓畫面不要變形、不要模糊
        const handleResize = () => {
            const mount = mountRef.current;
            const { renderer, camera } = threeRef.current;
            if (!mount || !renderer || !camera){
                return;
            } 
            //設定寬度
            const w = mount.clientWidth;
            //設定高度
            const h = mount.clientHeight;
            //重新渲染畫面
            renderer.setSize(w, h);
            //更新攝影機比例
            camera.aspect = w / h;
            //根據攝影機比例重新渲染畫面
            camera.updateProjectionMatrix();
        };
    
    //#endregion

    //#region 初始化 Three.js（只跑一次）
    useEffect(() => {

        //執行Three初始化
        initThree();

        // 不跑動畫
        animationRef.current.startTime = null; 
        // 視為完成狀態
        animationRef.current.finished = true; 
        
        //動畫執行
        startAnimationLoop();
        //只要瀏覽器尺寸變化就會觸發handleResize函式
        window.addEventListener("resize", handleResize);

        return () => {
            //停止監聽事件
            window.removeEventListener("resize", handleResize);

            //釋放GPU資源
            const { renderer } = threeRef.current;
            if (renderer) {
                renderer.dispose();
            }
        
            //將畫面的<canvas> 移除
            if (mountRef.current) {
                mountRef.current.innerHTML = '';
            }
        };

    }, []);
    //#endregion

    //#region 3D畫布事件突發相關函式

        //引入3D模型
        //輸出的資料就是模型的資料
        const loadMesh = async(path) => {

            //載入讀取glTF模型模組
            const loader = new GLTFLoader();

            try {
                //由於loader.load是非同步功能所以外圍需要套一層new Promise
                const gltf = await new Promise((resolve, reject) => {
                    loader.load(
                        path,       // url模型路徑（必填）
                        resolve,    // onLoad載入成功時呼叫
                        undefined,  //onProgress 載入進度（可選）
                        reject      //onError 載入失敗時呼叫（可選）
                    );
                });

                //宣告儲存模型資料變數
                let mesh = null;

                //取出模型形狀資料
                //.traverse將目標的資料一一列出
                //如果gltf.scene中有Mesh這個名稱的資料且mesh還沒寫入資料
                //就將模型資料寫入mesh
                gltf.scene.traverse((meshData) => {
                    if (meshData.isMesh && !mesh) {
                        mesh = meshData;
                    }
                });

                return mesh;

            } catch (error) {
                console.error("GLTF 載入失敗:", error);
                return null;
            }
        }

        //計算粒子化後的模型
        //輸出資料就是所有粒子位置陣列
        function buildParticlePositions(mesh, count) {
            //mesh為模型資料，count為粒子數量
            // 建立一個「模型表面取樣器」
            // 利用mesh建立出模型的表面並藉由掃描這個表面來達成表面取樣
            const sampler = new MeshSurfaceSampler(mesh).build();
            //建立數量為粒子量*3的陣列並取名為positions
            const positions = new Float32Array(count * 3);

            //建立一個3d位置的容器可以儲存(x, y, z)
            const temp = new THREE.Vector3();
            //對每個粒子做迴圈
            for (let i = 0; i < count; i++) {
                //sampler.sample(temp) 在模型表面隨機取一個點並存進temp
                sampler.sample(temp);
                //將temp中點的位置存入positions陣列中
                positions[i * 3]     = temp.x;
                positions[i * 3 + 1] = temp.y;
                positions[i * 3 + 2] = temp.z;
            }

            return positions;
        }

        //計算目標A跟目標B的合併陣列
        //輸入格式為Float32Array陣列
        //輸出格式為Float32Array陣列
        function buildLineSegmentsFromParticles(A, B) {

            // 取出粒子總數量
            const count = Math.min(A.length, B.length) / 3;

            // 建立一個陣列空間數量為為粒子數量的六倍
            const result = new Float32Array(count * 6);

            //執行迴圈次數為粒子數
            for (let i = 0; i < count; i++) {
                const ai = i * 3;   // A 的粒子起點
                const bi = i * 3;   // B 的粒子起點
                const ri = i * 6;   // result 的線段起點

                // A 起點
                result[ri + 0] = A[ai + 0];
                result[ri + 1] = A[ai + 1];
                result[ri + 2] = A[ai + 2];

                // B 終點
                result[ri + 3] = B[bi + 0];
                result[ri + 4] = B[bi + 1];
                result[ri + 5] = B[bi + 2];
            }

            return result;
        }

        //#region 粒子模型中繼點位置相關函式
        
            // 爆散殼粒子中繼點位置運算
            function createShell(attr) {
                //new Float32Array為建立一個指定大小的數字陣列
                //要存入的資料是每個粒子的具體位置(x, y, z)
                //attr.count為粒子數量
                //所以總數為attr.count * 3
                const arr = new Float32Array(attr.count * 3);
                //對每一個粒子依序做迴圈
                for (let i = 0; i < attr.count; i++) {
                    //取得粒子的x位置座標
                    const x = attr.getX(i);
                    //取得粒子的y位置座標
                    const y = attr.getY(i);
                    //取得粒子的z位置座標
                    const z = attr.getZ(i);
                    //計算粒子離中心有多遠
                    //計算圓心距離的公式為距離 = √(x² + y² + z²)
                    //Math.sqrt為開根號
                    const len = Math.sqrt(x*x + y*y + z*z) + 0.0001;
                    //Math.random()意思是取0~1隨機小數 例如0.13 or 0.57 or 0.92等等        
                    //配合SHELL_STRENGTH做倍數增量(控制隨機數的大小)
                    //1.0則是確保即便是最小數字也會有1以上的倍率
                    const k = 1.0 + Math.random() * SHELL_STRENGTH;
                    //重新計算粒子的位置 沿著原本方向，用隨機強度，把粒子往外推
                    //Float32Array內部排列會像是[ x0, y0, z0, x1, y1, z1, x2, y2, z2, ... ]
                    //為了讓xyz對應x0, y0, z0 所以使用i*3/i*3+1/i*3+2的方式存取
                    //例如第0個粒子 x=0*3=0([0]) y=0*3+1=1([1]) z=0*3+2=2([2])
                    arr[i*3] = x / len * k;
                    arr[i*3+1] = y / len * k;
                    arr[i*3+2] = z / len * k;
                }
                return arr;
            }

            // 單點發射中繼點位置運算
            // 使用方式createPointSourceFromArray(positions,{ x: 0, y: 1.5, z: 0 });
            function createPointSourceFromArray(array, source) {
                //資料來源格式Float32Array陣列
                //得到粒子數
                const count = array.length / 3;
                //建立陣列
                const arr = new Float32Array(count * 3);
                //解構座標點
                const { x, y, z } = source;

                for (let i = 0; i < count; i++) {
                    const idx = i * 3;
                    arr[idx]     = x;
                    arr[idx + 1] = y;
                    arr[idx + 2] = z;
                }

                return arr;
            }

            // 平面灑落中繼點位置運算
            // 使用方式createPlaneDistribution(positions,1.5);
            function createPlaneDistribution(array, targetY){
                //資料來源格式Float32Array陣列
                //得到粒子數
                const count = array.length / 3;
                //建立陣列
                const arr = new Float32Array(count * 3);

                for (let i = 0; i < count; i++) {
                    const idx = i * 3;

                    arr[idx]     = array[idx];     // X 不變
                    arr[idx + 1] = targetY;         // Y 固定
                    arr[idx + 2] = array[idx + 2]; // Z 不變
                }

                return arr;
            }

            // 多點發射中繼點位置運算
            function createMultiPointEmitter(
                array, 
                source = { x: 0, y: 1.5, z: 0 }, 
                radius = 1.0){
                //資料來源格式Float32Array陣列
                //得到粒子數
                const count = array.length / 3;
                //建立陣列
                const arr = new Float32Array(count * 3);

                //解構座標點
                const { x, y, z } = source;

                const center = { x, y, z };

                // 三個固定角度（弧度）
                //Math.PI為圓周率 = 3.14...
                //(角度 * Math.PI) / 180 = 弧度
                const angles = [
                    (150 * Math.PI) / 180, // 左上
                    (30  * Math.PI) / 180, // 右上
                    (270 * Math.PI) / 180, // 下方
                ];

                // 預先算好三個發射點
                const emitters = angles.map((angle) => (
                    {
                        x: center.x + Math.cos(angle) * radius,
                        y: center.y,
                        z: center.z + Math.sin(angle) * radius,
                    }
                ));

                // 依序分配粒子到三個點
                for (let i = 0; i < count; i++) {
                    const idx = i * 3;
                    const emitter = emitters[i % 3];

                    arr[idx]     = emitter.x;
                    arr[idx + 1] = emitter.y;
                    arr[idx + 2] = emitter.z;
                }

                return arr;
            }
        
        //#endregion

        //#region 粒子資料傳送GPU相關函式

            //第一次建立粒子模型並傳送給GPU
            function initParticleGeometry({ pointGeometry, points, positions, pointB }) {
                //pointGeometry 3D模型形狀粒子系統資料
                //points 3D模型粒子模型資料
                //positions 粒子位置陣列
                //pointB 中繼點粒子位子陣列
                pointGeometry.setAttribute(
                    //position代表「粒子目前顯示的位置」
                    'position',
                    new THREE.BufferAttribute(positions, 3)
                );

                pointGeometry.setAttribute(
                    //positionTarget代表「粒子終點顯示的位置」
                    'positionTarget',
                    new THREE.BufferAttribute(positions, 3)
                );

                pointGeometry.setAttribute(
                    //positionShell代表「粒子轉場時的中間狀態」
                    'positionShell',
                    new THREE.BufferAttribute(pointB, 3)
                );

                //這個物件佔用空間的範圍在哪讓引擎不要亂把它裁掉
                //three.js會建立一個空間，這個空間內攝影機會渲染空間以外則會忽略
                //這個空間會包住geometry確保geometry可以被渲染
                pointGeometry.computeBoundingSphere();
            }

            //將已有的粒子資料傳送至GPU
            function applyParticleAttributes({pointGeometry, positions, shellPositions}) {

                //pointGeometry 3D模型形狀粒子系統資料
                //pointMaterial 3D模型貼圖資料(傳給Shader的資料)
                //positions 粒子位置陣列
                //pointB 中繼點粒子位子陣列

                //.setAttribute('positionTarget',new THREE.BufferAttribute(positions, 3))
                //意思是將pointGeometry.getAttribute內部中新增或覆蓋positionTarget的資料
                //new THREE.BufferAttribute(next, 3)表示這是一個3D位置陣列 每3個資料為一組
                pointGeometry.setAttribute(
                    //positionTarget代表「粒子終點顯示的位置」
                    'positionTarget',
                    new THREE.BufferAttribute(positions, 3)
                );

                pointGeometry.setAttribute(
                    //positionShell代表「粒子轉場時的中間狀態」
                    'positionShell',
                    new THREE.BufferAttribute(shellPositions, 3)
                );

                //這個物件佔用空間的範圍在哪讓引擎不要亂把它裁掉
                pointGeometry.computeBoundingSphere();
            }

            //粒子模型切換時，更新 GPU 並重啟動畫
            function transitionToNewModel({ pointGeometry, pointMaterial, positions, shellPositions }) {
                //pointGeometry 3D模型形狀粒子系統資料
                //pointMaterial 3D模型貼圖資料(傳給Shader的資料)
                //positions 粒子位置陣列
                //pointB 中繼點粒子位子陣列
                applyParticleAttributes({
                    pointGeometry,
                    positions,
                    shellPositions
                });
                
                //將轉場動畫進度重設為0
                pointMaterial.uniforms.uProgress.value = 0;
                //重設完成狀態
                animationRef.current.finished = false;
                //將動畫開始時間重新設置為0
                animationRef.current.startTime = performance.now();
            }

        //#endregion
    
        //#region 線條資料傳送GPU相關函式
            
            //第一次建立將線條模型陣列傳送給GPU
            function initLineGeometry({ lineGeometry, linePositions }) {

                //lineGeometry 3D模型形狀粒子系統資料
                //linePositions 粒子位置陣列 

                // 計算粒子數輛
                const count =    linePositions.length / 3;

                // 建立開始點位陣列
                const aStart = new Float32Array(count * 3);
                // 建立結束點位陣列
                const aEnd   = new Float32Array(count * 3);

                for (let i = 0; i < count; i++) {
                    //把「第幾個點」轉成「陣列裡第幾個數字」
                    const point = i * 3;

                    // 判定是否為起點(ture/false)
                    const isStart = (i % 2 === 0);

                    //紀錄起點
                    const base = isStart ? (point) : (point - 3);             
                    //紀錄終點
                    const end  = isStart ? (point + 3) : (point);

                    // aStart 永遠存 A
                    aStart[point + 0] = linePositions[base + 0];
                    aStart[point + 1] = linePositions[base + 1];
                    aStart[point + 2] = linePositions[base + 2];

                    // aEnd 永遠存 B
                    aEnd[point + 0] = linePositions[end + 0];
                    aEnd[point + 1] = linePositions[end + 1];
                    aEnd[point + 2] = linePositions[end + 2];
                }
                
                lineGeometry.setAttribute(
                    //position代表「粒子目前顯示的位置」
                    //起點
                    'position',
                    new THREE.BufferAttribute(linePositions, 3)
                );

                // 新增：起點 / 終點 attribute
                lineGeometry.setAttribute(
                    'aStart',
                    new THREE.BufferAttribute(aStart, 3)
                );

                lineGeometry.setAttribute(
                    'aEnd',
                    new THREE.BufferAttribute(aEnd, 3)
                );
                
                //這個物件佔用空間的範圍在哪讓引擎不要亂把它裁掉
                //three.js會建立一個空間，這個空間內攝影機會渲染空間以外則會忽略
                //這個空間會包住geometry確保geometry可以被渲染
                lineGeometry.computeBoundingSphere();              
            }

        //#endregion

        //#region 模型置中 + 縮放
        function centerAndScaleObjects({ points, lines, targetSize }) {

            //new THREE.Box3()建立一個「3D 長方體範圍容器」可儲存範圍資料
            //用 points 的資料去「填滿」這個 Box3
            //box會得到兩個座標點
            // 類似以下結構
            // Box3 {
            //     min: Vector3 { x: -0.75, y: 0, z: -0.62 },
            //     max: Vector3 { x:  0.82, y: 1.5, z:  0.90 }
            // }

            // 用 points 當基準算 bounding box
            const box = new THREE.Box3().setFromObject(points);
            //.getSize會找物件中的min跟max做計算
            //如有錯誤就回回報size = Vector3 { x: 0, y: 0, z: 0 }空的空間
            const size = box.getSize(new THREE.Vector3());
            //找出size中最大的座標並取名為maxAxis
            const maxAxis = Math.max(size.x, size.y, size.z);

            // 防呆：避免 NaN / Infinity
            if (maxAxis === 0) return;

            // 計算比例
            const scale = targetSize / maxAxis;

            //points.scale代表模型的縮放比例
            //.setScalar()代表內容都用()內的數值代替
            // 同步縮放
            points.scale.setScalar(scale);
            lines.scale.setScalar(scale);

            // 重新計算 box（縮放後）
            const box2 = new THREE.Box3().setFromObject(points);

            // 貼地
            const offsetY = box2.min.y;
            points.position.y -= offsetY;
            lines.position.y -= offsetY;

            // 置中 XZ
            const center = box2.getCenter(new THREE.Vector3());
            points.position.x -= center.x;
            points.position.z -= center.z;
            lines.position.x -= center.x;
            lines.position.z -= center.z;
        }
        //#endregion
    //#endregion

    //#region GPU 轉場
    useEffect(() => {

        //計算模型的計數器
        //確保不會案太快導致顯示混亂
        let cancelled = false;

        //宣告執行函式
        const run = async() => {

            //進行解構
            //解構粒子相關資料
            const { pointGeometry, pointMaterial, points } = threeRef.current;
            if (!pointGeometry || !pointMaterial || !points) {
                return;
            }
            //解構線條相關資料
            const { lineGeometry, lineMaterial, lines } = threeRef.current;
            if (!lineGeometry || !lineMaterial || !lines) {
                return;
            }

            //讀取3D模型資料
            const mesh = await loadMesh(modelList[activeIndex].path);
            if (!mesh || cancelled) {
                return;
            }

            //計算所有粒子位置陣列
            const positions = buildParticlePositions(mesh, MAX_POINTS);
            //少粒子陣列
            const lowPositions = buildParticlePositions(mesh, LOW_POINTS);

            let pointB;

            if(modelList[activeIndex].id % 2 === 1){
                //計算線條系統中繼點陣列
                pointB = createMultiPointEmitter(lowPositions);
            }else{
                //計算線條系統中繼點陣列
                pointB = createPlaneDistribution(lowPositions,1.5);
            }

            //將A跟B陣列合併
            const linePositions = buildLineSegmentsFromParticles(lowPositions,pointB);

            // === 粒子 ===

                //如果沒有position檔案就執行initParticleGeometry(第一次建立粒子模型)
                if (!pointGeometry.getAttribute('position')) {
                    initParticleGeometry({ pointGeometry, points, positions, pointB });
                    centerAndScaleObjects({ points, lines, targetSize: TARGET_SIZE});
                } else {
                    //否則就將已有的粒子資料傳送至GPU
                    transitionToNewModel({
                        pointGeometry,
                        pointMaterial,
                        positions,
                        shellPositions: pointB
                    });
                }

            // === 粒子 ===

            // === 線條===
                
                initLineGeometry({ lineGeometry, linePositions });

            // === 線條 ===
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [activeIndex]);
    //#endregion

    return (
        <article className="復數模型展示">
            <h3>復數模型展示</h3>

            {/* 元件最外圍 */}
            <div className="ThreeJsBox">
                {/* 顯示模型元件 */}
                <div className="ThreeJs" 
                    //顯示區塊標籤
                    ref={mountRef}
                    //滑鼠進入顯示區塊則觸發(hover效果同理)
                    onMouseEnter={() => {
                        //hoverRef判斷為真
                        //判斷滑鼠在顯示區塊上
                        hoverRef.current = true;
                    }}
                    //滑鼠離開顯示區塊則觸發
                    onMouseLeave={() => {
                        //hoverRef判斷為假
                        //判斷滑鼠在顯示區塊外
                        hoverRef.current = false;
                        //draggingRef判斷為假
                        //判斷滑鼠為非拖拽狀態
                        draggingRef.current = false; // 保險
                    }}
                    //滑鼠在顯示區塊按下時觸發
                    onMouseDown={(event) => {
                        //draggingRef判斷為真
                        //判斷滑鼠為拖拽狀態
                        draggingRef.current = true;
                        //將滑鼠的X軸資料寫入lastMouseXRef
                        lastMouseXRef.current = event.clientX;
                    }}
                    //滑鼠在顯示區塊放開時觸發
                    onMouseUp={() => {
                        //draggingRef判斷為真
                        //判斷滑鼠為非拖拽狀態
                        draggingRef.current = false;
                    }}
                >
                </div>
                {/* 顯示模型元件 */}
                
                {/* 圖片外圍 */}
                <div className='imgBox'>
                    {/* 圖片設定 */}
                    <img className='imgSet' ref={imgRef} src="/images/動畫/ThreeJs/粒子模型範例/復數模型展示/ring.5ce6e2bd.png" alt="" />
                    {/* 圖片設定 */}
                </div>
                {/* 圖片外圍 */}
            </div>
            {/* 元件最外圍 */}

            {/* 按鈕設定 */}
            <button onClick={() => {
                rotationSpeedRef.current.current = rotationSpeedRef.current.boost;
                setActiveIndex(i => (i - 1 + modelList.length) % modelList.length);
            }}>
                上一個模型
            </button>

            <button onClick={() => {
                rotationSpeedRef.current.current = rotationSpeedRef.current.boost;
                setActiveIndex(i => (i + 1) % modelList.length);
            }}>
                下一個模型
            </button>

            <button
            onMouseDown={() => (rotateRef.current.left = true)}
            onMouseUp={() => (rotateRef.current.left = false)}
            onMouseLeave={() => (rotateRef.current.left = false)}
            >
                向左轉
            </button>

            <button
            onMouseDown={() => (rotateRef.current.right = true)}
            onMouseUp={() => (rotateRef.current.right = false)}
            onMouseLeave={() => (rotateRef.current.right = false)}
            >
                向右轉
            </button>
            {/* 按鈕設定 */}
        </article>
    );
}

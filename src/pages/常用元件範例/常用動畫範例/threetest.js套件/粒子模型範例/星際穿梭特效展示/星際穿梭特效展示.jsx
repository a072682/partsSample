'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import './_星際穿梭特效展示.scss';

export default function 星際穿梭特效展示() {

    //#region
    //#endregion

    //#region 前置參數設定

        //取得顯示區塊標籤
        const mountRef = useRef(null);

        // 粒子數量（效能核心）
        const MAX_POINTS = 30000;

        // 儲存Three初始化後內部的物件(攝影機/場景/等等)
        const threeRef = useRef({
            scene: null,
            camera: null,
            renderer: null,

            pointGeometry: null,
            pointMaterial: null,
            points: null,
        });

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

                    //uniform float uProgress;

                // JS 傳進來的「動畫進度 0 → 1」

                // JS 傳進來的目前時間（秒）數據

                    uniform float uTime;

                // JS 傳進來的目前時間（秒）數據

            // JS端引入參數

            //粒子位置參數設定

                // 舊模型的粒子位置

                    //attribute vec3 position;

                // 舊模型的粒子位置

                varying float vSpeed;

            //粒子位置參數設定

            void main() {

                // ===== 參數區 =====
                float speed = 5.0;        // 穿梭速度
                float depth = 25.0;       // 星空深度
                float stretch = 0.25;     // 星星拉伸感

                // ===== 位置計算 =====
                vec3 pos = position;

                // 沿 Z 軸往鏡頭衝（loop）
                //pos.z粒子的z軸位置(這個值不會改變)
                //uTime * speed = 星星前進的距離
                //mod(a, b)意思是a 除以 b 之後的「餘數」
                //作用是不管a多大，只要超過 b，就「繞回來」
                pos.z = mod(pos.z + uTime * speed, depth);

                // 讓鏡頭移動到起點跟終點的中間
                pos.z -= depth * 0.5;

                // 中央加速（越靠近中心越快）
                //取得粒子到中心的距離
                float dist = length(pos.xy);
                //1.0 - smoothstep(0.0, 1.5, dist)將0.0~1.5 轉換為0~1 0為中心 1為最外圍 
                //並用1.0反轉 1為中心 0為最外圍
                //最前方的1.0 為基本速度 確保位置為0的粒子也會移動
                //2.0則是加速度
                float accel = 1.0 + (1.0 - smoothstep(0.0, 1.5, dist)) * 2.0;


                pos.z -= accel * stretch;

                vSpeed = accel;

                // ===== 投影 =====
                vec4 mv = modelViewMatrix * vec4(pos, 1.0);

                gl_PointSize = 2.5 * vSpeed * (2.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
            }
        `;
        //粒子狀態設定
        const pointFragmentShader = `
            //精度宣告
            //代表float型別的資料都要用高精度為標準計算
            precision highp float;

            varying float vSpeed;

            void main() {
                // 圓形粒子
                float d = distance(gl_PointCoord, vec2(0.5));
                if (d > 0.5) discard;

                // 星光亮度（中心亮、邊緣柔）
                float glow = smoothstep(0.5, 0.0, d);

                // 顏色（偏冷白）
                vec3 color = vec3(0.8, 0.9, 1.0);

                float alpha = glow * clamp(vSpeed * 0.6, 0.2, 1.0);

                gl_FragColor = vec4(color, alpha);
            }
        `;
    //#endregion

    //#region 基本3D世界初始化設定

        //#region Three.js初始化設定
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

                //#region 渲染器影像插入顯示器
                    // 將設定完成後的渲染器放入顯示區塊標籤讓畫面可以看到東西
                    mount.appendChild(renderer.domElement);
                //#endregion

                //#region 3D模型設定
                    
                    //#region 粒子系統設定

                        // 建立3D模型空間，可以儲存一個模型形狀粒子資訊(不含貼圖素材)
                        const pointGeometry = new THREE.BufferGeometry();

                        // 初始化粒子位置（關鍵）
                        initParticleGeometry(pointGeometry);

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

                        //3D模型形狀粒子系統資料
                        pointGeometry,
                        //粒子系統自訂貼圖資料
                        pointMaterial,
                        //3D模型粒子模型資料
                        points,
                    };
                //#endregion
            }
        //#endregion

        //#region 動畫流程設定(確保畫面每一偵都在更新)
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
                            

                                pointGeometry,
                                pointMaterial, 
                                points,
                                
                        } = threeRef.current;

                        if (!renderer){
                            return;
                        } 
                    //#endregion

                    //#region 設定初始參數數值
                        //將目前時間（秒）數據傳入uTime
                        pointMaterial.uniforms.uTime.value = performance.now() * 0.001;
                    //#endregion

                    renderer.render(scene, camera);

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

        //#region 粒子資料傳送GPU相關函式
        
            //第一次建立粒子模型並傳送給GPU
            function initParticleGeometry(pointGeometry) {
                //pointGeometry 3D模型形狀粒子系統資料
                //points 3D模型粒子模型資料
                //positions 粒子位置陣列

                //建立指定陣列
                const positions = new Float32Array(MAX_POINTS * 3);
                
                //Math.random() 會隨機取得 0.0 ≤ 數字 < 1.0
                //Math.random() - 0.5 會得到 -0.5 ~ +0.5的結果再乘以 10 會得到-5 ~ +5
                for (let i = 0; i < MAX_POINTS; i++) {
                    positions[i * 3 + 0] = (Math.random() - 0.5) * 10; // X
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
                    positions[i * 3 + 2] = Math.random() * 25;         // Z（深度）
                }

                pointGeometry.setAttribute(
                    'position',
                    new THREE.BufferAttribute(positions, 3)
                );

                //這個物件佔用空間的範圍在哪讓引擎不要亂把它裁掉
                //three.js會建立一個空間，這個空間內攝影機會渲染空間以外則會忽略
                //這個空間會包住geometry確保geometry可以被渲染
                pointGeometry.computeBoundingSphere();
            }

        //#endregion
        
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

    return (
        <>
            <div className="星際穿梭特效展示">
                {/* 元件最外圍 */}
                <div className="ThreeJsBox">
                    {/* 顯示模型元件 */}
                    <div className="ThreeJs" 
                        //顯示區塊標籤
                        ref={mountRef}
                    >
                    </div>
                    {/* 顯示模型元件 */}
                </div>
                {/* 元件最外圍 */}
            </div>
        </>
        
    );
}

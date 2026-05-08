import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import './_一般模型範例.scss';
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function 一般模型範例() {

  //#region
  //#endregion

  //#region 控制按鍵綁定宣告
  const rotateRef = useRef({ left: false, right: false });
  //#endregion

  //#region 顯示區塊標籤宣告
  const mountRef = useRef(null);
  //#endregion
  
  //#region 顯示模型設定
  useEffect(() => {
    let model = null;
    let mixer = null;

    //#region 取得顯示區塊標籤
        const mount = mountRef.current;
        if (!mount) {
            return;
        }
        // 防止多個 canvas
        mount.innerHTML = '';
    //#endregion

    //#region 建立世界元件
        const scene = new THREE.Scene();
        //背景設為白色
        //scene.background = new THREE.Color(0xffffff); 
    //#endregion
    
    //#region 建立相機元件
        const camera = new THREE.PerspectiveCamera(
        //視角設定20°～40° → 望遠鏡效果 70°～100° → 廣角 75類似人眼
        75,
        //代表畫面比例 = 寬 / 高
        //代表div的寬高
        mount.clientWidth / mount.clientHeight,
        //最近可見距離 距離相機太近的東西不渲染
        0.1,
        //最遠可見距離 超過這個距離的物體不會被渲染
        1000,
        );
        //相機位置設定 相機放在 3D 空間中的座標 (X=0, Y=1, Z=3)
        // x = 左右（左負右正）
        // y = 高度（越大越高）
        // z = 前後（越大越遠）
        camera.position.set(0, 1.6, 4);
        // 讓相機看著模型中心
        camera.lookAt(0, 1.3, 0);
    //#endregion

    //#region 建立渲染器元件
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // 透明背景
        renderer.setClearAlpha(0);
        
        // sRGB 色彩校正
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // 第四步：Gamma / Tone Mapping（伽瑪校正）
        //renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.toneMappingExposure = 1.0;  // 可調整成 0.9～1.2

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (mount.firstChild) mount.replaceChildren();
        mount.appendChild(renderer.domElement);
    //#endregion

    //#region 建立光源元件
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    // 主光（Key Light）
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(3, 5, 2);
    scene.add(keyLight);

    // 補光（Fill Light）
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-2, 2, 3);
        scene.add(fillLight);

        // 背光（Rim Light）
        const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
        rimLight.position.set(0, 4, -3);
        scene.add(rimLight);

        // === 第二步：環境光 ===
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        hemiLight.position.set(0, 1, 0);
        scene.add(hemiLight);
    //#endregion

    // 建立 Fake AO 平面(看需求)
    // const aoGeometry = new THREE.CircleGeometry(1.2, 32);
    // const aoMaterial = new THREE.MeshBasicMaterial({
    //   color: 0x000000,
    //   transparent: true,
    //   opacity: 0.25,
    // });
    // const aoCircle = new THREE.Mesh(aoGeometry, aoMaterial);

    // // 旋轉讓圓平躺
    // aoCircle.rotation.x = -Math.PI / 2;

    // // 放在角色腳下（視模型調整）
    // aoCircle.position.y = -0.5;

    // // 加入場景
    // scene.add(aoCircle);



    //#endregion 引入模型元件
    const loader = new GLTFLoader();

    loader.load(
      "/images/動畫/ThreeJs/055/h55_survivor_m_it.gltf",

      (gltf) => {
        console.log("模型成功載入", gltf);
        model = gltf.scene;
        scene.add(model);

        // 自動置中 + 自動縮放 (建議加這裡)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // 自動縮放模型至適合大小 ---
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxAxis;
        model.scale.setScalar(scale);

        // 重新計算（縮放後才準）
        const box2 = new THREE.Box3().setFromObject(model);

        // ----------【2. 把腳貼到 y = 0】----------
        const minY = box2.min.y; // 模型最底部
        model.position.y -= minY;

        // ----------【3. X、Z 軸置中】----------
        const center2 = box2.getCenter(new THREE.Vector3());
        model.position.x -= center2.x;
        model.position.z -= center2.z;

        // 讓模型朝向前方（選用）
        model.rotation.y = Math.PI;

        // 若有動畫
        mixer = new THREE.AnimationMixer(model);
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        controls.target.set(0, size.y * 2.5, 0);  // 模型中間高度
        controls.update();
      },

      undefined,

      (error) => {
        console.error("模型載入錯誤:", error);
      }
    );

    // === OrbitControls ===
    //OrbitControls只針對滑鼠控制
    const controls = new OrbitControls(camera, renderer.domElement);
    //平滑動態效果
    //拖動後，轉動會慢慢停下來
    controls.enableDamping = true;
    //阻尼阻力大小（控制“滑順程度”）
    //數值越小越順
    //數值越大越卡
    //常用範圍：0.03 ~ 0.1
    controls.dampingFactor = 0.05;
    //平移
    controls.enablePan = false;
    //縮放
    controls.enableZoom = false;
    //旋轉
    controls.enableRotate = false;
    //相機與模型的最近距離
    controls.minDistance = 2
    //相機能離模型最遠的距離
    controls.maxDistance = 10;
    //controls.enableRotate 旋轉
    //controls.enableZoom 縮放
    //controls.enablePan 平移

    // === 動畫 ===
    const clock = new THREE.Clock();
    let rafId;
    const animate = () => {

      const delta = clock.getDelta();
      //上下旋轉
      //數值越大旋轉越快
      //數值越小旋轉越慢
      // cube.rotation.x += 0.01;
      //左右旋轉
      // cube.rotation.y += 0.01;

      if (model) {

        // 按住左旋
        if (rotateRef.current.left) {
          model.rotation.y -= 0.02;
        }

        // 按住右旋
        if (rotateRef.current.right) {
          model.rotation.y += 0.02;
        }

      }

      if (mixer) mixer.update(delta); // ★ 播放動畫

      controls.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // === 視窗大小改變 ===
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // === 清理 ===
    return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleResize);
        //geometry.dispose();
        //material.dispose();
        renderer.dispose();
        controls.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    };
  }, []);
  //#endregion

  return (
    <>
      <article className='一般模型範例'>
        <h3>ThreeJs套件範例</h3>
        {/* 元件最外圍 */}
        <div className="ThreeJsBox">
          {/* 顯示模型本體 */}
          <div className="ThreeJs" ref={mountRef}></div>
          {/* 顯示模型本體 */}

          {/* 控制按鍵設定 */}
          <button type="button" 
                  onMouseDown={() => (rotateRef.current.left = true)}
                  onMouseUp={() => (rotateRef.current.left = false)}
                  onMouseLeave={() => (rotateRef.current.left = false)}
          >
            向左轉
          </button>
          <button type="button"
                  onMouseDown={() => (rotateRef.current.right = true)}
                  onMouseUp={() => (rotateRef.current.right = false)}
                  onMouseLeave={() => (rotateRef.current.right = false)}
          >       
            向右轉
          </button>
          {/* 控制按鍵設定 */}
        </div>
        {/* 元件最外圍 */}
      </article>
    </>
  );
}

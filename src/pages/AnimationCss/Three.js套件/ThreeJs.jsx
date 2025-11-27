import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import './_threeJs.scss';
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function ThreeJs() {

  const rotateRef = useRef({ left: false, right: false });

  const mountRef = useRef(null);

  

  useEffect(() => {
    let model = null;
    let mixer = null;
    const mount = mountRef.current;
    if (!mount) return;

    // === 初始化場景 ===
    const scene = new THREE.Scene();
    //背景設為白色
    //scene.background = new THREE.Color(0xffffff); 

    // === 相機 ===
    const camera = new THREE.PerspectiveCamera(
      //視角
      //20°～40° → 望遠鏡效果
      //70°～100° → 廣角
      //75類似人眼
      75,
      //代表畫面比例 = 寬 / 高
      //代表div的寬高
      mount.clientWidth / mount.clientHeight,
      //最近可見距離
      //距離相機太近的東西不渲染
      0.1,
      //最遠可見距離
      //超過這個距離的物體不會被渲染
      1000
    );
    //相機放在 3D 空間中的座標 (X=0, Y=1, Z=3)
    // x = 左右（左負右正）
    // y = 高度（越大越高）
    // z = 前後（越大越遠）
    camera.position.set(0, 1, 3);
    // 讓相機看著模型中心
    camera.lookAt(0, 0, 0);

    // === 渲染器 ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // 透明背景
    renderer.setClearAlpha(0);
    
    // sRGB 色彩校正（第三步）
    renderer.outputEncoding = THREE.sRGBEncoding;

    // 第四步：Gamma / Tone Mapping（伽瑪校正）
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;  // 可調整成 0.9～1.2

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mount.firstChild) mount.replaceChildren();
    mount.appendChild(renderer.domElement);

    // === 立方體 ===
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ 
    //     color: 0xffffff, // 🟢 方塊顏色白色
    //     roughness: 0.3, // 微調材質質感
    //     metalness: 0.1,
    // });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // === 光源 ===
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

    // === 第 5 步：建立 Fake AO 平面 ===
    const aoGeometry = new THREE.CircleGeometry(1.2, 32);
    const aoMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25,
    });
    const aoCircle = new THREE.Mesh(aoGeometry, aoMaterial);

    // 旋轉讓圓平躺
    aoCircle.rotation.x = -Math.PI / 2;

    // 放在角色腳下（視模型調整）
    aoCircle.position.y = -0.5;

    // 加入場景
    scene.add(aoCircle);



    //引入模型
    const loader = new GLTFLoader();
    

    loader.load(
      "/images/test/01/h55_survivor_m_it.gltf",

      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // ★ 加入動畫系統
        mixer = new THREE.AnimationMixer(model);

        // ★ 播放第一段動畫
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        // === 暫時先用「固定縮小」 ===
        model.scale.set(5.0, 5.0, 5.0);  // 縮小到 20%

        // === 暫時設定在世界原點 ===
        model.position.set(0, -0.5, 0);  // 稍微往下放，通常模型腳在 y=0

        // === 暫時看一下模型是否朝向正面 ===
        model.rotation.y = Math.PI;  // 讓模型面向鏡頭（常見）
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

  return (
    <>
      <div className="ThreeJsBox">
        <div className="ThreeJs" ref={mountRef}></div>
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
      </div>
    </>
  );
}

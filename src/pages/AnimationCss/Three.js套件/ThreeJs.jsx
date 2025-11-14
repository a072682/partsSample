import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeJs() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // === 初始化場景 ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // 🟢 背景設為白色

    // === 相機 ===
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // === 渲染器 ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mount.firstChild) mount.replaceChildren();
    mount.appendChild(renderer.domElement);

    // === 立方體 ===
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, // 🟢 方塊顏色白色
        roughness: 0.3, // 微調材質質感
        metalness: 0.1,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // === 光源 ===
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    // === OrbitControls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 平滑拖曳
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // 禁止平移，只允許旋轉+縮放
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // === 動畫 ===
    let rafId;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      controls.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
      }}
    />
  );
}

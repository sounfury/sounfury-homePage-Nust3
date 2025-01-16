<template>
  <div class="three-container" ref="divDom"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useThemeStore } from '@/store/theme';
import { watchEffect } from 'vue';
import gsap from 'gsap';

const divDom = ref(null);
let scene, renderer, camera, chair, screen, controls, ambient, sunLight, pointLight;

const initScene = () => {
  /*==================== 初始化场景 ====================*/
  scene = new THREE.Scene();

  /*==================== 创建一个渲染器 ====================*/
  renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.useLegacyLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /*==================== 加载模型 ====================*/
  chair = null;
  screen = null;

  // 设置椅子旋转
  const chairAnimate = () => {
    gsap.to(chair.rotation, {
      y: 0.7,
      duration: 10,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  };

  // mac屏幕播放视频
  const setScreen = () => {
    if (!screen) return
    const video = document.createElement('video');
    video.src = '/3D/约战.mp4';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.play();
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.NearestFilter;
    videoTexture.magFilter = THREE.NearestFilter;
    videoTexture.generateMipmaps = false;
    videoTexture.encoding = THREE.sRGBEncoding;
    if (screen) {
      screen.material = new THREE.MeshStandardMaterial({
        map: videoTexture,
      });
    }

  };

  // 加载glb模型
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load('/3D/officeScene.glb', (glb) => {
    glb.scene.scale.set(1.8, 1.8, 1.8);
    glb.scene.position.y = -1.5;
    // 获取椅子和电脑屏幕用于添加动画
    glb.scene.children.forEach((item) => {
      item.castShadow = true;
      item.receiveShadow = true;
      if (item.name === 'Chair') {
        chair = item;
      } else if (item.name === 'mac-screen') {
        screen = item;
      }
    });
    chairAnimate();
    setScreen();
    scene.add(glb.scene);
    renderer.render(scene, camera);
  });

  /*==================== 创建相机 ====================*/
  camera = new THREE.OrthographicCamera();
  //设置相机位置
  camera.position.set(-9.72, 5.27, -2.25);
  //设置相机方向
  camera.lookAt(0, 0, 0);

  /*==================== 创建灯光 ====================*/
  // 环境光
  ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  // 太阳光
  sunLight = new THREE.DirectionalLight(0xffffff);
  sunLight.castShadow = true;
  sunLight.shadow.camera.far = 20;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.normalBias = 0.05;
  sunLight.position.set(-1.5, 7, 3);
  scene.add(sunLight);
  // 台灯光
  pointLight = new THREE.PointLight(0xffffff);
  pointLight.castShadow = true;
  pointLight.position.set(0.6, 4, -2.3);
  pointLight.shadow.camera.far = 20;
  pointLight.shadow.mapSize.set(2048, 2048);
  pointLight.shadow.normalBias = 0.05;
  scene.add(pointLight);
  /*==================== 控制器 ====================*/
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxAzimuthAngle = -1;
  controls.minAzimuthAngle = Math.PI * 1.2;
  controls.maxPolarAngle = Math.PI / 3;
  controls.minPolarAngle = Math.PI / 6;
  controls.enableZoom = false;
}
const size = ref({
  width: 0,
  height: 0,
  aspect: 1,
  frustrum: 10,
  pixelRatio: 1
});
const initSize = () => {
  if (process.client) {
    size.value.pixelRatio = Math.min(window.devicePixelRatio, 3)
  }
  if (divDom.value) {
    size.value.width = divDom.value.offsetWidth;
    size.value.height = divDom.value.offsetHeight;
    size.value.aspect = size.value.width / size.value.height;
    camera.left = (-size.value.aspect * size.value.frustrum) / 2;
    camera.right = (size.value.aspect * size.value.frustrum) / 2;
    camera.top = size.value.frustrum / 2;
    camera.bottom = -size.value.frustrum / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(size.value.width, size.value.height);
    renderer.setPixelRatio(size.value.pixelRatio);
  }
};

/*==================== 动画 ====================*/
const animate = () => {
  requestAnimationFrame(animate);
  if (renderer) {
    renderer.render(scene, camera);
  }

};

/*==================== 切换主题 ====================*/
const themeStore= useThemeStore();
const switchTheme = (themeValue) => {
  console.log(themeValue.theme+"主题");
  if (themeValue.theme == 'light') {
    gsap.to(sunLight, {
      intensity: 0.78,
    });
    gsap.to(ambient, {
      intensity: 0.78,
    });
    gsap.to(pointLight, {
      intensity: 0,
    });
    gsap.to(ambient.color, {
      r: 1,
      g: 1,
      b: 1,
    });
  } else {
    gsap.to(sunLight, {
      intensity: 0,
    });
    gsap.to(ambient, {
      intensity: 1.03,
    });
    gsap.to(pointLight, {
      intensity: 1.68,
    });
    gsap.to(ambient.color, {
      b: 0.9568627450980393,
      g: 0.24313725490196078,
      r: 0.3607843137254902
    });
  }
};


watch(themeStore, (newTheme) => {
  console.log(newTheme);
  if (renderer) {
    switchTheme(newTheme);
  }
}, { immediate: true});
onMounted(() => {
  if (process.client) {
    initScene();
    initSize();
    animate();
  
    console.log(themeStore.theme);
    switchTheme(themeStore.theme);
    if (divDom.value) {
      divDom.value.appendChild(renderer.domElement);
    }
  }
});
onUnmounted(() => {
  if (process.client) {
    if (scene && scene.dispose) { // 添加 scene && scene.dispose 的判断
      scene.dispose();
    }
    if (renderer && renderer.dispose) {  // 添加 renderer && renderer.dispose 的判断
      renderer.dispose();
    }

  }
});
</script>

<style lang="scss" scoped>
.three-container {
  width: 100%;
  height: 100%;
}
</style>
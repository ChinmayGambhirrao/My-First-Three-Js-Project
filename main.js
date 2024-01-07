import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x023271});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambiantLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambiantLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar); // how many stars you want to add

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Logo
const actureTexture = new THREE.TextureLoader().load('logo.png');

const acture = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshBasicMaterial({map: actureTexture})
);
scene.add(acture);

// Moon
const moonTexture = new THREE.TextureLoader().load('3.jpg');
const texture = new THREE.TextureLoader().load('moon2.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: texture,
  })
);
scene.add(moon);

moon.position.z = 15;
moon.position.setX(-10);// setter function

acture.position.z = -5;
acture.position.x = 2;

function moveCamera(){
  const userCurrentlyScroll = document.body.getBoundingClientRect().top; // top of our webpage
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  acture.rotation.y += 0.01;
  acture.rotation.z += 0.01;

  camera.position.z = userCurrentlyScroll * -0.01;
  camera.position.x = userCurrentlyScroll * -0.0002;
  camera.position.y = userCurrentlyScroll * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// This is the function to call the render method and tell the browser for animation
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
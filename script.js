import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import countries from "./src/custom.geo.json";

let renderer, camera, scene, controls, Globe;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
initGlobe();
animate();

function init() {
    // Configuração do Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Equilíbrio entre qualidade e desempenho
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    // Cena e fundo
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040d21);
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Configuração da Câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 400);
    scene.add(camera);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.4);
    scene.add(ambientLight);

    const dLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    // Controles de Rotação
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 300;
    controls.maxDistance = 300;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.7;
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Eventos
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);
}

function initGlobe() {
    Globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0).hexPolygonColor(() => '#00FFFF');


    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);

    // Configuração do material do globo
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x196FA8);
    globeMaterial.emissive = new THREE.Color(0x009b9b);
    globeMaterial.emissiveIntensity = 0.05;
    globeMaterial.shininess = 0.4;


    // 🔥 Ativar transparência
    globeMaterial.transparent = true;
    globeMaterial.opacity = 0.9; // Ajuste conforme necessário (0.1 = quase invisível, 1 = opaco)


    scene.add(Globe);
}

// Captura o movimento do mouse
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
}

// Atualiza o tamanho da tela
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animação principal
function animate() {
    requestAnimationFrame(animate);

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    Globe.rotation.y += 0.0008;

    controls.update();
    renderer.render(scene, camera);
}

// teste

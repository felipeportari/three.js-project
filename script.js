import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// Inicialização da cena
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

// Carregar textura
const loader = new THREE.TextureLoader();
const texture = loader.load('src/1.webp');
texture.colorSpace = THREE.SRGBColorSpace;

// Criar esfera e aplicar textura
const geometry = new THREE.SphereGeometry(0.2, 50, 50);
const material = new THREE.MeshBasicMaterial({ map: texture });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Animação
function animate(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
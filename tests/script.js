// script.js actualizado - Versión Final Mejorada

// Configuración base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Sistema de luces mejorado
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Materiales con doble cara y reverso especificado
const materials = {
  frontGreen: new THREE.MeshStandardMaterial({
    color: 0x006341,
    roughness: 0.3,
    metalness: 0.4,
    side: THREE.FrontSide
  }),
  
  backGreen: new THREE.MeshStandardMaterial({
    color: 0x00472A, // Verde más oscuro para el reverso
    roughness: 0.5,
    metalness: 0.3,
    side: THREE.BackSide
  }),
  
  frontWhite: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.3,
    side: THREE.FrontSide
  }),
  
  backWhite: new THREE.MeshStandardMaterial({
    color: 0xf0f0f0, // Blanco ligeramente oscuro para profundidad
    roughness: 0.6,
    metalness: 0.2,
    side: THREE.BackSide
  })
};

// Cargar modelo
const loader = new THREE.GLTFLoader();
let model;

loader.load('test3.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);

  model.scale.set(0.8, 0.8, 0.8);
  model.position.set(0, -0.5, 0);

  // Asignación avanzada de materiales
  model.traverse((child) => {
    if (child.isMesh) {
      // Sistema de capas duales
      if (child.name.toLowerCase().includes('green')) {
        child.material = [
          materials.frontGreen,
          materials.backGreen
        ];
      } else if (child.name.toLowerCase().includes('white')) {
        child.material = [
          materials.frontWhite,
          materials.backWhite
        ];
      }
      
      // Optimizaciones
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  camera.position.set(0, 0.5, 4);
  animate();
});

// Control de animación mejorado
let targetSpeed = 0;
let currentSpeed = 0;
const acceleration = 0.1;
const maxSpeed = 0.03;

document.getElementById('3d-container').addEventListener('mouseover', () => {
  targetSpeed = maxSpeed;
});

document.getElementById('3d-container').addEventListener('mouseout', () => {
  targetSpeed = 0;
});

function animate() {
  requestAnimationFrame(animate);
  
  currentSpeed += (targetSpeed - currentSpeed) * acceleration;
  
  if(model) {
    model.rotation.y += currentSpeed;
    
    // Efecto de balanceo sutil
    model.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
  }
  
  renderer.render(scene, camera);
}

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
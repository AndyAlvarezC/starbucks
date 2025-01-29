// Escena, cámara y renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee); // Fondo blanco claro

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear la esfera (el globo terráqueo)
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Crear un canvas de textura para hacer los continentes verdes y los océanos blancos
const textureCanvas = document.createElement('canvas');
textureCanvas.width = 512;
textureCanvas.height = 512;
const ctx = textureCanvas.getContext('2d');

// Rellenar el fondo (océanos) con blanco
ctx.fillStyle = "#ffffff"; // Blanco para los océanos
ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

// Rellenar algunos continentes con verde
ctx.fillStyle = "#28a745"; // Verde para los continentes
ctx.beginPath();
ctx.arc(256, 256, 80, 0, Math.PI * 2, false); // Un continente circular para el ejemplo
ctx.fill();

// Convertir el canvas a textura
const texture = new THREE.CanvasTexture(textureCanvas);

// Usar un material estándar para efectos de luz y sombreado
const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.5 });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Añadir luces
const light = new THREE.AmbientLight(0xffffff, 0.5);  // Luz ambiental
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Posición de la cámara
camera.position.z = 15;

// Función de animación
function animate() {
  requestAnimationFrame(animate);

  // Hacer girar la esfera (mundo)
  // Se elimina el giro constante para que el control del ratón sea el único que mueva el globo
  renderer.render(scene, camera);
}

// Llamar a la animación
animate();

// Responsividad
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Añadir controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

/**
 * Oreo Cornetto Stack Challenge
 * Mobile-optimized 3D Stack game
 *
 * Features:
 * - Authentic ice cream cone base with grainy wafer texture
 * - 7 layers: Vanilla cream, Chocolate sauce, Oreo cookies & cream
 * - Touch-responsive mobile gameplay
 * - Haptic feedback on interactions
 * - Melting ice cream textures
 */

window.focus();

// ============ COLORS - OREO CORNETTO ============
const SKY_TOP = 0x87CEEB;        // Light sky blue
const SKY_BOTTOM = 0xFFF8DC;     // Cream/cornsilk
const WAFER_BROWN = 0x4A3728;    // Dark chocolate cone
const WAFER_LIGHT = 0x5C4033;    // Chocolate cone lighter
const VANILLA_CREAM = 0xFFFAF0;  // Vanilla ice cream
const OREO_CREAM = 0xF5F5DC;     // Cookies & cream (with specks)
const CHOCOLATE_SAUCE = 0x2D1810; // Dark chocolate sauce
const CHOCOLATE_DISC = 0x1A0F0A;  // Dark chocolate disc top
const PLATFORM_COLOR = 0x3D2B1F;  // Dark platform

// ============ GAME SETTINGS ============
const LAYER_HEIGHT = 0.45;
const BLOCK_SIZE = 1.4;
const MAX_LEVEL = 7;  // 7 layers for Oreo Cornetto
const PERFECT_THRESHOLD = 0.35;  // Very forgiving for near-perfect experience
const BLOCK_SPEED = 0.004;  // Slower for better gameplay


// Oreo Cornetto layer sequence (bottom to top)
// 1: Vanilla cream, 2: Chocolate sauce, 3: Oreo cream, 4: Chocolate sauce,
// 5: Vanilla cream, 6: Oreo cream, 7: Chocolate disc
const LAYER_TYPES = ['vanillaCream', 'chocolateSauce', 'oreoCream', 'chocolateSauce', 'vanillaCream', 'oreoCream'];

// ============ GAME STATE ============
let camera, scene, renderer;
let world;
let lastTime;
let stack = [];
let overhangs = [];
let autopilot;
let gameEnded;
let gameWon;
let robotPrecision;
let perfectStreak = 0;
let particles = [];
let birds = [];
let gameStartTime = 0;
let blockMoveDirection = 1; // 1 = forward, -1 = backward

// ============ DOM ELEMENTS ============
const scoreElement = document.getElementById("score");
const instructionsElement = document.getElementById("instructions");
const resultsElement = document.getElementById("results");
const victoryElement = document.getElementById("victory");
const finalHeightElement = document.getElementById("final-height");
const perfectIndicator = document.getElementById("perfect-indicator");
const playAgainBtn = document.getElementById("play-again-btn");
const playAgainVictoryBtn = document.getElementById("play-again-victory-btn");
const tutorialHand = document.getElementById("tutorial-hand");
const layerNameElement = document.getElementById("layer-name");

// Layer display names
const LAYER_NAMES = {
  'foundation': 'Wafer Base',
  'vanillaCream': 'Vanilla Cream',
  'oreoCream': 'Oreo Cookies & Cream',
  'chocolateSauce': 'Chocolate Sauce',
  'chocolateDisc': 'Chocolate Disc'
};

// ============ HAPTIC FEEDBACK ============
const Haptics = {
  light: () => navigator.vibrate?.([15]),
  medium: () => navigator.vibrate?.([30]),
  perfect: () => navigator.vibrate?.([15, 30, 15]),
  fail: () => navigator.vibrate?.([50, 20, 50])
};

// ============ INITIALIZATION ============
init();

function init() {
  autopilot = true;
  gameEnded = false;
  gameWon = false;
  lastTime = 0;
  stack = [];
  overhangs = [];
  perfectStreak = 0;
  setRobotPrecision();

  initPhysics();
  initThreeJS();
  setupEventListeners();

  // Show tutorial hand after short delay
  setTimeout(showTutorialHand, 1500);
}

function showTutorialHand() {
  if (tutorialHand && autopilot) {
    tutorialHand.classList.add('show');
  }
}

function hideTutorialHand() {
  if (tutorialHand) {
    tutorialHand.classList.remove('show');
  }
}

function initPhysics() {
  world = new CANNON.World();
  world.gravity.set(0, -12, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10; // Reduced for performance
}

function initThreeJS() {
  // Check if we're on mobile or desktop
  const isMobile = window.innerWidth <= 768;
  const container = document.querySelector('.iframe-wrapper');

  let width, height;
  if (isMobile || !container) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    width = container.clientWidth;
    height = container.clientHeight;
  }

  const aspect = width / height;
  const frustumSize = 10; // Zoomed out more for phone

  camera = new THREE.OrthographicCamera(
    frustumSize * aspect / -2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / -2,
    -100,
    100
  );
  camera.position.set(6, 5, 6);
  camera.lookAt(0, 1, 0);

  scene = new THREE.Scene();

  // Create gradient background
  createGradientBackground();

  // Create platform
  createPlatform();

  // Create cone base
  createConeBase();

  // Create flying birds in the background
  createBirds();

  // First moving layer - same size as foundation
  const foundationSize = 2.4;
  addLayer(-8, 0, foundationSize, foundationSize, "x");

  setupLights();
  setupRenderer();
}

function createGradientBackground() {
  // Clear blue sky background
  scene.background = new THREE.Color(0x5DADE2); // Bright sky blue
}

function createPlatform() {
  // Grass-topped platform

  // Load grass texture from image file - single sheet, darker
  const textureLoader = new THREE.TextureLoader();
  const grassTexture = textureLoader.load('src/debashis-rc-biswas-6fdu-7M84L0-unsplash.jpg');
  grassTexture.wrapS = THREE.ClampToEdgeWrapping;
  grassTexture.wrapT = THREE.ClampToEdgeWrapping;

  // Main circular platform with grass texture on top
  const mainPlatformGeo = new THREE.CylinderGeometry(4, 4.3, 0.35, 64);
  const mainPlatformMat = new THREE.MeshStandardMaterial({
    map: grassTexture,
    color: 0x888888,  // Darken the texture
    roughness: 0.95,
    metalness: 0.0
  });
  const mainPlatform = new THREE.Mesh(mainPlatformGeo, mainPlatformMat);
  mainPlatform.position.set(0, -3.35, 0);
  scene.add(mainPlatform);

  // Earth/dirt edge around grass
  const edgeGeo = new THREE.TorusGeometry(4.15, 0.15, 16, 64);
  const dirtMat = new THREE.MeshStandardMaterial({
    color: 0x5D4037,  // Earth brown
    roughness: 0.9,
    metalness: 0.0
  });
  const edge = new THREE.Mesh(edgeGeo, dirtMat);
  edge.rotation.x = Math.PI / 2;
  edge.position.set(0, -3.35, 0);
  scene.add(edge);

  // Base pedestal - earth/soil
  const baseGeo = new THREE.CylinderGeometry(4.6, 5, 0.25, 64);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x3E2723,  // Dark earth
    roughness: 0.85,
    metalness: 0.0
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -3.65, 0);
  scene.add(base);

}

function addGroundPlane() {
  // Small grass area just around the platform - blue sky visible behind
  const groundGeo = new THREE.PlaneGeometry(12, 12, 10, 10);
  const grassTexture = createRealisticGrassTexture();

  const groundMat = new THREE.MeshStandardMaterial({
    map: grassTexture,
    color: 0x3D8B37,  // Natural grass green
    roughness: 0.95,
    metalness: 0.0
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -3.82, 0); // Just below platform
  scene.add(ground);

  // Add realistic trees on the ground edges
  addRealisticTrees();
}

function createRealisticGrassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base grass color with variation
  const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 400);
  baseGrad.addColorStop(0, '#4A7C42');
  baseGrad.addColorStop(0.4, '#3D6B35');
  baseGrad.addColorStop(0.7, '#2D5528');
  baseGrad.addColorStop(1, '#1E4420');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Add grass blade patterns
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const length = 3 + Math.random() * 8;
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;

    const greenShade = Math.random() > 0.5 ?
      `rgba(${50 + Math.random() * 40}, ${100 + Math.random() * 60}, ${30 + Math.random() * 30}, 0.8)` :
      `rgba(${60 + Math.random() * 30}, ${120 + Math.random() * 50}, ${40 + Math.random() * 20}, 0.7)`;

    ctx.strokeStyle = greenShade;
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  // Add darker patches (shadows/depth)
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = 10 + Math.random() * 30;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, 'rgba(30, 60, 25, 0.3)');
    grad.addColorStop(1, 'rgba(30, 60, 25, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add lighter patches (sunlit areas)
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = 15 + Math.random() * 40;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, 'rgba(100, 160, 80, 0.25)');
    grad.addColorStop(1, 'rgba(100, 160, 80, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add tiny flowers/weeds
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const colors = ['#FFEB3B', '#FFFFFF', '#E8F5E9', '#FFF9C4'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(x, y, 1 + Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

function addRealisticTrees() {
  // Tree positions - on the small grass area around platform
  const treeData = [
    { x: -4.5, z: 3, scale: 0.7, type: 'oak' },
    { x: 4.5, z: 3.5, scale: 0.65, type: 'pine' },
    { x: -5, z: -2, scale: 0.75, type: 'pine' },
    { x: 5, z: -2.5, scale: 0.6, type: 'oak' }
  ];

  treeData.forEach(data => {
    const treeGroup = new THREE.Group();

    if (data.type === 'oak') {
      // Oak tree - brown trunk with rounded green canopy
      createOakTree(treeGroup, data.scale);
    } else {
      // Pine tree - layered conical shape
      createPineTree(treeGroup, data.scale);
    }

    treeGroup.position.set(data.x, -3.8, data.z);
    scene.add(treeGroup);
  });
}

function createOakTree(group, scale) {
  // Trunk - tapered cylinder with bark texture
  const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.15 * scale, 1.5 * scale, 8);
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x4A3728,
    roughness: 0.9,
    metalness: 0.0
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.75 * scale;
  group.add(trunk);

  // Main canopy - large rounded sphere
  const canopyGeo = new THREE.SphereGeometry(0.8 * scale, 12, 10);
  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x2D5A27,
    roughness: 0.8,
    metalness: 0.0
  });
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.y = 1.8 * scale;
  canopy.scale.y = 0.75; // Flatten slightly
  group.add(canopy);

  // Secondary canopy clusters for more realistic look
  const clusterPositions = [
    { x: 0.4, y: 1.6, z: 0.3 },
    { x: -0.3, y: 1.5, z: 0.4 },
    { x: 0.2, y: 2.0, z: -0.3 },
    { x: -0.35, y: 1.7, z: -0.25 }
  ];

  clusterPositions.forEach(pos => {
    const clusterGeo = new THREE.SphereGeometry(0.35 * scale, 8, 6);
    const colors = [0x2E6B2E, 0x3D7A3D, 0x1E4D1E, 0x2D5A27];
    const clusterMat = new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      roughness: 0.85
    });
    const cluster = new THREE.Mesh(clusterGeo, clusterMat);
    cluster.position.set(pos.x * scale, pos.y * scale, pos.z * scale);
    group.add(cluster);
  });
}

function createPineTree(group, scale) {
  // Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.06 * scale, 0.1 * scale, 1.2 * scale, 6);
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x5D4037,
    roughness: 0.9
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.6 * scale;
  group.add(trunk);

  // Layered pine foliage - 3 cones stacked
  const layers = [
    { y: 1.0, radius: 0.65, height: 0.8 },
    { y: 1.5, radius: 0.5, height: 0.7 },
    { y: 1.9, radius: 0.35, height: 0.6 }
  ];

  layers.forEach((layer, i) => {
    const coneGeo = new THREE.ConeGeometry(layer.radius * scale, layer.height * scale, 8);
    const colors = [0x1B4D1B, 0x2D5A2D, 0x1E5E1E];
    const coneMat = new THREE.MeshStandardMaterial({
      color: colors[i],
      roughness: 0.85
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = layer.y * scale;
    group.add(cone);
  });
}

function createBirds() {
  // Cinematic silhouette birds - distant and elegant
  const birdData = [
    { x: -25, y: 8, z: -20, speed: 0.008, wingSpeed: 0.06, scale: 0.15 },
    { x: -35, y: 9.5, z: -25, speed: 0.006, wingSpeed: 0.07, scale: 0.12 },
    { x: -30, y: 7, z: -22, speed: 0.01, wingSpeed: 0.055, scale: 0.1 },
    { x: -40, y: 10, z: -30, speed: 0.005, wingSpeed: 0.065, scale: 0.08 },
    { x: -20, y: 6.5, z: -18, speed: 0.009, wingSpeed: 0.058, scale: 0.13 }
  ];

  birdData.forEach(data => {
    const bird = new THREE.Group();
    const s = data.scale;

    // Elegant bird silhouette - simple and clean
    const birdColor = 0x1a2530; // Dark silhouette

    // Body - streamlined cone shape
    const bodyGeo = new THREE.ConeGeometry(s * 0.12, s * 0.5, 6);
    const bodyMat = new THREE.MeshBasicMaterial({ color: birdColor });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    bird.add(body);

    // Left wing - curved elegant shape
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(s * 0.8, s * 0.15, s * 1.5, s * 0.05);
    wingShape.quadraticCurveTo(s * 0.8, -s * 0.05, 0, 0);

    const wingGeo = new THREE.ShapeGeometry(wingShape);
    const wingMat = new THREE.MeshBasicMaterial({
      color: birdColor,
      side: THREE.DoubleSide
    });

    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(s * 0.1, 0, s * 0.08);
    leftWing.rotation.y = Math.PI / 2;
    leftWing.name = 'leftWing';
    bird.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(s * 0.1, 0, -s * 0.08);
    rightWing.rotation.y = -Math.PI / 2;
    rightWing.name = 'rightWing';
    bird.add(rightWing);

    bird.position.set(data.x, data.y, data.z);
    bird.userData = {
      speed: data.speed,
      wingSpeed: data.wingSpeed,
      wingAngle: Math.random() * Math.PI * 2,
      baseY: data.y,
      phaseOffset: Math.random() * Math.PI * 2
    };

    scene.add(bird);
    birds.push(bird);
  });
}

function updateBirds() {
  birds.forEach(bird => {
    // Smooth gliding motion
    bird.position.x += bird.userData.speed;

    // Gentle soaring - up and down
    bird.userData.phaseOffset += 0.005;
    bird.position.y = bird.userData.baseY + Math.sin(bird.userData.phaseOffset) * 0.3;

    // Reset position when off screen - seamless loop
    if (bird.position.x > 25) {
      bird.position.x = -35;
      bird.userData.baseY = 6 + Math.random() * 5;
    }

    // Elegant wing flapping
    bird.userData.wingAngle += bird.userData.wingSpeed;
    const wingFlap = Math.sin(bird.userData.wingAngle) * 0.5;

    bird.children.forEach(child => {
      if (child.name === 'leftWing') {
        child.rotation.x = wingFlap;
      } else if (child.name === 'rightWing') {
        child.rotation.x = -wingFlap;
      }
    });
  });
}

function createConeBase() {
  // Load the actual Cornetto image
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('src/1747552.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.5, 0.45);
  texture.offset.set(0.25, 0.55);

  // Use CylinderGeometry - wider bottom to eliminate black tip
  const coneGeometry = new THREE.CylinderGeometry(1.1, 0.35, 3.5, 32, 1, false);
  const coneMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.set(0, -1.5, 0);
  cone.rotation.y = Math.PI * 1.25; // Rotate to face camera
  scene.add(cone);

  // Rim at top of cone
  const rimGeometry = new THREE.TorusGeometry(1.0, 0.12, 8, 32);
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0x5C4033,
    roughness: 0.5,
    metalness: 0.0
  });

  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, 0.25, 0);
  scene.add(rim);

  // Foundation layer
  const y = 0.5;
  const foundationSize = 2.4;
  const layer = generateBlock(0, y, 0, foundationSize, foundationSize, false, 'foundation');
  stack.push(layer);
}

function createCornettoTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark chocolate brown background
  ctx.fillStyle = '#2A1810';
  ctx.fillRect(0, 0, 512, 512);

  // Diagonal stripes pattern (Cornetto style)
  ctx.strokeStyle = '#3D261A';
  ctx.lineWidth = 8;
  for (let i = -512; i < 1024; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();
  }

  // Gold/tan accent stripe
  ctx.fillStyle = '#C4956A';
  ctx.fillRect(0, 200, 512, 60);

  // "CORNETTO" text
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CORNETTO', 256, 245);

  // Small Oreo text below
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('OREO', 256, 280);

  // Add some shine highlights
  const gradient = ctx.createLinearGradient(0, 0, 512, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function drawWaferTexture(ctx) {
  // Rich golden-brown base
  const baseGradient = ctx.createLinearGradient(0, 0, 0, 512);
  baseGradient.addColorStop(0, '#C4956A');
  baseGradient.addColorStop(0.5, '#A67B4B');
  baseGradient.addColorStop(1, '#8B5A2B');
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, 512, 512);

  // Waffle diamond grid pattern
  const gridSize = 28;
  ctx.lineWidth = 3;

  for (let i = -512; i < 1024; i += gridSize) {
    ctx.strokeStyle = '#5C3D2E';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i + 512, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 220, 180, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(i + 2, 0);
    ctx.lineTo(i + 514, 512);
    ctx.stroke();
    ctx.lineWidth = 3;
  }

  // Baked texture spots
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = 1 + Math.random() * 3;
    ctx.fillStyle = Math.random() > 0.5 ?
      `rgba(90, 60, 30, ${0.2 + Math.random() * 0.3})` :
      `rgba(200, 160, 100, ${0.15 + Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function setupLights() {
  // Cinematic 3-point lighting setup

  // Soft ambient - slightly warm for golden hour feel
  const ambient = new THREE.AmbientLight(0xfff8f0, 0.5);
  scene.add(ambient);

  // Key light - warm golden sun
  const keyLight = new THREE.DirectionalLight(0xffecd0, 1.0);
  keyLight.position.set(8, 15, 8);
  scene.add(keyLight);

  // Fill light - soft cool blue from opposite side
  const fillLight = new THREE.DirectionalLight(0xd0e8ff, 0.4);
  fillLight.position.set(-6, 8, -4);
  scene.add(fillLight);

  // Rim light - adds depth and separation
  const rimLight = new THREE.DirectionalLight(0xffd4a3, 0.3);
  rimLight.position.set(-4, 3, 8);
  scene.add(rimLight);

  // Subtle hemisphere light for realistic ambient occlusion
  const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0xe8dcc8, 0.3);
  scene.add(hemiLight);
}

function setupRenderer() {
  // Check if we're on mobile or desktop
  const isMobile = window.innerWidth <= 768;
  const container = document.querySelector('.iframe-wrapper');

  let width, height;

  if (isMobile || !container) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    width = container.clientWidth;
    height = container.clientHeight;
  }

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = false;
  renderer.setAnimationLoop(animation);

  // Append to container on desktop, body on mobile
  if (container && !isMobile) {
    container.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }
}

function setupEventListeners() {
  // Prevent default touch behaviors for smoother gameplay
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());

  // Touch events - use touchend for more responsive feel
  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: false });

  // Mouse events for desktop
  window.addEventListener("mousedown", eventHandler);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);

  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      startGame();
    });
    playAgainBtn.addEventListener("touchend", (e) => {
      e.stopPropagation();
      e.preventDefault();
      startGame();
    });
  }
  if (playAgainVictoryBtn) {
    playAgainVictoryBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      startGame();
    });
    playAgainVictoryBtn.addEventListener("touchend", (e) => {
      e.stopPropagation();
      e.preventDefault();
      startGame();
    });
  }
}

let touchStartTime = 0;
let touchStartY = 0;

function handleTouchStart(e) {
  touchStartTime = Date.now();
  touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
  e.preventDefault();

  // Quick tap detection (under 300ms and minimal movement)
  const touchDuration = Date.now() - touchStartTime;

  if (touchDuration < 300) {
    eventHandler(e);
  }
}

// ============ LAYER GENERATION ============
function addLayer(x, z, width, depth, direction) {
  const y = LAYER_HEIGHT * stack.length + 0.5;
  const layerIndex = stack.length;
  blockMoveDirection = 1; // Reset direction for new block

  let layerType;
  if (layerIndex === 0) {
    layerType = 'foundation';
  } else if (layerIndex >= MAX_LEVEL) {
    layerType = 'chocolateDisc';
  } else {
    // Use the exact layer from LAYER_TYPES array (index 0 = layer 1, etc.)
    layerType = LAYER_TYPES[layerIndex - 1] || 'vanillaCream';
  }

  const layer = generateBlock(x, y, z, width, depth, false, layerType);
  layer.direction = direction;
  stack.push(layer);
}

function addOverhang(x, z, width, depth, layerType) {
  const y = LAYER_HEIGHT * (stack.length - 1) + 0.5;
  const overhang = generateBlock(x, y, z, width, depth, true, layerType);
  overhangs.push(overhang);
}

function generateBlock(x, y, z, width, depth, falls, layerType) {
  let geometry, material;
  const radius = Math.min(width, depth) * 0.5;

  if (layerType === 'chocolateDisc') {
    geometry = new THREE.CylinderGeometry(
      radius * 0.9,
      radius * 0.9,
      LAYER_HEIGHT * 0.5,
      20
    );
    material = createChocolateDiscMaterial();
  } else {
    // Circular blocks (cylinders)
    geometry = new THREE.CylinderGeometry(radius, radius, LAYER_HEIGHT, 20);
    material = createLayerMaterial(layerType);
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // Physics
  let shape;
  if (layerType === 'chocolateDisc') {
    shape = new CANNON.Box(new CANNON.Vec3(width / 2, LAYER_HEIGHT * 0.25, depth / 2));
  } else {
    shape = new CANNON.Box(new CANNON.Vec3(width / 2, LAYER_HEIGHT / 2, depth / 2));
  }

  let mass = falls ? 5 : 0;
  mass *= width / BLOCK_SIZE;
  mass *= depth / BLOCK_SIZE;

  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.addBody(body);

  return { threejs: mesh, cannonjs: body, width, depth, layerType };
}

// Premium vanilla ice cream texture - smooth and creamy
function createVanillaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich creamy base with soft gradient
  const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
  baseGrad.addColorStop(0, '#FFFEF8');
  baseGrad.addColorStop(0.3, '#FFF9EC');
  baseGrad.addColorStop(0.6, '#FFF5E0');
  baseGrad.addColorStop(1, '#F5ECD0');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Soft cream swirls - like real gelato
  for (let i = 0; i < 8; i++) {
    const cx = 100 + Math.random() * 312;
    const cy = 100 + Math.random() * 312;
    const radius = 60 + Math.random() * 80;

    const swirlGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    swirlGrad.addColorStop(0, 'rgba(255, 255, 252, 0.6)');
    swirlGrad.addColorStop(0.5, 'rgba(255, 253, 245, 0.3)');
    swirlGrad.addColorStop(1, 'rgba(255, 250, 235, 0)');

    ctx.fillStyle = swirlGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Creamy wave patterns
  ctx.strokeStyle = 'rgba(255, 255, 250, 0.5)';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    const startX = Math.random() * 512;
    const startY = Math.random() * 512;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(
      startX + 50, startY + 30,
      startX + 80, startY - 20,
      startX + 120, startY + 10
    );
    ctx.stroke();
  }

  // Subtle highlight spots (fresh cream look)
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 15 + Math.random() * 20);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 20 + Math.random() * 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Real vanilla bean specks
  ctx.fillStyle = 'rgba(60, 45, 25, 0.3)';
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillRect(x, y, 1 + Math.random(), 2 + Math.random() * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Premium Oreo cookies & cream texture
function createOreoTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich cream base
  const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
  baseGrad.addColorStop(0, '#FFFEF5');
  baseGrad.addColorStop(0.4, '#FFF8E8');
  baseGrad.addColorStop(0.8, '#F8F2E2');
  baseGrad.addColorStop(1, '#F0EAD8');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Cream swirls
  for (let i = 0; i < 6; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    grad.addColorStop(0, 'rgba(255, 255, 252, 0.5)');
    grad.addColorStop(1, 'rgba(255, 255, 250, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fill();
  }

  // Premium Oreo cookie chunks - irregular shapes
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 480;
    const y = Math.random() * 480;
    const size = 12 + Math.random() * 20;

    // Dark cookie with realistic shape
    ctx.fillStyle = '#151515';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + Math.random() * 4);
    ctx.lineTo(x + size - 2, y + size * 0.6);
    ctx.lineTo(x + 2, y + size * 0.65);
    ctx.closePath();
    ctx.fill();

    // Cookie texture - fine grain
    for (let j = 0; j < 10; j++) {
      ctx.fillStyle = `rgba(45, 45, 45, ${0.5 + Math.random() * 0.5})`;
      ctx.fillRect(
        x + Math.random() * size,
        y + Math.random() * size * 0.6,
        1 + Math.random(),
        1 + Math.random()
      );
    }
  }

  // Medium cookie pieces
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = 4 + Math.random() * 8;
    ctx.fillStyle = Math.random() > 0.3 ? '#1A1A1A' : '#252525';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine cookie crumbs
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = `rgba(20, 20, 20, ${0.4 + Math.random() * 0.4})`;
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Premium rich chocolate sauce texture - glossy and luxurious
function createChocolateTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep rich chocolate base
  const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
  baseGrad.addColorStop(0, '#4A2A18');
  baseGrad.addColorStop(0.3, '#3A1E10');
  baseGrad.addColorStop(0.6, '#2D1608');
  baseGrad.addColorStop(1, '#1E0E05');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Smooth glossy waves (melted chocolate look)
  for (let i = 0; i < 8; i++) {
    const y = Math.random() * 512;
    const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
    grad.addColorStop(0, 'rgba(80, 50, 30, 0)');
    grad.addColorStop(0.5, 'rgba(80, 50, 30, 0.3)');
    grad.addColorStop(1, 'rgba(80, 50, 30, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 30, 512, 60);
  }

  // Premium shine highlights
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const w = 30 + Math.random() * 50;
    const h = 10 + Math.random() * 20;

    const shineGrad = ctx.createRadialGradient(x, y, 0, x, y, w);
    shineGrad.addColorStop(0, 'rgba(120, 80, 50, 0.35)');
    shineGrad.addColorStop(0.5, 'rgba(100, 65, 40, 0.15)');
    shineGrad.addColorStop(1, 'rgba(80, 50, 30, 0)');

    ctx.fillStyle = shineGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Subtle swirl patterns
  ctx.strokeStyle = 'rgba(90, 55, 35, 0.2)';
  ctx.lineWidth = 15;
  ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    const sx = Math.random() * 512;
    const sy = Math.random() * 512;
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(
      sx + 60, sy + 40,
      sx + 100, sy - 30,
      sx + 150, sy + 20
    );
    ctx.stroke();
  }

  // Fine cocoa texture
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = `rgba(25, 15, 8, ${0.3 + Math.random() * 0.3})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createLayerMaterial(layerType) {
  switch (layerType) {
    case 'foundation':
      // Wafer rim - chocolate colored
      return new THREE.MeshStandardMaterial({
        color: WAFER_LIGHT,
        roughness: 0.6,
        metalness: 0.0
      });

    case 'vanillaCream':
      // Smooth vanilla ice cream with texture
      return new THREE.MeshStandardMaterial({
        map: createVanillaTexture(),
        color: 0xFFFAF0,
        roughness: 0.35,
        metalness: 0.0
      });

    case 'oreoCream':
      // Cookies & cream with visible Oreo chunks
      return new THREE.MeshStandardMaterial({
        map: createOreoTexture(),
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.0
      });

    case 'chocolateSauce':
      // Dark glossy chocolate sauce with texture
      return new THREE.MeshStandardMaterial({
        map: createChocolateTexture(),
        color: 0x3D2314,
        roughness: 0.15,
        metalness: 0.3
      });

    default:
      return new THREE.MeshLambertMaterial({ color: 0xcccccc });
  }
}

function createChocolateDiscMaterial() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Premium dark chocolate base with depth gradient
  const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
  baseGrad.addColorStop(0, '#2A1810');
  baseGrad.addColorStop(0.3, '#1E1008');
  baseGrad.addColorStop(0.6, '#150A05');
  baseGrad.addColorStop(1, '#0D0603');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Smooth chocolate surface waves
  for (let i = 0; i < 10; i++) {
    const y = Math.random() * 512;
    const grad = ctx.createLinearGradient(0, y - 40, 0, y + 40);
    grad.addColorStop(0, 'rgba(60, 35, 25, 0)');
    grad.addColorStop(0.5, 'rgba(60, 35, 25, 0.25)');
    grad.addColorStop(1, 'rgba(60, 35, 25, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 40, 512, 80);
  }

  // Premium glossy highlights - like polished chocolate
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const w = 40 + Math.random() * 60;
    const h = 15 + Math.random() * 25;

    const shineGrad = ctx.createRadialGradient(x, y, 0, x, y, w);
    shineGrad.addColorStop(0, 'rgba(100, 65, 45, 0.4)');
    shineGrad.addColorStop(0.4, 'rgba(80, 50, 35, 0.2)');
    shineGrad.addColorStop(1, 'rgba(60, 35, 25, 0)');

    ctx.fillStyle = shineGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Central bright highlight (like light reflection)
  const centerHighlight = ctx.createRadialGradient(200, 180, 0, 200, 180, 120);
  centerHighlight.addColorStop(0, 'rgba(120, 80, 55, 0.3)');
  centerHighlight.addColorStop(0.5, 'rgba(90, 60, 40, 0.15)');
  centerHighlight.addColorStop(1, 'rgba(60, 40, 25, 0)');
  ctx.fillStyle = centerHighlight;
  ctx.beginPath();
  ctx.ellipse(200, 180, 120, 60, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Fine cocoa grain texture
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = `rgba(15, 8, 4, ${0.3 + Math.random() * 0.4})`;
    ctx.fillRect(x, y, 1 + Math.random(), 1 + Math.random());
  }

  // Subtle embossed edge effect
  ctx.strokeStyle = 'rgba(80, 50, 35, 0.15)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x1A0F0A,
    roughness: 0.15,
    metalness: 0.25
  });
}

// ============ GAME LOGIC ============
function setRobotPrecision() {
  robotPrecision = Math.random() * 1 - 0.5;
}

function startGame() {
  autopilot = false;
  gameEnded = false;
  gameWon = false;
  lastTime = 0;
  stack = [];
  overhangs = [];
  particles = [];
  perfectStreak = 0;
  gameStartTime = performance.now();

  hideTutorialHand();

  if (instructionsElement) instructionsElement.style.display = "none";
  if (resultsElement) resultsElement.style.display = "none";
  if (victoryElement) victoryElement.style.display = "none";
  if (scoreElement) scoreElement.innerText = "0";

  // Clear physics
  while (world.bodies.length > 0) {
    world.remove(world.bodies[0]);
  }

  // Clear meshes - keep platform and cone, remove blocks
  scene.children = scene.children.filter(c => {
    if (c.type !== "Mesh") return true;
    if (c.position.y < 0) return true;
    return false;
  });

  // Recreate cone and layers
  createConeBase();
  const foundationSize = 2.4;
  addLayer(-8, 0, foundationSize, foundationSize, "x");

  // Reset camera
  camera.position.set(6, 5, 6);
  camera.lookAt(0, 1, 0);
}

function eventHandler(e) {
  if (e) e.preventDefault();
  if (autopilot) {
    startGame();
  } else {
    splitBlockAndAddNextOneIfOverlaps();
  }
}

function handleKeydown(event) {
  if (event.key === " ") {
    event.preventDefault();
    eventHandler();
  } else if (event.key === "R" || event.key === "r") {
    event.preventDefault();
    startGame();
  }
}

function splitBlockAndAddNextOneIfOverlaps() {
  if (gameEnded || gameWon) return;

  const topLayer = stack[stack.length - 1];
  const previousLayer = stack[stack.length - 2];
  const direction = topLayer.direction;

  const size = direction === "x" ? topLayer.width : topLayer.depth;
  const delta = topLayer.threejs.position[direction] - previousLayer.threejs.position[direction];
  const overhangSize = Math.abs(delta);
  const overlap = size - overhangSize;

  if (overlap > 0) {
    const isPerfect = overhangSize < PERFECT_THRESHOLD;
    const currentScore = stack.length - 1;
    const isFinalLayer = currentScore >= MAX_LEVEL;

    if (isPerfect || isFinalLayer) {
      // For perfect placements AND final layer - center on BOTH axes
      perfectStreak++;
      showPerfectIndicator();
      createSprinkleParticles(topLayer.threejs.position);
      Haptics.perfect();

      // Center perfectly on both X and Z axes
      topLayer.threejs.position.x = previousLayer.threejs.position.x;
      topLayer.threejs.position.z = previousLayer.threejs.position.z;
      topLayer.cannonjs.position.x = previousLayer.threejs.position.x;
      topLayer.cannonjs.position.z = previousLayer.threejs.position.z;
    } else {
      perfectStreak = 0;
      cutBlock(topLayer, overlap, delta);
      Haptics.light();

      const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
      const overhangX = direction === "x" ? topLayer.threejs.position.x + overhangShift : topLayer.threejs.position.x;
      const overhangZ = direction === "z" ? topLayer.threejs.position.z + overhangShift : topLayer.threejs.position.z;
      const overhangWidth = direction === "x" ? overhangSize : topLayer.width;
      const overhangDepth = direction === "z" ? overhangSize : topLayer.depth;

      addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth, topLayer.layerType);
    }

    // Freeze the placed layer to keep tower stable
    topLayer.cannonjs.mass = 0;
    topLayer.cannonjs.updateMassProperties();
    topLayer.cannonjs.velocity.set(0, 0, 0);
    topLayer.cannonjs.angularVelocity.set(0, 0, 0);

    if (scoreElement) scoreElement.innerText = currentScore;

    // Show the layer name that was just placed
    showLayerName(topLayer.layerType);

    if (isFinalLayer) {
      // Stop all movement immediately
      gameWon = true;

      // Ensure final layer is completely static - sync physics to visual
      topLayer.cannonjs.position.copy(topLayer.threejs.position);

      // Delay victory screen to show the final layer name
      setTimeout(() => {
        handleVictory();
      }, 1200);
      return;
    }

    const nextX = direction === "x" ? topLayer.threejs.position.x : -8;
    const nextZ = direction === "z" ? topLayer.threejs.position.z : -8;
    const newWidth = isPerfect ? previousLayer.width : topLayer.width;
    const newDepth = isPerfect ? previousLayer.depth : topLayer.depth;
    const nextDirection = direction === "x" ? "z" : "x";

    addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
  } else {
    missedTheSpot();
  }
}

function cutBlock(topLayer, overlap, delta) {
  const direction = topLayer.direction;
  const newWidth = direction === "x" ? overlap : topLayer.width;
  const newDepth = direction === "z" ? overlap : topLayer.depth;

  // Calculate new radius - use the smaller dimension to keep it circular
  const newRadius = Math.min(newWidth, newDepth) * 0.5;
  const oldRadius = Math.min(topLayer.width, topLayer.depth) * 0.5;

  // Only shrink slightly - maintain good visual appearance
  // Limit shrink to 92% of original at minimum for near-perfect look
  const minRadius = oldRadius * 0.92;
  const finalRadius = Math.max(newRadius, minRadius);

  topLayer.width = finalRadius * 2;
  topLayer.depth = finalRadius * 2;

  // Remove old mesh
  scene.remove(topLayer.threejs);

  // Create new properly circular cylinder
  const newGeometry = new THREE.CylinderGeometry(finalRadius, finalRadius, LAYER_HEIGHT, 24);
  const newMesh = new THREE.Mesh(newGeometry, topLayer.threejs.material);

  // Position it correctly (shift towards center from where it was placed)
  newMesh.position.copy(topLayer.threejs.position);
  newMesh.position[direction] -= delta / 2;

  scene.add(newMesh);
  topLayer.threejs = newMesh;
  topLayer.cannonjs.position[direction] -= delta / 2;

  const shape = new CANNON.Box(new CANNON.Vec3(finalRadius, LAYER_HEIGHT / 2, finalRadius));
  topLayer.cannonjs.shapes = [];
  topLayer.cannonjs.addShape(shape);
}

function missedTheSpot() {
  const topLayer = stack[stack.length - 1];
  Haptics.fail();

  addOverhang(topLayer.threejs.position.x, topLayer.threejs.position.z, topLayer.width, topLayer.depth, topLayer.layerType);
  world.remove(topLayer.cannonjs);
  scene.remove(topLayer.threejs);

  gameEnded = true;

  if (resultsElement && !autopilot) {
    if (finalHeightElement) finalHeightElement.innerText = stack.length - 2;
    resultsElement.style.display = "flex";
  }
}

function handleVictory() {
  gameWon = true;
  Haptics.perfect();

  if (victoryElement) victoryElement.style.display = "flex";

  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      const pos = stack[stack.length - 1].threejs.position.clone();
      pos.x += (Math.random() - 0.5) * 2;
      pos.z += (Math.random() - 0.5) * 2;
      createSprinkleParticles(pos, 10);
    }, i * 200);
  }
}

// ============ PARTICLES ============
// Shared geometry for all particles
const particleGeometry = new THREE.SphereGeometry(0.04, 4, 4);
const particleColors = [0xFF6B6B, 0x4ECDC4, 0xFFE66D, 0x95E1D3, 0xF38181];

function createSprinkleParticles(position, count = 6) {
  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    });
    const particle = new THREE.Mesh(particleGeometry, material);

    particle.position.copy(position);
    particle.position.y += 0.3;
    particle.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.12,
      Math.random() * 0.15 + 0.08,
      (Math.random() - 0.5) * 0.12
    );
    particle.gravity = -0.004;
    particle.life = 1.0;

    scene.add(particle);
    particles.push(particle);
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.velocity.y += p.gravity;
    p.position.add(p.velocity);
    p.life -= 0.025;
    p.scale.setScalar(p.life);

    if (p.life <= 0) {
      scene.remove(p);
      particles.splice(i, 1);
    }
  }
}

function showPerfectIndicator() {
  if (perfectIndicator) {
    perfectIndicator.classList.add('show');
    setTimeout(() => perfectIndicator.classList.remove('show'), 600);
  }
}

function showLayerName(layerType) {
  if (layerNameElement) {
    const name = LAYER_NAMES[layerType] || layerType;
    layerNameElement.textContent = name;
    layerNameElement.classList.add('show');
    setTimeout(() => layerNameElement.classList.remove('show'), 1000);
  }
}

// ============ ANIMATION ============
function animation(time) {
  if (lastTime) {
    const timePassed = time - lastTime;
    const speed = BLOCK_SPEED;

    const topLayer = stack[stack.length - 1];
    const boxShouldMove = !gameEnded && !gameWon && !autopilot;

    if (boxShouldMove) {
      // Move block with oscillation
      topLayer.threejs.position[topLayer.direction] += speed * timePassed * blockMoveDirection;
      topLayer.cannonjs.position[topLayer.direction] += speed * timePassed * blockMoveDirection;

      // Bounce at edges instead of game over
      if (topLayer.threejs.position[topLayer.direction] > 6) {
        blockMoveDirection = -1;
      } else if (topLayer.threejs.position[topLayer.direction] < -6) {
        blockMoveDirection = 1;
      }
    }

    // Smooth camera follow
    const targetY = LAYER_HEIGHT * (stack.length - 2) + 4;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    updatePhysics(timePassed);
    updateParticles();
    updateBirds();
    renderer.render(scene, camera);
  }
  lastTime = time;
}

function updatePhysics(timePassed) {
  world.step(timePassed / 1000);

  overhangs.forEach((el) => {
    el.threejs.position.copy(el.cannonjs.position);
    el.threejs.quaternion.copy(el.cannonjs.quaternion);
  });
}

// ============ RESPONSIVE ============
function handleResize() {
  // Check if we're on mobile (no frame) or desktop (with frame)
  const isMobile = window.innerWidth <= 768;
  const container = document.querySelector('.iframe-wrapper');

  let width, height;

  if (isMobile || !container) {
    // Mobile: use full window
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    // Desktop: use container size for proper framing
    width = container.clientWidth;
    height = container.clientHeight;
  }

  const aspect = width / height;
  const frustumSize = 10;

  camera.left = frustumSize * aspect / -2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = frustumSize / -2;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.render(scene, camera);
}


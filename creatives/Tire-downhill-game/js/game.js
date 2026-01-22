/*
 * ENDLESS ROLLER GAME
 * Main game logic - Mobile First
 */

var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var dom;
var sun;
var ground;
var rollingGroundSphere;
var heroSphere;
var rollingSpeed;
var heroRollingSpeed;
var worldRadius;
var heroRadius;
var sphericalHelper;
var pathAngleValues;
var heroBaseY = 2.0;
var bounceValue;
var gravity;
var leftLane = -0.8;
var rightLane = 0.8;
var middleLane = 0;
var currentLane;
var clock;
var coinClock;
var jumping;
var treeReleaseInterval;
var lastTreeReleaseTime = 0;
var treesInPath;
var treesPool;
var particleGeometry;
var particleCount = 20;
var explosionPower = 1.06;
var particles;
var scoreText;
var score;
var hasCollided;
var textureLoader;

// Coin system
var coinsInPath;
var coinsPool;
var coinSpawnInterval;

// Billboard system (gantry style - spans over road)
var billboardsInPath;
var billboardsPool;
var billboardSpawnInterval;
var billboardModel; // Store loaded GLB model
var billboardClock;
var gltfLoader; // GLTFLoader for loading .glb models
var billboardModelLoaded = false;
var billboardPosterTexture; // MRF poster texture for billboard panels

// Lives system
var lives;
var livesDisplay;
var isInvincible;
var invincibilityTimer;
var gameOver;

// High score
var highScore;
var highScoreText;

// Coins collected
var coinsCollected;
var coinsText;

// Mobile/Touch controls
var isMobile;
var touchStartX;
var touchStartY;
var touchEndX;
var touchEndY;
var minSwipeDistance = 15;

// Detect if mobile device
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth < 768);
}

// Initialize the game
function init() {
    // Detect mobile
    isMobile = detectMobile();

    // Load config values
    rollingSpeed = GameConfig.gameplay.rollingSpeed;
    worldRadius = GameConfig.gameplay.worldRadius;
    heroRadius = GameConfig.gameplay.heroRadius;
    gravity = GameConfig.gameplay.gravity;
    bounceValue = GameConfig.gameplay.bounceValue;
    treeReleaseInterval = GameConfig.gameplay.treeReleaseInterval;
    coinSpawnInterval = GameConfig.coins.spawnInterval;
    billboardSpawnInterval = GameConfig.billboards.spawnInterval;

    // Create texture loader with CORS enabled
    textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Load the MRF poster texture for billboards
    billboardPosterTexture = textureLoader.load('assets/mrf-wanderer.png',
        function(texture) {
            console.log('Billboard poster texture loaded successfully');
        },
        undefined,
        function(err) {
            console.log('Billboard poster texture failed to load:', err);
            billboardPosterTexture = null;
        }
    );

    // Create GLTF loader for .glb models
    gltfLoader = new THREE.GLTFLoader();

    // Load the gantry billboard model
    gltfLoader.load(GameConfig.billboards.modelPath,
        function(gltf) {
            billboardModel = gltf.scene;
            billboardModelLoaded = true;
            console.log('Gantry billboard model loaded successfully');
            // Create billboards pool after model is loaded
            createBillboardsPool();
        },
        undefined,
        function(err) {
            console.log('Billboard model failed to load:', err);
            billboardModelLoaded = false;
        }
    );

    // Load high score from localStorage
    highScore = localStorage.getItem('tireRollerHighScore') || 0;
    highScore = parseInt(highScore);

    // Set up the scene
    createScene();

    // Call game loop
    update();
}

function createScene() {
    hasCollided = false;
    gameOver = false;
    score = 0;
    coinsCollected = 0;
    lives = GameConfig.lives.startingLives;
    isInvincible = false;
    invincibilityTimer = 0;
    treesInPath = [];
    treesPool = [];
    coinsInPath = [];
    coinsPool = [];
    billboardsInPath = [];
    billboardsPool = [];
    clock = new THREE.Clock();
    coinClock = new THREE.Clock();
    billboardClock = new THREE.Clock();
    clock.start();
    coinClock.start();
    billboardClock.start();
    heroRollingSpeed = (rollingSpeed * worldRadius / heroRadius) / 5;
    sphericalHelper = new THREE.Spherical();
    pathAngleValues = [1.54, 1.57, 1.60]; // Closer to center for better collection

    // Get the correct container based on device
    if (isMobile) {
        dom = document.getElementById('TutContainerMobile');
        sceneWidth = window.innerWidth;
        sceneHeight = window.innerHeight;
    } else {
        dom = document.getElementById('TutContainer');
        // Desktop: fit inside iPhone frame
        sceneWidth = 300;
        sceneHeight = 610;
    }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(GameConfig.colors.fog, GameConfig.gameplay.fogDensity);

    // Wider FOV for better view (zoomed out)
    var fov = isMobile ? 75 : 70;
    camera = new THREE.PerspectiveCamera(fov, sceneWidth / sceneHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(GameConfig.colors.background, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sceneWidth, sceneHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear old canvas if exists
    while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }
    dom.appendChild(renderer.domElement);

    createTreesPool();
    createCoinsPool();
    // Billboard pool is created after GLB model loads in init()
    addWorld();
    addHero();
    addLight();
    addExplosion();

    // Camera position - zoomed out more
    camera.position.z = 7.5;
    camera.position.y = 3.0;

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', handleKeyDown);

    // Touch controls for mobile
    setupTouchControls();

    createUI();

    // Call game loop
    update();
}

function setupTouchControls() {
    var gameContainer = isMobile ? document.getElementById('mobile-container') : document.getElementById('iphone-frame');
    var isDragging = false;

    // Touch start
    gameContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    // Touch end - detect swipe
    gameContainer.addEventListener('touchend', function(e) {
        if (gameOver) {
            restartGame();
            return;
        }

        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Mouse events for desktop - same swipe behavior as mobile
    gameContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        touchStartX = e.screenX;
        touchStartY = e.screenY;
        e.preventDefault();
    });

    gameContainer.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        isDragging = false;

        if (gameOver) {
            restartGame();
            return;
        }

        touchEndX = e.screenX;
        touchEndY = e.screenY;
        handleSwipe();
    });

    gameContainer.addEventListener('mouseleave', function(e) {
        if (!isDragging) return;
        isDragging = false;

        if (gameOver) return;

        touchEndX = e.screenX;
        touchEndY = e.screenY;
        handleSwipe();
    });
}

function handleSwipe() {
    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;

    // Check if swipe is significant enough
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        // Tap detected - jump
        jump();
        return;
    }

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        // Vertical swipe
        if (deltaY < 0) {
            // Swipe up - jump
            jump();
        }
    }
}

function moveLeft() {
    // Instant lane switch like Subway Surfer
    if (currentLane == middleLane) {
        currentLane = leftLane;
    } else if (currentLane == rightLane) {
        currentLane = middleLane;
    }
}

function moveRight() {
    // Instant lane switch like Subway Surfer
    if (currentLane == middleLane) {
        currentLane = rightLane;
    } else if (currentLane == leftLane) {
        currentLane = middleLane;
    }
}

function jump() {
    if (jumping) return;
    bounceValue = 0.12;
    jumping = true;
}

function createUI() {
    // Get the correct parent for UI elements
    var uiParent = isMobile ? document.getElementById('mobile-container') : document.querySelector('.iphone-screen');

    // Create score text
    scoreText = document.createElement('div');
    scoreText.className = 'score-text';
    scoreText.innerHTML = "Score: 0";
    uiParent.appendChild(scoreText);

    // Create high score text
    highScoreText = document.createElement('div');
    highScoreText.className = 'high-score-text';
    highScoreText.innerHTML = "Best: " + highScore;
    uiParent.appendChild(highScoreText);

    // Create coins collected text
    coinsText = document.createElement('div');
    coinsText.className = 'coins-text';
    coinsText.innerHTML = "🪙 0";
    uiParent.appendChild(coinsText);

    // Create lives display
    livesDisplay = document.createElement('div');
    livesDisplay.className = 'lives-display';
    updateLivesDisplay();
    uiParent.appendChild(livesDisplay);

    // Create info text with appropriate instructions
    var infoText = document.createElement('div');
    infoText.className = 'info-text';
    if (isMobile) {
        infoText.innerHTML = "Swipe: ↑ Jump | ← → Move";
    } else {
        infoText.innerHTML = "↑ Jump | ← → Move | Click to play";
    }
    uiParent.appendChild(infoText);
}

function updateLivesDisplay() {
    var hearts = '';
    for (var i = 0; i < lives; i++) {
        hearts += '❤️ ';
    }
    for (var j = lives; j < GameConfig.lives.startingLives; j++) {
        hearts += '🖤 ';
    }
    livesDisplay.innerHTML = hearts;
}

function addExplosion() {
    // Use BufferGeometry for newer Three.js versions
    particleGeometry = new THREE.BufferGeometry();
    var positions = new Float32Array(particleCount * 3);
    for (var i = 0; i < particleCount * 3; i++) {
        positions[i] = 0;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var pMaterial = new THREE.PointsMaterial({
        color: GameConfig.colors.particles,
        size: 0.2
    });
    particles = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particles);
    particles.visible = false;
}

function createTreesPool() {
    var maxTreesInPool = GameConfig.streetLamps.maxTreesInPool;
    var newTree;
    for (var i = 0; i < maxTreesInPool; i++) {
        newTree = createTree();
        treesPool.push(newTree);
    }
}

function createCoinsPool() {
    var maxCoinsInPool = GameConfig.coins.maxCoinsInPool;
    var newCoin;
    for (var i = 0; i < maxCoinsInPool; i++) {
        newCoin = createCoin();
        coinsPool.push(newCoin);
    }
}

function createBillboardsPool() {
    // Only create pool if model is loaded
    if (!billboardModelLoaded || !billboardModel) {
        console.log('Billboard model not loaded yet, pool creation skipped');
        return;
    }

    var maxBillboardsInPool = GameConfig.billboards.maxBillboardsInPool;
    for (var i = 0; i < maxBillboardsInPool; i++) {
        var newBillboard = createBillboard();
        if (newBillboard) {
            billboardsPool.push(newBillboard);
        }
    }
    console.log('Billboard pool created with ' + billboardsPool.length + ' billboards');
}

function createBillboard() {
    // Clone the loaded GLB model
    if (!billboardModel) return null;

    var billboard = billboardModel.clone();

    // Scale the billboard to be big enough for tire to pass under
    var scale = GameConfig.billboards.scale;
    billboard.scale.set(scale, scale, scale);

    // Enable shadows on all meshes
    billboard.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    // Find the sign panel (mesh with existing texture) and apply poster
    if (billboardPosterTexture) {
        billboard.traverse(function(child) {
            if (child.isMesh && child.material) {
                // Check if this mesh has a texture map (the sign panel)
                var mat = child.material;

                console.log('Mesh:', child.name, 'material:', mat.name, 'hasMap:', !!mat.map);

                if (mat.map) {
                    // This mesh has a texture - replace it with our poster
                    // Flip the texture vertically
                    billboardPosterTexture.flipY = false;
                    billboardPosterTexture.needsUpdate = true;

                    child.material = new THREE.MeshStandardMaterial({
                        map: billboardPosterTexture,
                        roughness: 0.3,
                        metalness: 0.0,
                        side: THREE.DoubleSide
                    });
                    console.log('Applied poster to:', child.name);
                }
            }
        });
    }

    billboard.visible = false;
    return billboard;
}

function createCoin() {
    var coin = new THREE.Object3D();
    var config = GameConfig.coins;

    // Main coin body (cylinder)
    var coinGeometry = new THREE.CylinderGeometry(
        config.radius,
        config.radius,
        config.thickness,
        32
    );
    var coinMaterial = new THREE.MeshStandardMaterial({
        color: config.goldColor,
        roughness: 0.2,
        metalness: 0.9,
        emissive: config.goldColor,
        emissiveIntensity: 0.3
    });
    var coinMesh = new THREE.Mesh(coinGeometry, coinMaterial);
    coinMesh.rotation.x = Math.PI / 2;
    coinMesh.castShadow = true;
    coin.add(coinMesh);

    // Coin edge (darker ring)
    var edgeGeometry = new THREE.TorusGeometry(
        config.radius * 0.9,
        config.thickness * 0.3,
        8,
        32
    );
    var edgeMaterial = new THREE.MeshStandardMaterial({
        color: config.edgeColor,
        roughness: 0.4,
        metalness: 0.7
    });
    var edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
    coin.add(edge);

    // Inner shine circle (front)
    var shineGeometry = new THREE.CircleGeometry(config.radius * 0.5, 16);
    var shineMaterial = new THREE.MeshStandardMaterial({
        color: config.shineColor,
        roughness: 0.2,
        metalness: 0.9
    });
    var shineFront = new THREE.Mesh(shineGeometry, shineMaterial);
    shineFront.position.z = config.thickness / 2 + 0.001;
    coin.add(shineFront);

    // Inner shine circle (back)
    var shineBack = new THREE.Mesh(shineGeometry, shineMaterial);
    shineBack.position.z = -config.thickness / 2 - 0.001;
    shineBack.rotation.y = Math.PI;
    coin.add(shineBack);

    // Star detail on coin
    var starShape = new THREE.Shape();
    var outerRadius = config.radius * 0.35;
    var innerRadius = config.radius * 0.15;
    var spikes = 5;
    for (var i = 0; i < spikes * 2; i++) {
        var radius = i % 2 === 0 ? outerRadius : innerRadius;
        var angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
        if (i === 0) {
            starShape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        } else {
            starShape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
    }
    starShape.closePath();

    var starGeometry = new THREE.ShapeGeometry(starShape);
    var starMaterial = new THREE.MeshStandardMaterial({
        color: config.edgeColor,
        roughness: 0.3,
        metalness: 0.8
    });
    var starFront = new THREE.Mesh(starGeometry, starMaterial);
    starFront.position.z = config.thickness / 2 + 0.002;
    coin.add(starFront);

    var starBack = new THREE.Mesh(starGeometry, starMaterial);
    starBack.position.z = -config.thickness / 2 - 0.002;
    starBack.rotation.y = Math.PI;
    coin.add(starBack);

    return coin;
}

function handleKeyDown(keyEvent) {
    if (gameOver) {
        // Press space or enter to restart
        if (keyEvent.keyCode === 32 || keyEvent.keyCode === 13) {
            restartGame();
        }
        return;
    }

    if (keyEvent.keyCode === 37) { // left
        moveLeft();
    } else if (keyEvent.keyCode === 39) { // right
        moveRight();
    } else if (keyEvent.keyCode === 38) { // up, jump
        jump();
    }
}

function restartGame() {
    // Remove old UI elements
    var oldElements = document.querySelectorAll('.score-text, .high-score-text, .coins-text, .lives-display, .info-text, .game-over-screen');
    oldElements.forEach(function(el) {
        el.remove();
    });

    // Clear scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Reinitialize
    createScene();
}

function addHero() {
    jumping = false;

    // Create the tire as a group of meshes
    heroSphere = createTire();
    heroSphere.receiveShadow = true;
    heroSphere.castShadow = true;
    scene.add(heroSphere);

    // Position the tire
    heroSphere.position.y = heroBaseY;
    heroSphere.position.z = 4.8;
    currentLane = middleLane;
    heroSphere.position.x = currentLane;

    // Rotate tire to face sideways (so it rolls forward)
    heroSphere.rotation.y = Math.PI / 2;
}

function createTire() {
    var tire = new THREE.Object3D();
    var config = GameConfig.tire;

    // === MAIN TIRE BODY (Torus) ===
    var tireGeometry = new THREE.TorusGeometry(
        config.outerRadius,
        config.tubeRadius,
        config.tubularSegments,
        config.radialSegments
    );

    var tireMaterial = new THREE.MeshStandardMaterial({
        color: config.rubberColor,
        roughness: 0.9,
        metalness: 0.1
    });

    var tireMesh = new THREE.Mesh(tireGeometry, tireMaterial);
    tireMesh.castShadow = true;
    tireMesh.receiveShadow = true;
    tire.add(tireMesh);

    // === TIRE TREADS ===
    var treadMaterial = new THREE.MeshStandardMaterial({
        color: config.treadColor,
        roughness: 1.0,
        metalness: 0.0
    });

    var treadCount = config.treadCount;
    var treadWidth = 0.03;
    var treadHeight = 0.025;
    var treadDepth = config.tubeRadius * 0.6;

    for (var i = 0; i < treadCount; i++) {
        var angle = (i / treadCount) * Math.PI * 2;

        // Main tread block
        var treadGeometry = new THREE.BoxGeometry(treadWidth, treadHeight, treadDepth);
        var tread = new THREE.Mesh(treadGeometry, treadMaterial);

        // Position tread on outer surface of tire
        var treadRadius = config.outerRadius + config.tubeRadius * 0.85;
        tread.position.x = Math.cos(angle) * treadRadius;
        tread.position.y = Math.sin(angle) * treadRadius;
        tread.position.z = 0;

        // Rotate tread to face outward
        tread.rotation.z = angle;

        tread.castShadow = true;
        tire.add(tread);

        // Add secondary smaller treads for detail
        if (i % 2 === 0) {
            var smallTreadGeometry = new THREE.BoxGeometry(treadWidth * 0.5, treadHeight * 0.7, treadDepth * 0.8);
            var smallTread = new THREE.Mesh(smallTreadGeometry, treadMaterial);
            var offsetAngle = angle + (Math.PI / treadCount);
            smallTread.position.x = Math.cos(offsetAngle) * treadRadius;
            smallTread.position.y = Math.sin(offsetAngle) * treadRadius;
            smallTread.rotation.z = offsetAngle;
            smallTread.castShadow = true;
            tire.add(smallTread);
        }
    }

    // === SIDEWALL GROOVES (decorative rings) ===
    var sidewallMaterial = new THREE.MeshStandardMaterial({
        color: config.sidewallColor,
        roughness: 0.8,
        metalness: 0.1
    });

    // Inner sidewall ring (left side)
    var sidewallRingGeometry = new THREE.TorusGeometry(
        config.outerRadius * 0.85,
        config.tubeRadius * 0.15,
        8,
        config.radialSegments
    );
    var sidewallRingLeft = new THREE.Mesh(sidewallRingGeometry, sidewallMaterial);
    sidewallRingLeft.position.z = config.tubeRadius * 0.6;
    tire.add(sidewallRingLeft);

    // Inner sidewall ring (right side)
    var sidewallRingRight = new THREE.Mesh(sidewallRingGeometry, sidewallMaterial);
    sidewallRingRight.position.z = -config.tubeRadius * 0.6;
    tire.add(sidewallRingRight);

    // === WHEEL RIM ===
    var rimMaterial = new THREE.MeshStandardMaterial({
        color: config.rimColor,
        roughness: 0.3,
        metalness: 0.8
    });

    // Outer rim ring
    var rimGeometry = new THREE.TorusGeometry(
        config.outerRadius * 0.65,
        config.tubeRadius * 0.25,
        8,
        config.radialSegments
    );
    var rim = new THREE.Mesh(rimGeometry, rimMaterial);
    tire.add(rim);

    // === RIM SPOKES ===
    var spokeCount = 5;
    var spokeMaterial = new THREE.MeshStandardMaterial({
        color: config.rimAccentColor,
        roughness: 0.2,
        metalness: 0.9
    });

    for (var j = 0; j < spokeCount; j++) {
        var spokeAngle = (j / spokeCount) * Math.PI * 2;

        // Create spoke as elongated box
        var spokeGeometry = new THREE.BoxGeometry(
            config.outerRadius * 0.5,
            config.tubeRadius * 0.4,
            config.tubeRadius * 0.3
        );
        var spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);

        // Position spoke
        spoke.position.x = Math.cos(spokeAngle) * config.outerRadius * 0.35;
        spoke.position.y = Math.sin(spokeAngle) * config.outerRadius * 0.35;
        spoke.position.z = 0;
        spoke.rotation.z = spokeAngle;

        spoke.castShadow = true;
        tire.add(spoke);
    }

    // === CENTER HUB ===
    var hubMaterial = new THREE.MeshStandardMaterial({
        color: config.hubColor,
        roughness: 0.4,
        metalness: 0.7
    });

    // Main hub cylinder
    var hubGeometry = new THREE.CylinderGeometry(
        config.outerRadius * 0.15,
        config.outerRadius * 0.15,
        config.tubeRadius * 0.8,
        16
    );
    var hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.rotation.x = Math.PI / 2;
    hub.castShadow = true;
    tire.add(hub);

    // === LUG NUTS ===
    var lugMaterial = new THREE.MeshStandardMaterial({
        color: config.rimAccentColor,
        roughness: 0.2,
        metalness: 0.95
    });

    var lugCount = 5;
    var lugRadius = config.outerRadius * 0.1;

    for (var k = 0; k < lugCount; k++) {
        var lugAngle = (k / lugCount) * Math.PI * 2;
        var lugGeometry = new THREE.CylinderGeometry(0.012, 0.012, config.tubeRadius * 0.5, 6);
        var lug = new THREE.Mesh(lugGeometry, lugMaterial);

        lug.position.x = Math.cos(lugAngle) * lugRadius;
        lug.position.y = Math.sin(lugAngle) * lugRadius;
        lug.position.z = config.tubeRadius * 0.25;
        lug.rotation.x = Math.PI / 2;

        tire.add(lug);

        // Add lug on other side too
        var lug2 = new THREE.Mesh(lugGeometry, lugMaterial);
        lug2.position.x = Math.cos(lugAngle) * lugRadius;
        lug2.position.y = Math.sin(lugAngle) * lugRadius;
        lug2.position.z = -config.tubeRadius * 0.25;
        lug2.rotation.x = Math.PI / 2;
        tire.add(lug2);
    }

    // === CENTER CAP ===
    var capGeometry = new THREE.CylinderGeometry(
        config.outerRadius * 0.08,
        config.outerRadius * 0.08,
        config.tubeRadius * 0.6,
        8
    );
    var cap = new THREE.Mesh(capGeometry, spokeMaterial);
    cap.rotation.x = Math.PI / 2;
    tire.add(cap);

    return tire;
}

function addWorld() {
    var sides = 40;
    var tiers = 40;
    var sphereGeometry = new THREE.SphereGeometry(worldRadius, sides, tiers);

    // Smooth road material - dark asphalt color
    var sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222, // Dark gray/black road
        roughness: 0.9,
        metalness: 0.0
    });

    // NO random vertex modifications - keep road smooth!

    rollingGroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    rollingGroundSphere.receiveShadow = true;
    rollingGroundSphere.castShadow = false;
    rollingGroundSphere.rotation.z = -Math.PI / 2;
    scene.add(rollingGroundSphere);
    rollingGroundSphere.position.y = -24;
    rollingGroundSphere.position.z = 2;

    // Add road markings (white center line and side lines)
    addRoadMarkings();

    addWorldTrees();
}

function addRoadMarkings() {
    // Create bright white lane markings on the road
    var markingMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });

    // Center dashed lines - bigger and more visible
    var dashLength = 0.8;
    var dashWidth = 0.12;
    var dashGeometry = new THREE.PlaneGeometry(dashWidth, dashLength);

    // More dashes for continuous appearance (60 dashes around the sphere)
    for (var i = 0; i < 60; i++) {
        var dash = new THREE.Mesh(dashGeometry, markingMaterial);
        var angle = (i / 60) * Math.PI * 2;

        // Position on sphere surface at center (Math.PI/2 is the center)
        sphericalHelper.set(worldRadius + 0.03, Math.PI / 2, angle);
        dash.position.setFromSpherical(sphericalHelper);

        // Orient to lie flat on the sphere surface pointing along the road
        var normal = dash.position.clone().normalize();
        dash.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        dash.rotateX(Math.PI / 2);

        rollingGroundSphere.add(dash);
    }

    // Left edge line (solid white) - wider
    var edgeGeometry = new THREE.PlaneGeometry(0.08, 200);
    var leftEdge = new THREE.Mesh(edgeGeometry, markingMaterial);
    sphericalHelper.set(worldRadius + 0.03, 1.65, 0);
    leftEdge.position.setFromSpherical(sphericalHelper);
    leftEdge.lookAt(rollingGroundSphere.position);
    leftEdge.rotateX(Math.PI / 2);
    rollingGroundSphere.add(leftEdge);

    // Right edge line (solid white)
    var rightEdge = new THREE.Mesh(edgeGeometry, markingMaterial);
    sphericalHelper.set(worldRadius + 0.03, 1.49, 0);
    rightEdge.position.setFromSpherical(sphericalHelper);
    rightEdge.lookAt(rollingGroundSphere.position);
    rightEdge.rotateX(Math.PI / 2);
    rollingGroundSphere.add(rightEdge);
}

function addLight() {
    // Hemisphere light - sky and ground colors for ambient lighting
    var hemisphereLight = new THREE.HemisphereLight(GameConfig.colors.hemisphereLight, 0x333333, 1.0);
    scene.add(hemisphereLight);

    // Main sun light
    sun = new THREE.DirectionalLight(GameConfig.colors.sunLight, 1.0);
    sun.position.set(12, 6, -7);
    sun.castShadow = true;
    scene.add(sun);
    sun.shadow.mapSize.width = 256;
    sun.shadow.mapSize.height = 256;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;

    // Add ambient light to brighten the scene
    var ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
}

function addPathTree() {
    var options = [0, 1, 2];
    var lane = Math.floor(Math.random() * 3);
    addTree(true, lane);
    options.splice(lane, 1);
    if (Math.random() > 0.5) {
        lane = Math.floor(Math.random() * 2);
        addTree(true, options[lane]);
    }
}

function addPathCoin() {
    // Spawn coin in a random lane (0, 1, or 2)
    var lane = Math.floor(Math.random() * 3);
    addCoin(lane);
}

function addCoin(row) {
    if (coinsPool.length === 0) return;

    var newCoin = coinsPool.pop();
    newCoin.visible = true;
    coinsInPath.push(newCoin);

    // Use same radius as trees (worldRadius - 0.3) so coins appear at surface level
    sphericalHelper.set(worldRadius - 0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x + 4);
    newCoin.position.setFromSpherical(sphericalHelper);

    var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
    var coinVector = newCoin.position.clone().normalize();
    newCoin.quaternion.setFromUnitVectors(coinVector, rollingGroundVector);

    // Apply radial offset (outward from sphere surface) to float coins above ground
    var radialOffset = newCoin.position.clone().normalize().multiplyScalar(0.5);
    newCoin.position.add(radialOffset);

    rollingGroundSphere.add(newCoin);
}

function addPathBillboard() {
    // Check if model loaded and pool has billboards
    if (!billboardModelLoaded || billboardsPool.length < 1) return;

    var billboard = billboardsPool.pop();

    if (billboard.parent) billboard.parent.remove(billboard);

    billboard.visible = true;
    billboardsInPath.push(billboard);

    var theta = -rollingGroundSphere.rotation.x + 4;

    // Position slightly LEFT of center (phi adjusted) - tire passes under
    sphericalHelper.set(worldRadius - 0.2, Math.PI / 2 + 0.03, theta);
    billboard.position.setFromSpherical(sphericalHelper);

    // Simple fixed rotation (no spinning)
    billboard.quaternion.set(0, 0, 0, 1);
    billboard.rotation.set(0, 0, 0);
    billboard.rotation.z = -theta;
    billboard.rotation.x = Math.PI / 2;

    // After base rotation, rotate on local Y to face player
    billboard.rotateY(Math.PI / 2);

    rollingGroundSphere.add(billboard);
}

function addWorldTrees() {
    var numTrees = GameConfig.streetLamps.forestTreeCount;
    var gap = 6.28 / numTrees;
    for (var i = 0; i < numTrees; i++) {
        // Alternate left and right sides instead of placing both
        var isLeft = (i % 2 === 0);
        addTree(false, i * gap, isLeft);
    }
}

function addTree(inPath, row, isLeft) {
    var newTree;
    var phi, theta;

    if (inPath) {
        if (treesPool.length == 0) return;
        newTree = treesPool.pop();
        newTree.visible = true;
        treesInPath.push(newTree);
        phi = pathAngleValues[row];
        theta = -rollingGroundSphere.rotation.x + 4;
    } else {
        newTree = createTree();
        if (isLeft) {
            phi = 1.68 + Math.random() * 0.1;
        } else {
            phi = 1.46 - Math.random() * 0.1;
        }
        theta = row;
    }

    // Position ON the sphere surface (use worldRadius - small offset to sit on surface)
    sphericalHelper.set(worldRadius - 0.2, phi, theta);
    newTree.position.setFromSpherical(sphericalHelper);

    // Use EXACT same approach as coins - this orients object to stand on sphere surface
    var rollingGroundVector = rollingGroundSphere.position.clone().normalize();
    var treeVector = newTree.position.clone().normalize();
    newTree.quaternion.setFromUnitVectors(treeVector, rollingGroundVector);

    // Rotate lamp arm to face the road
    if (isLeft) {
        newTree.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
    } else {
        newTree.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    }

    rollingGroundSphere.add(newTree);
}

function createTree() {
    // Creates a realistic street lamp
    var config = GameConfig.streetLamps;

    var streetLamp = new THREE.Object3D();

    // === MAIN POLE ===
    // Tapered pole (slightly wider at base)
    var poleGeometry = new THREE.CylinderGeometry(
        config.poleRadius * 0.8,  // top radius (slightly narrower)
        config.poleRadius * 1.2,  // bottom radius (wider base)
        config.poleHeight,
        8
    );
    var poleMaterial = new THREE.MeshStandardMaterial({
        color: config.poleColor,
        roughness: 0.6,
        metalness: 0.8
    });
    var pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = config.poleHeight / 2;
    pole.castShadow = true;
    streetLamp.add(pole);

    // === DECORATIVE BASE ===
    var baseGeometry = new THREE.CylinderGeometry(
        config.poleRadius * 1.5,
        config.poleRadius * 2,
        0.1,
        8
    );
    var base = new THREE.Mesh(baseGeometry, poleMaterial);
    base.position.y = 0.05;
    streetLamp.add(base);

    // === CURVED GOOSENECK ARM ===
    // Create curved arm using multiple segments
    var armGroup = new THREE.Object3D();
    armGroup.position.y = config.poleHeight;

    // Horizontal arm segment
    var armGeometry = new THREE.CylinderGeometry(
        config.armRadius,
        config.armRadius,
        config.armLength,
        6
    );
    var armMaterial = new THREE.MeshStandardMaterial({
        color: config.armColor,
        roughness: 0.5,
        metalness: 0.8
    });
    var arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.rotation.z = Math.PI / 2; // Make horizontal
    arm.position.x = config.armLength / 2;
    arm.position.y = 0.05;
    armGroup.add(arm);

    // Curved elbow joint
    var elbowGeometry = new THREE.SphereGeometry(config.armRadius * 1.5, 8, 8);
    var elbow = new THREE.Mesh(elbowGeometry, armMaterial);
    elbow.position.y = 0.05;
    armGroup.add(elbow);

    streetLamp.add(armGroup);

    // === LAMP HEAD (Cobra Style) ===
    var lampGroup = new THREE.Object3D();
    lampGroup.position.set(config.armLength, config.poleHeight, 0);

    // Main lamp housing (cobra head shape)
    var housingGeometry = new THREE.BoxGeometry(
        config.lampWidth,
        config.lampHeight,
        config.lampDepth
    );
    var housingMaterial = new THREE.MeshStandardMaterial({
        color: config.lampHousingColor,
        roughness: 0.3,
        metalness: 0.9
    });
    var housing = new THREE.Mesh(housingGeometry, housingMaterial);
    housing.position.y = -config.lampHeight / 2;
    lampGroup.add(housing);

    // Lamp lens/diffuser (bottom of lamp - glowing)
    var lensGeometry = new THREE.PlaneGeometry(
        config.lampWidth * 0.8,
        config.lampDepth * 0.8
    );
    var lensMaterial = new THREE.MeshBasicMaterial({
        color: config.lampGlowColor,
        transparent: true,
        opacity: 0.9
    });
    var lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.rotation.x = -Math.PI / 2; // Face downward
    lens.position.y = -config.lampHeight;
    lampGroup.add(lens);

    // Add subtle glow sphere for light effect
    var glowGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    var glowMaterial = new THREE.MeshBasicMaterial({
        color: config.lampGlowColor,
        transparent: true,
        opacity: 0.6
    });
    var glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = -config.lampHeight - 0.05;
    lampGroup.add(glow);

    streetLamp.add(lampGroup);

    return streetLamp;
}

// Tree helper functions removed - now using street lamps

function update() {
    if (gameOver) {
        render();
        requestAnimationFrame(update);
        return;
    }

    rollingGroundSphere.rotation.x += rollingSpeed;
    // Tire rotates on Z-axis (after being oriented with Y rotation)
    heroSphere.rotation.z -= heroRollingSpeed;

    // Blinking effect when invincible
    if (isInvincible) {
        invincibilityTimer -= 0.016; // Approximate frame time
        heroSphere.visible = Math.floor(invincibilityTimer * 10) % 2 === 0;
        if (invincibilityTimer <= 0) {
            isInvincible = false;
            heroSphere.visible = true;
        }
    }

    if (heroSphere.position.y <= heroBaseY) {
        jumping = false;
        bounceValue = (Math.random() * 0.04) + 0.005;
    }
    heroSphere.position.y += bounceValue;
    // Fast lane switching like Subway Surfer
    heroSphere.position.x = THREE.MathUtils.lerp(heroSphere.position.x, currentLane, 0.2);
    bounceValue -= gravity;

    // Spawn trees
    if (clock.getElapsedTime() > treeReleaseInterval) {
        clock.start();
        addPathTree();
        if (!gameOver) {
            score += 1;
            updateScoreDisplay();
        }
    }

    // Spawn coins - always spawn when interval is reached
    if (coinClock.getElapsedTime() > coinSpawnInterval) {
        coinClock.start();
        addPathCoin();
    }

    // Spawn billboards with constant gap
    if (billboardClock.getElapsedTime() > billboardSpawnInterval) {
        billboardClock.start();
        addPathBillboard();
    }

    doTreeLogic();
    doCoinLogic();
    doBillboardLogic();
    doExplosionLogic();
    render();
    requestAnimationFrame(update);
}

function updateScoreDisplay() {
    scoreText.innerHTML = "Score: " + Math.floor(score);
    if (score > highScore) {
        highScore = Math.floor(score);
        highScoreText.innerHTML = "Best: " + highScore;
        localStorage.setItem('tireRollerHighScore', highScore);
    }
}

function doTreeLogic() {
    var oneTree;
    var treePos = new THREE.Vector3();
    var treesToRemove = [];
    treesInPath.forEach(function (element, index) {
        oneTree = treesInPath[index];
        treePos.setFromMatrixPosition(oneTree.matrixWorld);
        if (treePos.z > 6 && oneTree.visible) {
            treesToRemove.push(oneTree);
        } else {
            // Collision radius adjusted for tire size
            if (!isInvincible && treePos.distanceTo(heroSphere.position) <= 0.5) {
                console.log("hit");
                hitObstacle();
            }
        }
    });
    var fromWhere;
    treesToRemove.forEach(function (element, index) {
        oneTree = treesToRemove[index];
        fromWhere = treesInPath.indexOf(oneTree);
        treesInPath.splice(fromWhere, 1);
        treesPool.push(oneTree);
        oneTree.visible = false;
    });
}

function doCoinLogic() {
    var oneCoin;
    var coinPos = new THREE.Vector3();
    var coinsToRemove = [];

    // Update world matrix to get accurate positions
    rollingGroundSphere.updateMatrixWorld(true);

    coinsInPath.forEach(function (element, index) {
        oneCoin = coinsInPath[index];

        // Rotate coin for visual effect
        oneCoin.rotation.y += GameConfig.coins.rotationSpeed;

        coinPos.setFromMatrixPosition(oneCoin.matrixWorld);

        if (coinPos.z > 6 && oneCoin.visible) {
            coinsToRemove.push(oneCoin);
        } else {
            // Check coin collection
            if (coinPos.distanceTo(heroSphere.position) <= GameConfig.coins.collectRadius) {
                collectCoin(oneCoin);
                coinsToRemove.push(oneCoin);
            }
        }
    });

    // Recycle coins - match tree behavior (don't remove from sphere, just hide)
    var fromWhere;
    coinsToRemove.forEach(function (element, index) {
        oneCoin = coinsToRemove[index];
        fromWhere = coinsInPath.indexOf(oneCoin);
        coinsInPath.splice(fromWhere, 1);
        coinsPool.push(oneCoin);
        oneCoin.visible = false;
    });
}

function doBillboardLogic() {
    var oneBillboard;
    var billboardPos = new THREE.Vector3();
    var billboardsToRemove = [];

    billboardsInPath.forEach(function (element, index) {
        oneBillboard = billboardsInPath[index];
        billboardPos.setFromMatrixPosition(oneBillboard.matrixWorld);

        // Remove billboard when it passes the player
        if (billboardPos.z > 6 && oneBillboard.visible) {
            billboardsToRemove.push(oneBillboard);
        }
    });

    // Recycle billboards
    var fromWhere;
    billboardsToRemove.forEach(function (element, index) {
        oneBillboard = billboardsToRemove[index];
        fromWhere = billboardsInPath.indexOf(oneBillboard);
        billboardsInPath.splice(fromWhere, 1);
        billboardsPool.push(oneBillboard);
        oneBillboard.visible = false;
    });
}

function collectCoin(coin) {
    score += GameConfig.coins.pointsPerCoin;
    coinsCollected++;
    updateScoreDisplay();
    updateCoinsDisplay();

    // Create a simple collect effect
    createCoinCollectEffect(coin);
}

function updateCoinsDisplay() {
    coinsText.innerHTML = "🪙 " + coinsCollected;
}

function createCoinCollectEffect(coin) {
    // Flash effect - create temporary particles
    var coinPos = new THREE.Vector3();
    coinPos.setFromMatrixPosition(coin.matrixWorld);

    // Create golden particles using BufferGeometry
    var collectGeometry = new THREE.BufferGeometry();
    var positions = new Float32Array(8 * 3);
    for (var i = 0; i < 8; i++) {
        positions[i * 3] = coinPos.x + (Math.random() - 0.5) * 0.2;
        positions[i * 3 + 1] = coinPos.y + (Math.random() - 0.5) * 0.2;
        positions[i * 3 + 2] = coinPos.z + (Math.random() - 0.5) * 0.2;
    }
    collectGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var collectMaterial = new THREE.PointsMaterial({
        color: GameConfig.coins.goldColor,
        size: 0.1
    });

    var collectParticles = new THREE.Points(collectGeometry, collectMaterial);
    scene.add(collectParticles);

    // Remove after short delay
    setTimeout(function() {
        scene.remove(collectParticles);
    }, 200);
}

function hitObstacle() {
    lives--;
    updateLivesDisplay();
    explode();

    if (lives <= 0) {
        endGame();
    } else {
        // Start invincibility
        isInvincible = true;
        invincibilityTimer = GameConfig.lives.invincibilityTime;
    }
}

function endGame() {
    gameOver = true;

    // Update high score one final time
    if (score > highScore) {
        highScore = Math.floor(score);
        localStorage.setItem('tireRollerHighScore', highScore);
    }

    // Get correct parent for game over screen
    var uiParent = isMobile ? document.getElementById('mobile-container') : document.querySelector('.iphone-screen');

    // Show game over screen
    var gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'game-over-screen';
    gameOverScreen.innerHTML = `
        <div class="game-over-content">
            <h1>GAME OVER</h1>
            <p>Score: ${Math.floor(score)}</p>
            <p>Coins: ${coinsCollected} 🪙</p>
            <p>High Score: ${highScore}</p>
            <p class="restart-text">${isMobile ? 'Tap to restart' : 'Press SPACE or tap to restart'}</p>
        </div>
    `;
    uiParent.appendChild(gameOverScreen);
}

function doExplosionLogic() {
    if (!particles.visible) return;
    var positions = particleGeometry.getAttribute('position').array;
    for (var i = 0; i < particleCount * 3; i++) {
        positions[i] *= explosionPower;
    }
    if (explosionPower > 1.005) {
        explosionPower -= 0.001;
    } else {
        particles.visible = false;
    }
    particleGeometry.getAttribute('position').needsUpdate = true;
}

function explode() {
    particles.position.y = 2;
    particles.position.z = 4.8;
    particles.position.x = heroSphere.position.x;
    var positions = particleGeometry.getAttribute('position').array;
    for (var i = 0; i < particleCount; i++) {
        positions[i * 3] = -0.2 + Math.random() * 0.4;     // x
        positions[i * 3 + 1] = -0.2 + Math.random() * 0.4; // y
        positions[i * 3 + 2] = -0.2 + Math.random() * 0.4; // z
    }
    particleGeometry.getAttribute('position').needsUpdate = true;
    explosionPower = 1.07;
    particles.visible = true;
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    isMobile = detectMobile();

    if (isMobile) {
        sceneHeight = window.innerHeight;
        sceneWidth = window.innerWidth;
    } else {
        sceneWidth = 300;
        sceneHeight = 610;
    }

    renderer.setSize(sceneWidth, sceneHeight);
    camera.aspect = sceneWidth / sceneHeight;
    camera.updateProjectionMatrix();
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', init);

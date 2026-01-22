# Complete Guide: Building Three.js Games for LoopMe

This guide teaches you how to create interactive 3D games for the LoopMe ad platform using Three.js, based on the Horlicks 3D Maze Game implementation.

---

## Table of Contents
1. [Understanding LoopMe Requirements](#understanding-loopme-requirements)
2. [Architecture Overview](#architecture-overview)
3. [Development Workflow](#development-workflow)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [LoopMe Integration](#loopme-integration)
6. [Optimization Techniques](#optimization-techniques)
7. [Deployment Strategy](#deployment-strategy)
8. [Testing Checklist](#testing-checklist)
9. [Common Pitfalls](#common-pitfalls)

---

## Understanding LoopMe Requirements

### Platform Constraints
- **File Size Limit**: 8MB maximum for the entire creative
- **Format**: Single HTML file OR ZIP package
- **Three.js Support**: Only specific versions (r165 confirmed working)
- **Mobile First**: Must work on iOS and Android devices
- **No External Dependencies**: All assets must be included or CDN-hosted

### Required Integrations
1. **LoopMe API**: Track user engagement events
2. **ClickTag**: Handle ad click-through to landing page
3. **Tracking Events**: Report meaningful interactions
4. **Performance**: Must load and run smoothly on mobile devices

### LoopMe API Events You Must Track
```javascript
// Initialize LoopMe
if (window.LoopMeAPI) {
    window.LoopMeAPI.ready();
}

// Track engagement (user interaction)
window.LoopMeAPI?.trackEngagement();

// Track clicks
window.LoopMeAPI?.trackClick();

// Track video events (if using video)
window.LoopMeAPI?.trackVideoStart();
window.LoopMeAPI?.trackVideoComplete();
```

---

## Architecture Overview

### Two-Folder Strategy

```
project/
├── GameName/                    # Full development version
│   ├── index.html              # Main game file
│   ├── assets/                 # All 3D models, textures
│   │   ├── Walls/
│   │   ├── UI/
│   │   └── bg.jpg
│   └── js/                     # JavaScript libraries
│       ├── three.min.js
│       ├── gsap.min.js
│       ├── cannon.min.js
│       ├── GLTFLoader.js
│       └── draco/
└── GameName-Standalone/        # LoopMe deployment version
    └── index.html              # Single file, loads from CDN
```

**Why Two Versions?**
- **Development Version**: Full assets bundled, easy to test locally
- **Standalone Version**: Lightweight (105KB vs 1.33MB), loads assets from Cloudflare CDN

---

## Development Workflow

### Phase 1: Local Development
1. Build complete game with all assets locally
2. Test gameplay mechanics thoroughly
3. Optimize 3D models and textures
4. Ensure mobile responsiveness

### Phase 2: Asset Hosting
1. Deploy full version to Cloudflare Pages (or similar CDN)
2. Verify CORS headers are enabled
3. Test asset loading from CDN URLs

### Phase 3: Standalone Creation
1. Create single HTML file that references CDN assets
2. Integrate LoopMe API
3. Add ClickTag functionality
4. Optimize file size to <8MB

### Phase 4: LoopMe Deployment
1. Test standalone version locally
2. Upload to LoopMe platform
3. Test on actual devices
4. Submit for approval

---

## Step-by-Step Implementation

### Step 1: Set Up Development Environment

#### Required Libraries
Download and include these in your `js/` folder:

```html
<!-- Three.js r165 (confirmed working with LoopMe) -->
<script src="js/three.min.js"></script>

<!-- GSAP for animations -->
<script src="js/gsap.min.js"></script>

<!-- Cannon.js for physics (optional) -->
<script src="js/cannon.min.js"></script>

<!-- GLTF Loader for 3D models -->
<script src="js/GLTFLoader.js"></script>
```

**Where to Get Libraries**:
- Three.js r165: https://github.com/mrdoob/three.js/releases/tag/r165
- GSAP: https://greensock.com/gsap/
- Cannon.js: https://github.com/schteppe/cannon.js
- GLTFLoader: Included in Three.js examples

#### Project Structure
```bash
mkdir GameName
cd GameName
mkdir assets assets/UI assets/Models js js/draco
```

### Step 2: Create Basic Three.js Scene

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        #gameCanvas {
            width: 100%;
            height: 100%;
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>

    <!-- Load libraries -->
    <script src="js/three.min.js"></script>
    <script src="js/gsap.min.js"></script>

    <script>
        // Game initialization
        let scene, camera, renderer;
        let gameStarted = false;

        function init() {
            // Create scene
            scene = new THREE.Scene();

            // Create camera
            camera = new THREE.PerspectiveCamera(
                75, // FOV
                window.innerWidth / window.innerHeight, // Aspect ratio
                0.1, // Near plane
                1000 // Far plane
            );
            camera.position.set(0, 2, 5);

            // Create renderer
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('gameCanvas'),
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 10, 5);
            scene.add(directionalLight);

            // Handle window resize
            window.addEventListener('resize', onWindowResize);

            // Start animation loop
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);

            // Update game logic here

            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Initialize on load
        window.addEventListener('load', init);
    </script>
</body>
</html>
```

### Step 3: Add Game Mechanics

#### 3D Model Loading
```javascript
// Set up GLTF Loader with Draco compression
const gltfLoader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('js/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

// Load a 3D model
gltfLoader.load(
    'assets/Models/character.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);

        console.log('Model loaded successfully');
    },
    (progress) => {
        console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);
```

#### Texture Loading
```javascript
const textureLoader = new THREE.TextureLoader();

// Load texture
const texture = textureLoader.load('assets/UI/button.webp');

// Apply to material
const material = new THREE.MeshStandardMaterial({
    map: texture
});
```

#### User Input (Mobile-Friendly)
```javascript
// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    // Track engagement on first touch
    if (window.LoopMeAPI && !gameStarted) {
        window.LoopMeAPI.trackEngagement();
        gameStarted = true;
    }
}, false);

document.addEventListener('touchmove', (e) => {
    e.preventDefault();

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Move character based on swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
}, { passive: false });

// Mouse controls for desktop testing
document.addEventListener('click', (e) => {
    if (window.LoopMeAPI && !gameStarted) {
        window.LoopMeAPI.trackEngagement();
        gameStarted = true;
    }
});
```

#### UI Buttons (HTML Overlay)
```html
<style>
    .control-buttons {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }

    .btn {
        width: 60px;
        height: 60px;
        background-size: cover;
        background-position: center;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .btn:active {
        opacity: 1;
    }

    .btn-up {
        background-image: url('assets/UI/upAB.fw.webp');
    }

    .btn-down {
        background-image: url('assets/UI/downAB.fw.webp');
    }
</style>

<div class="control-buttons">
    <button class="btn btn-up" onclick="moveForward()"></button>
    <button class="btn btn-down" onclick="moveBackward()"></button>
</div>
```

### Step 4: Optimize 3D Assets

#### Model Optimization
```bash
# Install gltf-transform
npm install -g @gltfpack/cli

# Compress GLB file with Draco
gltf-transform draco assets/Models/character.glb assets/Models/character-compressed.glb

# Simplify geometry (reduce polygons)
gltf-transform simplify assets/Models/character.glb assets/Models/character-simple.glb --ratio 0.5
```

#### Texture Optimization
```bash
# Convert to WebP format (smaller size)
# Install sharp or squoosh-cli

npm install -g @squoosh/cli

squoosh-cli --webp '{"quality":80}' assets/UI/*.png
```

**Optimization Goals**:
- GLB models: <200KB each
- Textures: WebP format, <100KB each
- Total assets: <1MB for smooth loading

### Step 5: Integrate LoopMe API

Add this code to your HTML:

```javascript
// LoopMe Configuration
const LOOPME_CONFIG = {
    clickTagURL: 'https://your-landing-page.com',
    trackingEnabled: true
};

// Initialize LoopMe when ready
window.addEventListener('load', () => {
    if (window.LoopMeAPI) {
        window.LoopMeAPI.ready();
        console.log('LoopMe API initialized');
    }
});

// Track engagement on first interaction
let engagementTracked = false;

function trackEngagement() {
    if (!engagementTracked && window.LoopMeAPI) {
        window.LoopMeAPI.trackEngagement();
        engagementTracked = true;
        console.log('Engagement tracked');
    }
}

// Track clicks
function handleGameClick(event) {
    if (window.LoopMeAPI) {
        window.LoopMeAPI.trackClick();
        console.log('Click tracked');
    }

    // Open ClickTag URL
    if (LOOPME_CONFIG.clickTagURL) {
        window.open(LOOPME_CONFIG.clickTagURL, '_blank');
    }
}

// Add click tracking to specific elements
document.getElementById('ctaButton').addEventListener('click', handleGameClick);

// Track engagement on game start
function startGame() {
    trackEngagement();
    gameStarted = true;
    // ... rest of game start logic
}
```

#### ClickTag Implementation
```html
<!-- Call-to-Action Button -->
<div id="ctaButton" style="
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    background: #ff6600;
    color: white;
    font-size: 18px;
    border-radius: 25px;
    cursor: pointer;
    z-index: 100;
    display: none;
">
    TAP TO LEARN MORE
</div>

<script>
    // Show CTA when player reaches goal
    function showCTA() {
        document.getElementById('ctaButton').style.display = 'block';

        // Animate in
        gsap.from('#ctaButton', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out'
        });
    }
</script>
```

---

## LoopMe Integration

### Complete LoopMe Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Game - LoopMe</title>
    <style>
        /* Your styles here */
    </style>
</head>
<body>
    <!-- Game UI -->
    <canvas id="gameCanvas"></canvas>

    <!-- Load libraries -->
    <script src="js/three.min.js"></script>
    <script src="js/gsap.min.js"></script>

    <script>
        // ========================================
        // LOOPME CONFIGURATION
        // ========================================

        const LOOPME_CONFIG = {
            clickTagURL: '%%CLICK_URL_UNESC%%', // LoopMe macro
            trackingEnabled: true
        };

        // ========================================
        // LOOPME API INTEGRATION
        // ========================================

        let engagementTracked = false;
        let gameStarted = false;

        // Initialize LoopMe
        window.addEventListener('load', () => {
            if (window.LoopMeAPI) {
                window.LoopMeAPI.ready();
                console.log('[LoopMe] API initialized');
            } else {
                console.warn('[LoopMe] API not available (testing locally)');
            }
        });

        // Track engagement (first meaningful interaction)
        function trackEngagement() {
            if (!engagementTracked && window.LoopMeAPI) {
                window.LoopMeAPI.trackEngagement();
                engagementTracked = true;
                console.log('[LoopMe] Engagement tracked');
            }
        }

        // Track click (CTA interaction)
        function trackClick() {
            if (window.LoopMeAPI) {
                window.LoopMeAPI.trackClick();
                console.log('[LoopMe] Click tracked');
            }

            // Open landing page
            if (LOOPME_CONFIG.clickTagURL) {
                window.open(LOOPME_CONFIG.clickTagURL, '_blank');
            }
        }

        // ========================================
        // GAME CODE
        // ========================================

        let scene, camera, renderer;

        function init() {
            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('gameCanvas'),
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Track engagement on first interaction
            document.addEventListener('click', () => {
                if (!gameStarted) {
                    trackEngagement();
                    startGame();
                }
            }, { once: true });

            animate();
        }

        function startGame() {
            gameStarted = true;
            console.log('[Game] Started');
        }

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        // Initialize
        window.addEventListener('load', init);
    </script>
</body>
</html>
```

---

## Optimization Techniques

### 1. File Size Optimization

#### Use CDN for Libraries
```html
<!-- Instead of bundling, load from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r165/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

#### Minify HTML
```bash
npm install -g html-minifier

html-minifier --collapse-whitespace --remove-comments --minify-css --minify-js index.html -o index.min.html
```

### 2. Asset Loading Optimization

#### Lazy Loading
```javascript
// Load only essential assets first
const essentialAssets = [
    'assets/character.glb',
    'assets/UI/controls.webp'
];

// Load non-essential assets after game starts
const optionalAssets = [
    'assets/environment.glb',
    'assets/effects.webp'
];

function loadEssentialAssets() {
    return Promise.all(
        essentialAssets.map(path => loadAsset(path))
    );
}

function loadOptionalAssets() {
    optionalAssets.forEach(path => loadAsset(path));
}

// Start game with essential assets, load rest in background
loadEssentialAssets().then(() => {
    startGame();
    loadOptionalAssets();
});
```

#### Texture Compression
```javascript
// Use lower resolution textures for mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
const textureQuality = isMobile ? 'low' : 'high';

const texturePath = `assets/texture-${textureQuality}.webp`;
```

### 3. Performance Optimization

#### Reduce Draw Calls
```javascript
// Merge geometries where possible
const geometries = [];
walls.forEach(wall => {
    geometries.push(wall.geometry);
});

const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
const mergedMesh = new THREE.Mesh(mergedGeometry, material);
scene.add(mergedMesh);
```

#### Level of Detail (LOD)
```javascript
const lod = new THREE.LOD();

// High detail (close)
const highDetail = new THREE.Mesh(detailedGeometry, material);
lod.addLevel(highDetail, 0);

// Medium detail
const mediumDetail = new THREE.Mesh(simplifiedGeometry, material);
lod.addLevel(mediumDetail, 10);

// Low detail (far)
const lowDetail = new THREE.Mesh(simpleGeometry, material);
lod.addLevel(lowDetail, 20);

scene.add(lod);
```

---

## Deployment Strategy

### Strategy 1: Standalone Single File (Recommended)

**Pros**:
- Simple upload to LoopMe
- No CORS issues
- Fast deployment

**Cons**:
- Limited to 8MB
- Harder to update assets

**Implementation**:
1. Bundle all assets inline using base64 (for small assets)
2. Host large assets on CDN
3. Create single HTML file

```javascript
// Use CDN for assets
const ASSET_BASE = 'https://your-cdn.com/game';

gltfLoader.load(`${ASSET_BASE}/assets/model.glb`, ...);
textureLoader.load(`${ASSET_BASE}/assets/texture.webp`, ...);
```

### Strategy 2: ZIP Package

**Pros**:
- Can include more assets
- Easier to organize

**Cons**:
- Must stay under 8MB
- More complex upload process

**Implementation**:
```bash
# Create deployment package
zip -r game-loopme.zip index.html assets/ js/
```

### Cloudflare Pages Deployment

#### Step 1: Set Up Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/game.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages
1. Log in to Cloudflare Dashboard
2. Go to Pages > Create a project
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: (leave empty)
   - Build output directory: /
5. Deploy

#### Step 3: Verify CORS
```bash
# Test asset loading
curl -I https://your-project.pages.dev/assets/model.glb

# Should see:
# Access-Control-Allow-Origin: *
```

#### Step 4: Create Standalone Version
```html
<script>
    const ASSET_BASE = 'https://your-project.pages.dev/GameName';
</script>
```

---

## Testing Checklist

### Local Testing
- [ ] Game loads without errors
- [ ] All assets display correctly
- [ ] Controls work on mouse/keyboard
- [ ] Game logic functions properly
- [ ] Animations play smoothly
- [ ] No console errors

### Mobile Testing
- [ ] Touch controls work
- [ ] Game runs at 30+ FPS
- [ ] UI scales correctly on different screen sizes
- [ ] Landscape and portrait orientations work
- [ ] Assets load on 4G connection

### LoopMe Testing
- [ ] File size under 8MB
- [ ] LoopMeAPI.ready() called on load
- [ ] Engagement tracked on first interaction
- [ ] Click tracked on CTA button
- [ ] ClickTag URL opens correctly
- [ ] Works in LoopMe preview tool
- [ ] No external dependencies (except allowed CDNs)

### Cross-Device Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari

### Performance Testing
```javascript
// Add FPS counter for testing
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
    const now = performance.now();
    frames++;

    if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        console.log(`FPS: ${fps}`);

        if (fps < 30) {
            console.warn('Performance issue: FPS below 30');
        }

        frames = 0;
        lastTime = now;
    }
}

function animate() {
    requestAnimationFrame(animate);
    checkFPS();
    renderer.render(scene, camera);
}
```

---

## Common Pitfalls

### 1. File Size Exceeds 8MB

**Problem**: ZIP package or HTML file too large

**Solutions**:
- Use CDN for large assets (models, textures)
- Compress 3D models with Draco
- Convert images to WebP format
- Minify JavaScript code
- Remove unused libraries

### 2. Assets Don't Load (CORS Error)

**Problem**: `Access-Control-Allow-Origin` error in console

**Solutions**:
- Ensure CDN serves files with CORS headers
- Test asset URLs with `curl -I [url]`
- Use Cloudflare Pages (auto-enables CORS)
- Configure S3 bucket CORS policy if using AWS

### 3. Three.js Version Incompatibility

**Problem**: Game works locally but breaks on LoopMe

**Solutions**:
- Use Three.js r165 (confirmed working)
- Test with exact version LoopMe supports
- Avoid using deprecated Three.js features
- Check LoopMe documentation for supported versions

### 4. Mobile Performance Issues

**Problem**: Game runs slowly on mobile devices

**Solutions**:
- Reduce polygon count in 3D models (<50k triangles total)
- Use smaller textures (512x512 or 1024x1024 max)
- Limit number of lights (1 ambient + 1 directional max)
- Disable shadows if not essential
- Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

### 5. LoopMe API Not Working

**Problem**: Tracking events not firing

**Solutions**:
```javascript
// Always check if API exists before calling
if (window.LoopMeAPI) {
    window.LoopMeAPI.trackEngagement();
} else {
    console.warn('LoopMe API not available');
}

// Add debug logging
const LoopMeTracker = {
    ready: () => {
        console.log('[LoopMe] Ready called');
        window.LoopMeAPI?.ready();
    },
    trackEngagement: () => {
        console.log('[LoopMe] Engagement tracked');
        window.LoopMeAPI?.trackEngagement();
    },
    trackClick: () => {
        console.log('[LoopMe] Click tracked');
        window.LoopMeAPI?.trackClick();
    }
};
```

### 6. ClickTag Not Working

**Problem**: Clicking CTA doesn't open landing page

**Solutions**:
```javascript
// Use LoopMe macro correctly
const clickURL = '%%CLICK_URL_UNESC%%'; // Not %%CLICKTAG%%

// Ensure click tracking is called
function handleCTA() {
    if (window.LoopMeAPI) {
        window.LoopMeAPI.trackClick();
    }

    // Add delay to ensure tracking completes
    setTimeout(() => {
        window.open(clickURL, '_blank');
    }, 100);
}
```

### 7. Touch Controls Don't Work

**Problem**: Game only works with mouse

**Solutions**:
```javascript
// Use both touch and mouse events
function setupControls() {
    // Mouse events
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch events
    document.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd, { passive: false });
}

function handleStart(e) {
    e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    // Handle input
}
```

---

## Example: Complete Minimal Game for LoopMe

Here's a complete, minimal example under 8MB:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimal Three.js Game</title>
    <style>
        * { margin: 0; padding: 0; }
        body { overflow: hidden; font-family: Arial; }
        canvas { display: block; }
        #cta {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            background: #ff6600;
            color: white;
            font-size: 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            display: none;
        }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <button id="cta" onclick="handleClick()">TAP TO LEARN MORE</button>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r165/three.min.js"></script>

    <script>
        // LoopMe Config
        const CLICK_URL = '%%CLICK_URL_UNESC%%';
        let engaged = false;

        // Initialize LoopMe
        window.addEventListener('load', () => {
            if (window.LoopMeAPI) window.LoopMeAPI.ready();
        });

        function trackEngagement() {
            if (!engaged && window.LoopMeAPI) {
                window.LoopMeAPI.trackEngagement();
                engaged = true;
            }
        }

        function handleClick() {
            if (window.LoopMeAPI) window.LoopMeAPI.trackClick();
            window.open(CLICK_URL, '_blank');
        }

        // Game Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create rotating cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0xff6600 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        camera.position.z = 5;

        // User interaction
        let rotating = false;
        document.addEventListener('click', () => {
            if (!rotating) {
                trackEngagement();
                rotating = true;
                setTimeout(() => {
                    document.getElementById('cta').style.display = 'block';
                }, 3000);
            }
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            if (rotating) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        }

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    </script>
</body>
</html>
```

**File size**: ~3KB (under 8MB!)

---

## Resources

### Official Documentation
- **Three.js**: https://threejs.org/docs/
- **LoopMe SDK**: https://loopme.com/developers/
- **GSAP**: https://greensock.com/docs/

### Asset Optimization Tools
- **glTF Transform**: https://gltf-transform.donmccurdy.com/
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/

### Testing Tools
- **BrowserStack**: Test on real devices
- **Chrome DevTools**: Mobile device emulation
- **WebPageTest**: Performance testing

### CDN Options
- **Cloudflare Pages**: Free, auto-CORS
- **Netlify**: Free tier available
- **Vercel**: Free for personal projects

---

## Quick Reference

### File Size Budget
```
Total: 8MB max
├── HTML/CSS/JS: 500KB
├── Three.js libs: 1.5MB (or use CDN)
├── 3D Models: 3MB
├── Textures: 2MB
└── Other assets: 1MB
```

### Required LoopMe Calls
```javascript
1. window.LoopMeAPI.ready()           // On page load
2. window.LoopMeAPI.trackEngagement() // On first interaction
3. window.LoopMeAPI.trackClick()      // On CTA click
```

### Performance Targets
- Load time: <3 seconds on 4G
- FPS: 30+ on mobile devices
- First interaction: <1 second response

---

## Conclusion

Building games for LoopMe requires balancing creativity with technical constraints. The key principles:

1. **Start small**: Build a simple prototype first
2. **Optimize early**: Don't wait until the end to think about file size
3. **Test often**: Test on real mobile devices frequently
4. **Use CDNs**: Host heavy assets externally when possible
5. **Follow LoopMe requirements**: Always integrate tracking properly

Good luck building your Three.js game for LoopMe!

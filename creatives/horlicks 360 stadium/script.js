import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls, milkPlane, textPlane;
let isZoomed = false;
let zoomProgress = 0;
let isShaking = false;
let shakeProgress = 0;
let hasTransitioned = false;
let bottleBaseX = 0;
let bottleBaseY = -100;
let bottleBaseZ = -180;

init();
animate();

function init() {

    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const container = document.getElementById('container');
    const logoContainer = document.getElementById('logo-container');
    const borderOverlay = document.getElementById('border-overlay');
    const scanMessage = document.getElementById('scan-message');

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1100);
    camera.position.set(0, 0, 0.1);

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(- 1, 1, 1);

    const texture = new THREE.TextureLoader().load('panorama.webp');
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add milk image on the table
    const milkTexture = new THREE.TextureLoader().load('milk.webp');
    milkTexture.colorSpace = THREE.SRGBColorSpace;

    const milkGeometry = new THREE.PlaneGeometry(160, 160);
    const milkMaterial = new THREE.MeshBasicMaterial({
        map: milkTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });

    milkPlane = new THREE.Mesh(milkGeometry, milkMaterial);
    // Position the milk on the table (closer and lower for better visibility)
    milkPlane.position.set(0, -100, -180);
    scene.add(milkPlane);

    // Add text image under the bottle (hidden initially)
    const textTexture = new THREE.TextureLoader().load('text.webp');
    textTexture.colorSpace = THREE.SRGBColorSpace;

    const textGeometry = new THREE.PlaneGeometry(250, 80);
    const textMaterial = new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        opacity: 0
    });

    textPlane = new THREE.Mesh(textGeometry, textMaterial);
    // Position text below the milk (will be repositioned during zoom)
    textPlane.position.set(0, -200, -180);
    scene.add(textPlane);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 250); // Look towards positive Z (away from milk at negative Z)
    controls.update(); // Apply the target change immediately
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = - 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Stop auto-rotation when user interacts
    controls.addEventListener('start', () => {
        controls.autoRotate = false;
    });

    window.addEventListener('resize', onWindowResize);

    // Handle start interaction
    const startGame = () => {
        startScreen.classList.add('fade-out');
        container.classList.add('visible');
        logoContainer.classList.add('visible');
        borderOverlay.classList.add('visible');
        scanMessage.classList.add('visible');

        // Remove from DOM after transition to save resources
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 800);

        // Ensure auto-rotation is active initially
        controls.autoRotate = true;
    };

    startScreen.addEventListener('click', startGame);
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent double firing if bubbling
        startGame();
    });

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function checkBottleAlignment() {
    if (!milkPlane || isZoomed) return false;

    // Project the milk's 3D position to 2D screen coordinates
    const vector = new THREE.Vector3();
    milkPlane.getWorldPosition(vector);
    vector.project(camera);

    // Convert to screen coordinates
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    // Check if bottle is near center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

    // If bottle is within 100 pixels of center, it's aligned
    return distance < 100 && vector.z < 1; // z < 1 means it's in front of camera
}

function zoomToBottle() {
    isZoomed = true;
    controls.autoRotate = false;
    controls.enabled = false;

    // Hide the border overlay and scan message
    const borderOverlay = document.getElementById('border-overlay');
    if (borderOverlay) {
        borderOverlay.style.opacity = '0';
    }

    const scanMessage = document.getElementById('scan-message');
    if (scanMessage) {
        scanMessage.style.opacity = '0';
    }

    // Show text under the bottle with blinking effect
    if (textPlane) {
        let blinkCount = 0;
        let isVisible = true;

        // Blink the text for 2.5 seconds
        const blinkInterval = setInterval(() => {
            isVisible = !isVisible;
            textPlane.material.opacity = isVisible ? 1 : 0;
            blinkCount++;

            // Stop blinking after 2.5 seconds (approximately 8 blinks at 300ms interval)
            if (blinkCount >= 8) {
                clearInterval(blinkInterval);
                textPlane.material.opacity = 1; // Make sure it stays visible

                // After blinking, wait a moment then start shaking
                setTimeout(() => {
                    isShaking = true;
                }, 500);
            }
        }, 300);
    }
}

function animate() {

    requestAnimationFrame(animate);

    if (!isZoomed) {
        controls.update();
    }

    // Make milk always face the camera (billboard effect)
    if (milkPlane) {
        milkPlane.lookAt(camera.position);
    }

    // Make text always face the camera too
    if (textPlane) {
        textPlane.lookAt(camera.position);
    }

    // Check if bottle is aligned with border
    if (checkBottleAlignment() && !isZoomed) {
        zoomToBottle();
    }

    // Animate zoom
    if (isZoomed && zoomProgress < 1) {
        zoomProgress += 0.02;

        // Move camera towards milk
        const milkPos = new THREE.Vector3();
        milkPlane.getWorldPosition(milkPos);

        // Calculate target position (further back to make bottle smaller)
        const targetPos = new THREE.Vector3(milkPos.x, milkPos.y + 30, milkPos.z + 120);

        camera.position.lerp(targetPos, 0.05);

        // Look at a point between bottle and text
        const lookAtPoint = new THREE.Vector3(milkPos.x, milkPos.y - 50, milkPos.z);
        camera.lookAt(lookAtPoint);

        // Position text properly below the bottle
        if (textPlane) {
            // Move text closer to camera (forward in Z) so it appears in front
            textPlane.position.set(milkPos.x, milkPos.y - 110, milkPos.z + 20);
        }
    }

    // Shake animation
    if (isShaking) {
        if (shakeProgress < 1) {
            shakeProgress += 0.015;

            // Create shake effect by moving bottle left and right with rotation
            const shakeX = Math.sin(shakeProgress * Math.PI * 15) * 25 * (1 - shakeProgress);
            const shakeY = Math.sin(shakeProgress * Math.PI * 12) * 15 * (1 - shakeProgress);
            const shakeRotation = Math.sin(shakeProgress * Math.PI * 20) * 0.3 * (1 - shakeProgress);

            if (milkPlane) {
                milkPlane.position.x = bottleBaseX + shakeX;
                milkPlane.position.y = bottleBaseY + shakeY;
                milkPlane.position.z = bottleBaseZ;
                milkPlane.rotation.z = shakeRotation;
            }
        } else {
            // Shake is complete - reset position
            isShaking = false;
            if (milkPlane) {
                milkPlane.position.x = bottleBaseX;
                milkPlane.position.y = bottleBaseY;
                milkPlane.position.z = bottleBaseZ;
                milkPlane.rotation.z = 0;
            }

            // Transition to blue bottle
            if (!hasTransitioned) {
                hasTransitioned = true;

                // Fade out text
                if (textPlane) {
                    const fadeOutInterval = setInterval(() => {
                        if (textPlane.material.opacity > 0) {
                            textPlane.material.opacity -= 0.15;
                        } else {
                            clearInterval(fadeOutInterval);

                            // After text disappears, show the pins and instructions
                            const pinsContainer = document.getElementById('pins-container');
                            const instructionText = document.getElementById('instruction-text');
                            if (pinsContainer) {
                                pinsContainer.classList.add('visible');
                                // Setup drag and drop for pins
                                setupDragAndDrop();
                            }
                            if (instructionText) {
                                instructionText.classList.add('visible');
                            }
                        }
                    }, 30);
                }

                // Change bottle texture to blue.webp
                if (milkPlane) {
                    const blueTexture = new THREE.TextureLoader().load('blue.webp');
                    blueTexture.colorSpace = THREE.SRGBColorSpace;
                    milkPlane.material.map = blueTexture;
                    milkPlane.material.needsUpdate = true;
                }
            }
        }
    }

    renderer.render(scene, camera);

}

// Drag and drop functionality for pins
function setupDragAndDrop() {
    const pins = document.querySelectorAll('.benefit-pin');
    let draggedPin = null;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    let droppedPinsCount = 0;

    // Bottle texture progression
    const bottleTextures = ['1-3.webp', '1-2.webp', '2-3.webp', 'r.webp'];

    pins.forEach(pin => {
        // Mouse events
        pin.addEventListener('mousedown', startDrag);
        pin.addEventListener('touchstart', startDrag);
    });

    function startDrag(e) {
        e.preventDefault();
        draggedPin = e.currentTarget;
        draggedPin.classList.add('dragging');

        // Hide drag hint on first interaction
        const dragHint = document.getElementById('drag-hint');
        if (dragHint) {
            dragHint.classList.add('hidden');
        }

        // Get initial position
        const touch = e.touches ? e.touches[0] : e;
        initialX = touch.clientX;
        initialY = touch.clientY;

        const rect = draggedPin.getBoundingClientRect();
        currentX = rect.left;
        currentY = rect.top;

        // Convert to fixed positioning for dragging
        draggedPin.style.position = 'fixed';
        draggedPin.style.left = currentX + 'px';
        draggedPin.style.top = currentY + 'px';
        draggedPin.style.right = 'auto';
        draggedPin.style.zIndex = '10000';

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    function drag(e) {
        if (!draggedPin) return;
        e.preventDefault();

        const touch = e.touches ? e.touches[0] : e;
        const deltaX = touch.clientX - initialX;
        const deltaY = touch.clientY - initialY;

        currentX += deltaX;
        currentY += deltaY;

        draggedPin.style.left = currentX + 'px';
        draggedPin.style.top = currentY + 'px';

        initialX = touch.clientX;
        initialY = touch.clientY;
    }

    function endDrag(e) {
        if (!draggedPin) return;

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);

        // Check if pin is dropped on the bottle
        if (isOverBottle(draggedPin)) {
            // Get pin position for effect
            const pinRect = draggedPin.getBoundingClientRect();
            const pinCenterX = pinRect.left + pinRect.width / 2;
            const pinCenterY = pinRect.top + pinRect.height / 2;

            // Create drop effect
            createDropEffect(pinCenterX, pinCenterY);

            // Make pin disappear with animation
            draggedPin.classList.add('dropped');
            setTimeout(() => {
                draggedPin.remove();
            }, 300);

            // Change bottle texture based on dropped pins count
            droppedPinsCount++;
            if (milkPlane && droppedPinsCount <= bottleTextures.length) {
                const newTexture = new THREE.TextureLoader().load(bottleTextures[droppedPinsCount - 1]);
                newTexture.colorSpace = THREE.SRGBColorSpace;
                milkPlane.material.map = newTexture;
                milkPlane.material.needsUpdate = true;
            }

            // Hide instruction text when all pins are dropped
            if (droppedPinsCount === 4) {
                const instructionText = document.getElementById('instruction-text');
                const finalText = document.getElementById('final-text');
                const finalCtaScreen = document.getElementById('final-cta-screen');

                if (instructionText) {
                    instructionText.classList.remove('visible');
                }
                // Show final text after instruction fades out
                setTimeout(() => {
                    if (finalText) {
                        finalText.classList.add('visible');
                    }

                    // Show final CTA screen 2 seconds after final text appears
                    setTimeout(() => {
                        if (finalCtaScreen) {
                            finalCtaScreen.classList.add('visible');

                            // Make entire CTA screen clickable to redirect to website
                            finalCtaScreen.addEventListener('click', () => {
                                window.open('https://www.horlicks.in/', '_blank');
                            });
                        }
                    }, 2000);
                }, 800);
            }
        } else {
            // Return to original position if not dropped on bottle
            draggedPin.classList.remove('dragging');
            draggedPin.style.position = 'absolute';
            draggedPin.style.left = '';
            draggedPin.style.top = '';
            draggedPin.style.right = '';
            draggedPin.style.zIndex = '';
        }

        draggedPin = null;
    }

    function isOverBottle(pin) {
        if (!milkPlane) return false;

        // Project the milk's 3D position to 2D screen coordinates
        const vector = new THREE.Vector3();
        milkPlane.getWorldPosition(vector);
        vector.project(camera);

        // Convert to screen coordinates
        const bottleX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const bottleY = (vector.y * -0.5 + 0.5) * window.innerHeight;

        // Get pin position
        const pinRect = pin.getBoundingClientRect();
        const pinX = pinRect.left + pinRect.width / 2;
        const pinY = pinRect.top + pinRect.height / 2;

        // Check if pin is within 150 pixels of bottle center (larger drop zone)
        const distance = Math.sqrt(Math.pow(pinX - bottleX, 2) + Math.pow(pinY - bottleY, 2));
        return distance < 150;
    }
}

// Create drop effect with particles and ripple
function createDropEffect(x, y) {
    const container = document.getElementById('drop-effect');

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'drop-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    container.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Create burst particles
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'drop-particle';

        // Calculate random direction for particle
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

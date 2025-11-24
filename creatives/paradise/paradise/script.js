document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const bottomImg = document.getElementById('bottomImg');
    const topCanvas = document.getElementById('topCanvas');
    const topVideo = document.getElementById('topVideo');
    const closebtn = document.querySelector('.close-btn')
    const muteBtn = document.getElementById('muteBtn');
    const ctx = topCanvas.getContext('2d');
    let timeout;
    let scratching = false;
    const brushSize = 30; // Brush size for scratching

    // Create and configure the gesture image dynamically
    const gestureImg = document.createElement('img');
    gestureImg.src = 'assets/gesture.png'; // Path to the gesture image
    gestureImg.id = 'gestureImg';
    document.getElementById('container').appendChild(gestureImg);

    // Create a mask canvas to track scratched areas
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    // Gesture animation variables
    const maxMovement = 50; // Maximum movement range in pixels
    const animationDuration = 1000; // 1 second per cycle
    let startTimestamp; // Tracks when the animation started
    let animationRunning = true;

    // Wait for both images to load
    bottomImg.src = 'assets/Bottom_image.png';
    // Remove topImg, use video instead

    // Wait for both bottom image and video to be ready
    Promise.all([
        new Promise((resolve) => (bottomImg.onload = resolve)),
        new Promise((resolve) => (topVideo.oncanplay = resolve)),
    ]).then(() => {
        // Once both are loaded, resize and draw the canvas
        resizeCanvas();
        drawVideoFrame();

        // Ensure the bottom image is properly styled
        bottomImg.style.width = '100%';
        bottomImg.style.height = '100%';
        bottomImg.style.position = 'absolute';
        bottomImg.style.top = '0';
        bottomImg.style.left = '0';
        bottomImg.style.zIndex = '1'; // Ensure it's behind the canvas

        // Ensure the canvas is properly styled
        topCanvas.style.position = 'absolute';
        topCanvas.style.top = '0';
        topCanvas.style.left = '0';
        topCanvas.style.zIndex = '2'; // Ensure it's above the bottom image
    });

    function resizeCanvas() {
        topCanvas.width = container.clientWidth;
        topCanvas.height = container.clientHeight;
        maskCanvas.width = container.clientWidth;
        maskCanvas.height = container.clientHeight;

        // Adjust the gesture image dimensions and position
        gestureImg.style.width = '25%'; // Set width as a percentage of the container
        gestureImg.style.height = '12%'; // Set height as a percentage of the container
        gestureImg.style.top = '78%'; // Position vertically
        gestureImg.style.left = '50%'; // Center horizontally
        gestureImg.style.position = 'absolute';
        // gestureImg.style.backgroundColor = 'white';
        gestureImg.style.borderRadius = '50%';
        gestureImg.style.transform = 'translate(-50%, -50%)'; // Keep it centered
        gestureImg.style.zIndex = '100'; // Keep it above other elements
    }

    function handleFadeOut() {
        topCanvas.style.transition = 'opacity 1s ease';
        topCanvas.style.opacity = '0';

        // Fade out and hide gesture image
        gestureImg.style.transition = 'opacity 0.5s ease';
        gestureImg.style.opacity = '0';

        setTimeout(() => {
            gestureImg.style.display = 'none'; // Set display to none after fading out
        }, 500);
    }

    // Mute/unmute button logic
    function updateMuteBtn() {
        muteBtn.textContent = topVideo.muted ? '🔇' : '🔊';
    }
    muteBtn.addEventListener('click', function () {
        topVideo.muted = !topVideo.muted;
        updateMuteBtn();
    });
    updateMuteBtn();

    function startScratching() {
        scratching = true;
        if (!timeout) {
            timeout = setTimeout(handleFadeOut, 4500);
        }
        // Always play from start on first interaction
        if (topVideo.currentTime > 0.1) {
            topVideo.currentTime = 0;
            topVideo.play();
        }
        // Unmute video on first user interaction (optional, can comment if not desired)
        // if (topVideo.muted) {
        //     topVideo.muted = false;
        //     topVideo.volume = 1.0;
        //     updateMuteBtn();
        // }
        // Stop gesture movement when user starts interacting
        animationRunning = false;
        gestureImg.style.transition = 'opacity 0.5s ease';
        gestureImg.style.opacity = '0';
        setTimeout(() => {
            gestureImg.style.display = 'none';
        }, 500);
    }

    function stopScratching() {
        scratching = false;
    }

    let revealed = false; // Track if the bottom image is revealed

    function scratch(e) {
        if (!scratching) return;
        let x, y;
        if (e.touches) {
            const touch = e.touches[0];
            x = touch.clientX - topCanvas.getBoundingClientRect().left;
            y = touch.clientY - topCanvas.getBoundingClientRect().top;
        } else {
            x = e.clientX - topCanvas.getBoundingClientRect().left;
            y = e.clientY - topCanvas.getBoundingClientRect().top;
        }
        // Draw on the mask with a smaller, softer brush
        const r = brushSize * 1.05;
        const grad = maskCtx.createRadialGradient(x, y, r * 0.3, x, y, r);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        maskCtx.globalCompositeOperation = 'source-over';
        maskCtx.beginPath();
        maskCtx.arc(x, y, r, 0, 2 * Math.PI);
        maskCtx.closePath();
        maskCtx.fillStyle = grad;
        maskCtx.fill();
    }

    function drawVideoFrame() {
        // Draw the current video frame onto the canvas
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, topCanvas.width, topCanvas.height);
        ctx.drawImage(topVideo, 0, 0, topCanvas.width, topCanvas.height);
        // Use the mask to erase scratched areas
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(maskCanvas, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        // Continue updating if video is playing
        if (!topVideo.paused && !topVideo.ended) {
            requestAnimationFrame(drawVideoFrame);
        } else {
            // If paused, try again soon
            setTimeout(drawVideoFrame, 100);
        }
    }

    // When video plays, start drawing frames
    topVideo.addEventListener('play', function () {
        requestAnimationFrame(drawVideoFrame);
    });

    // Gesture animation
    function startGestureAnimation(timestamp) {
        if (!startTimestamp) {
            startTimestamp = timestamp; // Initialize the start time
        }

        const elapsed = timestamp - startTimestamp; // Elapsed time since the animation started
        const progress = (elapsed % animationDuration) / animationDuration; // Progress within the current cycle

        // Add easing for a smooth start
        const easingFactor = Math.min(elapsed / 1000, 1); // Gradually increase to 1 over 1 second
        const movement = Math.sin(progress * 2 * Math.PI) * maxMovement * easingFactor;

        gestureImg.style.transform = `translate(-50%, -50%) translateX(${movement}px)`;

        if (animationRunning) {
            requestAnimationFrame(startGestureAnimation); // Continue the animation loop
        }
    }

    // Start the gesture animation loop
    requestAnimationFrame(startGestureAnimation);

    // Mouse Events
    topCanvas.addEventListener('mousedown', startScratching);
    topCanvas.addEventListener('mouseup', stopScratching);
    topCanvas.addEventListener('mousemove', scratch);

    // Touch Events
    topCanvas.addEventListener('touchstart', startScratching);
    topCanvas.addEventListener('touchend', stopScratching);
    topCanvas.addEventListener('touchmove', scratch);

    // Resize canvas when the window resizes
    window.addEventListener('resize', resizeCanvas);
    closebtn.addEventListener('click', () => {
        container.style.display = 'none';
    })
});

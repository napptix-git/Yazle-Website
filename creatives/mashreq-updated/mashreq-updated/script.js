document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const bottomImg = document.getElementById('bottomImg');
    const topCanvas = document.getElementById('topCanvas');
    const ctx = topCanvas.getContext('2d');
    const gestureImg = document.getElementById('gestureImg');

    let scratching = false;
    let revealTriggered = false; // prevent multiple triggers
    const brushSize = 50;

    // Prevent multiple bindings
    let bottomClickBound = false;

    // --- NEW: track top image to draw with aspect-fit (no stretch) ---
    const topImg = new Image();
    topImg.src = 'assets/Top_image.jpeg';

    function resizeCanvas() {
        topCanvas.width = container.clientWidth;
        topCanvas.height = container.clientHeight;
        // redraw the top image with aspect-fit whenever we resize
        if (topImg.complete && topImg.naturalWidth) {
            drawTopImageAspectFit();
        }
    }

    // --- NEW: draw top image with aspect-fit onto the canvas ---
    function drawTopImageAspectFit() {
        const cw = topCanvas.width;
        const ch = topCanvas.height;
        const iw = topImg.naturalWidth;
        const ih = topImg.naturalHeight;

        // compute scale to fit (contain) without distortion
        const scale = Math.min(cw / iw, ch / ih);
        const drawW = iw * scale;
        const drawH = ih * scale;
        const dx = (cw - drawW) / 2;
        const dy = (ch - drawH) / 2;

        // clear and draw letterboxed (no stretching)
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(topImg, dx, dy, drawW, drawH);
    }

    topImg.onload = function () {
        resizeCanvas();
        drawTopImageAspectFit();

        bottomImg.src = 'assets/Bottom_image.jpeg';
        bottomImg.onload = () => {
            bottomImg.style.visibility = 'visible';
            gestureImg.style.display = 'block';
            bottomImg.style.pointerEvents = 'none'; // disable click until reveal
        };
    };

    function handleFadeOut() {
        topCanvas.style.transition = 'opacity 1s ease';
        topCanvas.style.opacity = '0';

        topCanvas.addEventListener('transitionend', function revealCelebration() {
            topCanvas.removeEventListener('transitionend', revealCelebration);

            // ✅ Enable bottom image click now
            topCanvas.style.pointerEvents = 'none';
            bottomImg.style.pointerEvents = 'auto';
            bottomImg.style.cursor = 'pointer';

            if (!bottomClickBound) {
                bottomImg.addEventListener('click', function () {
                    window.open('https://mashreq.com/play', '_blank'); // change URL as needed
                });
                bottomClickBound = true;
            }

            document.getElementById('leftParty').style.display = 'block';
            document.getElementById('rightParty').style.display = 'block';
            launchConfetti();
        });
    }

    let lastX, lastY;

    function scratch(e) {
        if (!scratching || revealTriggered) return;

        // --- NEW: prevent page scroll during touch scratch ---
        if (e.cancelable) e.preventDefault();

        let x, y;
        const rect = topCanvas.getBoundingClientRect();

        if (e.touches && e.touches[0]) {
            const touch = e.touches[0];
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round'; // smooth edges
        ctx.lineWidth = brushSize;

        if (lastX === undefined || lastY === undefined) {
            lastX = x;
            lastY = y;
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;

        checkScratchPercentage();
    }

    function startScratching(e) {
        scratching = true;
        gestureImg.style.display = 'none';
        lastX = undefined;
        lastY = undefined;
        // prevent scroll jump when the first touch starts
        if (e && e.cancelable) e.preventDefault();
    }

    function stopScratching() {
        scratching = false;
    }

    function checkScratchPercentage() {
        const imageData = ctx.getImageData(0, 0, topCanvas.width, topCanvas.height);
        let clearedPixels = 0;
        const totalPixels = imageData.data.length / 4;

        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) clearedPixels++;
        }

        const percent = (clearedPixels / totalPixels) * 100;

        if (percent >= 25 && !revealTriggered) {
            revealTriggered = true;
            setTimeout(handleFadeOut, 500); // reveal after 0.5 sec
        }
    }

    // Mouse
    topCanvas.addEventListener('mousedown', startScratching);
    topCanvas.addEventListener('mouseup', stopScratching);
    topCanvas.addEventListener('mousemove', scratch);

    // Touch (passive:false so we can preventDefault to stop page scroll)
    topCanvas.addEventListener('touchstart', startScratching, { passive: false });
    topCanvas.addEventListener('touchend', stopScratching, { passive: false });
    topCanvas.addEventListener('touchmove', scratch, { passive: false });

    window.addEventListener('resize', resizeCanvas);
});

function closeAd() {
    document.getElementById('container').style.display = 'none';
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const confettiCount = 80;
    const confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            width: Math.random() * 8 + 4,
            height: Math.random() * 14 + 6,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            speedY: -(Math.random() * 14 + 10),
            speedX: (Math.random() - 0.5) * 6,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 4 - 2,
            alpha: 1
        });
    }

    let animationFrame;
    let startTime = Date.now();
    const gravity = 0.35;
    const fadeSpeed = 0.015;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.save();
            ctx.globalAlpha = c.alpha;
            ctx.translate(c.x, c.y);
            ctx.rotate((c.rotation * Math.PI) / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
            ctx.restore();
        });
    }

    function update() {
        confetti.forEach(c => {
            c.x += c.speedX;
            c.y += c.speedY;
            c.speedY += gravity;
            c.rotation += c.rotationSpeed;
            c.alpha -= fadeSpeed;
        });
    }

    function loop() {
        const elapsed = Date.now() - startTime;
        if (elapsed < 2000) {
            draw();
            update();
            animationFrame = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const left = document.getElementById('leftParty');
            const right = document.getElementById('rightParty');

            [left, right].forEach(img => {
                img.style.transition = 'opacity 0.8s ease';
                img.style.opacity = '0';
            });

            setTimeout(() => {
                left.style.display = 'none';
                right.style.display = 'none';
            }, 800);
        }
    }

    loop();
}

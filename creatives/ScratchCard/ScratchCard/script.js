document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const bottomImg = document.getElementById('bottomImg');
    const topCanvas = document.getElementById('topCanvas');
    const ctx = topCanvas.getContext('2d');

    let timeout;
    let scratching = false;
    const brushSize = 30;

    function resizeCanvas() {
        topCanvas.width = container.clientWidth;
        topCanvas.height = container.clientHeight;
    }

    // Load top image first
    const topImg = new Image();
    topImg.src = 'assets/Top_image.jpeg';

    topImg.onload = function () {
        resizeCanvas();
        ctx.drawImage(topImg, 0, 0, topCanvas.width, topCanvas.height);

        // Load bottom image after top is painted
        bottomImg.src = 'assets/Bottom_image.jpeg';

        bottomImg.onload = () => {
            bottomImg.style.visibility = 'visible'; // Reveal only when fully loaded
        };
    };

    // Scratch logic
    function handleFadeOut() {
        topCanvas.style.transition = 'opacity 1s ease';
        topCanvas.style.opacity = '0';

        topCanvas.addEventListener('transitionend', function revealCelebration() {
            topCanvas.removeEventListener('transitionend', revealCelebration);

            document.getElementById('leftParty').style.display = 'block';
            document.getElementById('rightParty').style.display = 'block';

            launchConfetti();
        });
    }

    function startScratching() {
        scratching = true;
        if (!timeout) {
            timeout = setTimeout(handleFadeOut, 2000);
        }
    }

    function stopScratching() {
        scratching = false;
    }

    function scratch(e) {
        if (!scratching) return;
        let x, y;
        const rect = topCanvas.getBoundingClientRect();

        if (e.touches) {
            const touch = e.touches[0];
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Event listeners
    topCanvas.addEventListener('mousedown', startScratching);
    topCanvas.addEventListener('mouseup', stopScratching);
    topCanvas.addEventListener('mousemove', scratch);
    topCanvas.addEventListener('touchstart', startScratching);
    topCanvas.addEventListener('touchend', stopScratching);
    topCanvas.addEventListener('touchmove', scratch);

    window.addEventListener('resize', resizeCanvas);
});

function closeAd() {
    document.getElementById('container').style.display = 'none';
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const confettiCount = 120;
    const confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.getElementById('leftParty').style.display = 'block';
    document.getElementById('rightParty').style.display = 'block';

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            width: Math.random() * 12 + 6,
            height: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            tilt: Math.random() * 360,
            tiltSpeed: Math.random() * 4 - 2,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1
        });
    }

    let animationFrame;
    let startTime = Date.now();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate((c.rotation * Math.PI) / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
            ctx.restore();
        });
    }

    function update() {
        confetti.forEach(c => {
            c.y += c.speedY;
            c.x += c.speedX;
            c.rotation += c.rotationSpeed;
            c.tilt += c.tiltSpeed;

            if (c.x < 0 || c.x > canvas.width) c.speedX *= -1;
        });
    }

    function loop() {
        const elapsed = Date.now() - startTime;
        if (elapsed < 7000) {
            draw();
            update();
            animationFrame = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('leftParty').style.display = 'none';
            document.getElementById('rightParty').style.display = 'none';
        }
    }

    loop();
}

const BALL_FLIGHT_DURATION = 1200;

const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const gameUI = document.getElementById('gameUI');
const ballsRow = document.getElementById('ballsRow');
const hitBtn = document.getElementById('hitBtn');
const ballAnim = document.getElementById('ballAnim');
const boostPopup = document.getElementById('boostPopup');
const boostBtn = document.getElementById('boostBtn');
const batsman = document.getElementById('batsman');
const batsmanImg = document.getElementById('batsmanImg');

let midOverlay = document.createElement('div');
midOverlay.className = "overlay mid-overlay hide";
midOverlay.style.zIndex = 20;
midOverlay.innerHTML = `<button id="midContinue" class="big-btn">Continue</button>`;
document.body.appendChild(midOverlay);
const midContinueBtn = midOverlay.querySelector('#midContinue');
midContinueBtn.style.position = 'absolute';
midContinueBtn.style.bottom = '30px';

let endOverlay = document.createElement('div');
endOverlay.className = "overlay end-overlay hide";
endOverlay.style.zIndex = 20;
document.body.appendChild(endOverlay);

let balls, currentBall, boosted, scores, canHit, totalScore, powerOver = false;
let lastHitTime = 0;
let isEndScreenShown = false;
const DEBOUNCE_TIME = 200;

function showScreen(screenToShow, ...screensToHide) {
    if (screenToShow) {
        screenToShow.classList.remove('hide', 'fade-out');
        screenToShow.classList.add('fade-in');
        setTimeout(() => screenToShow.classList.remove('fade-in'), 600);
    }
    screensToHide.forEach(el => {
        if (el && !el.classList.contains('hide')) {
            el.classList.add('fade-out');
            setTimeout(() => {
                el.classList.remove('fade-out');
                el.classList.add('hide');
            }, 500);
        }
    });
}

function showHitEffect(text, color = "#ff8300") {
    const effect = document.createElement('div');
    effect.className = 'hit-effect';
    effect.style.color = color;
    effect.innerText = text;
    document.querySelector('.pitch').appendChild(effect);
    setTimeout(() => effect.remove(), 700);
}

function resetGame() {
    balls = Array(6).fill(null);
    currentBall = 0;
    boosted = false;
    scores = [];
    canHit = false;
    totalScore = 0;
    powerOver = false;
    lastHitTime = 0;
    isEndScreenShown = false;
    endOverlay.innerHTML = '';
    endOverlay.style.background = 'none';
    endOverlay.style.opacity = '1';
    endOverlay.style.transition = '';
    batsmanImg.src = "assets/stand.png";
    renderBalls();
}

function renderBalls() {
    ballsRow.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        let cls = 'ball-indicator';
        if (balls[i] === 6) cls += ' six';
        else if (balls[i] === 4) cls += ' run';
        else if (balls[i] === 0 && balls[i] !== null) cls += ' miss';
        else if (balls[i]) cls += ' run';
        if (i === currentBall && balls[i] !== null) cls += ' pop';

        // Update: Show W instead of 0
        let ballText = '';
        if (balls[i] !== null) {
            if (balls[i] === 0) {
                ballText = 'W'; // Show W for wicket/bowled
            } else {
                ballText = balls[i];
            }
        }
        ballsRow.innerHTML += `<div class="${cls}">${ballText}</div>`;
    }
    setTimeout(() => {
        document.querySelectorAll('.ball-indicator.pop').forEach(el => el.classList.remove('pop'));
    }, 600);
}


function showBallAnim(onDone) {
    const pitch = document.querySelector('.pitch');
    const pitchRect = pitch.getBoundingClientRect();
    const hitBtnRect = hitBtn.getBoundingClientRect();
    const batsmanRect = batsman.getBoundingClientRect();

    const startX = (hitBtnRect.left + hitBtnRect.width / 2) - pitchRect.left;
    const startY = (hitBtnRect.top + hitBtnRect.height / 2) - pitchRect.top;
    const endX = (batsmanRect.left + batsmanRect.width / 2) - pitchRect.left;
    const endY = (batsmanRect.bottom) - pitchRect.top;
    const controlX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - 180;

    ballAnim.style.display = 'block';
    ballAnim.className = 'ball-anim show';

    let duration = BALL_FLIGHT_DURATION;
    let startTime = null;
    let animationEnded = false;

    function quadraticBezier(p0, p1, p2, t) {
        const u = 1 - t;
        return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    }

    function animateBall(ts) {
        if (!startTime) startTime = ts;
        const t = Math.min((ts - startTime) / duration, 1);
        const x = quadraticBezier(startX, controlX, endX, t);
        const y = quadraticBezier(startY, controlY, endY, t);
        const scale = 1 - 0.3 * t;

        ballAnim.style.left = `${x}px`;
        ballAnim.style.top = `${y}px`;
        ballAnim.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (t >= 1 && !animationEnded) {
            animationEnded = true;
            ballAnim.className = 'ball-anim';
            ballAnim.style.display = 'none';
            if (onDone) onDone();
        } else if (!animationEnded) {
            ballAnim._raf = requestAnimationFrame(animateBall);
        }
    }
    ballAnim.style.left = `${startX}px`;
    ballAnim.style.top = `${startY}px`;
    ballAnim.style.transform = `translate(-50%, -50%) scale(1)`;
    if (ballAnim._raf) cancelAnimationFrame(ballAnim._raf);
    ballAnim._raf = requestAnimationFrame(animateBall);
}

function handleHit() {
    const now = Date.now();
    if (now - lastHitTime < DEBOUNCE_TIME || !canHit) return;
    lastHitTime = now;
    canHit = false;
    hitBtn.classList.add('disabled');
    showBallAnim(() => {
        if (!powerOver) {
            batsman.classList.add('batsman-anim');
            batsmanImg.src = "assets/hit.png";
            batsmanImg.style.width = "140%";
            batsmanImg.style.height = "140%";
            let run, effectText, effectColor;
            if (currentBall === 0) {
                run = 4;
                effectText = "FOUR!";
                effectColor = "#62d273";
            } else if (currentBall === 1) {
                run = 6;
                effectText = "SIX!";
                effectColor = "#ff8300";
            } else if (currentBall === 2) {
                run = 4;
                effectText = "ANOTHER HIT!";
                effectColor = "#22aaff";
            }
            showHitEffect(effectText, effectColor);
            balls[currentBall] = run;
            scores.push(run);
            setTimeout(() => {
                batsman.classList.remove('batsman-anim');
                batsmanImg.src = "assets/stand.png";
                batsmanImg.style.width = "";
                batsmanImg.style.height = "";
                currentBall++;
                nextBall();
            }, 400);
        } else {
            // Last 3 balls: BOWLED, Hide stumps
            batsman.classList.add('batsman-anim');
            batsmanImg.src = "assets/bowled.png";
            batsmanImg.style.width = "";
            batsmanImg.style.height = "";
            const stumps = document.getElementById('stumpsImg');
            if (stumps) stumps.style.display = "none";
            showHitEffect("BOWLED!", "#f33");
            balls[currentBall] = 0;
            scores.push(0);
            setTimeout(() => {
                batsman.classList.remove('batsman-anim');
                batsmanImg.src = "assets/stand.png";
                batsmanImg.style.width = "";
                batsmanImg.style.height = "";
                if (stumps) stumps.style.display = "";
                currentBall++;
                nextBall();
            }, 700);
        }
        renderBalls();
    });
}

function nextBall() {
    batsmanImg.src = "assets/stand.png";
    if (currentBall === 3 && !powerOver) {
        showScreen(midOverlay, gameUI);
        return;
    }
    if (currentBall >= 6 && !isEndScreenShown) {
        renderBalls();
        setTimeout(showEnd, 700);
        return;
    }
    renderBalls();
    canHit = true;
    hitBtn.classList.remove('disabled');
    // No auto-ball, wait for HIT.
}

function showBoost() {
    boosted = true;
    showScreen(boostPopup, gameUI);
}

function showEnd() {
    if (isEndScreenShown) return;
    isEndScreenShown = true;

    totalScore = scores.reduce((a, b) => a + b, 0);
    endOverlay.innerHTML = `
    <h2 id="scoreCard" style="font-size: 30px; color: #111; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 2vh; text-align: center; z-index: 21; position: relative;">
        You Played Very Well!<br>
        You gave <span style="color:#e3223c">${totalScore}</span> runs<br>
        and took a hat-trick!
    </h2>
`;

    endOverlay.style.background = 'rgba(255, 253, 238, 0.95)';
    endOverlay.style.opacity = '1';
    endOverlay.style.transition = 'none';
    endOverlay.classList.remove('bg-animate');

    showScreen(endOverlay, gameUI, midOverlay, startScreen, boostPopup);

    setTimeout(() => {
        const scoreEl = document.getElementById('scoreCard');
        if (scoreEl) scoreEl.classList.add('score-animate');
        endOverlay.style.transition = 'opacity 0.6s';
        endOverlay.style.opacity = '0';

        setTimeout(() => {
            endOverlay.innerHTML = '';
            endOverlay.style.background = "url('assets/endscreen.jpeg') no-repeat center";
            endOverlay.style.backgroundSize = 'contain';
            endOverlay.classList.add('bg-animate');
            endOverlay.style.transition = 'opacity 1.2s';
            endOverlay.style.opacity = '0';

            setTimeout(() => {
                endOverlay.style.opacity = '1';
                hitBtn.classList.add('disabled');
                startBtn.onclick = null;
                boostBtn.onclick = null;
                midContinueBtn.onclick = null;
            }, 60);
        }, 600);
    }, 2000);
}

boostBtn.onclick = function() {
    showScreen(gameUI, boostPopup);
    setTimeout(nextBall, 350);
};

midContinueBtn.onclick = function() {
    powerOver = true;
    showScreen(gameUI, midOverlay);
    setTimeout(nextBall, 700);
};

startBtn.onclick = function() {
    resetGame();
    showScreen(gameUI, startScreen, boostPopup, endOverlay, midOverlay);
    setTimeout(nextBall, 700);
};

hitBtn.onclick = handleHit;

window.onload = () => {
    resetGame();
    renderBalls();
    showScreen(startScreen, gameUI, boostPopup, endOverlay, midOverlay);
};

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
midOverlay.innerHTML = `
    <button id="midContinue" class="big-btn">Continue</button>
`;
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
let isEndScreenShown = false; // Guard to prevent multiple showEnd calls
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
    isEndScreenShown = false; // Reset end screen flag
    endOverlay.innerHTML = ''; // Clear endOverlay content
    endOverlay.style.background = 'none'; // Reset background
    endOverlay.style.opacity = '1'; // Reset opacity
    endOverlay.style.transition = ''; // Clear transition
    batsmanImg.src = "assets/playerstand.png";
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

        // Ball numbers 1–6, show number even if not played yet
        let ballText = balls[i] !== null ? balls[i] : '';
        ballsRow.innerHTML += `<div class="${cls}">${ballText}</div>`;
    }
    setTimeout(() => {
        document.querySelectorAll('.ball-indicator.pop').forEach(el => el.classList.remove('pop'));
    }, 600);
}

function registerHit(run, missed = false) {
    hitBtn.classList.add('disabled');
    balls[currentBall] = run;
    scores.push(run);
    renderBalls(); // Update UI immediately after the hit
    currentBall++;
    setTimeout(nextBall, 700);
}


function showBallAnim() {
    const pitch = document.querySelector('.pitch');
    const pitchRect = pitch.getBoundingClientRect();
    const hitBtnRect = hitBtn.getBoundingClientRect();
    const pitchHeight = pitchRect.height;
    const pitchWidth = pitchRect.width;

    const startX = pitchWidth * 0.5;
    const startY = hitBtnRect.top - pitchRect.top + hitBtnRect.height / 2;
    const endX = pitchWidth * 0.5;
    const endY = pitchHeight * 0.65;
    const ctrlY = pitchHeight * 0.2;

    ballAnim.style.display = 'block';
    ballAnim.className = 'ball-anim show';

    let duration = BALL_FLIGHT_DURATION;
    let startTime = null;
    let animationEnded = false;
    let ballActive = true;

    canHit = true;
    hitBtn.classList.remove('disabled');

    function quadraticBezier(p0, p1, p2, t) {
        const u = 1 - t;
        return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    }

    function doHit(run, effectText, effectColor) {
        if (!ballActive) return;
        ballActive = false;
        canHit = false;
        animationEnded = true;
        if (ballAnim._raf) cancelAnimationFrame(ballAnim._raf);
        ballAnim.className = 'ball-anim hit';
        batsman.classList.add('hit');
        batsmanImg.src = "assets/player-hit.png";
        setTimeout(() => {
            ballAnim.className = 'ball-anim';
            ballAnim.style.display = 'none';
            batsman.classList.remove('hit');
            batsmanImg.src = "assets/playerstand.png";
        }, 400);
        showHitEffect(effectText, effectColor);
        registerHit(run, false);
    }

    function animateBall(ts) {
        if (!startTime) startTime = ts;
        const t = Math.min((ts - startTime) / duration, 1);
        const y = quadraticBezier(startY, ctrlY, endY, t);
        const scale = 1 - 0.3 * t;
        ballAnim.style.left = `${startX}px`;
        ballAnim.style.top = `${y}px`;
        ballAnim.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (t >= 1 && !animationEnded) {
            animationEnded = true;
            ballAnim.className = 'ball-anim';
            ballAnim.style.display = 'none';
            canHit = false;
            hitBtn.classList.add('disabled');
            balls[currentBall] = 0;
            scores.push(0);
            currentBall++;
            setTimeout(nextBall, 700);
        } else if (!animationEnded) {
            ballAnim._raf = requestAnimationFrame(animateBall);
        }
    }

    ballAnim.style.left = `${startX}px`;
    ballAnim.style.top = `${startY}px`;
    ballAnim.style.transform = `translate(-50%, -50%) scale(1)`;
    if (ballAnim._raf) cancelAnimationFrame(ballAnim._raf);
    ballAnim._raf = requestAnimationFrame(animateBall);

    const handleHit = () => {
        const now = Date.now();
        if (now - lastHitTime < DEBOUNCE_TIME || !canHit || !ballActive) return;
        lastHitTime = now;
        if (!powerOver) {
            if (currentBall < 3) {
                const run = Math.random() < 0.5 ? 1 : 2;
                doHit(run, "+" + run, "#62d273");
            } else {
                doHit(6, "SIX!", "#ff8300");
            }
        } else {
            let run, txt, clr;
            if (currentBall === 3) {
                run = 6; txt = "SIX!"; clr = "#ff8300";
            } else if (currentBall === 4) {
                run = 6; txt = "SIX!"; clr = "#ff8300";
            } else if (currentBall === 5) {
                run = 6; txt = "FANTASTIC SIX!"; clr = "#ff8300";
            } else {
                run = 6; txt = "SIX!"; clr = "#ff8300";
            }
            doHit(run, txt, clr);
        }
    };

    hitBtn.removeEventListener('pointerdown', handleHit);
    hitBtn.addEventListener('pointerdown', handleHit, { passive: true });
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
        <h2 id="scoreCard" style="font-size: 40px; color: #111; text-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-bottom: 2vh; text-align: center; z-index: 21; position: relative;">
            You Played Very Well!<br>
            Your score is <br>
            ${totalScore}
        </h2>
    `;
    endOverlay.style.background = 'rgba(255, 253, 238, 0.95)';
    endOverlay.style.opacity = '1';
    endOverlay.style.transition = 'none';
    endOverlay.classList.remove('bg-animate');

    showScreen(endOverlay, gameUI, midOverlay, startScreen, boostPopup);

    // After 2s, fade out the score card
    setTimeout(() => {
        const scoreEl = document.getElementById('scoreCard');
        if (scoreEl) scoreEl.classList.add('score-animate');
        endOverlay.style.transition = 'opacity 0.6s';
        endOverlay.style.opacity = '0';

        // After score fades out (0.6s), show background and fade/scale it in
        setTimeout(() => {
            endOverlay.innerHTML = '';
            endOverlay.style.background = "url('assets/endscreen.jpg') no-repeat center";
            endOverlay.style.backgroundSize = 'contain';
            endOverlay.classList.add('bg-animate');
            endOverlay.style.transition = 'opacity 1.2s';
            endOverlay.style.opacity = '0';

            // Fade/scale in endscreen.jpg
            setTimeout(() => {
                endOverlay.style.opacity = '1';
                // Disable all buttons to end game flow
                hitBtn.classList.add('disabled');
                startBtn.onclick = null;
                boostBtn.onclick = null;
                midContinueBtn.onclick = null;
            }, 60); // small delay for style reflow
        }, 600); // match score fade out duration
    }, 2000); // show score for 2s
}

function nextBall() {
    batsmanImg.src = "assets/playerstand.png";
    if (currentBall === 3 && !powerOver) {
        showScreen(midOverlay, gameUI);
        return;
    }
    if (currentBall >= 6 && !isEndScreenShown) {
        renderBalls(); // Ensure last ball shown
        setTimeout(showEnd, 700); // Shorter delay so UI feels more snappy
        return;
    }
    renderBalls();
    setTimeout(() => showBallAnim(), 500);
}
function registerHit(run, missed = false) {
    hitBtn.classList.add('disabled');
    balls[currentBall] = run;
    scores.push(run);
    renderBalls(); // Update UI immediately after the hit
    currentBall++;
    setTimeout(nextBall, 700);
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

window.onload = () => {
    resetGame();
    renderBalls();
    showScreen(startScreen, gameUI, boostPopup, endOverlay, midOverlay);
};
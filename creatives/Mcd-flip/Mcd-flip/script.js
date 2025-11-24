const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const playButton = document.getElementById('playButton');

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const progressFill = document.getElementById('progressFill');

let score = 0;
let timeLeft = 30;
let countdown;
let firstTile = null;
let lockBoard = false;
let matches = 0;
const matchesToWin = 10;
let gameOver = false;

const tileImages = [
    './assets/drink.png',
    './assets/fries.png',
    './assets/burger.png',
    './assets/burger1.png',
    './assets/nuggets.png'
];

// Shuffle 30 tiles (6 each)
const tileValues = [];
for (let i = 0; i < 30; i++) {
    tileValues.push(tileImages[i % 5]);
}
tileValues.sort(() => Math.random() - 0.5);

function updateProgressBar() {
    const percent = Math.min((matches / matchesToWin) * 100, 100);
    progressFill.style.width = percent + "%";
}

// --- FADE UTILS ---
function fadeSceneOut(scene, cb) {
    scene.classList.remove('fade-in');
    scene.classList.add('fade-out');
    setTimeout(cb, 600);
}
function fadeSceneIn(scene) {
    scene.classList.remove('hidden', 'fade-out');
    scene.classList.add('fade-in');
}

function showEndCard() {
    // Set background color of scene3 before showing it
    scene3.style.background = "#8a1504";
    fadeSceneOut(scene2, () => {
        scene3.innerHTML = `
      <div class="endcard" style="
        width:90vw; 
        max-width:350px; 
        margin: 0 auto; 
        background: linear-gradient(145deg, #FFE59A 80%, #FBA417 100%);
        border-radius: 28px; 
        box-shadow: 0 6px 40px #DA291C44;
        padding: 40px 24px; 
        text-align: center; 
        color: #DA291C; 
        display: flex; 
        flex-direction: column; 
        align-items: center;
      ">
        <img src="./assets/logo.png" style="width:62px; margin-bottom:16px" alt="McD" />
        <div style="font-size:27px; font-weight:800; margin-bottom:18px;">
          Game Over!
        </div>
        <div style="font-size:22px; font-weight:700;">
          You scored <span>${score}</span><br>
          Now that’s a Happy Meal moment <span style="color:#8a1504"></span>
        </div>
      </div>
    `;
        scene3.classList.remove('hidden', 'fade-out');
        fadeSceneIn(scene3);
    });
}

playButton.addEventListener('click', () => {
    fadeSceneOut(scene1, () => {
        scene1.classList.add('hidden');
        scene2.classList.remove('hidden');
        fadeSceneIn(scene2);

        // --- game reset logic below (same as before) ---
        timeLeft = 30;
        score = 0;
        matches = 0;
        gameOver = false;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        updateProgressBar();

        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = "";
        firstTile = null;
        lockBoard = false;

        tileValues.sort(() => Math.random() - 0.5);

        for (let imagePath of tileValues) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.image = imagePath;

            const tileInner = document.createElement('div');
            tileInner.classList.add('tile-inner');

            const front = document.createElement('div');
            front.classList.add('tile-front');
            const logoImg = document.createElement('img');
            logoImg.src = './assets/logo.png';
            logoImg.alt = 'Logo';
            front.appendChild(logoImg);

            const back = document.createElement('div');
            back.classList.add('tile-back');
            const itemImg = document.createElement('img');
            itemImg.src = imagePath;
            itemImg.alt = 'Item';
            back.appendChild(itemImg);

            tileInner.appendChild(front);
            tileInner.appendChild(back);
            tile.appendChild(tileInner);
            gameBoard.appendChild(tile);
        }

        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', () => {
                if (lockBoard || tile.classList.contains('flipped') || gameOver) return;

                tile.classList.add('flipped');

                if (!firstTile) {
                    firstTile = tile;
                } else {
                    lockBoard = true;

                    if (firstTile.dataset.image === tile.dataset.image) {
                        score += 10;
                        matches += 1;
                        scoreDisplay.textContent = score;
                        scoreDisplay.classList.add('bump');
                        updateProgressBar();

                        // Pop effect
                        firstTile.classList.add('matched');
                        tile.classList.add('matched');
                        setTimeout(() => {
                            scoreDisplay.classList.remove('bump');
                            firstTile.classList.remove('matched');
                            tile.classList.remove('matched');
                        }, 700);

                        firstTile = null;
                        lockBoard = false;

                        if (matches >= matchesToWin && !gameOver) {
                            gameOver = true;
                            clearInterval(countdown);
                            tiles.forEach(t => t.style.pointerEvents = 'none');
                            setTimeout(showEndCard, 1700);
                        }
                    } else {
                        setTimeout(() => {
                            firstTile.classList.remove('flipped');
                            tile.classList.remove('flipped');
                            firstTile = null;
                            lockBoard = false;
                        }, 1000);
                    }
                }
            });
        });

        // Start the timer
        clearInterval(countdown);
        countdown = setInterval(() => {
            if (gameOver) return;
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                gameOver = true;
                clearInterval(countdown);
                tiles.forEach(t => t.style.pointerEvents = 'none');
                setTimeout(showEndCard, 1400);
            }
        }, 1000);
    });
});

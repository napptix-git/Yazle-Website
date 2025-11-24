function resizeGameSceneToFit() {
  const container = document.querySelector('.game-container');
  const scene = document.querySelector('.game-scene');

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene.style.width = width + "px";
  scene.style.height = height + "px";
}

window.addEventListener("load", resizeGameSceneToFit);
window.addEventListener("resize", resizeGameSceneToFit);

document.getElementById("playButton").addEventListener("click", () => {
  const startCard = document.getElementById("startCard");
  const gameContainer = document.querySelector(".game-container");

  startCard.classList.add("fade-out");

  setTimeout(() => {
    startCard.style.display = "none";
    gameContainer.classList.add("fade-in");
    startGame();
  }, 600);
});

let timeLeft = 15;
let score = 0;
let interval;

// ✅ Play found sound (new instance every time)
function playFoundSound() {
  const sound = new Audio('./assets/found.mp3');
  sound.play().catch((e) => {
    console.warn("Audio play failed:", e);
  });
}

// ✅ Show end card after game ends
function showEndCard() {
  const endCard = document.getElementById("endCard");
  const finalScore = document.getElementById("finalScore");

  setTimeout(() => {
    finalScore.textContent = score;
    endCard.style.display = "flex";
    endCard.classList.add("endcard-style");
  }, 1700);
}

// ✅ Check if all items are found
function checkGameEnd(items) {
  const allTapped = Array.from(items).every(item => item.classList.contains('tapped'));
  if (allTapped) {
    clearInterval(interval);
    showEndCard();
  }
}

function startGame() {
  const timer = document.getElementById("time");
  const scoreDisplay = document.getElementById("score");
  const items = document.querySelectorAll('.game-item');

  // Start countdown
  interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      showEndCard();
    }
  }, 1000);

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('tapped')) {
        item.classList.add('tapped');

        // 🎯 Glowing ring
        const glow = document.createElement('div');
        glow.classList.add('tap-glow');
        const rect = item.getBoundingClientRect();
        glow.style.left = rect.left + rect.width / 2 + 'px';
        glow.style.top = rect.top + rect.height / 2 + 'px';
        document.body.appendChild(glow);
        setTimeout(() => glow.remove(), 500);

        // ✨ Show found item in center with animation
        const found = document.createElement('img');
        found.src = item.src;
        found.className = 'found-animation slide-in-fwd-center';
        document.body.appendChild(found);
        setTimeout(() => found.remove(), 700);

        // 🔊 Play sound
        playFoundSound();

        // ✅ Increase score
        score += 10;
        scoreDisplay.textContent = score;

        // 🔚 Check game end
        checkGameEnd(items);
      }
    });
  });
}

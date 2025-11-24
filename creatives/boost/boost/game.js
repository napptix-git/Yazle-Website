document.addEventListener('DOMContentLoaded', function() {
  // Robust selectors inside .game-container
  const gameContainer = document.querySelector('.game-container');
  if (!gameContainer) {
    console.error('No .game-container found!');
    return;
  }
  const startScreen = gameContainer.querySelector('.start-screen');
  const gameArea = gameContainer.querySelector('.game-area');
  // const lanes = gameContainer.querySelectorAll('.lane'); // No longer needed
  let character = gameContainer.querySelector('.character');
  const scoreEl = gameContainer.querySelector('#score');
  const speedEl = gameContainer.querySelector('#speed');
  const timerEl = gameContainer.querySelector('#timer');
  const endScreen = gameContainer.querySelector('.end-screen');
  const endBtn = gameContainer.querySelector('.end-btn');
  const startBtn = gameContainer.querySelector('.start-btn');
  const finalScoreEl = gameContainer.querySelector('#final-score');
  const gameCanvas = gameContainer.querySelector('.game-canvas');

  if (!startScreen || !gameArea || !character || !scoreEl || !speedEl || !timerEl || !endScreen || !endBtn || !startBtn || !finalScoreEl || !gameCanvas) {
    console.error('One or more game elements are missing!');
    return;
  }

  let currentLane = 1; // 0: left, 1: center, 2: right
  let score = 0;
  let speed = 2.5;
  let spawnInterval = null;
  let gameActive = false;
  let timerFrame = null;
  let timeLeft = 30.0;
  let items = [];

  // Lane positions as percentages for left, center, right
  const lanePositions = [0.16, 0.5, 0.84];

  function updateCharacterPosition() {
    character.classList.remove('character-left', 'character-center', 'character-right');
    if (currentLane === 0) character.classList.add('character-left');
    else if (currentLane === 1) character.classList.add('character-center');
    else if (currentLane === 2) character.classList.add('character-right');
  }

  function moveCharacter(toLane) {
    if (!gameActive) return;
    if (toLane < 0 || toLane > 2) return;
    currentLane = toLane;
    updateCharacterPosition();
  }

  // Keyboard controls (desktop)
  document.addEventListener('keydown', function(e) {
    if (gameArea.style.display !== 'flex' || !gameActive) return;
    if (e.key === 'ArrowLeft') moveCharacter(currentLane - 1);
    if (e.key === 'ArrowRight') moveCharacter(currentLane + 1);
  });

  // Touch controls (mobile)
  let touchStartX = null;
  gameArea.addEventListener('touchstart', function(e) {
    if (!gameActive) return;
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
    }
  });
  gameArea.addEventListener('touchend', function(e) {
    if (!gameActive) return;
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const dx = touchEndX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) moveCharacter(currentLane - 1); // swipe left
      else moveCharacter(currentLane + 1); // swipe right
    }
    touchStartX = null;
  });

  function spawnItem() {
    // Randomly choose lane: 0 (left), 1 (center), 2 (right)
    const laneIndex = Math.floor(Math.random() * 3);
    const isObstacle = Math.random() < 0.30; // 30% obstacle, 70% boost
    const item = document.createElement('div');
    item.className = isObstacle ? 'obstacle' : 'boost';
    item.style.top = '0px';
    item.style.position = 'absolute';
    item.style.left = (lanePositions[laneIndex] * 100) + '%';
    item.style.transform = 'translateX(-50%)';
    gameCanvas.appendChild(item);
    items.push({el: item, lane: laneIndex, pos: 0, type: isObstacle ? 'obstacle' : 'boost'});
    animateItem(item, laneIndex, isObstacle ? 'obstacle' : 'boost');
  }

  function animateItem(item, laneIndex, type) {
    let pos = 0;
    let collectedOrHit = false;
    function step() {
      if (!gameActive) return;
      pos += speed;
      item.style.top = pos + 'px';
      // Collision/collection check
      const charRect = character.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      // Only check collision if in the same lane
      if (laneIndex === currentLane && !collectedOrHit) {
        // Check vertical overlap (bottom of item near bottom of character)
        const overlap = (
          itemRect.bottom > charRect.top + charRect.height * 0.3 &&
          itemRect.top < charRect.bottom - charRect.height * 0.3
        );
        if (overlap) {
          collectedOrHit = true;
          if (type === 'boost') {
            // Collect boost
            gameCanvas.removeChild(item);
            items = items.filter(b => b.el !== item);
            score += 100;
            scoreEl.textContent = score;
            triggerGlow();
            speed += 0.2;
            updateBgSpeed();
            updateSpeedDisplay();
            return;
          } else if (type === 'obstacle') {
            // Hit obstacle: game over
            gameCanvas.removeChild(item);
            items = items.filter(b => b.el !== item);
            gameOver();
            return;
          }
        }
      }
      // Remove if out of canvas
      if (pos > gameCanvas.offsetHeight) {
        gameCanvas.removeChild(item);
        items = items.filter(b => b.el !== item);
        return;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function triggerGlow() {
    character.classList.add('glow');
    setTimeout(() => {
      character.classList.remove('glow');
    }, 350);
  }

  function updateBgSpeed() {
    // Animate background scroll speed by updating animation duration
    gameArea.style.animationDuration = (1.2 / (speed / 2.5)) + 's';
  }

  function updateSpeedDisplay() {
    speedEl.textContent = 'x' + speed.toFixed(1);
  }

  function startTimer() {
    timeLeft = 30.0;
    function tick() {
      if (!gameActive) return;
      timeLeft -= 1 / 60;
      if (timeLeft < 0) timeLeft = 0;
      timerEl.textContent = timeLeft.toFixed(1);
      if (timeLeft > 0) {
        timerFrame = requestAnimationFrame(tick);
      } else {
        gameOver();
      }
    }
    timerEl.textContent = timeLeft.toFixed(1);
    timerFrame = requestAnimationFrame(tick);
  }

  function stopTimer() {
    if (timerFrame) cancelAnimationFrame(timerFrame);
  }

  function startGame() {
    score = 0;
    speed = 2.5;
    scoreEl.textContent = score;
    updateCharacterPosition();
    updateBgSpeed();
    updateSpeedDisplay();
    gameActive = true;
    startTimer();
    // Spawn items every 600ms
    spawnInterval = setInterval(() => {
      spawnItem();
    }, 600);
  }

  function stopGame() {
    clearInterval(spawnInterval);
    stopTimer();
    gameActive = false;
    // Remove all items
    items.forEach(b => {
      if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
    });
    items = [];
  }

  function gameOver() {
    if (!gameActive) return;
    gameActive = false;
    stopGame();
    // Fade out game area, fade in end screen
    gameArea.classList.add('fade-out');
    setTimeout(() => {
      gameArea.style.display = 'none';
      gameArea.classList.remove('fade-out');
      finalScoreEl.textContent = 'SCORE: ' + score;
      endScreen.style.display = 'flex';
      setTimeout(() => {
        endScreen.classList.add('active');
      }, 10);
    }, 500);
  }

  function restartGame() {
    endScreen.classList.remove('active');
    setTimeout(() => {
      endScreen.style.display = 'none';
      startScreen.style.display = 'flex';
      gameArea.style.display = 'none';
    }, 600);
  }

  startBtn.addEventListener('click', function() {
    startScreen.style.display = 'none';
    gameArea.style.display = 'flex';
    moveCharacter(1); // Always start in center
    setTimeout(() => {
      gameArea.classList.add('fade-in');
      setTimeout(() => {
        gameArea.classList.remove('fade-in');
        startGame();
      }, 700);
    }, 10);
  });

  endBtn.addEventListener('click', function() {
    restartGame();
  });
}); 
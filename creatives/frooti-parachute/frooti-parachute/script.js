const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
  document.getElementById('scene1').classList.add('hidden');
  document.getElementById('scene2').classList.remove('hidden');
});

function startGame() {
  document.getElementById('scene2').classList.add('hidden');
  document.getElementById('gameScene').classList.remove('hidden');
  setupCharacterControls();
  startFallingItems();
  checkCollisions();
  startTimer(); 
}

function startFallingItems() {
  setInterval(() => {
    const item = document.createElement('div');
    item.classList.add('falling');
    item.classList.add(Math.random() > 0.5 ? 'reward' : 'obstacle');
    item.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    document.getElementById('gameScene').appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 5000);
  }, 1000);
}

function startTimer() {
  const timerDisplay = document.getElementById('timer');
  let timeLeft = 20;

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function setupCharacterControls() {
  const char = document.getElementById('character');
  let isDragging = false;

  char.style.transform = 'none';
  char.style.left = `${(window.innerWidth - char.offsetWidth) / 2}px`;

  char.addEventListener('touchstart', () => { isDragging = true; });
  char.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    let newLeft = touch.clientX - char.offsetWidth / 2;
    newLeft = Math.max(0, Math.min(window.innerWidth - char.offsetWidth, newLeft));
    char.style.left = newLeft + 'px';
  });
  char.addEventListener('touchend', () => { isDragging = false; });

  char.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let newLeft = e.clientX - char.offsetWidth / 2;
    newLeft = Math.max(0, Math.min(window.innerWidth - char.offsetWidth, newLeft));
    char.style.left = newLeft + 'px';
  });
  window.addEventListener('mouseup', () => { isDragging = false; });
}

function checkCollisions() {
  const char = document.getElementById('character');
  const scoreDisplay = document.getElementById('score');
  let score = 0;

  setInterval(() => {
    const items = document.querySelectorAll('.falling');
    const charRect = char.getBoundingClientRect();

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const x_overlap = Math.max(0, Math.min(charRect.right, itemRect.right) - Math.max(charRect.left, itemRect.left));
      const y_overlap = Math.max(0, Math.min(charRect.bottom, itemRect.bottom) - Math.max(charRect.top, itemRect.top));
      const overlapArea = x_overlap * y_overlap;
      const charArea = charRect.width * charRect.height;
      const overlapRatio = overlapArea / charArea;

      const isReward = item.classList.contains('reward');
      const isObstacle = item.classList.contains('obstacle');
      const isColliding = (isReward && overlapRatio > 0.05) || (isObstacle && overlapRatio > 0.3);

      if (isColliding) {
        score += isReward ? 10 : -10;
        scoreDisplay.textContent = `Score: ${score}`;
        scoreDisplay.classList.add('bump');
        setTimeout(() => scoreDisplay.classList.remove('bump'), 300);
        item.remove();
      }
    });
  }, 100);
}

function endGame() {
    const gameScene = document.getElementById('gameScene');
    const endScene = document.getElementById('scene3'); // scene4
    const overlay = endScene.querySelector('.overlay2');
    const content = endScene.querySelector('.scene4-content');
  
    // 1️⃣ Fade out game scene
    gameScene.style.transition = 'opacity 0.5s ease';
    gameScene.style.opacity = 0;
  
    setTimeout(() => {
      // 2️⃣ Hide game scene after fade out
      gameScene.classList.add('hidden');
  
      // 3️⃣ Fade in scene4
      endScene.classList.remove('hidden');
      endScene.style.opacity = 0;
      endScene.style.transition = 'opacity 0.6s ease';
      endScene.offsetWidth; // force reflow
      endScene.style.opacity = 1;
  
      // 4️⃣ Animate overlay2 after short delay
      setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.animation = 'overlayDrop 1s ease forwards';
      }, 200);
  
      // 5️⃣ Animate content (overlay image + shop button)
      setTimeout(() => {
        content.style.opacity = 0;
        content.style.animation = 'fadeUp 1s ease forwards';
      }, 800);
  
    }, 400); // Wait before starting scene4
  }
  
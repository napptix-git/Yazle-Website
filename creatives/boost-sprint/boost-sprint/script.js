let board, context;
let isPlaying = false;
let score = 0;
let timeLeft = 30;
let normalSpeed = 4.0;
let speed = normalSpeed;
let targetSpeed = normalSpeed; // For smooth lerp
let spawnCollectibleInterval, gameTimerInterval;
let timerPaused = false;
const speedIncreasePerCollect = 0.08;
const boardWidth = window.innerWidth;
const boardHeight = window.innerHeight;
const collectibles = [];
const backgroundImage = new Image();
backgroundImage.src = "./assets/bg2.png";
const burgerImage = new Image();
burgerImage.src = "./assets/reward.png";
let bgY = 0;
const obstacles = [];
const obstacleImage = new Image();
obstacleImage.src = "./assets/stone.png"; // Use a placeholder image or add a new one
let spawnObstacleInterval;
let isInvincible = false;
let interimShown = false;
const interimImage = new Image();
interimImage.src = "./assets/reward.png"; // Use a suitable interim image
let interimButton = null;
let isInterimVisible = false;
const snailImage = new Image();
snailImage.src = "./assets/snail.png";

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  const startScreen = document.getElementById("startScreen");
  const playButton = document.getElementById("playButton");
  const header = document.querySelector('.header');
  const endCard = document.getElementById("endCard");
  const endScreen = document.getElementById("endScreen");
  document.getElementById("speed").innerText = speed.toFixed(2);

  // Show only the start screen
  startScreen.classList.remove('hide');
  endCard.classList.remove('show');
  endCard.style.display = 'none';
  endScreen.classList.remove('show');
  endScreen.style.display = 'none';

  header.style.visibility = 'hidden';
  document.getElementById("charachter").style.visibility = "hidden";

  playButton.onclick = function () {
    startScreen.classList.add('hide');
    header.style.visibility = 'visible';
    document.getElementById("charachter").style.visibility = "visible";
    setTimeout(startGame, 600);
  };
};

function drawStaticBackground() {
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.drawImage(backgroundImage, 0, 0, boardWidth, boardHeight);
}

// --- SMOOTH background scroll using lerp
function drawBackground() {
  // Lerp speed for smoothness
  speed += (targetSpeed - speed) * 0.18; // 0.18 is fast but no jerk
  context.clearRect(0, 0, boardWidth, boardHeight);
  context.drawImage(backgroundImage, 0, bgY, boardWidth, boardHeight);
  context.drawImage(backgroundImage, 0, bgY - boardHeight + 1, boardWidth, boardHeight);
  bgY += speed;
  if (bgY >= boardHeight) bgY = 0;
}

function isOverlapping(newEntity, entities) {
  for (let i = 0; i < entities.length; i++) {
    const rect1 = {
      left: newEntity.x,
      top: newEntity.y,
      right: newEntity.x + newEntity.width,
      bottom: newEntity.y + newEntity.height
    };
    const rect2 = {
      left: entities[i].x,
      top: entities[i].y,
      right: entities[i].x + entities[i].width,
      bottom: entities[i].y + entities[i].height
    };
    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      return true;
    }
  }
  return false;
}

function spawnEntity() {
  if (!isPlaying) return;
  const minX = boardWidth * 0.15;
  const maxX = boardWidth * 0.6;
  let newX = Math.random() * (maxX - minX) + minX;
  let newY = -60;
  // 55% collectible, 30% stone, 15% snail
  let rand = Math.random();
  let entityType = rand < 0.55 ? 'collectible' : (rand < 0.85 ? 'obstacle' : 'snail');
  let tries = 0;
  let maxTries = 10;
  let entity = {
    x: newX,
    y: newY,
    width: entityType === 'collectible' ? 90 : 70,
    height: entityType === 'collectible' ? 90 : 70,
    image: entityType === 'collectible' ? burgerImage : (entityType === 'snail' ? snailImage : obstacleImage),
    type: entityType
  };
  while (
    (entityType === 'collectible' && isOverlapping(entity, obstacles)) ||
    (entityType !== 'collectible' && isOverlapping(entity, collectibles))
  ) {
    newX = Math.random() * (maxX - minX) + minX;
    entity.x = newX;
    tries++;
    if (tries > maxTries) break;
  }
  if (entityType === 'collectible') {
    collectibles.push(entity);
  } else {
    obstacles.push(entity);
  }
}

function updateCollectibles() {
  for (let i = collectibles.length - 1; i >= 0; i--) {
    let maxEntitySpeed = 8; // or whatever feels right
    collectibles[i].y += Math.min(speed, maxEntitySpeed);
    if (collectibles[i].y > boardHeight) {
      collectibles.splice(i, 1);
    } else {
      context.drawImage(
        collectibles[i].image,
        collectibles[i].x,
        collectibles[i].y,
        collectibles[i].width,
        collectibles[i].height
      );
    }
  }
}

function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += speed;
    if (obstacles[i].y > boardHeight) {
      obstacles.splice(i, 1);
    } else {
      context.drawImage(
        obstacles[i].image,
        obstacles[i].x,
        obstacles[i].y,
        obstacles[i].width,
        obstacles[i].height
      );
    }
  }
}

function createSparkles(x, y) {
  for (let i = 0; i < 12; i++) {
    let sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    const size = Math.random() * 8 + 6;
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 60;
    sparkle.style.left = (x + randomX) + "px";
    sparkle.style.top = (y + randomY) + "px";
    sparkle.style.animationDuration = (Math.random() * 0.3 + 0.5) + "s";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }
}

function showInterimImage() {
  isPlaying = false;
  isInterimVisible = true;
  // Hide character during interim
  document.getElementById('charachter').style.visibility = 'hidden';
  // Pause the timer
  if (gameTimerInterval) {
    clearInterval(gameTimerInterval);
    timerPaused = true;
  }
  context.save();
  context.globalAlpha = 0.85;
  context.fillStyle = '#000';
  context.fillRect(0, 0, boardWidth, boardHeight);
  context.globalAlpha = 1.0;
  const imgWidth = 300;
  const imgHeight = 300;
  context.drawImage(interimImage, (boardWidth - imgWidth) / 2, (boardHeight - imgHeight) / 2, imgWidth, imgHeight);
  context.font = 'bold 18px Arial'; // Smaller font size
  context.fillStyle = '#fff';
  context.textAlign = 'center';
  context.fillText('Drink this to get faster!', boardWidth / 2, (boardHeight / 2) + imgHeight / 2 + 10);
  context.fillText('You will clear all obstacles!', boardWidth / 2, (boardHeight / 2) + imgHeight / 2 + 35);
  context.restore();

  // Add the Drink It button
  if (!interimButton) {
    interimButton = document.createElement('button');
    interimButton.innerText = 'Drink It';
    interimButton.style.position = 'absolute';
    interimButton.style.left = '50%';
    interimButton.style.top = ((boardHeight / 2) + imgHeight / 2 + 60) + 'px';
    interimButton.style.transform = 'translateX(-50%)';
    interimButton.style.fontSize = '18px';
    interimButton.style.padding = '10px 30px';
    interimButton.style.borderRadius = '12px';
    interimButton.style.background = '#ffcc00';
    interimButton.style.color = '#fff';
    interimButton.style.fontWeight = 'bold';
    interimButton.style.zIndex = 10000;
    interimButton.style.border = 'none';
    interimButton.style.cursor = 'pointer';
    interimButton.onclick = onDrinkItClick;
    document.body.appendChild(interimButton);
  } else {
    interimButton.style.display = 'block';
  }
}

function onDrinkItClick() {
  if (interimButton) interimButton.style.display = 'none';
  isPlaying = true;
  isInvincible = true;
  speed += 6; // Increase speed
  targetSpeed = speed;
  // Show character again after interim
  document.getElementById('charachter').style.visibility = 'visible';
  isInterimVisible = false;
  // Resume the timer
  if (timerPaused) {
    gameTimerInterval = setInterval(updateTimer, 1000);
    timerPaused = false;
  }
  requestAnimationFrame(gameLoop);
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    pulseStat("time-value");
    if (!interimShown && timeLeft <= 10) {
      interimShown = true;
      showInterimImage();
      return;
    }
  } else {
    gameOver();
  }
}

function startGame() {
  isPlaying = true;
  score = 0;
  timeLeft = 30;
  speed = normalSpeed;
  targetSpeed = normalSpeed;
  isInvincible = false;
  interimShown = false;
  characterX = window.innerWidth / 2; // Reset character position
  document.getElementById("score").innerText = score;
  document.getElementById("speed").innerText = speed.toFixed(2);
  document.getElementById("time").innerText = timeLeft;
  bgY = 0;
  collectibles.length = 0;
  obstacles.length = 0;

  const endCard = document.getElementById("endCard");
  const endScreen = document.getElementById("endScreen");
  endCard.classList.remove('show');
  endCard.style.display = "none";
  endScreen.classList.remove('show');
  endScreen.style.display = "none";

  spawnEntity();
  spawnEntityInterval = setInterval(spawnEntity, 1000);
  gameTimerInterval = setInterval(updateTimer, 1000);
  // Only start game loop after sprite sheet is loaded
  if (spriteSheetLoaded) {
    requestAnimationFrame(gameLoop);
  } else {
    spriteSheet.onload = function() {
      SPRITE_FRAME_WIDTH = spriteSheet.width / SPRITE_SHEET_COLS;
      SPRITE_FRAME_HEIGHT = spriteSheet.height / SPRITE_SHEET_ROWS;
      spriteSheetLoaded = true;
      requestAnimationFrame(gameLoop);
    };
  }
}

function gameOver() {
  if (!isPlaying) return;
  isPlaying = false;
  clearInterval(spawnEntityInterval);
  clearInterval(gameTimerInterval);

  let fadeOpacity = 1.0;
  const fadeOutInterval = setInterval(() => {
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawBackground();
    fadeOpacity -= 0.07;
    if (fadeOpacity <= 0) {
      clearInterval(fadeOutInterval);
      collectibles.length = 0;
      obstacles.length = 0;
      context.clearRect(0, 0, boardWidth, boardHeight);
      drawStaticBackground();
      showEndCard();
    } else {
      context.globalAlpha = fadeOpacity;
      updateCollectibles();
      context.globalAlpha = 1.0;
    }
  }, 38);
}

// 1. Add Buy Now button to end card and logic to reset to start screen
function showEndCard() {
  // Hide header and character
  document.querySelector('.header').style.visibility = 'hidden';
  document.getElementById("charachter").style.visibility = "hidden";

  // Show the end card and display scorecard first
  const endCard = document.getElementById("endCard");
  endCard.innerHTML = `
    <div class="end-card-title">Great Run!</div>
    <div class="end-card-label">Your Score</div>
    <div class="end-card-score">${score}</div>
    <div class="end-card-label">Top Speed</div>
    <div class="end-card-speed">${speed.toFixed(2)}</div>
  `;
  endCard.style.display = "block";
  setTimeout(() => {
    endCard.classList.add('show');
  }, 100);

  // After 2 seconds, show only the end image and Buy Now button
  setTimeout(() => {
    // Make sure endCard is visible and on top
    endCard.style.display = "block";
    endCard.classList.add('show');
    endCard.style.background = "transparent";
    endCard.style.zIndex = "9999";
    endCard.style.position = "fixed";
    endCard.style.top = "50%";
    endCard.style.left = "50%";
    endCard.style.transform = "translate(-50%, -50%)";
    endCard.style.width = "100vw";
    endCard.style.height = "100vh";
    
    // Hide the game canvas background
    const board = document.getElementById('board');
    if (board) board.style.display = 'none';
    // Fallback: if image does not appear, add it directly to body
    setTimeout(() => {
      const img = document.querySelector('.end-card-img');
      if (!img || img.offsetWidth === 0 || img.offsetHeight === 0) {
        const fallbackImg = document.createElement('img');
        fallbackImg.src = './assets/endcard.jpeg';
        fallbackImg.alt = 'End Card Image';
        fallbackImg.style.position = 'fixed';
        fallbackImg.style.top = '0';
        fallbackImg.style.left = '0';
        fallbackImg.style.width = '100vw';
        fallbackImg.style.height = '100vh';
        fallbackImg.style.zIndex = '99999';
        document.body.appendChild(fallbackImg);
        // Remove fallback on Buy Now click
        const buyNowButton = document.getElementById('buyNowButton');
        if (buyNowButton) {
          buyNowButton.onclick = function() {
            if (fallbackImg) fallbackImg.remove();
            endCard.classList.remove('show');
            setTimeout(() => {
              endCard.style.display = "none";
              document.getElementById('startScreen').classList.remove('hide');
              document.getElementById('startScreen').style.display = 'block';
              document.querySelector('.header').style.visibility = 'hidden';
              document.getElementById("charachter").style.visibility = "hidden";
              if (board) board.style.display = 'block';
            }, 700);
          };
        }
      }
    }, 300);
    // Normal Buy Now button logic
    // const buyNowButton = document.getElementById('buyNowButton');
    // if (buyNowButton) {
    //   buyNowButton.style.display = 'block';
    //   buyNowButton.onclick = function() {
    //     endCard.classList.remove('show');
    //     setTimeout(() => {
    //       endCard.style.display = "none";
    //       document.getElementById('startScreen').classList.remove('hide');
    //       document.getElementById('startScreen').style.display = 'block';
    //       document.querySelector('.header').style.visibility = 'hidden';
    //       document.getElementById("charachter").style.visibility = "hidden";
    //       if (board) board.style.display = 'block';
    //     }, 700);
    //   };
    // }
  }, 2000);
}
;

// --- PULSE ANIMATION on stat update
function pulseStat(className) {
  const stat = document.querySelector(`.${className}`);
  if (!stat) return;
  stat.classList.remove("stat-pulse");
  void stat.offsetWidth; // Trigger reflow
  stat.classList.add("stat-pulse");
}

function getRect(entity) {
  return {
    left: entity.x,
    top: entity.y,
    right: entity.x + entity.width,
    bottom: entity.y + entity.height,
    width: entity.width,
    height: entity.height,
  };
}

function isCollidingWithRect(rect1, rect2, overlapThreshold) {
  const intersectWidth = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  const intersectHeight = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
  const intersectionArea = intersectWidth * intersectHeight;
  const entityArea = rect2.width * rect2.height;
  return intersectionArea >= entityArea * overlapThreshold;
}

// 2. Fix collectible collision and invincible mode
function checkCollisions(player) {
  // Always collect collectibles if invincible or not
  const playerRect = getRect(player);
  for (let i = collectibles.length - 1; i >= 0; i--) {
    const collectibleRect = getRect(collectibles[i]);
    const isNearPlayer = collectibles[i].y > player.y - 150; // Only magnet if close
    if ((isInvincible && isNearPlayer) || isCollidingWithRect(playerRect, collectibleRect, 0.3)) {
      createSparkles(
        collectibles[i].x + collectibles[i].width / 2,
        collectibles[i].y + collectibles[i].height / 2
      );
      collectibles.splice(i, 1);
      score += 1;
      targetSpeed += speedIncreasePerCollect; // For smooth lerp
      document.getElementById("score").innerText = score;
      document.getElementById("speed").innerText = targetSpeed.toFixed(2);
      pulseStat("score-value");
      pulseStat("speed-value");
    }
  }
}

function checkObstacleCollisions(player) {
  // If invincible, ignore obstacles
  if (isInvincible) return;
  const playerRect = getRect(player);
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacleRect = getRect(obstacles[i]);
    if (isCollidingWithRect(playerRect, obstacleRect, 0.6)) {
      if (obstacles[i].type === 'snail') {
        // Slow down the player
        speed = Math.max(normalSpeed, speed - 2); // Reduce speed, but not below normalSpeed
        targetSpeed = speed;
        obstacles.splice(i, 1);
        document.getElementById("speed").innerText = speed.toFixed(2);
        pulseStat("speed-value");
      } else {
        // End the game on collision with normal obstacle
        gameOver();
        return;
      }
    }
  }
}

// Sprite sheet animation for 2x3 (6 frames) running animation
const spriteSheet = new Image();
spriteSheet.src = './assets/char_sprite_sheet.png'; // Your new sprite sheet
const SPRITE_SHEET_COLS = 2;
const SPRITE_SHEET_ROWS = 3;
const SPRITE_TOTAL_FRAMES = 6;
let spriteCurrentFrame = 0;
let spriteFrameInterval = 150;
let spriteAnimationTimer = null;
let spriteSheetLoaded = false;
let SPRITE_FRAME_WIDTH = 0;
let SPRITE_FRAME_HEIGHT = 0;
const SPRITE_DRAW_SCALE = 0.6;

spriteSheet.onload = function() {
  SPRITE_FRAME_WIDTH = spriteSheet.width / SPRITE_SHEET_COLS;
  SPRITE_FRAME_HEIGHT = spriteSheet.height / SPRITE_SHEET_ROWS;
  spriteSheetLoaded = true;
};

function drawCharacter() {
  if (!spriteSheetLoaded) return;
  const drawWidth = SPRITE_FRAME_WIDTH * SPRITE_DRAW_SCALE;
  const drawHeight = SPRITE_FRAME_HEIGHT * SPRITE_DRAW_SCALE;
  // Center character horizontally
  const x = characterX - drawWidth / 2;
  const y = boardHeight - drawHeight - 10;
  // Calculate frame position in the sheet
  const col = spriteCurrentFrame % SPRITE_SHEET_COLS;
  const row = Math.floor(spriteCurrentFrame / SPRITE_SHEET_COLS);
  context.drawImage(
    spriteSheet,
    col * SPRITE_FRAME_WIDTH, row * SPRITE_FRAME_HEIGHT, // Source X, Y
    SPRITE_FRAME_WIDTH, SPRITE_FRAME_HEIGHT,             // Source W, H
    x, y,                                                // Dest X, Y
    drawWidth, drawHeight                                // Dest W, H (scaled)
  );
}

function startSpriteSheetAnimation() {
  if (spriteAnimationTimer) clearInterval(spriteAnimationTimer);
  spriteAnimationTimer = setInterval(() => {
    spriteCurrentFrame = (spriteCurrentFrame + 1) % SPRITE_TOTAL_FRAMES;
  }, spriteFrameInterval);
}
function stopSpriteSheetAnimation() {
  if (spriteAnimationTimer) clearInterval(spriteAnimationTimer);
}

// Remove sprite sheet/canvas logic for character animation
// Restore character frame animation using image src swap
const characterFrames = [
  './assets/char_1.png',
  './assets/char_2.png',
  './assets/char_3.png',
  './assets/char_4.png'
];
let currentFrame = 0;
let sprintAnimationInterval = null;
const characterImg = document.getElementById('charachter');

function startSprintingAnimation() {
  if (sprintAnimationInterval) clearInterval(sprintAnimationInterval);
  sprintAnimationInterval = setInterval(() => {
    currentFrame = (currentFrame + 1) % characterFrames.length;
    characterImg.src = characterFrames[currentFrame];
  }, 150);
}
function stopSprintingAnimation() {
  if (sprintAnimationInterval) clearInterval(sprintAnimationInterval);
}

document.addEventListener('DOMContentLoaded', function () {
  // Set initial frame
  characterImg.src = characterFrames[0];
  // Only animate when visible (after "Play" is pressed in your game)
  const playButton = document.getElementById('playButton');
  playButton.addEventListener('click', () => {
    setTimeout(startSprintingAnimation, 600); // Sync with your start delay
  });
});

// Update all movement logic to use characterX
// Character movement boundaries
const minLeft = window.innerWidth * 0.15;
const maxLeft = window.innerWidth * 0.85;
const CHARACTER_MOVE_STEP = 30;

// Mouse drag
const character = document.getElementById('charachter');
let isDragging = false;
let offsetX = 0;

function onMouseDown(e) {
  isDragging = true;
  offsetX = e.clientX - characterX;
  character.style.cursor = "grabbing";
}
function onMouseMove(e) {
  if (isDragging) {
    let newX = e.clientX - offsetX;
    // Clamp newX to allowed range
    const charElem = document.getElementById('charachter');
    const charWidth = charElem.offsetWidth;
    const minLeft = boardWidth * 0.15 + charWidth / 2;
    const maxLeft = boardWidth * 0.85 - charWidth / 2;
    if (newX < minLeft) newX = minLeft;
    if (newX > maxLeft) newX = maxLeft;
    characterX = newX;
  }
}
function onMouseUp() {
  isDragging = false;
  character.style.cursor = "grab";
}
character.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

// Touch drag
function onTouchStart(e) {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - characterX;
}
function onTouchMove(e) {
  if (isDragging) {
    const touch = e.touches[0];
    let newX = touch.clientX - offsetX;
    // Clamp newX to allowed range
    const charElem = document.getElementById('charachter');
    const charWidth = charElem.offsetWidth;
    const minLeft = boardWidth * 0.15 + charWidth / 2;
    const maxLeft = boardWidth * 0.85 - charWidth / 2;
    if (newX < minLeft) newX = minLeft;
    if (newX > maxLeft) newX = maxLeft;
    characterX = newX;
  }
}
function onTouchEnd() {
  isDragging = false;
}
character.addEventListener("touchstart", onTouchStart);
document.addEventListener("touchmove", onTouchMove);
document.addEventListener("touchend", onTouchEnd);

// Keyboard arrow key support for desktop/laptop
window.addEventListener('keydown', function(e) {
  if (!isPlaying || isInterimVisible) return;
  if (e.key === 'ArrowLeft') {
    characterX -= CHARACTER_MOVE_STEP;
  } else if (e.key === 'ArrowRight') {
    characterX += CHARACTER_MOVE_STEP;
  }
  // Clamp characterX to allowed range
  const charElem = document.getElementById('charachter');
  const charWidth = charElem.offsetWidth;
  const minLeft = boardWidth * 0.15 + charWidth / 2;
  const maxLeft = boardWidth * 0.85 - charWidth / 2;
  if (characterX < minLeft) characterX = minLeft;
  if (characterX > maxLeft) characterX = maxLeft;
});

// ====== Character Sprint Animation ======
// Array of character frame image filenames
// const characterFrames = [
//   "./assets/char4.png",
//   "./assets/char5.png",
//   "./assets/char4.png",
//   "./assets/char5.png"
// ];

// How many milliseconds between frames (adjustable)
// let characterFrameInterval = 180;

// let currentFrame = 0;
// let sprintAnimationInterval = null;

// Reference to the character img element
// const characterImg = document.getElementById("character") || document.getElementById("charachter");

// Function to start animation loop
// function startSprintingAnimation() {
//   if (sprintAnimationInterval) clearInterval(sprintAnimationInterval); // Prevent multiple intervals

//   sprintAnimationInterval = setInterval(() => {
//     // Change the src attribute to show the next frame
//     currentFrame = (currentFrame + 1) % characterFrames.length;
//     characterImg.src = characterFrames[currentFrame];
//   }, characterFrameInterval);
// }

// Function to stop animation (optional, use if you want to pause/stop)
// function stopSprintingAnimation() {
//   if (sprintAnimationInterval) clearInterval(sprintAnimationInterval);
// }

// --- START animation when game starts ---
document.addEventListener("DOMContentLoaded", function () {
  // Only animate when visible (after "Play" is pressed in your game)
  const playButton = document.getElementById("playButton");
  playButton.addEventListener("click", () => {
    setTimeout(startSpriteSheetAnimation, 600); // Sync with your start delay
  });
});

// Restore gameLoop to use <img> for character
function gameLoop() {
  if (!isPlaying) return;
  context.clearRect(0, 0, boardWidth, boardHeight);
  drawBackground();
  updateCollectibles();
  updateObstacles();

  // Character is handled by <img> element
  const charElem = document.getElementById('charachter');
  const charWidth = charElem.offsetWidth;
  const charHeight = charElem.offsetHeight;
  // Calculate hitbox
  const hitboxWidth = charWidth * 0.8;
  const hitboxHeight = charHeight * 0.9;
  const player = {
    x: characterX - hitboxWidth / 2,
    y: boardHeight - charHeight - 10 + (charHeight - hitboxHeight) / 2,
    width: hitboxWidth,
    height: hitboxHeight,
  };

  // Set character image position so its center is at characterX and its feet are at the bottom
  charElem.style.left = (characterX - charWidth / 2) + 'px';
  charElem.style.top = (boardHeight - charHeight - 10) + 'px';

  // Draw the player's hitbox for debugging
  // context.save();
  // context.strokeStyle = 'red';
  // context.lineWidth = 2;
  // context.strokeRect(player.x, player.y, player.width, player.height);
  // context.restore();

  checkCollisions(player);
  checkObstacleCollisions(player);
  requestAnimationFrame(gameLoop);
}
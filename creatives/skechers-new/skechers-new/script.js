let board, context;
let backgroundX = 0;
let speed = 2;
let isPlaying = false;
let score = 0;
const progressThreshold = 69;
let boardWidth = 360;
let boardHeight = 640;
const gameContainer=document.getElementById("game-container")

let jumpHeight = boardHeight > 900 ? 450 : 300;
window.addEventListener("resize", () => {
  jumpHeight = window.innerHeight > 900 ? 450 : 300;
  const character = document.getElementById("charachter");
  character.style.bottom = `${getCharacterInitialBottom()}%`; // Update bottom on resize
});

window.addEventListener("orientationchange", () => {
  jumpHeight = window.innerHeight > 900 ? 450 : 300;
  const character = document.getElementById("charachter");
  character.style.bottom = `${getCharacterInitialBottom()}%`; // Update bottom on orientation change
});

const characterInitialBottom = 10; // Initial bottom position of the character (percentage)
let isJumping = false; // To prevent multiple jumps simultaneously

const characterImages = [
  "./assets/sprite1.png",  // Default jogging sprite
  "./assets/jump1.png",    // Jump sprite
  "./assets/ramadan (6).png",  // Phase 2 jogging sprite
  "./assets/ramadan (7).png"   // Phase 2 jumping sprite
];

characterImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// ✅ Preload background images at game start
const backgroundImages = {
  bg1: new Image(),
  bg2: new Image(),
  bg3: new Image(),
};

backgroundImages.bg1.src = "./assets/bg1.png";
backgroundImages.bg2.src = "./assets/bg2.jpeg";
backgroundImages.bg3.src = "./assets/bg3.jpeg";

// ✅ Ensure they are fully loaded before use
Object.values(backgroundImages).forEach((img) => {
  img.onload = () => console.log(`Preloaded: ${img.src}`);
});

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "./assets/bg1.png";

// Load collectible images
const burgerImage = new Image();
burgerImage.src = "./assets/coin.png";

const beverageImage = new Image();
beverageImage.src = "./assets/coin.png";

// ✅ Function to resume the game after background change
const coinImage = new Image();
coinImage.src = "./assets/coin.png";

const bagImage = new Image();
bagImage.src = "./assets/bag.png";

// ✅ Flag to check which set of collectibles should be used
let useSecondCollectibles = false;

// Collectibles array
const collectibles = [];

function getCharacterInitialBottom() {
  const viewportHeight = window.innerHeight;
  if (viewportHeight <= 640) {
    return 15; // Matches bottom: 15% in max-height: 640px media query
  } else {
    return 18; // Matches bottom: 15% in min-height: 641px media query
  }
}
// Function to make the character jump
function jumpCharacter() {
  if (isJumping || !isPlaying) return;
  isJumping = true;
  const character = document.getElementById("charachter");
  const initialBottom = getCharacterInitialBottom(); // Get dynamic bottom value
  character.classList.add("jumping");
  character.style.transition = "bottom 0.4s ease-out";
  character.style.bottom = `${initialBottom + jumpHeight}px`; // Dynamic height
  setTimeout(() => {
    character.style.transition = "bottom 0.4s ease-in";
    character.style.bottom = `${initialBottom}%`; // Return to dynamic bottom
    setTimeout(() => {
      character.classList.remove("jumping");
      isJumping = false;
    }, 400);
  }, 500);
}

function jumpCharacterPhase2() {
  if (isJumping || !isPlaying) return;
  isJumping = true;
  const character = document.getElementById("charachter");
  const initialBottom = getCharacterInitialBottom(); // Get dynamic bottom value

  // Apply Phase 2 Jumping Class
  character.classList.add("jumping", "phase2");

  // Determine dynamic jump height based on screen size
  let dynamicJumpHeight = window.innerHeight > 900 ? 450 : 300;

  character.style.transition = "bottom 0.4s ease-out";
  character.style.bottom = `${initialBottom + dynamicJumpHeight}px`; // Dynamic jump height

  setTimeout(() => {
    character.style.transition = "bottom 0.4s ease-in";
    character.style.bottom = `${initialBottom}%`; // Return to dynamic bottom
    setTimeout(() => {
      character.classList.remove("jumping");
      isJumping = false;
    }, 400);
  }, 500);
}


// Add event listener for jump functionality
document.getElementById("game-container").addEventListener("click", () => {
  const character = document.getElementById("charachter");

  if (character.classList.contains("phase2")) {
    jumpCharacterPhase2(); // ✅ Use Phase 2 Jump Function
  } else {
    jumpCharacter(); // ✅ Use Default Jump Function
  }
});


// Initialize the canvas when the window loads
window.onload = function () {
  board = document.getElementById("board");
  const gameContainer = document.getElementById("game-container");

  function adjustBoardSize() {
    const targetWidth = 360;
    const targetHeight = 640;
    const aspectRatio = targetWidth / targetHeight;

    // Use the window's dimensions for full-screen mode
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;

    let scaledWidth = containerWidth;
    let scaledHeight = scaledWidth / aspectRatio;

    if (scaledHeight < containerHeight) {
      scaledHeight = containerHeight;
      scaledWidth = scaledHeight * aspectRatio;
    }

    if (scaledWidth < containerWidth) {
      scaledWidth = containerWidth;
      scaledHeight = scaledWidth / aspectRatio;
    }

    board.width = targetWidth;
    board.height = targetHeight;
    board.style.width = `${scaledWidth}px`;
    board.style.height = `${scaledHeight}px`;

    boardWidth = targetWidth;
    boardHeight = targetHeight;

    gameContainer.style.width = `${scaledWidth}px`;
    gameContainer.style.height = `${scaledHeight}px`;
  }

  adjustBoardSize();
  context = board.getContext("2d");

  // Set the initial position of the character based on the media query
  const character = document.getElementById("charachter");
  character.style.bottom = `${getCharacterInitialBottom()}%`;

  window.addEventListener("resize", adjustBoardSize);
  window.addEventListener("orientationchange", adjustBoardSize);

  drawStaticBackground();

  const introScreen = document.getElementById("intro-screen");
  const instruction = document.getElementById("instruction");
  const playButton = document.getElementById("playButton");
  const paragraphs = document.querySelectorAll("#instruction p");
  const nextButtons = document.querySelectorAll(".nextButton");

  playButton.style.display = "none";
  paragraphs.forEach((p) => (p.style.display = "none"));
  instruction.style.display = "none";
  introScreen.style.display = "flex";

  setTimeout(() => {
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.style.display = "none";
      instruction.style.display = "flex";
      instruction.style.opacity = "1";

      let currentStep = 0;
      paragraphs[0].style.display = "block";
      nextButtons[0].style.display = "block";

      nextButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          if (currentStep < paragraphs.length - 1) {
            paragraphs[currentStep].style.display = "none";
            nextButtons[currentStep].style.display = "none";
            currentStep++;
            paragraphs[currentStep].style.display = "block";
            if (nextButtons[currentStep]) {
              nextButtons[currentStep].style.display = "block";
            }
          }

          if (currentStep === paragraphs.length - 1 && index === nextButtons.length - 1) {
            setTimeout(() => {
              instruction.style.transition = "opacity 1s ease-out";
              instruction.style.opacity = "0";
              setTimeout(() => {
                instruction.style.display = "none";
                playButton.style.display = "block";
              }, 700);
            }, 700);
          }
        });
      });
    }, 1000);
  }, 2500);

  playButton.addEventListener("click", startGame);
};

// Function to draw a static background
function drawStaticBackground() {
  context.clearRect(0, 0, boardWidth, boardHeight); // ✅ Clear previous frame
  context.drawImage(backgroundImage, 0, 0, boardWidth, boardHeight); // ✅ Redraw new background
}


// Function to spawn collectibles
function spawnCollectible() {
  if (!isPlaying) return;

  const minY = boardHeight * 0.63; // 
  const maxY = boardHeight * 0.48; 

  // ✅ Use the correct set of collectibles based on the phase
  const collectibleType = useSecondCollectibles
    ? Math.random() < 0.5
      ? coinImage
      : bagImage
    : Math.random() < 0.5
      ? burgerImage
      : beverageImage;

  const collectible = {
    image: collectibleType,
    x: boardWidth,
    y: Math.random() * (maxY - minY) + minY,
    width: 65,
    height: 65,
  };

  collectibles.push(collectible);
}

// Update and draw collectibles
function updateCollectibles(characterElem) {
  for (let i = collectibles.length - 1; i >= 0; i--) {
    const collectible = collectibles[i];

    // Move collectible left
    collectible.x -= speed;

    // Remove off-screen collectibles
    if (collectible.x + collectible.width < 0) {
      collectibles.splice(i, 1);
      continue;
    }

    // Calculate the collectible’s bounding rectangle relative to the viewport
    const collectibleRect = getCollectibleRect(collectible);
    const characterRect = characterElem.getBoundingClientRect();

    // Check for collision using the new precise function
    if (isCollidingWithRect(characterRect, collectibleRect)) {
      handleCollision(collectible);
      collectibles.splice(i, 1);
      continue;
    }

    // Draw the collectible on the canvas (canvas coordinates remain the same)
    context.drawImage(
      collectible.image,
      collectible.x,
      collectible.y,
      collectible.width,
      collectible.height
    );
  }
}

// Add this inside `handleCollision` to check when 5 collectibles are collected
// ✅ Updated handleCollision function to count correctly for both phases
function handleCollision(collectible) {
  collectedCount++;

  if (!useSecondCollectibles) {
    // In Phase 1, both burgerImage and beverageImage add 10 points.
    score += 10;
  } else {
    // In Phase 2, check the collectible image:
    if (collectible.image === coinImage) {
      score += 10;
    } else if (collectible.image === bagImage) {
      score += 15;
    }
  }
  document.getElementById("score").innerText = "Score: " + score;
  const glowEffect = document.createElement("div");
  glowEffect.classList.add("glow-effect");

  glowEffect.style.left = `${collectible.x}px`;
  glowEffect.style.top = `${collectible.y}px`;

  document.getElementById("game-container").appendChild(glowEffect);

  setTimeout(() => {
    glowEffect.remove();
  }, 1000);

  // ✅ Phase 1: Collect 5 collectibles → Pause game
  if (!useSecondCollectibles && collectedCount >= 4) {
    setTimeout(() => {
      pauseGame();
    }, 100);
  }
  if (useSecondCollectibles && collectedCount >= 7) {
    setTimeout(() => {
      endGame();
    }, 800);
  }
}

// ✅ Function to pause the game and show pop-up
function pauseGame() {
  isPlaying = false;
  setTimeout(() => {
    const popup = document.querySelector(".pop-up");
    const character = document.getElementById("charachter");
    const gameContainer = document.getElementById("game-container");

    popup.classList.add("show");
    popup.style.display = "block";

    function hidePopup() {
      if (popup.classList.contains("show")) {
        popup.classList.remove("show");
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.style.display = "none";
          updateProgressBar();
          character.classList.add("phase2");
          character.classList.add("skating-right");
          character.addEventListener("animationend", function onAnimationEnd() {
            character.removeEventListener("animationend", onAnimationEnd);
            character.classList.remove("skating-right");
            character.classList.remove("phase2");
            character.style.display = "none";
            gameContainer.style.transition = "opacity 0.5s ease-in-out";
            gameContainer.style.opacity = "0.3";
            setTimeout(() => {
              switchBackground();
              gameContainer.style.opacity = "1";
              character.style.display = "flex";
              character.style.bottom = `${getCharacterInitialBottom()}%`; // Reset bottom position
              setTimeout(() => {
                isPlaying = true;
              }, 500);
            }, 500);
          });
        }, 500);
        gameContainer.removeEventListener("click", hidePopup);
        gameContainer.removeEventListener("touchstart", hidePopup);
      }
    }

    gameContainer.addEventListener("click", hidePopup);
    gameContainer.addEventListener("touchstart", hidePopup);
  }, 300);
}

//  Smooth transition when switching background
function switchBackground() {
  const gameContainer = document.getElementById("game-container");
  const character = document.getElementById("charachter");

  // ✅ Apply phase 2 character class
  character.classList.add("phase2");

  // ✅ Create an overlay to blend transition (prevents white flash)
  let overlay = document.getElementById("transition-overlay");
  if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "transition-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "black"; // Matches game background
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.5s ease-in-out";
      overlay.style.zIndex = "50"; // Above everything
      gameContainer.appendChild(overlay);
  }

  // ✅ Show transition overlay instead of fading gameContainer
  overlay.style.opacity = "1";

  // ✅ Switch to preloaded background instantly
  setTimeout(() => {
      backgroundImage.src = backgroundImages.bg2.src; // ✅ Use preloaded bg2
      drawStaticBackground();

      // ✅ Fade out overlay instead of showing white screen
      overlay.style.opacity = "0";
      setTimeout(() => {
          overlay.remove(); // Remove overlay after fade-out
          resumeGame(); // ✅ Resume game as soon as bg is switched
      }, 500);
  }); // Short delay for smooth transition

  // ✅ Change score text color
  const score = document.getElementById("score");
  score.style.color = "white";
}

// ✅ Function to resume the game and switch collectibles
function resumeGame() {
  collectedCount = 0;
  isPlaying = true;
  useSecondCollectibles = true;
  for (let i = 0; i < collectibles.length; i++) {
    collectibles[i].image = Math.random() < 0.5 ? coinImage : bagImage;
  }
  requestAnimationFrame(gameLoop);
}

function endGame() {
  isPlaying = false; // Stops the game
  speed = 0; // ✅ Stops background scrolling
  const gameContainer = document.getElementById("game-container");
  // ✅ Instead of full fade-out, set partial transparency
  gameContainer.style.transition = "opacity 0.5s ease-in-out";
  gameContainer.style.opacity = "0.3";

  setTimeout(() => {
      animateEndSequence(); // ✅ Call animation sequence after partial fade-out
  }, 500); // Short delay for smooth transition

  setTimeout(() => {
      showGameOverPopup(); // ✅ Popup appears after delay
  }, 3500);
}


function animateEndSequence() {
  const character = document.getElementById("charachter");
  const gameContainer = document.getElementById("game-container");

  // ✅ Create an overlay to blend transition (prevents white flash)
  let overlay = document.getElementById("transition-overlay");
  if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "transition-overlay";
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "black"; // Matches game background
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease-in-out"; // ✅ Faster overlay transition
      overlay.style.zIndex = "50"; // Above everything
      gameContainer.appendChild(overlay);
  }

  // ✅ Show overlay to ensure smooth transition
  overlay.style.opacity = "1";

  // ✅ Load new background faster
  setTimeout(() => {
      backgroundImage.src = backgroundImages.bg3.src; // ✅ Use preloaded bg3
      drawStaticBackground();

      // ✅ Hide character completely to prevent ghosting
      character.style.display = "none";
      character.style.transform = "none"; // Reset transformations
      character.style.opacity = "0"; // Ensure complete invisibility

      // ✅ Reduce delay before removing overlay
      setTimeout(() => {
          overlay.style.opacity = "0"; // ✅ Fade out faster
          setTimeout(() => {
              overlay.remove(); // ✅ Remove overlay sooner

              // ✅ Fade-in the game smoothly
              gameContainer.style.transition = "opacity 0.3s ease-in-out"; // ✅ Faster fade-in
              gameContainer.style.opacity = "1";

              // ✅ Update Progress Bar (optional)
              updateProgressBarToFull();
          }, 300); // ✅ Reduced overlay fade-out time
      }); // ✅ Small delay ensures background is visible before fade-in
  }); // ✅ Faster transition to the new background
}


// ✅ Fill all segments one by one
function updateProgressBarToFull() {
  const progressSegments = document.querySelectorAll(".progress-segment");

  // ✅ Instantly Fill All Segments
  progressSegments.forEach(segment => {
    segment.classList.add("filled");
    segment.classList.remove("empty"); // Ensure no blue background remains
  });
}

function showGameOverPopup() {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over-div";
  gameOverDiv.classList.add("game-over-style");

  const textDiv = document.createElement("div");
  textDiv.id = "game-over-text";
  textDiv.innerHTML = `بفضل توجيهاتك ومساعدتك في اختيار أحذية سكتشرز المريحة والأنيقة، استمتعت فاطمة بتجربة تسوق مريحة في عيد الفطر.<br>`;

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.classList.add("next-buttons");

  gameOverDiv.appendChild(textDiv);
  gameOverDiv.appendChild(nextButton);
  document.getElementById("game-container").appendChild(gameOverDiv);

  nextButton.addEventListener("click", () => {
    textDiv.innerHTML = `
      يمكنك أيضًا الاطلاع على أحدث مجموعة عيد من سكتشرز في اقرب متجر اليك من خلال التحقق من هذا الرابط<br>
      <button onclick="window.location.href='https://apparelgroupapps.com/Skechers/ksa-eid-catalogue-2025.pdf'" 
              class="next-buttons" style="margin-top: -3px;">
            هنا
      </button>
    `;
    nextButton.style.display = "none";
  });
}

// ✅ Function to update progress bar
function updateProgressBar() {
  const progressSegments = document.querySelectorAll(".progress-segment");
  const fillSegments = Math.floor(progressSegments.length * 0.85); // 85% of the bar

  progressSegments.forEach((segment, index) => {
    if (index < fillSegments) {
      setTimeout(() => {
        segment.classList.remove("empty");
        segment.classList.add("filled"); // Add a class to make it green
      }, index * 100); // Smooth animation delay
    }
  });
}


// Collision detection function
function getCollectibleRect(collectible) {
  const boardRect = board.getBoundingClientRect();
  return {
    left: boardRect.left + collectible.x,
    top: boardRect.top + collectible.y,
    right: boardRect.left + collectible.x + collectible.width,
    bottom: boardRect.top + collectible.y + collectible.height,
    width: collectible.width,
    height: collectible.height,
  };
}
function isCollidingWithRect(rect1, rect2) {
  const intersectWidth = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  const intersectHeight = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
  const intersectionArea = intersectWidth * intersectHeight;
  const collectibleArea = rect2.width * rect2.height;
  const overlapThreshold = collectibleArea * 0.4; // 30% overlap

  // Debug: Log values to verify coordinate alignment and overlap
  console.log({ rect1, rect2, intersectWidth, intersectHeight, intersectionArea, collectibleArea, overlapThreshold });

  return intersectionArea >= overlapThreshold;
}


// Start the game
function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    collectedCount = 0;
    const playButton = document.getElementById("playButton");
    if (playButton) {
      playButton.style.display = "none"; // Only hide when starting the game
    }
    requestAnimationFrame(gameLoop);
    setInterval(spawnCollectible, 3000);
  }
}


// Game loop with proper background scrolling (Runs infinitely)
function gameLoop() {
  if (!isPlaying) return;
  context.clearRect(0, 0, boardWidth, boardHeight);
  backgroundX -= speed;
  if (backgroundX <= -boardWidth) backgroundX = 0;
  context.drawImage(backgroundImage, backgroundX, 0, boardWidth, boardHeight);
  context.drawImage(backgroundImage, backgroundX + boardWidth, 0, boardWidth, boardHeight);
  const characterElem = document.getElementById("charachter");
  updateCollectibles(characterElem);
  requestAnimationFrame(gameLoop);
}
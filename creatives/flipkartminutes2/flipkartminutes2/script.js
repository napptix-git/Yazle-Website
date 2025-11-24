// Select elements
// Select elements
const cart = document.getElementById("cart");
const scoreElement = document.getElementById("score");
const startScreen = document.querySelector(".start-sec");
const sceneImage = document.getElementById("scene-image");
let clockRotations = 0; // Track second-hand full spins
// const timeDisplay = document.getElementById("time");
// let displaySeconds = 9;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius *= 0.90;

let rotationAngle = 0;
let minuteAngle = 9 * (2 * Math.PI / 12); // start from 9
let lastTime = Date.now();
let elapsedTotal = 0;
let stopped = true;

const fullCircle = 2 * Math.PI;
const speed = fullCircle / 3000; // One full rotation every 3 sec

function updateClock() {
  if (stopped) return;

  const now = Date.now();
  const delta = now - lastTime;
  const maxDelta = 100;
  const safeDelta = Math.min(delta, maxDelta);

  rotationAngle += speed * safeDelta;
  elapsedTotal += delta;

  if (rotationAngle >= fullCircle) {
    rotationAngle = 0;
    minuteAngle -= fullCircle / 12;

    // Count completed rotations
    clockRotations++;
    if (clockRotations >= 4) {
      stopped = true;
      endGame();
      return;
    }
  }

  lastTime = now;
  drawClock();
}

function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawSecondHand(ctx, radius);
  drawMinuteHand(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.12, 0, 2 * Math.PI); // previously 1.07
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.32 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawSecondHand(ctx, radius) {
 drawHand(ctx, rotationAngle, radius * 0.9, radius * 0.03);;
}

function drawMinuteHand(ctx, radius) {
  drawHand(ctx, minuteAngle, radius * 0.5, radius * 0.05);
}


function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

drawClock();
function animateClock() {
  updateClock();
  requestAnimationFrame(animateClock);
}
animateClock();


// Game logic
let score = 0;
let gameRunning = false;
let gameInterval;

function startGame() {
  if (gameRunning) return;
  gameRunning = true;

  startScreen.style.transition = "opacity 0.2s ease-out";
  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.style.display = "none";
  }, 200);

  gameInterval = setInterval(makeItemFall, 1000);
  clockRotations = 0; // Reset when game starts
  // Start the analog clock
  stopped = false;
  elapsedTotal = 0;
  rotationAngle = 0;
  minuteAngle = 9 * (2 * Math.PI / 12);
  lastTime = Date.now();

  // setTimeout(() => {
  //   if (gameRunning) {
  //     stopped = true;
  //     endGame();
  //   }
  // }, 27000);
}
// Function to start the game


// Function to end the game
function endGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  stopped = true;

 const scoreStr = score.toString().padStart(2, '0');
document.getElementById('digit1').textContent = scoreStr[0];
document.getElementById('digit2').textContent = scoreStr[1];

setTimeout(() => {
  showGameOverDiv();
}, 500);
  document.removeEventListener("mousemove", moveCart);
  document.removeEventListener("touchmove", moveCart);
  
}

// Add event listener to Play button

sceneImage.addEventListener("click", () => {
  const startScreen = document.getElementById("start-screen");
  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.style.display = "none";
    startGame(); // now start the game
  }, 800);
});


// Variables for dragging cart
let isDragging = false;
let offsetX;

// Adjust limits for movement
const leftOffset = 60; // Decrease left limit (stop sooner)
const rightOffset = 60; // Increase right limit (move further)

// Add drag functionality for cart (desktop and mobile)
cart.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - cart.getBoundingClientRect().left;
    cart.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        moveCart(e.clientX);
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cart.style.cursor = "grab";
});

cart.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - cart.getBoundingClientRect().left;
});

document.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        moveCart(touch.clientX);
    }
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

// Function to move the cart within adjusted screen boundaries
function moveCart(clientX) {
    const cartWidth = cart.offsetWidth;
    const screenWidth = window.innerWidth;

    let x = clientX - offsetX;

    if (x < leftOffset) x = leftOffset; // Decrease left movement
    if (x + cartWidth > screenWidth + rightOffset) x = screenWidth - cartWidth + rightOffset; // Increase right movement

    cart.style.left = `${x}px`;
}

// Rows containing items
const rows = [
    document.querySelector(".row1"),
    document.querySelector(".row2"),
    document.querySelector(".row3"),
    document.querySelector(".row4"),
];

// List of available images
const imageAssets = [
    "./assets/item1.png",
    "./assets/item2.png",
    "./assets/item3.png",
    "./assets/item4.png",
    "./assets/item5.png",
    "./assets/item6.png",
    "./assets/item7.png",
    "./assets/item8.png",
    "./assets/item9.png",
  "./assets/item10.png",
  "./assets/item11.png",
    "./assets/item12.png"
];

// Function to make an item fall from an existing position in the row
function makeItemFall() {
    const randomRow = rows[Math.floor(Math.random() * rows.length)];
    const items = randomRow.querySelectorAll("img");

    if (items.length === 0) return; // No items in the row

    // Select a random image from the row
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // **Clone the item first before replacing**
    const fallingItem = randomItem.cloneNode(true);
    fallingItem.classList.add("falling-item");

    // Get the exact position and size of the selected item
    const itemRect = randomItem.getBoundingClientRect();

    // **Set falling item's position before replacing**
    fallingItem.style.position = "absolute";
    fallingItem.style.left = `${itemRect.left}px`;
    fallingItem.style.top = `${itemRect.top}px`;
    fallingItem.style.width = `${randomItem.offsetWidth}px`;
    fallingItem.style.height = `${randomItem.offsetHeight}px`;
    fallingItem.style.transformOrigin = "center";
    fallingItem.style.zIndex = "20"; // Ensure it falls above everything

    document.body.appendChild(fallingItem);

    // **Now replace the original item in the row with a new one**
    const newItem = document.createElement("img");
    newItem.src = imageAssets[Math.floor(Math.random() * imageAssets.length)];

    // Copy original item's class to maintain CSS styles
    newItem.className = randomItem.className;

    // Copy all inline styles (for width, height, positioning, etc.)
    newItem.style.width = randomItem.style.width;
    newItem.style.height = randomItem.style.height;
    newItem.style.position = randomItem.style.position;
    newItem.style.objectFit = "cover"; // Ensures image fits perfectly
    newItem.style.zIndex = "10"; // Keep it below the falling item

    // Replace the item in the row
    randomItem.parentNode.replaceChild(newItem, randomItem);

    // Animate falling
    animateFall(fallingItem);
}

// Function to animate the falling items
function animateFall(item) {
    let position = parseInt(item.style.top, 10);
    let speed = 8; // Set falling speed to 7

    const tiltAngle = [30, 45][Math.floor(Math.random() * 2)];
    item.style.transform = `rotate(${tiltAngle}deg) scale(0.8)`;
    item.style.transformOrigin = "center";

    function fall() {
        if (position >= window.innerHeight - 100) {
            item.remove(); // Remove if it reaches bottom
            return;
        }

        position += speed;
        item.style.top = `${position}px`;

        if (isAccurateCollision(cart, item)) {
            handleCollision(item);
            return;
        }

        requestAnimationFrame(fall);
    }

    requestAnimationFrame(fall);
}

function showGameOverDiv() {
    const gameOverDiv = document.createElement("div");
    gameOverDiv.id = "game-over-div";
    gameOverDiv.classList.add("game-over-style");

    // Create heading
    // const h3 = document.createElement("h3");
    // h3.textContent = "PERFECT!";
    // h3.style.color = "black"; 
    // h3.style.fontSize = "24px"; 
    // h3.style.marginBottom = "10px";

    // // Create message text
    // const textDiv = document.createElement("div");
    // textDiv.style.textAlign = "center";
    // textDiv.style.marginBottom = "20px";
    // textDiv.innerHTML = `You have bagged <strong>${score}</strong> Freshest Fruits and Vegetables in 9 Minutes!`;

    // Create image
    const image = document.createElement("img");
    image.src = "./assets/bag.png";
    image.alt = "Meal";
    image.id = "bag";
  
    image.style.margin = "0 auto";
  image.style.display = "block";
  
    // Append elements to gameOverDiv
    // gameOverDiv.appendChild(h3); 
    // gameOverDiv.appendChild(textDiv);
   // Create a score label to overlay above the bag
const scoreOverlay = document.createElement("div");
scoreOverlay.className = "score-overlay";
scoreOverlay.textContent = `${score}`;
gameOverDiv.appendChild(scoreOverlay);

// Then append the bag image
gameOverDiv.appendChild(image);

    gameOverDiv.style.display = "block";
    
   image.addEventListener("click", () => {
     document.getElementById("final-screen").style.display = "flex";
     document.getElementById("final-screen").addEventListener("click", () => {
  window.open("https://ad.doubleclick.net/ddm/trackclk/N925530.5513058NAPPTIX0/B33689796.422800334;dc_trk_aid=615409682;dc_trk_cid=236416081;dc_lat=;dc_rdid={device_id};tag_for_child_directed_treatment=;tfua=;gdpr=%%GDPR%%;gdpr_consent=%%GDPR_CONSENT_755%%;ltd=;dc_tdv=1", "_blank");
});

  });
    // Append to game container
  document.querySelector(".game-container").appendChild(gameOverDiv);
  
  // Show final screen after 2500ms
}
// **Collision Detection**
function isAccurateCollision(cart, item) {
    const cartRect = cart.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const overlapWidth = Math.max(0, Math.min(cartRect.right, itemRect.right) - Math.max(cartRect.left, itemRect.left));
    const overlapHeight = Math.max(0, Math.min(cartRect.bottom, itemRect.bottom) - Math.max(cartRect.top, itemRect.top));
    return (overlapWidth * overlapHeight) / (itemRect.width * itemRect.height) >= 0.35;
}

// **Handle Collision & Show Overlay Effect**
function handleCollision(item) {
    score++; // Increment score
    const scoreStr = score.toString().padStart(2, '0');
document.getElementById('digit1').textContent = scoreStr[0];
document.getElementById('digit2').textContent = scoreStr[1];
 // Force UI update immediately

    // Show overlay animation when an item is collected
    showOverlayEffect();

    // Scale up and fade out
    item.style.transform += " scale(2.00)";
    item.style.transition = "transform 0.5s, opacity 0.5s";
    item.style.opacity = "0";

    // Remove the item after animation
    setTimeout(() => {
        item.remove();
    }, 300);
}


// **Function to Show Overlay Effect on Top**
function showOverlayEffect() {
    const overlay = document.createElement("img");
    overlay.src = "./assets/overlay2-1.png"; // Path to overlay image
    overlay.classList.add("overlay-effect");

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 300);
}

const style = document.createElement("style");
style.innerHTML = `
    .overlay-effect {
        position: absolute; 
        top: 30%;
        width: 300px;
        transform: scale(1);
        z-index: 9999;
        user-select:none;
        transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    }
`;

document.head.appendChild(style);
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  
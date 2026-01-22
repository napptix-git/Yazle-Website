// Select elements
const cart = document.getElementById("cart");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startScreen = document.querySelector(".start-sec");
const playButton = document.getElementById("play-button");
const gameContainer = document.querySelector(".game-container");


let score = 0;
let timeLeft = 15; // Timer set to 15 seconds
let gameRunning = false;
let gameInterval, timerInterval;
let WIZORA_CLICK_URL = "https://online.kfc.co.in/";

// Function to start the game
function startGame() {
    if (gameRunning) return; // Prevent multiple clicks
    gameRunning = true;

    // Hide the start screen with fade-out effect
    startScreen.style.transition = "opacity 0.2s ease-out";
    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none"; // Remove from view
    }, 200);

    // Show the cart when game starts
    cart.style.display = "block";

    // Start falling items
    gameInterval = setInterval(makeItemFall, 1000);

    // Start timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}


// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Stop items from falling
    clearInterval(timerInterval); // Stop timer
    gameRunning = false;
  
    setTimeout(() => {
        scoreElement.textContent = score; // Force final score update before displaying Game Over
        showGameOverDiv();
    }, 700); // Delay showing Game Over div by 0.3 sec
    // Fade out cart, shelf, and rows
    document.removeEventListener("mousemove", moveCart);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchmove", moveCart);
    document.removeEventListener("touchend", stopDragging);
    
}


// Add event listener to Play button
playButton.addEventListener("click", startGame);

// Variables for dragging cart
let isDragging = false;
let offsetX;

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

// Function to move the cart within screen boundaries (full range)
function moveCart(clientX) {
    const cartWidth = cart.offsetWidth;
    const containerRect = gameContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerLeft = containerRect.left;

    // Convert clientX to position relative to container
    let x = clientX - containerLeft - offsetX;

    // Allow full movement to extreme left (0) and extreme right (containerWidth - cartWidth)
    if (x < 0) x = 0; // Keep within left boundary
    if (x + cartWidth > containerWidth) x = containerWidth - cartWidth; // Keep within right boundary

    cart.style.left = `${x}px`;
}

// Rows containing items
const rows = [
    document.querySelector(".row1"),
    document.querySelector(".row2"),
    document.querySelector(".row3"),
    document.querySelector(".row4"),
];

// List of available KFC images
const imageAssets = [
    "./assets/KFC Gold burger.webp"
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
    // If the cloned falling item fails to load (rare), replace with placeholder to avoid breakage
    fallingItem.onerror = function() {
        this.src = './assets/placeholder.svg';
        this.onerror = null;
    };

    // Get the exact position and size of the selected item
    const itemRect = randomItem.getBoundingClientRect();

    // **Set falling item's position and size to match original exactly**
    fallingItem.style.position = "absolute";
    fallingItem.style.left = `${itemRect.left}px`;
    fallingItem.style.top = `${itemRect.top}px`;
    fallingItem.style.width = '80px';
    fallingItem.style.height = '80px';
    fallingItem.style.maxWidth = '80px';
    fallingItem.style.maxHeight = '80px';
    fallingItem.style.objectFit = 'contain';
    fallingItem.style.boxSizing = 'border-box';
    fallingItem.style.transformOrigin = "center";
    fallingItem.style.zIndex = "20"; // Ensure it falls above everything

    document.body.appendChild(fallingItem);

    // **Now replace the original item in the row with a new one**
    const newItem = document.createElement("img");
    newItem.src = imageAssets[Math.floor(Math.random() * imageAssets.length)];

    // Copy original item's class to maintain CSS styles
    newItem.className = randomItem.className;

    // Set consistent size for all shelf items
    newItem.style.width = '80px';
    newItem.style.height = '80px';
    newItem.style.maxWidth = '80px';
    newItem.style.maxHeight = '80px';
    newItem.style.boxSizing = 'border-box';
    newItem.style.position = 'relative';
    newItem.style.objectFit = "contain"; // Ensures image fits perfectly without distortion
    newItem.style.zIndex = "10"; // Keep it below the falling item
    // Fallback if image fails to load
    newItem.onerror = function() {
        this.src = './assets/placeholder.svg';
        this.onerror = null;
    };

    // Replace the item in the row
    randomItem.parentNode.replaceChild(newItem, randomItem);

    // Animate falling
    animateFall(fallingItem);
}

// Function to animate the falling items
function animateFall(item) {
    let position = parseInt(item.style.top, 10);
    let speed = 5;

    // Random tilt angle (45°, 60°, 75°)
    const tiltAngle = [45, 60, 75][Math.floor(Math.random() * 3)];
    item.style.transform = `rotate(${tiltAngle}deg)`;

    // Get container bottom boundary
    const containerRect = gameContainer.getBoundingClientRect();
    const containerBottom = containerRect.bottom;

    function fall() {
        // Check if item has reached bottom of container
        const itemRect = item.getBoundingClientRect();
        if (itemRect.bottom >= containerBottom - 20) {
            item.remove(); // If it reaches the bottom and is not caught, disappear
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

    // Create translucent white content box with all text inside
    const contentBox = document.createElement("div");
    contentBox.style.position = "absolute";
    contentBox.style.top = "50%";
    contentBox.style.left = "50%";
    contentBox.style.transform = "translate(-50%, -50%)";
    contentBox.style.width = "85%";
    contentBox.style.maxWidth = "380px";
    contentBox.style.backgroundColor = "rgba(255, 255, 255, 0.95)"; /* Translucent white */
    contentBox.style.borderRadius = "20px";
    contentBox.style.padding = "30px 20px";
    contentBox.style.border = "6px solid #E4002B"; /* KFC red border */
    contentBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";

    // Create top text "You caught X Gold Burgers"
    const topText = document.createElement("div");
    topText.style.color = "#E4002B";
    topText.style.fontSize = "24px";
    topText.style.fontWeight = "bold";
    topText.style.textAlign = "center";
    topText.style.marginBottom = "15px";
    topText.style.lineHeight = "1.2";
    topText.innerHTML = `You caught <span style="font-size: 28px;">${score}</span> Gold Burgers`;

    // Create video element with multi-format sources for compatibility
    const varietyText = document.createElement("video");
    const videoSources = [
        { type: "video/webm", src: "./assets/video.webm" },
        { type: "video/mp4", src: "./assets/video.mp4" },
    ];
    videoSources.forEach(({ type, src }) => {
        const source = document.createElement("source");
        source.type = type;
        source.src = src;
        varietyText.appendChild(source);
    });
    varietyText.autoplay = true;
    varietyText.loop = true;
    varietyText.muted = true; // autoplay with audio fails on many mobile devices
    varietyText.defaultMuted = true;
    varietyText.setAttribute("muted", "");
    varietyText.playsInline = true;
    varietyText.setAttribute("playsinline", "");
    varietyText.setAttribute("webkit-playsinline", "");
    varietyText.controls = true;
    varietyText.style.width = "280px";
    varietyText.style.height = "auto";
    varietyText.style.borderRadius = "10px";
    varietyText.style.marginBottom = "25px";
    varietyText.style.display = "block";
    varietyText.style.margin = "0 auto 25px auto";

    // Ensure video plays (silently) after it is added to the DOM
    varietyText.play().catch(e => console.log("Video autoplay failed:", e));

    // Create CTA button with chicken wing emoji
    const ctaButton = document.createElement("button");
    ctaButton.style.backgroundColor = "#E4002B"; /* KFC red */
    ctaButton.style.color = "white";
    ctaButton.style.fontSize = "18px";
    ctaButton.style.fontWeight = "bold";
    ctaButton.style.padding = "14px 40px";
    ctaButton.style.border = "none";
    ctaButton.style.borderRadius = "35px";
    ctaButton.style.cursor = "pointer";
    ctaButton.style.boxShadow = "0 5px 15px rgba(228,0,43,0.4)";
    ctaButton.style.display = "block";
    ctaButton.style.margin = "0 auto";
    ctaButton.style.transition = "transform 0.2s";
    ctaButton.innerHTML = "Order Now →";

    // Add hover effect
    ctaButton.onmouseover = () => ctaButton.style.transform = "scale(1.05)";
    ctaButton.onmouseout = () => ctaButton.style.transform = "scale(1)";

    // Add click event to redirect to KFC website
    ctaButton.onclick = () => {
        window.open(WIZORA_CLICK_URL, "_blank");
    };

    // Append all elements to content box
    contentBox.appendChild(topText);
    contentBox.appendChild(varietyText);
    contentBox.appendChild(ctaButton);

    // Append content box to gameOverDiv
    gameOverDiv.appendChild(contentBox);
    gameOverDiv.style.display = "block";

    // Append to game container
    document.querySelector(".game-container").appendChild(gameOverDiv);
}
// **Collision Detection**
function isAccurateCollision(cart, item) {
    const cartRect = cart.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const overlapWidth = Math.max(0, Math.min(cartRect.right, itemRect.right) - Math.max(cartRect.left, itemRect.left));
    const overlapHeight = Math.max(0, Math.min(cartRect.bottom, itemRect.bottom) - Math.max(cartRect.top, itemRect.top));
    return (overlapWidth * overlapHeight) / (itemRect.width * itemRect.height) >= 0.2;
}

// **Handle Collision & Show Overlay Effect**
function handleCollision(item) {
    score++; // Increment score
    scoreElement.textContent = score; // Force UI update immediately

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
let currentOverlay = 1; // Track which overlay to show (cycles through 1, 2, 3)

function showOverlayEffect() {
    const overlay = document.createElement("img");
    // Sequential overlay: 1, 2, 3, 1, 2, 3...
    overlay.src = `./assets/overlay2-${currentOverlay}.webp`;
    overlay.classList.add("overlay-effect");

    document.body.appendChild(overlay);

    // Cycle to next overlay (1 -> 2 -> 3 -> 1)
    currentOverlay = currentOverlay === 3 ? 1 : currentOverlay + 1;

    setTimeout(() => overlay.remove(), 300);
}

const style = document.createElement("style");
style.innerHTML = `
    .overlay-effect {
        position: absolute;
        top: 30%;
        width: 220px;
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
                console.warn(`Image failed to load, replacing with placeholder: ${img.src}`);
                img.src = './assets/placeholder.svg';
                img.onerror = null; // prevent infinite loop if placeholder is missing
            };
        });
    });
  

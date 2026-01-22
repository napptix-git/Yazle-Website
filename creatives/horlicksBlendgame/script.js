const DURATION_FRAME_ONE = 3000;
const DURATION_FRAME_TWO = 8000;
const timerFill = document.getElementById("timer-fill");
const timerFillTwo = document.getElementById("timer-fill-two");
const frameOne = document.querySelector(".frame-one");
const frameTwo = document.querySelector(".frame-two");
const timerOverlay = document.querySelector(".timer-overlay");
const timerOverlayTwo = document.querySelector(".timer-overlay-two");
const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");
const mixerSound = new Audio("./assets/mixer sound.mp3");
mixerSound.volume = 0.8;
const successSound = new Audio("./assets/confetti.mp3");
successSound.volume = 0.9;
const failSound = new Audio("./assets/nope.mp3");
failSound.volume = 0.9;

let deadline = 0;
let rafId = null;
let gameStarted = false;

function startCycle() {
    deadline = performance.now() + DURATION_FRAME_ONE;
    timerFill.style.transform = "scaleX(1)";
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(updateTimer);
}

function beginMemorizePhase() {
    frameOne.classList.add("visible");
    frameOne.setAttribute("aria-hidden", "false");
    timerOverlay.style.display = "flex";
    startCycle();
}

startButton.addEventListener("click", () => {
    if (gameStarted) return;
    gameStarted = true;
    startButton.disabled = true;
    startScreen.classList.add("hidden");
    beginMemorizePhase();
});

function updateTimer(now) {
    const remaining = deadline - now;

    if (remaining <= 0) {
        timerFill.style.transform = "scaleX(0)";
        showFrameTwo();
        return;
    }

    const scale = Math.max(remaining / DURATION_FRAME_ONE, 0);
    timerFill.style.transform = `scaleX(${scale})`;

    rafId = requestAnimationFrame(updateTimer);
}

function showFrameTwo() {
    frameOne.classList.remove("visible");
    frameOne.setAttribute("aria-hidden", "true");
    frameTwo.classList.add("visible");
    frameTwo.setAttribute("aria-hidden", "false");
    timerOverlay.style.display = "none";
    timerOverlayTwo.style.display = "flex";

    const instruction = document.getElementById("game-instruction");
    if (instruction) {
        instruction.style.display = "block";
    }

    startSecondTimer();
}


function startSecondTimer() {
    deadline = performance.now() + DURATION_FRAME_TWO;
    timerFillTwo.style.transform = "scaleX(1)";
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(updateSecondTimer);
}

function updateSecondTimer(now) {
    const remaining = deadline - now;

    if (remaining <= 0) {
        timerFillTwo.style.transform = "scaleX(0)";
        timerOverlayTwo.style.display = "none";

        // Check if wrong blend was shown
        if (gameComplete && ingredientsAdded.length > 0 && !isCorrectBlend()) {
            // Wrong blend - restart game after a delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (gameComplete && isCorrectBlend()) {
            // Correct blend - show endframe
            showEndFrame();
        }
        return;
    }

    const scale = Math.max(remaining / DURATION_FRAME_TWO, 0);
    timerFillTwo.style.transform = `scaleX(${scale})`;

    rafId = requestAnimationFrame(updateSecondTimer);
}

function isCorrectBlend() {
    const hasMilk = ingredientsAdded.includes("milk");
    const hasWeed = ingredientsAdded.includes("weed");
    const hasAlmond = ingredientsAdded.includes("almond");
    const onlyCorrectIngredients = ingredientsAdded.every(ing =>
        ing === "milk" || ing === "weed" || ing === "almond"
    );
    return ingredientsAdded.length === 3 && hasMilk && hasWeed && hasAlmond && onlyCorrectIngredients;
}

function showEndFrame() {
    // Hide superblend and confetti first
    const superblend = document.querySelector(".game-container img[src='./assets/superblend.png']");
    if (superblend) superblend.remove();
    const confettiContainer = document.querySelector(".game-container > div[style*='z-index: 14']");
    if (confettiContainer) confettiContainer.remove();

    // Create end frame container
    const endFrameContainer = document.createElement("div");
    endFrameContainer.style.position = "absolute";
    endFrameContainer.style.inset = "0";
    endFrameContainer.style.width = "100%";
    endFrameContainer.style.height = "100%";
    endFrameContainer.style.zIndex = "40";
    endFrameContainer.style.backgroundColor = "#f5f5dc";

    // Background image
    const endFrameBg = document.createElement("div");
    endFrameBg.style.position = "absolute";
    endFrameBg.style.inset = "0";
    endFrameBg.style.backgroundImage = "url('./assets/EndFrame.png')";
    endFrameBg.style.backgroundSize = "cover";
    endFrameBg.style.backgroundPosition = "center";
    endFrameBg.style.backgroundRepeat = "no-repeat";

    // Text and CTA overlay container
    const ctaOverlay = document.createElement("div");
    ctaOverlay.style.position = "absolute";
    ctaOverlay.style.bottom = "6%";
    ctaOverlay.style.left = "50%";
    ctaOverlay.style.transform = "translateX(-50%)";
    ctaOverlay.style.textAlign = "center";
    ctaOverlay.style.width = "90%";
    ctaOverlay.style.maxWidth = "320px";
    ctaOverlay.style.zIndex = "41";
    ctaOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
    ctaOverlay.style.padding = "24px 20px";
    ctaOverlay.style.borderRadius = "20px";
    ctaOverlay.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.18), 0 0 1px rgba(0, 0, 0, 0.05)";
    ctaOverlay.style.backdropFilter = "blur(16px)";
    ctaOverlay.style.webkitBackdropFilter = "blur(16px)";
    ctaOverlay.style.border = "1px solid rgba(255, 255, 255, 0.6)";
    ctaOverlay.style.animation = "slideUpFade 0.6s ease-out";

    // Main heading
    const heading = document.createElement("h1");
    heading.textContent = "Horlicks Signature Blends";
    heading.style.fontFamily = "'Poppins', 'Segoe UI', Arial, sans-serif";
    heading.style.fontSize = "22px";
    heading.style.fontWeight = "800";
    heading.style.color = "#ffffff";
    heading.style.margin = "0 0 6px 0";
    heading.style.lineHeight = "1.2";
    heading.style.letterSpacing = "-0.3px";
    heading.style.textShadow = "-1px -1px 2px rgba(0, 34, 77, 0.8), 1px -1px 2px rgba(0, 34, 77, 0.8), -1px 1px 2px rgba(0, 34, 77, 0.8), 1px 1px 2px rgba(0, 34, 77, 0.8)";

    // Subheading
    const subheading = document.createElement("p");
    subheading.textContent = "Nourishment for Everyone";
    subheading.style.fontFamily = "'Poppins', 'Segoe UI', Arial, sans-serif";
    subheading.style.fontSize = "14px";
    subheading.style.fontWeight = "500";
    subheading.style.color = "#e0f4ff";
    subheading.style.margin = "0 0 20px 0";
    subheading.style.lineHeight = "1.4";
    subheading.style.textShadow = "0 0 4px rgba(0, 0, 0, 0.6)";

    // CTA Button
    const ctaButton = document.createElement("button");
    ctaButton.textContent = "Discover Your Daily Superfuel!";
    ctaButton.style.fontFamily = "'Poppins', 'Segoe UI', Arial, sans-serif";
    ctaButton.style.fontSize = "14px";
    ctaButton.style.fontWeight = "700";
    ctaButton.style.color = "#ffffff";
    ctaButton.style.backgroundColor = "#0095da";
    ctaButton.style.border = "none";
    ctaButton.style.borderRadius = "50px";
    ctaButton.style.padding = "13px 28px";
    ctaButton.style.cursor = "pointer";
    ctaButton.style.boxShadow = "0 8px 20px rgba(0, 149, 218, 0.4)";
    ctaButton.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    ctaButton.style.width = "100%";
    ctaButton.style.maxWidth = "100%";
    ctaButton.style.letterSpacing = "0.2px";
    ctaButton.style.outline = "none";

    // Button hover/active effect
    ctaButton.addEventListener("touchstart", function() {
        this.style.backgroundColor = "#007ab8";
        this.style.transform = "scale(0.98)";
    });

    ctaButton.addEventListener("touchend", function() {
        this.style.backgroundColor = "#0095da";
        this.style.transform = "scale(1)";
    });

    ctaButton.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#007ab8";
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 8px 20px rgba(0, 149, 218, 0.45)";
    });

    ctaButton.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "#0095da";
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 6px 16px rgba(0, 149, 218, 0.35)";
    });

    // Button click - redirect to Horlicks website
    ctaButton.addEventListener("click", function(e) {
        e.stopPropagation();
        window.location.href = "https://www.horlicks.in/";
    });

    // Assemble the overlay
    ctaOverlay.appendChild(heading);
    ctaOverlay.appendChild(subheading);
    ctaOverlay.appendChild(ctaButton);

    // Assemble the end frame
    endFrameContainer.appendChild(endFrameBg);
    endFrameContainer.appendChild(ctaOverlay);

    document.querySelector(".game-container").appendChild(endFrameContainer);
}

// Ingredient click handling
const ingredientAreas = document.querySelectorAll(".ingredient-area");
const fallingContainer = document.getElementById("falling-container");
const jarImg = document.getElementById("jar");

const ingredientImages = {
    milk: "./assets/milk.png",
    almond: "./assets/almond.png",
    weed: "./assets/weed.png",
    apple: "./assets/apple.png",
    cocoa: "./assets/coca beans.png"
};

const ingredientTextImages = {
    milk: "./assets/oats text.png",
    almond: "./assets/almonds text.png",
    weed: "./assets/millets text.png",
    apple: "./assets/Apple text.png",
    cocoa: "./assets/coca bean text.png"
};

let ingredientsAdded = [];
let gameComplete = false;

ingredientAreas.forEach(area => {
    area.addEventListener("click", function() {
        if (gameComplete) return;

        const ingredient = this.getAttribute("data-ingredient");
        dropIngredient(ingredient);
    });
});

function dropIngredient(ingredientType) {
    // Wrapper that allows ingredient + label to fall together
    const dropWrapper = document.createElement("div");
    dropWrapper.className = "ingredient-drop dropping";
    dropWrapper.style.top = "0";

    const fallingImg = document.createElement("img");
    fallingImg.src = ingredientImages[ingredientType];
    fallingImg.className = "falling-ingredient";
    dropWrapper.appendChild(fallingImg);

    const textSrc = ingredientTextImages[ingredientType];
    if (textSrc) {
        const textImg = document.createElement("img");
        textImg.src = textSrc;
        textImg.alt = `${ingredientType} label`;
        textImg.className = "ingredient-text";
        dropWrapper.appendChild(textImg);
    }

    fallingContainer.appendChild(dropWrapper);

    try {
        mixerSound.currentTime = 0;
        mixerSound.play().catch(() => {});
    } catch (err) {
        console.warn("Mixer sound failed to play", err);
    }

    // Track ingredient added
    ingredientsAdded.push(ingredientType);
    updateJar();

    // Remove after animation
    setTimeout(() => {
        dropWrapper.remove();
    }, 1500);
}

function updateJar() {
    const count = ingredientsAdded.length;

    // Check if user has milk
    const hasMilk = ingredientsAdded.includes("milk");
    const hasWeed = ingredientsAdded.includes("weed");
    const hasAlmond = ingredientsAdded.includes("almond");
    const onlyCorrectIngredients = ingredientsAdded.every(ing =>
        ing === "milk" || ing === "weed" || ing === "almond"
    );

    // First ingredient
    if (count === 1) {
        if (ingredientsAdded[0] === "milk") {
            jarImg.src = "./assets/jar milk.png";
        } else {
            jarImg.src = "./assets/jar yellow.png";
        }
    }
    // Check combination after adding more ingredients
    else if (count >= 2) {
        // Check if correct combination: milk, weed, and almond
        if (count === 3 && hasMilk && hasWeed && hasAlmond && onlyCorrectIngredients) {
            // Perfect blend!
            jarImg.src = "./assets/jar yellow.png";
            showSuperblend();
            gameComplete = true;
            // End timer immediately and show endframe
            endGameImmediately(true);
        } else if (!onlyCorrectIngredients || count > 3) {
            // Wrong ingredient added
            jarImg.src = "./assets/jar yellow+red.png";
            showWrongblend();
            gameComplete = true;
            // End timer immediately and restart
            endGameImmediately(false);
        } else {
            // Still building the blend
            if (hasMilk) {
                jarImg.src = "./assets/jar milk.png";
            } else {
                jarImg.src = "./assets/jar yellow.png";
            }
        }
    }
}

function endGameImmediately(isCorrectBlend) {
    // Cancel the timer animation
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    // Hide the timer
    timerFillTwo.style.transform = "scaleX(0)";
    timerOverlayTwo.style.display = "none";

    if (isCorrectBlend) {
        try {
            successSound.currentTime = 0;
            successSound.play().catch(() => {});
        } catch (err) {
            console.warn("Success sound failed to play", err);
        }
        // Correct blend - show endframe after a short delay
        setTimeout(() => {
            showEndFrame();
        }, 2000);
    } else {
        try {
            failSound.currentTime = 0;
            failSound.play().catch(() => {});
        } catch (err) {
            console.warn("Fail sound failed to play", err);
        }
        // Wrong blend - restart game after a delay
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
}

function showSuperblend() {
    // Hide instruction text
    const instruction = document.getElementById("game-instruction");
    if (instruction) {
        instruction.style.display = "none";
    }

    // Create superblend image
    const superblend = document.createElement("img");
    superblend.src = "./assets/superblend.png";
    superblend.style.position = "absolute";
    superblend.style.top = "25%";
    superblend.style.left = "50%";
    superblend.style.transform = "translate(-50%, 0)";
    superblend.style.width = "95%";
    superblend.style.maxWidth = "320px";
    superblend.style.zIndex = "15";
    superblend.style.animation = "popIn 0.5s ease-out";

    document.querySelector(".game-container").appendChild(superblend);

    // Create confetti
    createConfetti();
}

function showWrongblend() {
    // Hide instruction text
    const instruction = document.getElementById("game-instruction");
    if (instruction) {
        instruction.style.display = "none";
    }

    // Create wrongblend image
    const wrongblend = document.createElement("img");
    wrongblend.src = "./assets/wrongblend.png";
    wrongblend.style.position = "absolute";
    wrongblend.style.top = "25%";
    wrongblend.style.left = "50%";
    wrongblend.style.transform = "translate(-50%, 0)";
    wrongblend.style.width = "85%";
    wrongblend.style.maxWidth = "280px";
    wrongblend.style.zIndex = "15";
    wrongblend.style.animation = "popIn 0.5s ease-out";

    document.querySelector(".game-container").appendChild(wrongblend);
}

function createConfetti() {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe", "#fd79a8"];
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "absolute";
    confettiContainer.style.inset = "0";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "14";
    confettiContainer.style.overflow = "hidden";

    document.querySelector(".game-container").appendChild(confettiContainer);

    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = "-20px";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.opacity = "1";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        const animationDelay = Math.random() * 0.5 + "s";
        const animationDuration = Math.random() * 2 + 2 + "s";
        const horizontalMovement = (Math.random() - 0.5) * 100 + "px";

        confetti.style.animation = `confettiFall ${animationDuration} linear ${animationDelay}`;
        confetti.style.setProperty("--horizontal", horizontalMovement);

        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

function showMessage(text, type) {
    // Create message element
    const message = document.createElement("div");
    message.textContent = text;
    message.style.position = "absolute";
    message.style.top = "70%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.backgroundColor = type === "success" ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)";
    message.style.color = "white";
    message.style.padding = "15px 25px";
    message.style.borderRadius = "10px";
    message.style.fontSize = "18px";
    message.style.fontWeight = "bold";
    message.style.zIndex = "10";
    message.style.textAlign = "center";
    message.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";

    document.querySelector(".game-container").appendChild(message);

    // Keep message visible
    setTimeout(() => {
        message.style.opacity = "0";
        message.style.transition = "opacity 0.5s";
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

window.addEventListener("load", () => {
    frameOne.setAttribute("aria-hidden", "true");
    frameTwo.setAttribute("aria-hidden", "true");
    timerOverlay.style.display = "none";
    timerOverlayTwo.style.display = "none";
});

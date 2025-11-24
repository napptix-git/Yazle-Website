var candies = ["1", "2", "3", "4", "5"];
var board = [];
var rows = 9;
var columns = 7;
var tileSize;

var score = 0;
var timer = 30;
var gameStarted = false;
var currTile, otherTile;
var touchStartX, touchStartY, touchEndX, touchEndY;

window.onload = function () {
    var startBtn = document.querySelector(".start-play-button");
    if (startBtn) startBtn.addEventListener("click", startGame);

    var replayBtn = document.querySelector(".replay-button");
    if (replayBtn) replayBtn.addEventListener("click", startGame);

    var gamePlayBtn = document.querySelector(".game-play-button");
    if (gamePlayBtn) gamePlayBtn.addEventListener("click", startGame);

    adjustBoardSize();
    showStartCard();
};

function adjustBoardSize() {
    let boardElement = document.getElementById("board");
    let boardWidth = boardElement.clientWidth;
    let boardHeight = boardElement.clientHeight;
    tileSize = Math.min(boardWidth / columns, boardHeight / rows);
    boardElement.style.width = `${columns * tileSize}px`;
    boardElement.style.height = `${rows * tileSize}px`;
}

function showStartCard() {
    document.getElementById("startCard").style.display = "flex";
    if (document.getElementById("endCard")) document.getElementById("endCard").style.display = "none";
    document.getElementById("board").style.display = "none";
    document.querySelector(".status-bar").style.display = "none";
    document.querySelector(".bottom-label-bar").style.display = "none";
    var gamePlayBtn = document.querySelector(".game-play-button");
    if (gamePlayBtn) gamePlayBtn.style.display = "none";
    // Remove any endcard overlay if present
    hideEndCardWithFade(true);
}

function showEndCardWithFade(score) {
    // Remove old endcard if any
    let existing = document.getElementById('endcardOverlay');
    if (existing) existing.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'endcard-overlay';
    overlay.id = 'endcardOverlay';

    // Card content
    overlay.innerHTML = `
      <div class="endcard-card">
        <img src="./assets/logo.png" alt="McD" />
        <div style="font-size:27px; font-weight:800; margin-bottom:20px;">Game Over!</div>
        <div style="font-size:22px; font-weight:700;">
          You scored <span>${score}</span><br>
          Now that’s a Happy Meal moment
        </div>
      </div>
    `;

    // Attach to game container
    document.querySelector('.game-container').appendChild(overlay);
    // Fade in
    setTimeout(() => overlay.classList.add('visible'), 10);
}

// To fade out and remove the overlay
function hideEndCardWithFade(insta) {
    const overlay = document.getElementById('endcardOverlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => { overlay.remove(); }, insta ? 0 : 600);
    }
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    timer = 30;
    document.querySelector(".score-text").innerText = score;
    document.querySelector(".timer-text").innerText = timer + "s";
    document.querySelector(".progress-bar-fill").style.width = "0%";
    document.getElementById("startCard").style.display = "none";
    if (document.getElementById("endCard")) document.getElementById("endCard").style.display = "none";
    document.getElementById("board").style.display = "flex";
    document.querySelector(".status-bar").style.display = "flex";
    document.querySelector(".bottom-label-bar").style.display = "block";
    var gamePlayBtn = document.querySelector(".game-play-button");
    if (gamePlayBtn) gamePlayBtn.style.display = "none";
    document.getElementById("board").innerHTML = "";
    board = [];
    generateBoard();
    startTimer();

    // Remove any previous overlay
    hideEndCardWithFade(true);

    let matchInterval = setInterval(async () => {
        let hasMatches = true;
        while (hasMatches) {
            hasMatches = await crushCandy();
            if (hasMatches) {
                await slideCandy();
                await generateCandy();
            }
            if (score >= 3000) {
                gameStarted = false;
                setTimeout(() => {
                    showEndCardWithFade(score);
                    clearInterval(matchInterval);
                }, 1900);
            }
        }
    }, 300);
}

function startTimer() {
    let countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector(".timer-text").innerText = timer + "s";
        } else {
            clearInterval(countdown);
            gameStarted = false;
            setTimeout(() => {
                showEndCardWithFade(score);
            }, 1900);
        }
    }, 1000);
}

function generateBoard() {
    adjustBoardSize();
    let boardElement = document.getElementById("board");
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r + "-" + c;
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            let candyType;
            do {
                candyType = randomCandy();
            } while (
                (c >= 2 && row[c - 1]?.dataset.type === candyType && row[c - 2]?.dataset.type === candyType) ||
                (r >= 2 && board[r - 1]?.[c]?.dataset.type === candyType && board[r - 2]?.[c]?.dataset.type === candyType)
            );
            tile.src = "./assets/" + candyType + ".png";
            tile.dataset.type = candyType;

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            boardElement.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart() { currTile = this; }
function dragOver(e) { e.preventDefault(); }
function dragEnter(e) { e.preventDefault(); }
function dragLeave() { }
function dragDrop() { otherTile = this; }
function dragEnd() {
    if (!currTile || !otherTile || currTile.src.includes("blank") || otherTile.src.includes("blank")) return;
    if (isAdjacent(currTile, otherTile)) swapTiles(currTile, otherTile);
}
function touchStart(e) {
    currTile = e.target;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}
function touchMove(e) {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
}
function touchEnd() {
    if (!currTile) return;
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    let absDx = Math.abs(dx);
    let absDy = Math.abs(dy);
    let r = parseInt(currTile.id.split("-")[0]);
    let c = parseInt(currTile.id.split("-")[1]);
    if (absDx > absDy && absDx > 20) {
        if (dx > 0 && c < columns - 1) otherTile = board[r][c + 1];
        else if (dx < 0 && c > 0) otherTile = board[r][c - 1];
    } else if (absDy > absDx && absDy > 20) {
        if (dy > 0 && r < rows - 1) otherTile = board[r + 1][c];
        else if (dy < 0 && r > 0) otherTile = board[r - 1][c];
    }
    if (otherTile && isAdjacent(currTile, otherTile)) swapTiles(currTile, otherTile);
}

function isAdjacent(tile1, tile2) {
    let [r1, c1] = tile1.id.split("-").map(Number);
    let [r2, c2] = tile2.id.split("-").map(Number);
    let rowDiff = Math.abs(r1 - r2);
    let colDiff = Math.abs(c1 - c2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapTiles(tile1, tile2) {
    if (!tile1 || !tile2) return;
    tile1.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s ease";
    tile2.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s ease";
    let tile1Pos = tile1.getBoundingClientRect();
    let tile2Pos = tile2.getBoundingClientRect();
    tile1.style.transform = `translate(${tile2Pos.left - tile1Pos.left}px, ${tile2Pos.top - tile1Pos.top}px) scale(1.1)`;
    tile2.style.transform = `translate(${tile1Pos.left - tile2Pos.left}px, ${tile1Pos.top - tile2Pos.top}px) scale(1.1)`;

    return new Promise(resolve => {
        setTimeout(() => {
            let tempSrc = tile1.src;
            let tempType = tile1.dataset.type;
            tile1.src = tile2.src;
            tile2.src = tempSrc;
            tile1.dataset.type = tile2.dataset.type;
            tile2.dataset.type = tempType;

            tile1.style.transition = "";
            tile2.style.transition = "";
            tile1.style.transform = "";
            tile2.style.transform = "";
            resolve();
        }, 300);
    });
}

async function crushCandy() {
    let matchedTiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                matchedTiles.push(candy1, candy2, candy3);
                score += 30;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                matchedTiles.push(candy1, candy2, candy3);
                score += 30;
            }
        }
    }
    if (matchedTiles.length === 0) return false;

    let promises = [];
    matchedTiles.forEach(tile => {
        tile.classList.add("puff-out");
        promises.push(
            new Promise(resolve => {
                tile.addEventListener("animationend", () => {
                    tile.src = "./assets/blank.png";
                    tile.dataset.type = "blank";
                    tile.classList.remove("puff-out");
                    resolve();
                }, { once: true });
            })
        );
    });
    document.querySelector(".score-text").innerText = score;
    document.querySelector(".score-text").classList.add("bump");
    setTimeout(() => document.querySelector(".score-text").classList.remove("bump"), 700);
    document.querySelector(".progress-bar-fill").style.width = `${Math.min((score / 3000) * 100, 100)}%`;
    await Promise.all(promises);
    return true;
}

async function slideCandy() {
    let promises = [];
    for (let c = 0; c < columns; c++) {
        let emptySpots = 0;
        for (let r = rows - 1; r >= 0; r--) {
            let tile = board[r][c];
            if (tile.src.includes("blank")) {
                emptySpots++;
            } else if (emptySpots > 0) {
                let newTile = board[r + emptySpots][c];
                tile.style.transition = "transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1.2)";
                tile.style.transform = `translateY(${emptySpots * tileSize}px)`;
                promises.push(
                    new Promise(resolve => {
                        tile.addEventListener("transitionend", () => {
                            newTile.src = tile.src;
                            newTile.dataset.type = tile.dataset.type;
                            tile.src = "./assets/blank.png";
                            tile.dataset.type = "blank";
                            tile.style.transition = "";
                            tile.style.transform = "";
                            resolve();
                        }, { once: true });
                    })
                );
            }
        }
    }
    await Promise.all(promises);
}

async function generateCandy() {
    let promises = [];
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (board[r][c].src.includes("blank")) {
                let tile = board[r][c];
                let newCandy = randomCandy();
                tile.src = `./assets/${newCandy}.png`;
                tile.dataset.type = newCandy;
                const startY = -tileSize * (rows + 1);
                tile.style.transform = `translateY(${startY}px)`;
                tile.style.opacity = "0";
                tile.classList.add("drop-in-fast");
                tile.offsetHeight;
                tile.style.transform = `translateY(0px)`;
                tile.style.opacity = "1";
                promises.push(
                    new Promise(resolve => {
                        const handleAnimationEnd = () => {
                            tile.style.transform = "";
                            tile.style.opacity = "1";
                            tile.classList.remove("drop-in-fast");
                            resolve();
                        };
                        tile.addEventListener("animationend", handleAnimationEnd, { once: true });
                        setTimeout(handleAnimationEnd, 350);
                    })
                );
            }
        }
    }
    await Promise.all(promises);

    // Just in case any blank remains, fill instantly
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if (board[r][c].src.includes("blank")) {
                let newCandy = randomCandy();
                board[r][c].src = `./assets/${newCandy}.png`;
                board[r][c].dataset.type = newCandy;
                board[r][c].style.opacity = "1";
                board[r][c].style.transform = "";
                board[r][c].classList.remove("drop-in-fast");
            }
        }
    }
}

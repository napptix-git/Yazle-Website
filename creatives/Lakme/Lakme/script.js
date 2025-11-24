/* ---------- Elements ---------- */
const startButton = document.getElementById("start-now");
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const timerFill = document.getElementById("timer-fill");
const timerText = document.getElementById("timer-text");

const endSequence = document.getElementById("end-sequence");
const endVideo = document.getElementById("end-video");   // <-- MP4 video
const revealUi = document.getElementById("reveal-ui");   // slider+UI wrapper
const ctaOverlay = document.getElementById("end-cta-overlay"); // optional
const logoOverlay = document.getElementById("end-logo-overlay");
const endCard  = document.getElementById("end-card");
const audioBtn = document.getElementById("audioButton");
// optional

let timeLeft = 15;
let timerInterval = null;
let gameOverTriggered = false;

/* ---------- Sparkle sound (pool + unlock) ---------- */
const SPARKLE_POOL = 4;                          // play overlapping clicks safely
const sparkleSounds = Array.from({ length: SPARKLE_POOL }, () => {
  const a = new Audio("./assets/sound.mp3");     // keep file at ./assets/sound.mp3
  a.preload = "auto";
  a.volume = 0.7;                                // tweak if needed
  return a;
});
let sparkleIdx = 0;

// iOS/Android autoplay unlock: first user gesture primes audio
window.addEventListener("pointerdown", () => {
  sparkleSounds.forEach(a => {
    a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
  });
}, { once: true });

function playSparkleSound() {
  const a = sparkleSounds[sparkleIdx++ % sparkleSounds.length];
  try { a.currentTime = 0; a.play(); } catch (e) { /* ignore */ }
}


const wrapper = document.querySelector(".character-wrapper");
const patches = [...document.querySelectorAll(".patch")];
const totalPatches = patches.length;
let removedPatches = 0;

/* ---------- ZONE MAPPING (based on DOM order in index.html) ---------- */
/* 0–4: Forehead | 5–6: Nose | 7–10: Left cheek | 11–15: Right cheek */
const zoneRanges = {
  forehead: [0, 4],
  nose: [5, 6],
  left: [7, 10],
  right: [11, 15],
};

// Build element -> zone map
const patchToZone = new Map();
patches.forEach((p, idx) => {
  for (const [zone, [a, b]] of Object.entries(zoneRanges)) {
    if (idx >= a && idx <= b) {
      patchToZone.set(p, zone);
      break;
    }
  }
});

/* ---------- NEW: Replace freckle <img> with mask-colored fill ---------- */
function upgradeFrecklesToMaskColor() {
  document.querySelectorAll('.character-wrapper .patch img').forEach(img => {
    const src = img.getAttribute('src');
    const parent = img.parentElement;

    const fill = document.createElement('div');
    fill.className = 'freckle-fill';
    // pass image path to CSS as a custom property used by mask
    fill.style.setProperty('--mask', `url('${src}')`);

    parent.replaceChild(fill, img);
  });
}
// Run immediately so sizes/layout are correct before interactions
upgradeFrecklesToMaskColor();

/* ---------- Inject SPARKLE + FADE CSS ---------- */
(function injectFXCSS() {
  const css = `
  @keyframes sparkleCore {
    0% { transform: scale(0.2); opacity: 0.8; filter: brightness(1.6); }
    50% { transform: scale(1.0); opacity: 1; filter: brightness(2); }
    100% { transform: scale(1.3); opacity: 0; filter: brightness(2); }
  }
  @keyframes glitterFly {
    0% { transform: translate(0,0) scale(0.6) rotate(0deg); opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(0.9) rotate(180deg); opacity: 0; }
  }
  @keyframes twinkle { 0%,100% { opacity: 0.9; } 50% { opacity: 0.5; } }
  .sparkle-burst { position: absolute; width: 0; height: 0; pointer-events: none; z-index: 8; mix-blend-mode: screen; }
  .sparkle-core {
    position: absolute; left: -22px; top: -22px; width: 44px; height: 44px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,140,0.95) 0 30%, rgba(255,230,90,0.85) 30% 55%, rgba(255,210,60,0.5) 55% 75%, rgba(255,255,255,0) 75%);
    box-shadow: 0 0 18px rgba(255,230,90,0.9), 0 0 36px rgba(255,210,60,0.7);
    animation: sparkleCore 650ms ease-out forwards;
  }
  .glitter {
    position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #ffe45c;
    box-shadow: 0 0 8px rgba(255,228,92,0.9), 0 0 16px rgba(255,210,60,0.7);
    animation: glitterFly 700ms ease-out forwards, twinkle 350ms ease-in-out infinite;
  }
  .glitter.star {
    width: 10px; height: 10px;
    background: conic-gradient(from 0deg, #fff36b, #ffd64a, #fff36b);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    box-shadow: 0 0 10px rgba(255,235,120,0.9), 0 0 20px rgba(255,215,80,0.7);
  }

  /* quick fade for end video */
  #end-video { opacity: 1; transition: opacity .3s ease; }
  #end-video.quick-fade-out { opacity: 0; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------- Helpers ---------- */
function getRemainingPatches() {
  return patches.filter(p => p.style.display !== "none");
}
function getCenterInContainer(el) {
  const cont = gameContainer.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - cont.left + r.width / 2, y: r.top - cont.top + r.height / 2, size: Math.max(r.width, r.height) };
}

/* Sparkle ONLY when patch is removed by user */
function sparkleAtPatch(patch) {
  const { x, y, size } = getCenterInContainer(patch);
  const burst = document.createElement("div");
  burst.className = "sparkle-burst";
  burst.style.left = `${x}px`;
  burst.style.top  = `${y}px`;

  const core = document.createElement("div");
  core.className = "sparkle-core";
  const coreSize = Math.max(36, size * 1.2);
  core.style.width = `${coreSize}px`;
  core.style.height = `${coreSize}px`;
  core.style.left = `${-coreSize / 2}px`;
  core.style.top  = `${-coreSize / 2}px`;
  burst.appendChild(core);

  const count = 12;
  for (let i = 0; i < count; i++) {
    const g = document.createElement("div");
    g.className = (i % 3 === 0) ? "glitter star" : "glitter";
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.6 - 0.3);
    const radius = 26 + Math.random() * 24;
    const tx = Math.cos(angle) * radius;
    const ty = Math.sin(angle) * radius;
    g.style.setProperty("--tx", `${tx}px`);
    g.style.setProperty("--ty", `${ty}px`);
    g.style.left = `${-3 + (Math.random() * 6 - 3)}px`;
    g.style.top  = `${-3 + (Math.random() * 6 - 3)}px`;
    burst.appendChild(g);
  }

  gameContainer.appendChild(burst);
  setTimeout(() => burst.remove(), 750);
}

function removePatch(patch, doSparkle = true) {
  if (!patch || patch.style.display === "none") return false;

  if (doSparkle) {
    sparkleAtPatch(patch);   // existing glitter burst
    playSparkleSound();      // 🔊 play sound with sparkle
  }

  patch.style.display = "none";
  removedPatches++;
  return true;
}


/* Remove nearest remaining patch within SAME ZONE as clicked */
function removeNearestInSameZone(clickedPatch) {
  const zone = patchToZone.get(clickedPatch);
  if (!zone) return false;

  const [startIdx, endIdx] = zoneRanges[zone];
  const zonePatches = patches.slice(startIdx, endIdx + 1);
  const remainingInZone = zonePatches.filter(p => p !== clickedPatch && p.style.display !== "none");
  if (remainingInZone.length === 0) return false;

  const c0 = getCenterInContainer(clickedPatch);
  let best = null, bestD = Infinity;
  for (const p of remainingInZone) {
    const c = getCenterInContainer(p);
    const dx = c.x - c0.x, dy = c.y - c0.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD) { bestD = d2; best = p; }
  }
  return removePatch(best, true);
}

// ❗ REPLACE your existing checkCompletion() completely with this:
function checkCompletion() {
  if (gameOverTriggered) return;
  if (getRemainingPatches().length === 0) {
    handleGameOver();              // ✅ same flow as time over
  }
}


/* ---------- Start button ---------- */
startButton.addEventListener("click", () => {
  startScreen.classList.add("fade-out");
  setTimeout(() => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    gameContainer.classList.add("fade-in");
    startTimer();
    enablePatchClicks();
  }, 800);
});

/* ---------- Timer ---------- */
function startTimer() {
  removedPatches = 0; 
  timeLeft = 15;
  timerText.textContent = timeLeft;
  timerFill.style.width = "100%";
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    timerFill.style.width = `${(timeLeft / 15) * 100}%`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      handleGameOver();
    }
  }, 1000);
}

/* ---------- Enable clicks ---------- */
function enablePatchClicks() {
  getRemainingPatches().forEach(patch => {
    patch.addEventListener("pointerdown", handlePatchPointer, { passive: true });
  });
}

/* ---------- Remove TWO from SAME ZONE + glitter; Popup always +1 ---------- */
function handlePatchPointer(e) {
  if (gameOverTriggered) return;   // ✅ ignore taps after game over
  e.stopPropagation();
  const clickedPatch = e.currentTarget;
  if (clickedPatch.style.display === "none") return;

  const removed1 = removePatch(clickedPatch, true);
  const removed2 = removeNearestInSameZone(clickedPatch);

  if (removed1 || removed2) showScorePopup();

  checkCompletion();               // ✅ keep this call
}


/* ---------- Score popup (always +1) ---------- */
function showScorePopup() {
  const score = document.createElement("div");
  score.className = "score-popup";
  score.textContent = "+1";
  Object.assign(score.style, {
    position: "absolute",
    right: "6%",
    top: "40%",
    background: "rgba(255, 245, 185, 0.6)",
    padding: "10px 18px",
    borderRadius: "50px",
    backdropFilter: "blur(4px)",
    color: "black",
    fontSize: "1.8rem",
    fontWeight: "bold",
    textShadow: "0 0 6px #fedd8c",
    zIndex: 9999,
    pointerEvents: "none",
    transition: "opacity 0.6s ease, transform 0.6s ease"
  });
  gameContainer.appendChild(score);
  requestAnimationFrame(() => {
    score.style.opacity = "0";
    score.style.transform = "scale(1.4) translateY(-20px)";
  });
  setTimeout(() => score.remove(), 600);
}

/* ---------- Clear ALL (before game over) — NO GLITTER ---------- */
function clearAllPatches() {
  getRemainingPatches().forEach(p => { p.style.display = "none"; });
  removedPatches = totalPatches;
}

/* ---------- New: End video helper (autoplay → fade → done) ---------- */
function playEndVideo(src, onDone) {
  if (!endVideo) { if (onDone) onDone(); return; }

  if (src) {
    endVideo.removeAttribute("src");
    endVideo.innerHTML = "";
    endVideo.src = src;
  }

  endVideo.classList.remove("quick-fade-out");
  endVideo.style.display = "block";
  endVideo.muted = true;
  endVideo.playsInline = true;
  endVideo.currentTime = 0;

  const finish = () => {
    endVideo.removeEventListener("ended", finish);
    endVideo.classList.add("quick-fade-out");
    setTimeout(() => { if (onDone) onDone(); }, 1000);
  };

  endVideo.addEventListener("ended", finish);
  endVideo.load();
  endVideo.play().catch(() => {
    endVideo.muted = true;
    endVideo.play().catch(() => {
      setTimeout(finish, 1800);
    });
  });
}

/* ---------- Game over ---------- */
function handleGameOver() {
  if (gameOverTriggered) return;
  gameOverTriggered = true;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  patches.forEach(p => p.removeEventListener("pointerdown", handlePatchPointer));
  clearAllPatches();

  if (audioBtn) audioBtn.classList.add("hidden");

  gameContainer.classList.add("fade-out");
  setTimeout(() => { gameContainer.style.display = "none"; }, 800);

  setTimeout(() => {
    endSequence.style.display = "block";
    endSequence.classList.remove("hidden");

    if (logoOverlay) logoOverlay.style.display = "block";
    if (ctaOverlay) {
      ctaOverlay.style.display = "block";
      ctaOverlay.onclick = () => {
        endVideo.pause();
        endVideo.dispatchEvent(new Event("ended"));
      };
    }

    playEndVideo("./assets/4.mp4", () => {
      if (endVideo) endVideo.style.display = "none";
      if (logoOverlay) logoOverlay.style.display = "none";
      if (ctaOverlay) ctaOverlay.style.display = "none";
      if (audioBtn) audioBtn.classList.add("hidden");

      revealUi.style.display = "block";
      revealUi.classList.remove("hidden");
      initSlider();

      const sliderEls = [
        revealUi.querySelector(".slider"),
        revealUi.querySelector(".left-image"),
        revealUi.querySelector(".right-image"),
        document.getElementById("slider-image")
      ].filter(Boolean);

      // const endCard = document.getElementById("end-card");
      if (endCard) endCard.style.display = "none";

      let interacted = false;
      let isDragging = false;
      let initialX = null;

      const startDrag = (x) => { isDragging = true; initialX = x; };
      const moveDrag = (x) => {
        if (!isDragging || interacted) return;
        if (Math.abs(x - initialX) > 5) {
          interacted = true;
          isDragging = false;

          setTimeout(() => {
            sliderEls.forEach(el => el.classList.add("fade-out"));
            setTimeout(() => {
              sliderEls.forEach(el => {
                el.style.display = "none";
                el.classList.remove("fade-out");
              });

              if (endCard) {
              endSequence.classList.add("video-visible");

                endCard.style.display = "block";
                endCard.classList.add("fade-in");
                endCard.muted = true;
                endCard.playsInline = true;
                endCard.src = "./assets/endcard.mp4";
                try {
                  endCard.currentTime = 0;
                  endCard.load();
                  const p = endCard.play();
                  if (p && typeof p.catch === "function") p.catch(() => {});
                } catch { }
                endCard.addEventListener("click", () => {
                window.open("https://ad.doubleclick.net/ddm/trackclk/N6336.5513058NAPPTIX/B34032144.427402469;dc_trk_aid=620530390;dc_trk_cid=155821370;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=$%7BGDPR%7D;gdpr_consent=$%7BGDPR_CONSENT_755%7D;ltd=;dc_tdv=1", "_blank");
              });
              }
              // --- AUDIO UI: show button & set initial icon state
if (audioBtn) {
  audioBtn.classList.remove("hidden"); // make the toggle visible
   audioBtn.style.display = "block";
  const iconOn  = audioBtn.querySelector(".icon-on");
  const iconOff = audioBtn.querySelector(".icon-off");

  // keep video muted initially; reflect UI state
  const syncIcons = () => {
    if (!iconOn || !iconOff) return;
    if (endCard.muted) {
      iconOn.classList.add("hidden");    // sound-on icon hidden
      iconOff.classList.remove("hidden");// sound-off icon visible
    } else {
      iconOn.classList.remove("hidden");
      iconOff.classList.add("hidden");
    }
  };
  syncIcons();

  // Click toggles mute; user gesture also unlocks audio on iOS
  audioBtn.onclick = () => {
    endCard.muted = !endCard.muted;
    // If unmuted and video was paused by policy, try to (re)play
    if (!endCard.muted && endCard.paused) {
      endCard.play().catch(() => {/* ignore */});
    }
    syncIcons();
  };

  // Hide the toggle when the video finishes (optional)
  endCard.addEventListener("ended", () => {
    audioBtn.classList.add("hidden");
  }, { once: true });
}

                // const shopCta = document.querySelector(".shop-cta");
                // if (shopCta) {
                //   shopCta.style.display = "block";
                //   shopCta.style.zIndex = "50";
                // }
            }, 800);
          }, 2000);
        }
      };
      const stopDrag = () => { isDragging = false; };

      const sliderHandle = revealUi.querySelector(".slider");
      if (sliderHandle) {
        // Mouse
        sliderHandle.addEventListener("mousedown", e => startDrag(e.pageX));
        document.addEventListener("mousemove", e => moveDrag(e.pageX), { once: false });
        document.addEventListener("mouseup", stopDrag, { once: false });

        // Touch
        sliderHandle.addEventListener("touchstart", e => startDrag(e.touches[0].pageX), { passive: true });
        document.addEventListener("touchmove", e => moveDrag(e.touches[0].pageX), { passive: true });
        document.addEventListener("touchend", stopDrag);
      }
    });
  }, 1000);
}

/* ===== Drag-to-reveal slider ===== */
function initSlider() {
  const endSeq = document.getElementById("end-sequence");
  const slider = endSeq.querySelector(".slider");
  const leftImage = endSeq.querySelector(".left-image");
  const rightImage = endSeq.querySelector(".right-image");

  const minSliderLimit = 0;   // %
  const maxSliderLimit = 100; // %
  let isDragging = false;

  slider.style.display = "block";

  const setPosition = (pct) => {
    pct = Math.max(minSliderLimit, Math.min(maxSliderLimit, pct));
    slider.style.left = `${pct}%`;
    leftImage.style.clipPath  = `inset(0 0 0 ${pct}%)`;
    rightImage.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
  };

  setPosition(50);

  const getPctFromX = (pageX) => {
    const rect = endSeq.getBoundingClientRect();
    const x = pageX - rect.left;
    return (x / rect.width) * 100;
  };

  slider.addEventListener("mousedown", (e) => { isDragging = true; e.preventDefault(); });
  document.addEventListener("mousemove", (e) => { if (isDragging) setPosition(getPctFromX(e.pageX)); });
  document.addEventListener("mouseup", () => { isDragging = false; });

  slider.addEventListener("touchstart", () => { isDragging = true; }, { passive: true });
  document.addEventListener("touchmove", (e) => { if (isDragging) setPosition(getPctFromX(e.touches[0].pageX)); }, { passive: true });
  document.addEventListener("touchend", () => { isDragging = false; });
}

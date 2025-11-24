// --- Slider swipe controls ---
const slider = document.getElementById('slider');
const radios = [...document.querySelectorAll('input[name="slider"]')];

const getIndex = () => radios.findIndex(r => r.checked);
const goTo = i => {
  const len = radios.length;
  radios[(i + len) % len].checked = true; // triggers your CSS transitions
};
const next = () => goTo(getIndex() + 1);
const prev = () => goTo(getIndex() - 1);

// Swipe (drag) – simple "drag-to-snap"
let startX = 0;
let isDragging = false;
const THRESHOLD = 50; // px to decide swipe

function onStart(e) {
  isDragging = true;
  startX = (e.touches ? e.touches[0].clientX : e.clientX);
}
function onMove(e) {
  if (!isDragging) return;
  // If you want live parallax later, compute dx here and set CSS vars.
}
function onEnd(e) {
  if (!isDragging) return;
  const endX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
  const dx = endX - startX;

  if (dx > THRESHOLD) prev();
  else if (dx < -THRESHOLD) next();

  isDragging = false;
}

slider.addEventListener('touchstart', onStart, { passive: true });
slider.addEventListener('touchmove', onMove, { passive: true });
slider.addEventListener('touchend', onEnd);
slider.addEventListener('mousedown', onStart);
window.addEventListener('mouseup', onEnd);

// Optional: keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

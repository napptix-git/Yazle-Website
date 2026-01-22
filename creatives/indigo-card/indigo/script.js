document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('stage');
  const train = document.getElementById('train');
  let cars = Array.from(document.querySelectorAll('.car'));
  const gestureImg = document.getElementById('gestureImg');
  
   if (gestureImg) {
    gestureImg.style.display = 'block';
  }

  let gestureHidden = false;
  function hideGesture() {
    if (gestureHidden || !gestureImg) return;
    gestureHidden = true;
    gestureImg.classList.add('gesture-hide');
    setTimeout(() => { gestureImg.style.display = 'none'; }, 220);
  }

  // Hide on any generic interaction
  ['pointerdown','touchstart','mousedown','click'].forEach(evt => {
    stage.addEventListener(evt, hideGesture, { passive: true, once: true });
  });

  // Expect original HTML to have exactly 2 cars: data-type="img" and "banner"
  const originalImageCar  = cars.find(c => c.dataset.type === 'img');
  const originalBannerCar = cars.find(c => c.dataset.type === 'banner');

  // Clone helpers (strip duplicate IDs inside clones)
  const cloneCar = (car) => {
    const cloned = car.cloneNode(true);
    cloned.classList.add('clone');

    // Remove duplicate IDs inside the clone
    const dupImage  = cloned.querySelector('#promo-video');   // it's an <img> now
    if (dupImage) dupImage.removeAttribute('id');
    const dupBanner = cloned.querySelector('#promo-banner');
    if (dupBanner) dupBanner.removeAttribute('id');

    return cloned;
  };

  // Build order: [img(clone L), banner(clone L), img(original), banner(original), img(clone R)]
  const imageCloneL  = cloneCar(originalImageCar);
  const bannerCloneL = cloneCar(originalBannerCar);
  const imageCloneR  = cloneCar(originalImageCar);

  train.replaceChildren(imageCloneL, bannerCloneL, originalImageCar, originalBannerCar, imageCloneR);
  cars = Array.from(train.querySelectorAll('.car'));

  // Inline width to match car count
  const computeWidth = () => `${cars.length * 100}vw`;
  train.style.width = computeWidth();

  // Index constants (after rebuild)
  const IMAGE_INDEX   = cars.indexOf(originalImageCar);   // should be 2
  const BANNER_LEFT   = cars.indexOf(bannerCloneL);       // 1
  const BANNER_RIGHT  = cars.indexOf(originalBannerCar);  // 3

  // ---------- State ----------
  const DRAG_THRESHOLD = 12;    // px (tap vs drag)
  const SNAP_THRESHOLD = 0.18;  // fraction of width to advance slide
  let index = IMAGE_INDEX;      // start on image in the middle
  let startX = 0;
  let startTranslate = 0;
  let currentTranslate = 0;
  let dragging = false;
  let hasDragged = false;

  // Helpers
  const vw = () => window.innerWidth || document.documentElement.clientWidth;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function setIndex(newIndex, animate = true) {
    index = clamp(newIndex, 0, cars.length - 1);
    if (animate) train.classList.remove('dragging');
    const target = -index * vw();
    currentTranslate = target;
    train.style.transform = `translate3d(${target}px,0,0)`;
    updateActiveState();
  }

  function updateActiveState() {
    cars.forEach((c, i) => c.classList.toggle('active', i === index));
    // No video logic needed for images
  }

  // Initialize at image center
  setIndex(IMAGE_INDEX, false);

  // ---------- Drag logic (train style) ----------
  function onDown(x) {
     hideGesture(); 
    dragging = true;
    hasDragged = false;
    train.classList.add('dragging');
    startX = x;
    startTranslate = currentTranslate;
  }

  function onMove(x) {
    if (!dragging) return;
    const dx = x - startX;

    if (!hasDragged && Math.abs(dx) < DRAG_THRESHOLD) return; // still a tap
    hasDragged = true;

    // Follow the finger
    const next = startTranslate + dx;
    // Clamp within track (0 ... -(N-1)*vw)
    const minX = -(cars.length - 1) * vw();
    const maxX = 0;
    currentTranslate = clamp(next, minX, maxX);
    train.style.transform = `translate3d(${currentTranslate}px,0,0)`;
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;

    const width = vw();
    const progress = -(currentTranslate + index * width) / width; // <0 => moved right, >0 => moved left
    let target = index;

    if (hasDragged) {
      if (progress > SNAP_THRESHOLD)       target = index + 1; // dragged left → next slide
      else if (progress < -SNAP_THRESHOLD) target = index - 1; // dragged right → prev slide
    }

    setIndex(target, true);
  }

  // Touch events on the whole stage (drag anywhere)
  stage.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
  stage.addEventListener('touchmove',  (e) => onMove(e.touches[0].clientX),  { passive: true });
  stage.addEventListener('touchend',   onUp);

  // Mouse events (desktop testing)
  stage.addEventListener('mousedown',  (e) => onDown(e.clientX));
  stage.addEventListener('mousemove',  (e) => onMove(e.clientX));
  stage.addEventListener('mouseup',    onUp);
  stage.addEventListener('mouseleave', onUp);

  // Resize: keep centered slide aligned and width updated
  window.addEventListener('resize', () => {
    train.style.width = computeWidth();
    setIndex(index, false);
  });

  // ---- Click-through URL (kept same) ----
  // const clickURL = "https://www.yamaha-motor-india.com/digital-enquiry-rayzr_awareness_july_2025.html?utm_source=Napptix&utm_campaign=RayZRJuly2025&utm_medium=CPM";
  // stage.addEventListener('click', (e) => {
  //   // no audio button now; simple click-through
  //   window.open(clickURL, "_blank");
  // });

  const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    // simplest: hide the whole ad
    stage.style.display = 'none';

    // or if this runs inside an iframe ad: try to close window
    // window.close();
  });
}

});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const cards = carousel.querySelectorAll(".card");
  const gesture = document.getElementById("gesture");
  
  const cardWidth = cards[0].offsetWidth;
  const cardHeight = cards[0].offsetHeight; // For vertical centering
  carousel.scrollLeft = cardWidth; // Center slide 2 initially
  
  // Set gesture position statically, centered on slide 2
  if (gesture) {
      const slide2 = cards[1];
      const slide2Left = slide2.offsetLeft - carousel.scrollLeft;
      const horizontalCenter = slide2Left + (cardWidth - gesture.offsetWidth) / 2;
      const verticalCenter = (cardHeight - gesture.offsetHeight) / 2;
      gesture.style.left = `${horizontalCenter}px`;
     // Center vertically
  }

  let autoDragActive = true;
  const dragMultiplier = 1.5;

  const simulateDrag = (startScroll, targetScroll, duration) => {
      return new Promise((resolve) => {
          carousel.style.scrollSnapType = "none";

          const distance = targetScroll - startScroll;
          const steps = Math.round(duration / 16.67); // ~60fps
          const stepDistance = distance / steps;
          let currentStep = 0;
          let currentScroll = startScroll;

          const dragStep = (timestamp) => {
              if (currentStep < steps && autoDragActive) {
                  currentStep++;
                  currentScroll += stepDistance;
                  carousel.scrollLeft = currentScroll;
                  requestAnimationFrame(dragStep);
              } else {
                  carousel.scrollLeft = targetScroll;
                  carousel.style.scrollSnapType = "x mandatory";
                  resolve();
              }
          };

          requestAnimationFrame(dragStep);
      });
  };

  const startAutoDrag = async () => {
      const center = cardWidth;
      const rightTarget = cardWidth * 1.3; // 30% of slide 3 visible
      const leftTarget = cardWidth * 0.7; // 30% of slide 1 visible

      while (autoDragActive) {
          await simulateDrag(center, rightTarget, 1000);
          if (!autoDragActive) break;
          await new Promise(resolve => setTimeout(resolve, 1500));

          await simulateDrag(rightTarget, center, 1000);
          if (!autoDragActive) break;
          await new Promise(resolve => setTimeout(resolve, 1500));

          await simulateDrag(center, leftTarget, 1000);
          if (!autoDragActive) break;
          await new Promise(resolve => setTimeout(resolve, 1500));

          await simulateDrag(leftTarget, center, 1000);
          if (!autoDragActive) break;
          await new Promise(resolve => setTimeout(resolve, 1000));
      }
  };

  let isDragging = false;
  let startX, scrollStart;

  // Mouse events
  carousel.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = carousel.scrollLeft;
      carousel.classList.add("dragging");
      carousel.style.scrollSnapType = "none";
      autoDragActive = false;
      if (gesture) gesture.style.display = "none";
  });

  carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - startX) * dragMultiplier;
      carousel.scrollLeft = scrollStart - walk;
  });

  ["mouseup", "mouseleave"].forEach(evt => {
      carousel.addEventListener(evt, () => {
          if (isDragging) {
              isDragging = false;
              carousel.classList.remove("dragging");
              carousel.style.scrollSnapType = "x mandatory";
              const currentScroll = carousel.scrollLeft;
              const nearestCardIndex = Math.round(currentScroll / cardWidth);
              carousel.scrollLeft = nearestCardIndex * cardWidth;
          }
      });
  });

  // Touch events for mobile
  carousel.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollStart = carousel.scrollLeft;
      carousel.classList.add("dragging");
      carousel.style.scrollSnapType = "none";
      autoDragActive = false;
      if (gesture) gesture.style.display = "none";
  }, { passive: false });

  carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX;
      const walk = (x - startX) * dragMultiplier;
      carousel.scrollLeft = scrollStart - walk;
  }, { passive: false });

  carousel.addEventListener("touchend", () => {
      if (isDragging) {
          isDragging = false;
          carousel.classList.remove("dragging");
          carousel.style.scrollSnapType = "x mandatory";
          const currentScroll = carousel.scrollLeft;
          const nearestCardIndex = Math.round(currentScroll / cardWidth);
          carousel.scrollLeft = nearestCardIndex * cardWidth;
      }
  });

  // Audio controls
  const audioButton = document.getElementById("audioButton");
  const video = document.querySelector(".responsive-video");
  const volumeIcon = audioButton.querySelector('img[src*="volume.png"]');
  const unmuteIcon = audioButton.querySelector('img[src*="unmute.png"]');

  audioButton.addEventListener("click", () => {
      if (video.muted) {
          video.muted = false;
          video.play();
          unmuteIcon.style.display = "inline";
          volumeIcon.style.display = "none";
      } else {
          video.muted = true;
          unmuteIcon.style.display = "none";
          volumeIcon.style.display = "inline";
      }
  });

  const interstitialAd = document.getElementById("interstitialAd");
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
      interstitialAd.style.display = "none";
  });

  startAutoDrag();
});
// ===== LoopMe Integration =====
// Detect LoopMe URL parameters
const urlParams = new URLSearchParams(window.location.search);
const isLoopMe = urlParams.get('loopme') === 'true';
const clickTag = urlParams.get('clickTag') || 'https://www.amazon.in/Sting-Energy-Drink-Can-250/dp/B09DT77J4M/ref=sr_1_6?dib=eyJ2IjoiMSJ9.vLPWNTTGQQO7xWLXGQZGJ204r7edlnZqfpZWaymkFEzgVNF5ng1o7a-sNjuLBsi4hNgbIzGjpQIWMXpR29vvsbQfciklR8DxaVJw_g48eEwag1-FN3G_v-4yDj25vnWzlnAS7ZPr633X07NSeSAs5KzfUB1BMMiXhDc1NeMncAwIzfqpSoujnUMgfDVUthFxr8aQ3Z9v1GT_cVgL4w1fU9sfpVgsnAbtXlaGDT-mkzIOZqMdGmWHCiegTTYkDfc2AL1M3GonT3Dr8miIZaHoDZSb3gcOYCbumi5Q6oD9yWE.t-UWhcARGK7IzFGIHrmhISWQVcQvgwck1qZTw0bwK7k&dib_tag=se&keywords=sting+energy+drinks&nsdOptOutParam=true&qid=1764747993&sr=8-6';
const appKey = urlParams.get('app_key') || 'sting_energy_game';

// LoopMe Event Tracking
function trackLoopMeEvent(eventName, data = {}) {
  const event = {
    type: 'loopme_event',
    event: eventName,
    app_key: appKey,
    timestamp: Date.now(),
    data: data
  };

  console.log('LoopMe Event:', event);

  // Send to parent frame (LoopMe ad container)
  if (window.parent !== window) {
    window.parent.postMessage(event, '*');
  }

  // Call LoopMe tracking function if available
  if (typeof LoopMeTrack === 'function') {
    LoopMeTrack(eventName, data);
  }
}

// LoopMe Pause/Resume API for ad integration
let isPaused = false;
window.LoopMeAPI = {
  pause: () => {
    console.log('LoopMe: Game paused for ad');
    isPaused = true;
    trackLoopMeEvent('game_paused');
  },
  resume: () => {
    console.log('LoopMe: Game resumed after ad');
    isPaused = false;
    trackLoopMeEvent('game_resumed');
  }
};

// Listen for LoopMe ad events from parent frame
window.addEventListener('message', (e) => {
  if (e.data.type === 'loopme_ad_start') {
    window.LoopMeAPI.pause();
  }
  if (e.data.type === 'loopme_ad_end') {
    window.LoopMeAPI.resume();
  }
});

// Wait for both DOM and pannellum to be ready
window.addEventListener('load', () => {
  console.log('Page loaded, pannellum available:', typeof pannellum !== 'undefined');

  const btn = document.getElementById('startButton');
  const viewerContainer = document.getElementById('viewer');
  const borderOverlay = document.getElementById('borderOverlay');
  let viewerStarted = false;
  let viewer;
  let canFound = false;

  console.log('Elements found:', {
    btn: !!btn,
    viewerContainer: !!viewerContainer,
    borderOverlay: !!borderOverlay
  });

  // Hide border overlay initially
  if (borderOverlay) borderOverlay.style.display = 'none';

  // Position the can on the ground where user can find it - randomly place it to the right
  // Yaw range: 90 to 180 degrees (right side), Pitch fixed at -10 (higher up on the ground)
  const randomYaw = 90 + Math.random() * 90; // Random position between 90-180 degrees
  const canPosition = { yaw: randomYaw, pitch: -10 };

  function addCanHotspot() {
    if (!viewer || canFound) return;

    console.log('Adding can hotspot at position:', canPosition);

    viewer.addHotSpot({
      id: 'blue-can',
      pitch: canPosition.pitch,
      yaw: canPosition.yaw,
      cssClass: 'custom-hotspot',
      createTooltipFunc: (hotSpotDiv) => {
        const img = document.createElement('img');
        img.src = 'assets/blue can.webp';
        img.alt = 'Blue can';
        img.style.width = '200px';
        img.style.height = 'auto';
        img.style.cursor = 'pointer';
        img.style.display = 'block';
        img.onerror = () => {
          console.error('Failed to load can image');
        };
        img.onload = () => {
          console.log('Can image loaded successfully');
        };
        hotSpotDiv.appendChild(img);
        console.log('Can hotspot image created');
      },
      clickHandlerFunc: () => {
        console.log('Can clicked!');
        onCanFound();
      }
    });

    console.log('Can hotspot added successfully');
  }

  function checkCanInBorder() {
    if (!viewer || canFound) return;

    // Get viewer's current look direction
    const currentPitch = viewer.getPitch();
    const currentYaw = viewer.getYaw();

    // Check if the can is in the center of view (within the border)
    const pitchDiff = Math.abs(currentPitch - canPosition.pitch);
    const yawDiff = Math.abs(currentYaw - canPosition.yaw);

    // If can is aligned within the border (tolerance of ~5 degrees)
    if (pitchDiff < 5 && yawDiff < 5) {
      onCanFound();
    }
  }

  function onCanFound() {
    if (canFound) return;
    canFound = true;

    console.log('Can found! Starting zoom animation...');

    // First, zoom into the can position (lower hfov = more zoom)
    viewer.lookAt(canPosition.pitch, canPosition.yaw, 1000, 25);

    // Add blinking animation CSS if not already added
    if (!document.getElementById('blinkStyle')) {
      const style = document.createElement('style');
      style.id = 'blinkStyle';
      style.textContent = `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(style);
    }

    // After zoom completes, show text message under the can
    setTimeout(() => {
      // Show blinking text message below the can
      const textMessage = document.createElement('div');
      textMessage.id = 'textMessage';
      textMessage.style.cssText = `
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1001;
        animation: blink 0.8s ease-in-out infinite;
      `;

      const textImage = document.createElement('img');
      textImage.src = 'assets/text 1.webp';
      textImage.style.cssText = `
        width: 80vw;
        height: auto;
      `;

      textMessage.appendChild(textImage);
      document.body.appendChild(textMessage);

      console.log('Text message displayed under can');

      // After 2.5 seconds, remove text and show product overlay
      setTimeout(() => {
        textMessage.remove();

        // Remove the hotspot and border overlay
        viewer.removeHotSpot('blue-can');
        if (borderOverlay) borderOverlay.style.display = 'none';

        // Create product overlay
        const productOverlay = document.createElement('div');
        productOverlay.id = 'productOverlay';
        productOverlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        `;

        // Create larger drop zone container
        const dropZone = document.createElement('div');
        dropZone.id = 'dropZone';
        dropZone.style.cssText = `
          position: relative;
          width: 90%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        const productImage = document.createElement('img');
        productImage.src = 'assets/blue can.webp';
        productImage.style.cssText = `
          max-width: 100%;
          max-height: 95%;
          object-fit: contain;
          transform: scale(0.5);
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        productImage.id = 'productCan';

        dropZone.appendChild(productImage);
        productOverlay.appendChild(dropZone);

        // Track dropped pins
        let droppedPins = 0;
        const canImages = ['assets/blue can.webp', 'assets/1=2.webp', 'assets/1=3.webp', 'assets/1=4.webp', 'assets/sting can.webp'];

        // Red lighting effect function
        function flashRedLighting() {
          // Flash the entire overlay red
          const flash = document.createElement('div');
          flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: radial-gradient(circle, rgba(255,0,0,0.6) 0%, rgba(255,0,0,0.3) 50%, transparent 100%);
            z-index: 10001;
            pointer-events: none;
            animation: redFlash 0.5s ease-out;
          `;

          // Add flash animation if not already added
          if (!document.getElementById('flashStyle')) {
            const style = document.createElement('style');
            style.id = 'flashStyle';
            style.textContent = `
              @keyframes redFlash {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
              }
              @keyframes canGlow {
                0%, 100% { filter: drop-shadow(0 0 0px red); }
                50% { filter: drop-shadow(0 0 30px red) drop-shadow(0 0 60px rgba(255,0,0,0.5)); }
              }
            `;
            document.head.appendChild(style);
          }

          document.body.appendChild(flash);

          // Add red glow to can
          productImage.style.animation = 'canGlow 0.5s ease-out';

          setTimeout(() => {
            flash.remove();
            productImage.style.animation = '';
          }, 500);
        }

        // Add 4 sting pin images - 2 on left, 2 on right, symmetrically positioned
        const pinPositions = [
          { top: '35%', left: '1%', transform: 'translate(0, -50%)' },  // Top-left
          { top: '65%', left: '1%', transform: 'translate(0, -50%)' },  // Bottom-left
          { top: '35%', right: '1%', transform: 'translate(0, -50%)' }, // Top-right
          { top: '65%', right: '1%', transform: 'translate(0, -50%)' }  // Bottom-right
        ];

        pinPositions.forEach(pos => {
          const pin = document.createElement('img');
          pin.src = 'assets/sting pin.webp';
          pin.draggable = true;
          pin.style.cssText = `
            position: absolute;
            ${pos.top ? `top: ${pos.top};` : ''}
            ${pos.bottom ? `bottom: ${pos.bottom};` : ''}
            ${pos.left ? `left: ${pos.left};` : ''}
            ${pos.right ? `right: ${pos.right};` : ''}
            width: 100px;
            height: auto;
            opacity: 0;
            transform: ${pos.transform} scale(0.5);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
            cursor: grab;
            touch-action: none;
            user-select: none;
            -webkit-user-drag: none;
            z-index: 10003;
          `;

          // Desktop drag event handlers
          let draggedPin = null;

          pin.addEventListener('dragstart', (e) => {
            draggedPin = pin;
            pin.style.cursor = 'grabbing';
            e.dataTransfer.effectAllowed = 'move';
          });

          pin.addEventListener('dragend', () => {
            draggedPin = null;
            pin.style.cursor = 'grab';
          });

          // Mobile touch event handlers
          let initialX, initialY, currentX, currentY;
          let isDragging = false;

          pin.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDragging = true;

            const touch = e.touches[0];
            initialX = touch.clientX - pin.offsetLeft;
            initialY = touch.clientY - pin.offsetTop;

            pin.style.transition = 'none';
            pin.style.zIndex = '10005';
            pin.style.opacity = '0.8';
          });

          pin.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const touch = e.touches[0];
            currentX = touch.clientX - initialX;
            currentY = touch.clientY - initialY;

            pin.style.left = currentX + 'px';
            pin.style.top = currentY + 'px';
            pin.style.right = 'auto';
            pin.style.bottom = 'auto';
            pin.style.transform = 'none';
          });

          pin.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            isDragging = false;

            const touch = e.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

            // Get can and dropzone bounds for better detection
            const canRect = productImage.getBoundingClientRect();
            const dropZoneRect = dropZone.getBoundingClientRect();

            // Check if touch point is within can or dropzone area
            const isOverCan = touch.clientX >= canRect.left && touch.clientX <= canRect.right &&
              touch.clientY >= canRect.top && touch.clientY <= canRect.bottom;
            const isOverDropZone = touch.clientX >= dropZoneRect.left && touch.clientX <= dropZoneRect.right &&
              touch.clientY >= dropZoneRect.top && touch.clientY <= dropZoneRect.bottom;

            // Check if dropped on the drop zone (can area) - more forgiving detection
            if (isOverCan || isOverDropZone || (dropTarget && (dropTarget.id === 'productCan' || dropTarget.id === 'dropZone' || dropTarget.closest('#dropZone')))) {
              droppedPins++;

              // Hide instruction texts after 4th pin is dropped
              if (droppedPins === 4) {
                // Track level complete
                trackLoopMeEvent('level_complete', { pins_dropped: 4 });

                instructionText.style.opacity = '0';
                instructionText3.style.opacity = '0';
                setTimeout(() => {
                  instructionText.remove();
                  instructionText3.remove();

                  // Show text 4 above the can
                  const text4 = document.createElement('div');
                  text4.id = 'text4';
                  text4.style.cssText = `
                    position: fixed;
                    top: 0%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10002;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                  `;

                  const text4Image = document.createElement('img');
                  text4Image.src = 'assets/text 4.webp';
                  text4Image.style.cssText = `
                    width: 75vw;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                  `;

                  text4.appendChild(text4Image);
                  document.body.appendChild(text4);

                  // Show CTA button below the can
                  const ctaButton = document.createElement('a');
                  ctaButton.href = clickTag; // Use LoopMe clickTag
                  ctaButton.target = '_blank';
                  ctaButton.style.cssText = `
                    position: fixed;
                    bottom: 10%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10002;
                    background: linear-gradient(135deg, #ff0000, #cc0000);
                    color: white;
                    padding: 12px 35px;
                    font-size: 16px;
                    font-weight: 700;
                    text-decoration: none;
                    border-radius: 50px;
                    box-shadow: 0 8px 20px rgba(255, 0, 0, 0.4);
                    opacity: 0;
                    transition: all 0.3s ease;
                    font-family: 'Inter', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  `;
                  ctaButton.textContent = 'Get yours today';

                  // Add click tracking
                  ctaButton.addEventListener('click', () => {
                    trackLoopMeEvent('clickthrough', { url: clickTag });
                  });

                  // Hover effect
                  ctaButton.addEventListener('mouseenter', () => {
                    ctaButton.style.transform = 'translateX(-50%) scale(1.05)';
                    ctaButton.style.boxShadow = '0 12px 30px rgba(255, 0, 0, 0.6)';
                  });

                  ctaButton.addEventListener('mouseleave', () => {
                    ctaButton.style.transform = 'translateX(-50%) scale(1)';
                    ctaButton.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.4)';
                  });

                  document.body.appendChild(ctaButton);

                  // Fade in text 4 and CTA button
                  setTimeout(() => {
                    text4.style.opacity = '1';
                    ctaButton.style.opacity = '1';
                  }, 100);
                }, 500);
              }

              // Trigger red lighting effect
              flashRedLighting();

              // Remove the dropped pin with animation
              pin.style.transition = 'all 0.3s ease';
              pin.style.opacity = '0';
              pin.style.transform = 'scale(0)';

              setTimeout(() => {
                pin.remove();
              }, 300);

              // Change can image based on number of dropped pins
              if (droppedPins <= 4) {
                // Preserve size during image change
                const currentWidth = productImage.offsetWidth;
                const currentHeight = productImage.offsetHeight;

                productImage.src = canImages[droppedPins];

                // Force same dimensions
                productImage.style.width = currentWidth + 'px';
                productImage.style.height = currentHeight + 'px';

                console.log(`Pin ${droppedPins} dropped, can image: ${canImages[droppedPins]}`);
              }
            } else {
              // Return to original position
              pin.style.transition = 'all 0.3s ease';
              pin.style.left = pos.left || 'auto';
              pin.style.right = pos.right || 'auto';
              pin.style.top = pos.top;
              pin.style.transform = pos.transform + ' scale(1)';
              pin.style.opacity = '1';
            }

            pin.style.zIndex = 'auto';
          });

          productOverlay.appendChild(pin);
        });

        // Make drop zone (larger area) accept drops
        dropZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        });

        dropZone.addEventListener('drop', (e) => {
          e.preventDefault();

          // Use stored reference or try to find the dragged element
          let draggedElement = draggedPin;

          if (!draggedElement) {
            draggedElement = document.elementFromPoint(e.clientX, e.clientY);
          }

          // Check if a pin was dropped
          if (draggedElement && draggedElement.src && draggedElement.src.includes('sting pin.webp')) {
            droppedPins++;

            // Hide instruction texts after 4th pin is dropped
            if (droppedPins === 4) {
              // Track level complete
              trackLoopMeEvent('level_complete', { pins_dropped: 4 });

              instructionText.style.opacity = '0';
              instructionText3.style.opacity = '0';
              setTimeout(() => {
                instructionText.remove();
                instructionText3.remove();

                // Show text 4 above the can
                const text4 = document.createElement('div');
                text4.id = 'text4';
                text4.style.cssText = `
                  position: fixed;
                  top: 0%;
                  left: 50%;
                  transform: translateX(-50%);
                  z-index: 10002;
                  opacity: 0;
                  transition: opacity 0.5s ease;
                `;

                const text4Image = document.createElement('img');
                text4Image.src = 'assets/text 4.webp';
                text4Image.style.cssText = `
                  width: 75vw;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                `;

                text4.appendChild(text4Image);
                document.body.appendChild(text4);

                // Show CTA button below the can
                const ctaButton = document.createElement('a');
                ctaButton.href = clickTag; // Use LoopMe clickTag
                ctaButton.target = '_blank';
                ctaButton.style.cssText = `
                  position: fixed;
                  bottom: 10%;
                  left: 50%;
                  transform: translateX(-50%);
                  z-index: 10002;
                  background: linear-gradient(135deg, #ff0000, #cc0000);
                  color: white;
                  padding: 12px 35px;
                  font-size: 16px;
                  font-weight: 700;
                  text-decoration: none;
                  border-radius: 50px;
                  box-shadow: 0 8px 20px rgba(255, 0, 0, 0.4);
                  opacity: 0;
                  transition: all 0.3s ease;
                  font-family: 'Inter', sans-serif;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                `;
                ctaButton.textContent = 'Get yours today';

                // Add click tracking
                ctaButton.addEventListener('click', () => {
                  trackLoopMeEvent('clickthrough', { url: clickTag });
                });

                // Hover effect
                ctaButton.addEventListener('mouseenter', () => {
                  ctaButton.style.transform = 'translateX(-50%) scale(1.05)';
                  ctaButton.style.boxShadow = '0 12px 30px rgba(255, 0, 0, 0.6)';
                });

                ctaButton.addEventListener('mouseleave', () => {
                  ctaButton.style.transform = 'translateX(-50%) scale(1)';
                  ctaButton.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.4)';
                });

                document.body.appendChild(ctaButton);

                // Fade in text 4 and CTA button
                setTimeout(() => {
                  text4.style.opacity = '1';
                  ctaButton.style.opacity = '1';
                }, 100);
              }, 500);
            }

            // Trigger red lighting effect
            flashRedLighting();

            // Remove the dropped pin with animation
            draggedElement.style.transition = 'all 0.3s ease';
            draggedElement.style.opacity = '0';
            draggedElement.style.transform = 'scale(0)';

            setTimeout(() => {
              draggedElement.remove();
            }, 300);

            // Change can image based on number of dropped pins
            if (droppedPins <= 4) {
              // Preserve size during image change
              const currentWidth = productImage.offsetWidth;
              const currentHeight = productImage.offsetHeight;

              productImage.src = canImages[droppedPins];

              // Force same dimensions
              productImage.style.width = currentWidth + 'px';
              productImage.style.height = currentHeight + 'px';

              console.log(`Pin ${droppedPins} dropped, can image: ${canImages[droppedPins]}`);
            }
          }
        });

        // Add instruction text above the can
        const instructionText = document.createElement('div');
        instructionText.id = 'instructionText';
        instructionText.style.cssText = `
          position: fixed;
          top: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(-30%);
          z-index: 10002;
          opacity: 0;
          transition: opacity 0.5s ease;
        `;

        const instructionImage = document.createElement('img');
        instructionImage.src = 'assets/text 2.webp';
        instructionImage.style.cssText = `
          width: 70vw;
          height: auto;
        `;

        instructionText.appendChild(instructionImage);
        document.body.appendChild(instructionText);

        // Add text 3 below the can
        const instructionText3 = document.createElement('div');
        instructionText3.id = 'instructionText3';
        instructionText3.style.cssText = `
          position: fixed;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(30%);
          z-index: 10002;
          opacity: 0;
          transition: opacity 0.5s ease;
        `;

        const instructionImage3 = document.createElement('img');
        instructionImage3.src = 'assets/text 3.webp';
        instructionImage3.style.cssText = `
          width: 70vw;
          height: auto;
        `;

        instructionText3.appendChild(instructionImage3);
        document.body.appendChild(instructionText3);

        document.body.appendChild(productOverlay);

        // Create hand tutorial element
        const handTutorial = document.createElement('img');
        handTutorial.src = 'assets/hand.png';
        handTutorial.id = 'handTutorial';
        handTutorial.style.cssText = `
          position: fixed;
          width: 140px;
          height: auto;
          z-index: 10010;
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(handTutorial);

        // Add hand animation keyframes
        if (!document.getElementById('handAnimStyle')) {
          const handStyle = document.createElement('style');
          handStyle.id = 'handAnimStyle';
          handStyle.textContent = `
            @keyframes handMoveTocan {
              0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
              20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0.9);
              }
              80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0.9);
              }
              100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
              }
            }
            @keyframes handPulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); }
              50% { transform: translate(-50%, -50%) scale(0.85); }
            }
          `;
          document.head.appendChild(handStyle);
        }

        // Function to animate hand from pin to can
        let handAnimationInterval;
        let tutorialActive = true;

        function animateHandTutorial() {
          if (!tutorialActive) return;

          // Get positions of first pin and can
          const pins = productOverlay.querySelectorAll('img[src*="sting pin"]');
          if (pins.length === 0) return;

          const firstPin = pins[0];
          const pinRect = firstPin.getBoundingClientRect();
          const canRect = productImage.getBoundingClientRect();

          // Start position (over the first pin)
          const startX = pinRect.left + pinRect.width / 2;
          const startY = pinRect.top + pinRect.height / 2;

          // End position (center of can)
          const endX = canRect.left + canRect.width / 2;
          const endY = canRect.top + canRect.height / 2;

          // Position hand at start
          handTutorial.style.left = startX + 'px';
          handTutorial.style.top = startY + 'px';
          handTutorial.style.opacity = '1';
          handTutorial.style.animation = 'handPulse 0.5s ease-in-out';

          // After pulse, move to can
          setTimeout(() => {
            if (!tutorialActive) return;
            handTutorial.style.transition = 'left 1s ease-in-out, top 1s ease-in-out';
            handTutorial.style.left = endX + 'px';
            handTutorial.style.top = endY + 'px';
          }, 600);

          // Fade out at can
          setTimeout(() => {
            if (!tutorialActive) return;
            handTutorial.style.transition = 'opacity 0.3s ease';
            handTutorial.style.opacity = '0';
          }, 1700);

          // Reset for next loop
          setTimeout(() => {
            if (!tutorialActive) return;
            handTutorial.style.transition = 'none';
            handTutorial.style.left = startX + 'px';
            handTutorial.style.top = startY + 'px';
          }, 2100);
        }

        // Function to stop tutorial
        function stopHandTutorial() {
          tutorialActive = false;
          if (handAnimationInterval) {
            clearInterval(handAnimationInterval);
          }
          handTutorial.style.transition = 'opacity 0.3s ease';
          handTutorial.style.opacity = '0';
          setTimeout(() => {
            handTutorial.remove();
          }, 300);
        }

        // Trigger animation
        setTimeout(() => {
          productOverlay.style.opacity = '1';
          productImage.style.transform = 'scale(1)';

          // Animate pins
          const pins = productOverlay.querySelectorAll('img[src*="sting pin"]');
          pins.forEach(pin => {
            pin.style.opacity = '1';
            // Keep the vertical centering transform and scale up
            pin.style.transform = 'translate(0, -50%) scale(1)';

            // Stop tutorial when user interacts with pin
            pin.addEventListener('touchstart', stopHandTutorial, { once: true });
            pin.addEventListener('mousedown', stopHandTutorial, { once: true });
            pin.addEventListener('dragstart', stopHandTutorial, { once: true });
          });

          // Show instruction texts after pins appear
          setTimeout(() => {
            instructionText.style.opacity = '1';
            instructionText3.style.opacity = '1';

            // Start hand tutorial animation after a short delay
            setTimeout(() => {
              animateHandTutorial();
              // Loop the animation every 2.5 seconds
              handAnimationInterval = setInterval(animateHandTutorial, 2500);
            }, 500);
          }, 400);
        }, 50);

        console.log('Product overlay displayed with animation');
      }, 2500); // Show text for 2.5 seconds
    }, 600); // Show text faster after zoom starts
  }

  function startViewer() {
    if (viewerStarted) return;

    // Check if pannellum is loaded
    if (typeof pannellum === 'undefined') {
      console.error('Pannellum library not loaded');
      alert('Failed to load 360 viewer. Please refresh the page.');
      return;
    }

    viewerStarted = true;

    // Hide start button and instruction container
    if (btn) btn.style.display = 'none';
    const instructionContainer = document.getElementById('instructionContainer');
    if (instructionContainer) instructionContainer.style.display = 'none';

    // Initialize the viewer
    viewer = pannellum.viewer(viewerContainer, {
      type: 'cubemap',
      autoLoad: true,
      cubeMap: [
        'assets/tiles/front.jpg',
        'assets/tiles/right.jpg',
        'assets/tiles/back.jpg',
        'assets/tiles/left.jpg',
        'assets/tiles/up.jpg',
        'assets/tiles/down.jpg'
      ],
      showControls: true,
      compass: false,
      draggable: true,
      mouseZoom: true,
      hfov: 60,
      pitch: 0,
      yaw: 0
    });

    // Add the can hotspot when viewer loads
    viewer.on('load', () => {
      console.log('Viewer loaded successfully');

      // Show the border overlay immediately when viewer loads
      if (borderOverlay) {
        borderOverlay.style.display = 'block';
        console.log('Border overlay shown on load');
      }

      addCanHotspot();

      // Continuously check if can is aligned with border
      setInterval(checkCanInBorder, 100); // Check every 100ms
    });

    viewer.on('error', (err) => {
      console.error('Viewer error:', err);
      alert('Error loading the stadium view. Please check if all image files exist.');
    });
  }

  // Initialize viewer immediately on page load
  if (typeof pannellum !== 'undefined') {
    viewer = pannellum.viewer(viewerContainer, {
      type: 'cubemap',
      autoLoad: true,
      cubeMap: [
        'assets/tiles/front.jpg',
        'assets/tiles/right.jpg',
        'assets/tiles/back.jpg',
        'assets/tiles/left.jpg',
        'assets/tiles/up.jpg',
        'assets/tiles/down.jpg'
      ],
      showControls: false,
      compass: false,
      draggable: true,
      mouseZoom: false,
      hfov: 60,
      pitch: 0,
      yaw: 0
    });

    viewer.on('load', () => {
      console.log('Viewer loaded in background');
    });
  }

  // Add click listener to start button
  if (btn) {
    btn.addEventListener('click', () => {
      if (!viewerStarted) {
        viewerStarted = true;

        // Track game start and first interaction
        trackLoopMeEvent('game_start');
        trackLoopMeEvent('first_interaction', { action: 'start_button_clicked' });

        // Hide start button and instruction container
        btn.style.display = 'none';
        const instructionContainer = document.getElementById('instructionContainer');
        if (instructionContainer) instructionContainer.style.display = 'none';

        // Show the border overlay
        if (borderOverlay) {
          borderOverlay.style.display = 'block';
          console.log('Border overlay shown on start');
        }

        // Create swipe hand tutorial for 360° navigation
        const swipeHand = document.createElement('img');
        swipeHand.src = 'assets/hand.png';
        swipeHand.id = 'swipeHand';
        swipeHand.style.cssText = `
          position: fixed;
          width: 200px;
          height: auto;
          z-index: 1002;
          pointer-events: none;
          opacity: 0;
          top: 50%;
          left: 10%;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(swipeHand);

        // Add swipe animation keyframes
        if (!document.getElementById('swipeAnimStyle')) {
          const swipeStyle = document.createElement('style');
          swipeStyle.id = 'swipeAnimStyle';
          swipeStyle.textContent = `
            @keyframes swipeLeftRight {
              0% {
                left: 10%;
                opacity: 1;
              }
              50% {
                left: 90%;
                opacity: 1;
              }
              100% {
                left: 10%;
                opacity: 1;
              }
            }
          `;
          document.head.appendChild(swipeStyle);
        }

        // Swipe tutorial control
        let swipeTutorialActive = true;
        let swipeAnimationTimeout;

        function startSwipeTutorial() {
          if (!swipeTutorialActive) return;
          swipeHand.style.opacity = '1';
          swipeHand.style.animation = 'swipeLeftRight 2s ease-in-out infinite';
        }

        function stopSwipeTutorial() {
          swipeTutorialActive = false;
          swipeHand.style.animation = 'none';
          swipeHand.style.transition = 'opacity 0.3s ease';
          swipeHand.style.opacity = '0';
          setTimeout(() => {
            swipeHand.remove();
          }, 300);
        }

        // Start swipe tutorial after a short delay
        setTimeout(() => {
          startSwipeTutorial();
        }, 500);

        // Stop swipe tutorial when user interacts with viewer
        viewerContainer.addEventListener('touchstart', stopSwipeTutorial, { once: true });
        viewerContainer.addEventListener('mousedown', stopSwipeTutorial, { once: true });

        // Also stop when can is found (modify onCanFound reference)
        const originalOnCanFound = onCanFound;
        onCanFound = function() {
          stopSwipeTutorial();
          originalOnCanFound.apply(this, arguments);
        };

        // Add the can hotspot
        addCanHotspot();

        // Continuously check if can is aligned with border
        setInterval(checkCanInBorder, 100);
      }
    });
  }
});

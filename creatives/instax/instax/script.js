document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const radioButtons = Array.from(document.querySelectorAll('input[name="slider"]'));
    const sliderLabels = document.querySelectorAll("#slider label");
    const closebtn = document.querySelector(".close-btn");
    const audioButton = document.getElementById("audioButton");
    const video = document.querySelector('.responsive-video');
    const interstitialAd = document.getElementById('interstitialAd');
    const volumeIcon = audioButton.querySelector('img[src*="volume.png"]');
    const unmuteIcon = audioButton.querySelector('img[src*="unmute.png"]');
    const gestureImage = document.querySelector('#gesture');

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = radioButtons.findIndex(radio => radio.checked);
    let animationFrameId = null;
    let lastDeltaX = 0;

    // Initialize icon states (video starts muted)
    volumeIcon.style.display = "inline";  // Hidden when muted
    unmuteIcon.style.display = "none"; // Visible when muted
    const preloadAssets = [
        './assets/1.png',
        './assets/2.png',
        './assets/3.png',
        './assets/gesture.png',
        './assets/volume.png',
        './assets/unmute.png',
        './assets/video.mp4'
    ];
    
    preloadAssets.forEach(src => {
        const ext = src.split('.').pop();
        if (ext === 'mp4') {
            const video = document.createElement('video');
            video.src = src;
            video.preload = 'auto';
        } else {
            const img = new Image();
            img.src = src;
        }
    });
    
    // Event listeners for drag functionality
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("mousemove", dragMove);
    slider.addEventListener("mouseup", dragEnd);
    slider.addEventListener("mouseleave", dragEnd);
    slider.addEventListener("touchstart", dragStart);
    slider.addEventListener("touchmove", dragMove);
    slider.addEventListener("touchend", dragEnd);

    // Attach toggleAudio function to audioButton
    audioButton.addEventListener("click", toggleAudio);

    // Close ad
    closebtn.addEventListener("click", () => {
        interstitialAd.style.display = "none";
    });

    function dragStart(e) {
        isDragging = true;
        startX = getEventX(e);
        slider.style.cursor = "grabbing";
        sliderLabels.forEach(label => {
            label.style.transition = "none";
        });
        hideGesture();
        lastDeltaX = 0;
        cancelAnimationFrame(animationFrameId);
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = getEventX(e);
        const deltaX = currentX - startX;
        lastDeltaX = deltaX;
        currentTranslate = prevTranslate + deltaX;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(updateSliderPositionWhileDragging);
    }

    function updateSliderPositionWhileDragging() {
    const dragPercent = lastDeltaX / slider.clientWidth;
    sliderLabels.forEach((label, index) => {
        const baseOffset = 115;
const offset = (index - currentIndex) * baseOffset + dragPercent * baseOffset * 0.9;
        const scale = index === currentIndex ? 1 : 0.9;
        label.style.transition = "none";
        label.style.transform = `translate3d(${offset}%, 0, 0) scale(${scale})`;
    });
}


    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = "grab";
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        const dragThreshold = slider.clientWidth * 0.1;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy > dragThreshold) {
            currentIndex = (currentIndex - 1 + sliderLabels.length) % sliderLabels.length;
        } else if (movedBy < -dragThreshold) {
            currentIndex = (currentIndex + 1) % sliderLabels.length;
        }

        // Snap to position with transition
        sliderLabels.forEach((label, index) => {
            label.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease-out";
;
        });
        setPositionByIndex();
    }

    function setPositionByIndex() {
        prevTranslate = -currentIndex * slider.clientWidth;
        currentTranslate = prevTranslate;

        sliderLabels.forEach((label, index) => {
            const offset = (index - currentIndex) * 115;
            const zDepth = Math.abs(index - currentIndex) * -140;
            const farOffset = Math.abs(index - currentIndex) > 1 ? 230 : offset;
            const opacity = Math.abs(index - currentIndex) > 1 ? 0 : 0.8;
            const zIndex = Math.abs(index - currentIndex) === 0 ? 3 : Math.abs(index - currentIndex) === 1 ? 2 : 1;

            // Use translate3d for hardware acceleration
            label.style.transform =
                Math.abs(index - currentIndex) > 1
                    ? `translate3d(${farOffset}%, 0, -280px)`
                    : `translate3d(${offset}%, 0, ${zDepth}px)`;
            label.style.opacity = index === currentIndex ? 1 : opacity;
            label.style.zIndex = zIndex;
        });

        radioButtons[currentIndex].checked = true;

        setTimeout(() => {
            sliderLabels.forEach(label => (label.style.transition = "none"));
        }, 300);
    }

    function toggleAudio() {
        if (video.muted) {
            video.muted = false;
            volumeIcon.style.display = "none"; // Show volume icon (sound on)
            unmuteIcon.style.display = "inline";   // Hide unmute icon
            video.play(); // Ensure video continues playing
        } else {
            video.muted = true;
            volumeIcon.style.display = "inline";   // Hide volume icon
            unmuteIcon.style.display = "none"; // Show unmute icon (sound off)
        }
    }

    function getEventX(e) {
        return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    }

    function hideGesture() {
        if (gestureImage) {
            gestureImage.style.display = "none"; // Hide gesture on drag start
        }
    }
});
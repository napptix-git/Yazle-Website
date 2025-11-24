document.addEventListener('DOMContentLoaded', async () => {
    const cube = document.querySelector('.cube');
    const gesture = document.querySelector('#gesture'); // Select the gesture image
    const closeBtn = document.querySelector('.close-btn');
    const responsivevideo = document.querySelector('.responsive-video');
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let startRotation = 0;
    let isAutoRotating = true; // Flag to control automatic rotation
    let autoRotateInterval; // Variable to store the interval ID

    // Function to handle the start of the drag (mousedown or touchstart)
    const startDrag = (clientX) => {
        isDragging = true;
        startX = clientX;
        startRotation = currentRotation;
        cube.style.transition = 'none'; // Disable transition during drag
        stopAutoRotation(); // Stop automatic rotation when the user interacts
        gesture.style.opacity = '0';
        gesture.style.display = 'none';
    };

    // Function to handle the drag movement (mousemove or touchmove)
    const dragMove = (clientX) => {
        if (isDragging) {
            const deltaX = clientX - startX;
            currentRotation = startRotation + deltaX / 1.5; // Adjust sensitivity as needed
            cube.style.transform = `rotateY(${currentRotation}deg)`;
        }
    };

    // Function to handle the end of the drag (mouseup or touchend)
    const endDrag = () => {
        if (isDragging) {
            isDragging = false;
            cube.style.transition = 'transform 0.5s ease-in-out'; // Re-enable smooth transition after drag
            cube.style.transform = `rotateY(${currentRotation}deg)`;
        }
    };

    // Function to synchronize the gesture rotation with the cube
    const syncGestureRotation = () => {
        // Apply the exact same 3D rotation to the gesture
        gesture.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
        gesture.style.transition = 'transform 0.5s ease-in-out';
    };
    

    // Automatic rotation logic
    const startAutoRotation = () => {
        let direction = 1; // 1 for right, -1 for left
        let rotationOffset = 30; // Degrees to rotate left and right
        autoRotateInterval = setInterval(() => {
            if (isAutoRotating) {
                cube.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
                currentRotation += direction * rotationOffset;
                cube.style.transform = `rotateY(${currentRotation}deg)`;
                syncGestureRotation(); // Sync the gesture image rotation

                // Reverse direction after rotating
                direction *= -1;
                setTimeout(() => {
                    currentRotation += direction * rotationOffset;
                    cube.style.transform = `rotateY(${currentRotation}deg)`;
                    syncGestureRotation(); // Sync the gesture image rotation
                }, 700);
            }
        }, 1400); // 2 seconds interval for a complete left-right cycle
    };

    const stopAutoRotation = () => {
        isAutoRotating = false;
        clearInterval(autoRotateInterval);
    };

    // Start automatic rotation when the page loads
    startAutoRotation();

    // Mouse events
    cube.addEventListener('mousedown', (e) => startDrag(e.clientX));
    document.addEventListener('mousemove', (e) => dragMove(e.clientX));
    document.addEventListener('mouseup', endDrag);

    // Touch events
    cube.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    document.addEventListener('touchmove', (e) => dragMove(e.touches[0].clientX));
    document.addEventListener('touchend', endDrag);

    // Close Ad Functionality
    closeBtn.addEventListener('click', () => {
        const interstitialAd = document.querySelector('.interstitial-ad'); // Ensure you have this element in your HTML
        interstitialAd.style.display = 'none';
        responsivevideo.pause();
        responsivevideo.style.display = 'none';
    });
});

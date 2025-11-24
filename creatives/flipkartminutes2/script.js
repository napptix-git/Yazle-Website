// ✅ Redirect early to avoid preview flash on mobile
if (window.innerWidth <= 576 && window.location.pathname.includes('preview.html')) {
    window.location.href = './flipkartminutes2/index.html';
}

// ✅ DOM logic for desktop preview + QR code
window.addEventListener('DOMContentLoaded', () => {
    const creativeFolder = 'flipkartminutes2';

    // 1. Set iframe preview for desktop
    const previewPath = `./${creativeFolder}/index.html`;
    document.getElementById('mock-frame').src = previewPath;

    // 2. Create QR code container
    const qrContainer = document.createElement('div');
    qrContainer.style.position = 'absolute';
    qrContainer.style.top = '50%';
    qrContainer.style.right = '5%';
    qrContainer.style.transform = 'translateY(-50%)';
    qrContainer.style.zIndex = '1000';
    qrContainer.style.textAlign = 'center';
    qrContainer.style.fontFamily = 'Montserrat, sans-serif';

    // 3. QR code points to online-hosted index.html
    const qrURL = `https://www.napptix.com/creatives/${creativeFolder}/${creativeFolder}/index.html`;

    const qrImg = document.createElement('img');
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrURL)}&size=100x100`;
    qrImg.src = qrCodeUrl;
    qrImg.alt = 'Scan to view';
    qrImg.style.display = 'block';
    qrImg.style.margin = '0 auto';

    // 4. Caption text
    const qrText = document.createElement('div');
    qrText.textContent = 'Scan for mobile view';
    qrText.style.fontFamily = 'Montserrat, sans-serif';
    qrText.style.fontSize = '16px';
    qrText.style.marginTop = '8px';
    qrText.style.marginLeft = '0px';
    qrText.style.whiteSpace = 'nowrap';

    // 5. Append QR and text to document
    qrContainer.appendChild(qrImg);
    qrContainer.appendChild(qrText);
    document.body.appendChild(qrContainer);
});

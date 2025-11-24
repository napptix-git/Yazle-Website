// const urlParams = new URLSearchParams(window.location.search);
// const creativeId = urlParams.get('creativeId'); // Get from query parameters

// if (!creativeId) {
//     console.error('Creative ID not found in URL.'); // Log an error if not found
//     // Optionally, handle the error (e.g., redirect, show a message, etc.)
// } else {
//     console.log(`Creative ID retrieved: ${creativeId}`); // Log the retrieved ID

//     // Set the URL for the mock-frame iframe (index.html inside the uniqueid folder)
//     const mockUrl = `/creatives/${creativeId}//${creativeId}/index.html`;
//     document.getElementById('mock-frame').src = mockUrl; // Set the src for the iframe

//     // Generate QR code for the mobile preview link
//     const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`http://192.168.29.64:3000/creatives/${creativeId}/${creativeId}/index.html`)}&size=150x150`;
//     document.getElementById('qr-code').src = qrCodeUrl; // Set the src for QR code
// }
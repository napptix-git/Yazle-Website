# Lays Catch & Collect Game - How to Run

An interactive browser-based game where players catch falling Lays chips to earn points!

## 🚨 IMPORTANT: Do NOT double-click index.html directly!

Modern browsers block loading of CSS/JS files when opening HTML files directly from the file system (file:// protocol) due to CORS security policies. **A local web server is required.**

---

## How to Run This Game

Follow these steps to run the game properly:

### STEP 1: Extract the Files
1. Extract the game folder to a location on your computer
2. The folder name can be anything (e.g., `lays-game` or `Catch-to-collect`)
3. Remember the folder location

### STEP 2: Open Terminal in the Extracted Folder

**Windows:**
- Right-click inside the folder → Select "Open in Terminal"
- OR Shift + Right-click → Select "Open PowerShell window here"

**Mac:**
- Right-click inside the folder → Select "New Terminal at Folder"
- OR navigate using: `cd /path/to/your/folder`

**Linux:**
- Right-click inside the folder → Select "Open in Terminal"
- OR navigate using: `cd /path/to/your/folder`

### STEP 3: Choose Your Method

#### **OPTION 1 - Python (Recommended)**
1. With terminal open in the extracted folder, run:
   ```bash
   python -m http.server 8080
   ```
   Or if you have Python 2:
   ```bash
   python -m SimpleHTTPServer 8080
   ```
2. Open your browser to: **http://localhost:8080**
3. The game will load automatically!

#### **OPTION 2 - Node.js**
1. With terminal open in the extracted folder, run:
   ```bash
   npx serve .
   ```
2. Open the URL shown in terminal (usually http://localhost:3000)

#### **OPTION 3 - VS Code Live Server**
1. Open the extracted folder in VS Code (File → Open Folder)
2. Install "Live Server" extension (if not already installed)
   - Click Extensions icon (Ctrl+Shift+X)
   - Search for "Live Server"
   - Click Install
3. Right-click on `index.html` → "Open with Live Server"
4. Game opens in your default browser

### WHY THIS IS NEEDED:
Modern browsers block loading of CSS/JS files when opening HTML files directly from the file system (file:// protocol) due to CORS security policies. A local web server is required.

---

## 📱 For Best Mobile Experience (Highly Recommended!)

To see the game as it would appear on a real mobile device, use this Chrome extension:

### **Mobile Simulator - Responsive Testing Tool**

**🔗 Install here:** [Chrome Web Store - Mobile Simulator](https://chromewebstore.google.com/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk)

#### Why Use This Extension?
- ✅ **Perfect mobile preview** - See exactly how it looks on iPhone, Samsung, etc.
- ✅ **Touch simulation** - Test drag controls as on real phones
- ✅ **Multiple device presets** - iPhone 14, Samsung Galaxy, iPad, and more
- ✅ **Instant testing** - Switch between devices quickly
- ✅ **Professional results** - See the game in a realistic phone frame

#### How to Use:
1. Install the extension from the Chrome Web Store (link above)
2. Start the game using one of the options above
3. Click the Mobile Simulator extension icon in your browser toolbar
4. Select a device preset (recommended: **iPhone 14 Pro - 393 × 852**)
5. The game displays in a mobile phone frame
6. Test by clicking and dragging just like on a real phone

#### Recommended Devices:
- **iPhone 14 Pro** (393 × 852) - Optimal experience
- **iPhone 13** (390 × 844) - Standard gameplay
- **Samsung Galaxy S21** (360 × 800) - Android view

---

## 🎯 How to Play

1. **Start**: Click the orange "Play" button on the start screen
2. **Move Cart**:
   - **Desktop**: Click and drag the shopping cart left/right with mouse
   - **Mobile/Simulator**: Touch and drag the cart with your finger
3. **Catch Chips**: Position the cart under falling Lays chips to catch them
4. **Score**: Each chip caught = 1 point
5. **Timer**: You have **15 seconds** to catch as many chips as possible
6. **Win**: High scores earn you the "Snack Master" title!

### Controls:
- **Desktop**: Mouse click + drag
- **Mobile**: Touch + drag
- Cart automatically stays within game boundaries

---

## 📁 Files Included

```
lays-game/
├── index.html          # Main game file
├── style.css           # Game styling and animations
├── script.js           # Game logic and interactions
├── README.md           # This file (setup instructions)
└── assets/             # Game images and resources
    ├── cart.png
    ├── shelf.png
    ├── LAYS.png
    ├── lays poster.png
    └── [Various Lays chip images]
```

---

## ⚙️ Game Technical Details

The game is designed to run at **430×765 pixels** (9:16 mobile aspect ratio) with all necessary assets included.

### Game Settings:
- **Duration**: 15 seconds per round
- **Controls**: Mouse drag (desktop) / Touch drag (mobile)
- **Item Fall Speed**: Randomized for variety
- **Spawn Rate**: 1 chip per second
- **Display**: Responsive mobile-first design

### Technologies:
- HTML5, CSS3, Vanilla JavaScript
- RequestAnimationFrame for smooth 60 FPS
- Touch Events API for mobile support
- No frameworks required

### Browser Support:
- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 🎨 Customization (Optional)

If you want to modify the game settings, edit these values in `script.js`:

**Change Game Duration:**
```javascript
let timeLeft = 15; // Line 10 - Change to desired seconds
```

**Adjust Item Fall Speed:**
```javascript
let speed = 5; // Line 216 - Increase = faster, decrease = slower
```

**Modify Spawn Rate:**
```javascript
gameInterval = setInterval(makeItemFall, 1000); // Line 27 - Milliseconds between spawns
```

---

## 🐛 Troubleshooting

### Problem: Game not loading / Blank screen
**Solution**: Make sure you're using a local server (Options 1-3), NOT opening index.html directly

### Problem: Images not showing
**Solution**:
- Verify all files extracted correctly
- Check `assets/` folder is in same directory as index.html
- Use a local server instead of double-clicking HTML
- Clear browser cache (Ctrl+Shift+Delete)

### Problem: Cart not moving / Controls not working
**Solution**:
- Use the Mobile Simulator extension for best results
- Check browser console for errors (press F12)
- Ensure JavaScript is enabled in browser
- Try Chrome browser (recommended)

### Problem: Game too big or too small on desktop
**Solution**:
- Use the Mobile Simulator extension to view at correct size
- Game displays in phone-sized container (430px wide) on desktop
- Use browser zoom (Ctrl + / Ctrl -) if needed

---

## 📄 License & Credits

This is a branded game for **Lays chips**. All Lays branding, logos, and trademarks are property of **PepsiCo/Frito-Lay**.

**Game Features:**
- Interactive catch-and-collect mechanics
- Smooth animations and particle effects
- Mobile-optimized touch controls
- Branded UI with official Lays assets
- Score tracking and beautiful results screen

---

## 🎉 Enjoy the Game!

Have fun catching those chips and becoming a Snack Master! 🍟

If you experience any issues, make sure you're following the setup instructions and using a local web server.

**Made with ❤️ for Lays enthusiasts everywhere!**

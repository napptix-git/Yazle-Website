ASSETS FOLDER
=============

Place your custom textures here to change the game's appearance.

HOW TO USE:
1. Add your image files to this folder
2. Open js/config.js
3. Update the texture paths to point to your files
4. Refresh the game

SUPPORTED FORMATS:
- PNG (recommended for transparency)
- JPG/JPEG
- GIF

TEXTURE SLOTS AVAILABLE:
------------------------

1. HERO BALL TEXTURE
   File suggestion: ball.png
   Config path: GameConfig.textures.hero
   Example: 'assets/ball.png'

2. GROUND/ISLAND TEXTURE
   File suggestion: ground.png
   Config path: GameConfig.textures.ground
   Example: 'assets/ground.png'

3. TREE LEAVES TEXTURE
   File suggestion: leaves.png
   Config path: GameConfig.textures.treeLeaves
   Example: 'assets/leaves.png'

4. TREE TRUNK/BARK TEXTURE
   File suggestion: bark.png
   Config path: GameConfig.textures.treeTrunk
   Example: 'assets/bark.png'

5. SKY/BACKGROUND TEXTURE
   File suggestion: sky.png
   Config path: GameConfig.textures.skybox
   Example: 'assets/sky.png'

COLOR CUSTOMIZATION:
--------------------
You can also change colors without textures by editing
the 'colors' section in js/config.js

Colors use hexadecimal format (e.g., 0xff0000 for red)

TIPS:
- Use seamless/tileable textures for best results
- Keep textures small (256x256 or 512x512) for performance
- PNG format works best for textures with transparency

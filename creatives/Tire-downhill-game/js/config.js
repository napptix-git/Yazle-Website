/*
 * GAME CONFIGURATION
 * Change these values to customize the game appearance
 *
 * To replace assets:
 * 1. Place your new image/texture files in the 'assets' folder
 * 2. Update the paths below to point to your new files
 * 3. Refresh the game to see changes
 */

var GameConfig = {
    // ==================
    // COLORS (hex values)
    // ==================
    colors: {
        // Background/Sky color
        background: 0xfffafa,

        // Fog color (atmosphere effect)
        fog: 0xf0fff0,

        // Hero ball color
        hero: 0xe5f2f2,

        // Ground/World sphere color
        ground: 0xfffafa,

        // Tree foliage color
        treeLeaves: 0x33ff33,

        // Tree trunk color
        treeTrunk: 0x886633,

        // Explosion particles color
        particles: 0xfffafa,

        // Sun/Light color
        sunLight: 0xcdc1c5,

        // Hemisphere light (sky color)
        hemisphereLight: 0xfffafa
    },

    // ==================
    // TEXTURES (file paths)
    // Replace these with your own textures
    // ==================
    textures: {
        // Ball/Hero texture (optional - set to null for solid color)
        hero: null, // Example: 'assets/ball.png'

        // Ground texture (optional - set to null for solid color)
        ground: null, // Example: 'assets/ground.png'

        // Tree leaves texture (optional)
        treeLeaves: null, // Example: 'assets/leaves.png'

        // Tree trunk texture (optional)
        treeTrunk: null, // Example: 'assets/bark.png'

        // Sky/Background texture (optional)
        skybox: null // Example: 'assets/sky.png'
    },

    // ==================
    // GAME PARAMETERS
    // ==================
    gameplay: {
        // World size
        worldRadius: 26,

        // Hero ball size
        heroRadius: 0.2,

        // Rolling speed (higher = faster)
        rollingSpeed: 0.0012,

        // Gravity strength
        gravity: 0.005,

        // Jump power
        bounceValue: 0.1,

        // How often trees spawn (seconds)
        treeReleaseInterval: 1.8,

        // Fog density
        fogDensity: 0.14
    },

    // ==================
    // STREET LAMP CONFIGURATION
    // ==================
    streetLamps: {
        // Number of lamps in the decorative area
        forestTreeCount: 6,

        // Maximum lamps in object pool
        maxTreesInPool: 10,

        // Pole dimensions
        poleHeight: 1.8,
        poleRadius: 0.04,

        // Arm dimensions
        armLength: 0.5,
        armRadius: 0.025,

        // Lamp head dimensions
        lampWidth: 0.35,
        lampHeight: 0.12,
        lampDepth: 0.15,

        // Colors
        poleColor: 0x2a2a2a,      // Dark gray metal pole
        armColor: 0x333333,        // Slightly lighter arm
        lampHousingColor: 0x1a1a1a, // Black lamp housing
        lampGlowColor: 0xffffaa,   // Warm yellow glow
        lampLensColor: 0xffeecc    // Light lens color
    },

    // ==================
    // TIRE CONFIGURATION
    // ==================
    tire: {
        // Tire outer radius (overall size)
        outerRadius: 0.28,

        // Tire tube thickness (rubber thickness)
        tubeRadius: 0.1,

        // Number of tread blocks around the tire
        treadCount: 32,

        // Tire rubber color (dark black rubber)
        rubberColor: 0x1a1a1a,

        // Tire sidewall color (slightly lighter)
        sidewallColor: 0x2a2a2a,

        // Wheel rim color (metallic silver)
        rimColor: 0x888899,

        // Hub center color (dark metal)
        hubColor: 0x333344,

        // Rim accent color (chrome highlights)
        rimAccentColor: 0xaaaacc,

        // Tread color (can be slightly different for contrast)
        treadColor: 0x0a0a0a,

        // Geometry detail (higher = smoother but heavier)
        radialSegments: 32,
        tubularSegments: 24
    },

    // ==================
    // COIN CONFIGURATION
    // ==================
    coins: {
        // Coin size
        radius: 0.18,
        thickness: 0.04,

        // Coin colors (bright gold)
        goldColor: 0xffdd00,
        edgeColor: 0xffaa00,
        shineColor: 0xffff66,

        // How often coins spawn (seconds)
        spawnInterval: 1.0,

        // Points per coin collected
        pointsPerCoin: 10,

        // Maximum coins in object pool
        maxCoinsInPool: 25,

        // Coin rotation speed
        rotationSpeed: 0.05,

        // Collection radius
        collectRadius: 0.4
    },

    // ==================
    // LIVES & SCORING
    // ==================
    lives: {
        // Starting lives
        startingLives: 3,

        // Invincibility time after hit (seconds)
        invincibilityTime: 2,

        // Heart icon color
        heartColor: 0xff4444
    },

    // ==================
    // GANTRY BILLBOARD (spans over road)
    // ==================
    billboards: {
        // Billboard model path (overhang style)
        modelPath: 'assets/low_poly_billboard_sign_-_overhang.glb',

        // How often billboards spawn (seconds)
        spawnInterval: 5.0,

        // Scale of the billboard
        scale: 0.15,

        // Maximum billboards in pool
        maxBillboardsInPool: 5
    }
};

import React, { useEffect, useRef, useState } from 'react';

// Game objects and settings
interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
  dx?: number;
  dy?: number;
}

// Increased game dimensions
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 15;
const BALL_SIZE = 14;
const BLOCK_WIDTH = 60;
const BLOCK_HEIGHT = 25;
const BLOCK_GAP = 12;
const ROWS = 4;
const COLS = 10;

// Calculate maximum FPS (60fps is standard)
const FPS = 60;
const FRAME_TIME = 1000 / FPS; // Time between frames in ms

const FooterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameInitialized, setGameInitialized] = useState(false);
  
  // Game objects
  const paddleRef = useRef<GameObject>({
    x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    y: GAME_HEIGHT - PADDLE_HEIGHT - 10,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  });
  
  const ballRef = useRef<GameObject>({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - PADDLE_HEIGHT - 20,
    width: BALL_SIZE,
    height: BALL_SIZE,
    dx: 5,
    dy: -5,
  });
  
  const blocksRef = useRef<GameObject[]>([]);
  
  // Create blocks in a grid pattern
  const createBlocks = () => {
    const blocks: GameObject[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        blocks.push({
          x: c * (BLOCK_WIDTH + BLOCK_GAP) + (GAME_WIDTH - (COLS * (BLOCK_WIDTH + BLOCK_GAP) - BLOCK_GAP)) / 2,
          y: r * (BLOCK_HEIGHT + BLOCK_GAP) + 50,
          width: BLOCK_WIDTH,
          height: BLOCK_HEIGHT,
        });
      }
    }
    return blocks;
  };
  
  // Initialize game
  const initGame = () => {
    if (!gameInitialized) {
      blocksRef.current = createBlocks();
      setGameInitialized(true);
    }
    
    // Reset paddle position
    paddleRef.current = {
      x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: GAME_HEIGHT - PADDLE_HEIGHT - 10,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    };
    
    // Reset ball position
    ballRef.current = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - PADDLE_HEIGHT - 20,
      width: BALL_SIZE,
      height: BALL_SIZE,
      dx: 5,
      dy: -5,
    };
    
    // Reset blocks if all destroyed
    if (blocksRef.current.length === 0) {
      blocksRef.current = createBlocks();
    }
    
    setScore(0);
    setGameOver(false);
  };
  
  // Detect collision between objects
  const detectCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };
  
  // Update game state
  const updateGame = (deltaTime: number) => {
    if (!isPlaying || gameOver) return;
    
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    
    // Move ball with frame-rate independence
    if (ball.dx && ball.dy) {
      const speedFactor = deltaTime / FRAME_TIME; // Adjust speed based on frame time
      ball.x += ball.dx * speedFactor;
      ball.y += ball.dy * speedFactor;
    }
    
    // Wall collision (left/right)
    if (ball.x + ball.width > GAME_WIDTH || ball.x < 0) {
      if (ball.dx) ball.dx = -ball.dx;
      
      // Fix ball position if it's outside the boundaries
      if (ball.x < 0) ball.x = 0;
      if (ball.x + ball.width > GAME_WIDTH) ball.x = GAME_WIDTH - ball.width;
    }
    
    // Wall collision (top)
    if (ball.y < 0) {
      if (ball.dy) ball.dy = -ball.dy;
      // Fix ball position if it's outside the top boundary
      ball.y = 0;
    }
    
    // Bottom collision (game over)
    if (ball.y + ball.height > GAME_HEIGHT) {
      setGameOver(true);
      setIsPlaying(false);
    }
    
    // Paddle collision
    if (detectCollision(ball, paddle)) {
      // Prevent the ball from getting stuck in the paddle
      if (ball.y + ball.height - Math.abs(ball.dy) <= paddle.y) {
        // Calculate impact point on paddle (0-1)
        const impact = (ball.x + ball.width / 2 - paddle.x) / paddle.width;
        
        // Angle (-1 to 1) based on impact point
        const angle = 2 * impact - 1;
        
        // Change ball direction based on impact
        if (ball.dy) {
          ball.dy = -Math.abs(ball.dy);
          ball.dx = 5 * angle;
        }
        
        // Move ball above paddle to prevent sticking
        ball.y = paddle.y - ball.height;
      }
    }
    
    // Block collisions
    const collidedBlocks = [];
    
    for (let i = 0; i < blocksRef.current.length; i++) {
      const block = blocksRef.current[i];
      if (detectCollision(ball, block)) {
        collidedBlocks.push(i);
        
        // Determine collision side
        const ballBottom = ball.y + ball.height;
        const ballTop = ball.y;
        const ballRight = ball.x + ball.width;
        const ballLeft = ball.x;
        
        const blockBottom = block.y + block.height;
        const blockTop = block.y;
        const blockRight = block.x + block.width;
        const blockLeft = block.x;
        
        // Calculate overlap on each axis
        const overlapBottom = ballBottom - blockTop;
        const overlapTop = blockBottom - ballTop;
        const overlapRight = ballRight - blockLeft;
        const overlapLeft = blockRight - ballLeft;
        
        // Find the smallest overlap
        const minOverlap = Math.min(overlapBottom, overlapTop, overlapRight, overlapLeft);
        
        // Resolve collision based on smallest overlap
        if (minOverlap === overlapTop && ball.dy > 0) {
          ball.dy = -ball.dy;
          ball.y = blockTop - ball.height;
        } else if (minOverlap === overlapBottom && ball.dy < 0) {
          ball.dy = -ball.dy;
          ball.y = blockBottom;
        } else if (minOverlap === overlapLeft && ball.dx > 0) {
          ball.dx = -ball.dx;
          ball.x = blockLeft - ball.width;
        } else if (minOverlap === overlapRight && ball.dx < 0) {
          ball.dx = -ball.dx;
          ball.x = blockRight;
        }
      }
    }
    
    // Remove blocks and update score
    if (collidedBlocks.length > 0) {
      // Sort indices in descending order to avoid issues when removing elements
      collidedBlocks.sort((a, b) => b - a);
      
      collidedBlocks.forEach(index => {
        blocksRef.current.splice(index, 1);
        setScore(prev => prev + 10);
      });
    }
    
    // If all blocks are cleared
    if (blocksRef.current.length === 0) {
      setIsPlaying(false);
      setGameOver(true);
    }
  };
  
  // Draw game
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Set background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw paddle
    ctx.fillStyle = '#29dd3b';
    ctx.fillRect(
      paddleRef.current.x,
      paddleRef.current.y,
      paddleRef.current.width,
      paddleRef.current.height
    );
    
    // Add paddle glow effect
    ctx.shadowColor = '#29dd3b';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(
      paddleRef.current.x,
      paddleRef.current.y,
      paddleRef.current.width,
      paddleRef.current.height
    );
    ctx.shadowBlur = 0;
    
    // Draw ball
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(
      ballRef.current.x + BALL_SIZE / 2,
      ballRef.current.y + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Add ball glow
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(
      ballRef.current.x + BALL_SIZE / 2,
      ballRef.current.y + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw blocks with different colors
    const blockColors = ['#8B5CF6', '#F97316', '#0EA5E9', '#10B981'];
    
    blocksRef.current.forEach((block, index) => {
      const row = Math.floor(index / COLS);
      ctx.fillStyle = blockColors[row % blockColors.length];
      ctx.fillRect(block.x, block.y, block.width, block.height);
      
      // Add inner highlight
      ctx.fillStyle = lightenColor(blockColors[row % blockColors.length], 20);
      ctx.fillRect(block.x + 2, block.y + 2, block.width - 4, block.height - 4);
    });
    
    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '18px Roboto Mono';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 15, 30);
    
    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '28px Roboto Mono';
      ctx.textAlign = 'center';
      ctx.fillText(
        blocksRef.current.length === 0 ? 'You Win!' : 'Game Over',
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 - 15
      );
      
      ctx.font = '18px Roboto Mono';
      ctx.fillText('Click to play again', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 25);
    }
  };
  
  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  };
  
  // Game loop with fixed time step
  const gameLoop = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    updateGame(deltaTime);
    drawGame();
    
    requestRef.current = requestAnimationFrame(gameLoop);
  };
  
  // Start/stop game loop
  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);
  
  // Mouse move handler for paddle
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scale = GAME_WIDTH / rect.width; // Calculate scale factor
    const mouseX = (e.clientX - rect.left) * scale;
    
    // Update paddle position
    paddleRef.current.x = Math.max(
      0,
      Math.min(mouseX - PADDLE_WIDTH / 2, GAME_WIDTH - PADDLE_WIDTH)
    );
  };
  
  // Touch move handler for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scale = GAME_WIDTH / rect.width; // Calculate scale factor
    const touchX = (e.touches[0].clientX - rect.left) * scale;
    
    // Prevent scrolling while playing
    e.preventDefault();
    
    // Update paddle position
    paddleRef.current.x = Math.max(
      0,
      Math.min(touchX - PADDLE_WIDTH / 2, GAME_WIDTH - PADDLE_WIDTH)
    );
  };
  
  // Canvas click handler
  const handleCanvasClick = () => {
    if (gameOver) {
      initGame();
    }
    setIsPlaying(true);
  };
  
  // Ensure the game works after resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          // Keep aspect ratio but make it responsive
          const containerWidth = container.clientWidth;
          canvas.style.width = `${Math.min(GAME_WIDTH, containerWidth)}px`;
          canvas.style.height = 'auto';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initial draw
  useEffect(() => {
    initGame();
    drawGame();
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      if (container) {
        // Keep aspect ratio but make it responsive
        const containerWidth = container.clientWidth;
        canvas.style.width = `${Math.min(GAME_WIDTH, containerWidth)}px`;
        canvas.style.height = 'auto';
      }
    }
  }, []);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="border-2 border-[#29dd3b]/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(41,221,59,0.2)]">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="game-canvas max-w-full"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleCanvasClick}
        />
      </div>
      {!isPlaying && !gameOver && (
        <button
          className="mt-4 px-8 py-3 bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold rounded-full transition-all text-lg"
          onClick={() => setIsPlaying(true)}
        >
          Play Game
        </button>
      )}
    </div>
  );
};

export default FooterGame;


import React, { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
}

interface Obstacle extends GameObject {
  passed: boolean;
}

const RunnerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game state refs
  const animationFrameRef = useRef<number>(0);
  const playerRef = useRef<GameObject>({
    x: 50,
    y: 0,
    width: 30,
    height: 50
  });
  const groundYRef = useRef(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const isJumpingRef = useRef(false);
  const jumpVelocityRef = useRef(0);
  const speedRef = useRef(5);
  const lastFrameTimeRef = useRef(0);
  
  // Initialize the game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      groundYRef.current = canvas.height - 50;
      playerRef.current.y = groundYRef.current - playerRef.current.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Try to retrieve high score from localStorage
    const savedHighScore = localStorage.getItem('runnerHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Initial game draw
    drawGame();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  
  // Game controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        
        if (gameOver) {
          restartGame();
        } else if (!isJumpingRef.current) {
          jump();
        }
        
        if (!isPlaying) {
          setIsPlaying(true);
        }
      }
    };
    
    const handleClick = () => {
      if (gameOver) {
        restartGame();
      } else if (!isJumpingRef.current) {
        jump();
      }
      
      if (!isPlaying) {
        setIsPlaying(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Add click handler directly to canvas
    if (canvasRef.current) {
      canvasRef.current.addEventListener('click', handleClick);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [gameOver, isPlaying]);
  
  // Game loop
  useEffect(() => {
    if (!isPlaying) return;
    
    let lastTime = 0;
    
    const gameLoop = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      
      updateGame(deltaTime);
      drawGame();
      
      if (!gameOver) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, gameOver]);
  
  // Jump function
  const jump = () => {
    if (isJumpingRef.current) return;
    
    isJumpingRef.current = true;
    jumpVelocityRef.current = -15; // Negative value for upward movement
  };
  
  // Restart game
  const restartGame = () => {
    playerRef.current.y = groundYRef.current - playerRef.current.height;
    obstaclesRef.current = [];
    isJumpingRef.current = false;
    jumpVelocityRef.current = 0;
    speedRef.current = 5;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };
  
  // Update game state
  const updateGame = (deltaTime: number) => {
    if (!isPlaying || gameOver) return;
    
    // Normalize deltaTime for consistent movement speeds
    const timeStep = deltaTime / 16.67; // 60 FPS = 16.67ms per frame
    
    // Update player position (jump physics)
    if (isJumpingRef.current) {
      playerRef.current.y += jumpVelocityRef.current * timeStep;
      jumpVelocityRef.current += 0.8 * timeStep; // Gravity
      
      // Check if landed
      if (playerRef.current.y >= groundYRef.current - playerRef.current.height) {
        playerRef.current.y = groundYRef.current - playerRef.current.height;
        isJumpingRef.current = false;
        jumpVelocityRef.current = 0;
      }
    }
    
    // Generate obstacles
    if (Math.random() < 0.01 * timeStep) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const obstacleHeight = 20 + Math.random() * 30;
      
      obstaclesRef.current.push({
        x: canvas.width,
        y: groundYRef.current - obstacleHeight,
        width: 20,
        height: obstacleHeight,
        speed: speedRef.current,
        passed: false
      });
    }
    
    // Update obstacles
    obstaclesRef.current.forEach((obstacle, index) => {
      if (obstacle.speed) {
        obstacle.x -= obstacle.speed * timeStep;
      }
      
      // Check if passed obstacle
      if (!obstacle.passed && obstacle.x + obstacle.width < playerRef.current.x) {
        obstacle.passed = true;
        setScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('runnerHighScore', newScore.toString());
          }
          return newScore;
        });
        
        // Increase speed every 5 points
        if (score > 0 && score % 5 === 0) {
          speedRef.current += 0.5;
        }
      }
      
      // Check collision with player
      if (
        playerRef.current.x < obstacle.x + obstacle.width &&
        playerRef.current.x + playerRef.current.width > obstacle.x &&
        playerRef.current.y < obstacle.y + obstacle.height &&
        playerRef.current.y + playerRef.current.height > obstacle.y
      ) {
        setGameOver(true);
      }
    });
    
    // Remove offscreen obstacles
    obstaclesRef.current = obstaclesRef.current.filter(
      obstacle => obstacle.x + obstacle.width > 0
    );
  };
  
  // Draw game
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#121212');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#29dd3b';
    ctx.fillRect(0, groundYRef.current, canvas.width, 2);
    
    // Draw player with glow effect
    ctx.save();
    ctx.shadowColor = '#29dd3b';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(
      playerRef.current.x,
      playerRef.current.y,
      playerRef.current.width,
      playerRef.current.height
    );
    ctx.restore();
    
    // Draw obstacles
    obstaclesRef.current.forEach(obstacle => {
      ctx.save();
      ctx.shadowColor = '#ff3030';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ff3030';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.restore();
    });
    
    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px "Roboto Mono"';
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${score}`, canvas.width - 20, 30);
    ctx.fillText(`High Score: ${highScore}`, canvas.width - 20, 60);
    
    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '28px "Roboto Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 15);
      ctx.font = '18px "Roboto Mono"';
      ctx.fillText('Click or Press Space to restart', canvas.width / 2, canvas.height / 2 + 25);
    }
    
    // Draw instructions if not playing
    if (!isPlaying && !gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px "Roboto Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('Press Space or Click to Play', canvas.width / 2, canvas.height - 40);
    }
  };
  
  return (
    <div className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full outline-none"
        tabIndex={0}
      />
    </div>
  );
};

export default RunnerGame;

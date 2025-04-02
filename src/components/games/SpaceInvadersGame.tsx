
import React, { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
  direction?: number;
}

interface Projectile extends GameObject {
  active: boolean;
}

const SpaceInvadersGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game state refs
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef(0);
  const playerRef = useRef<GameObject>({
    x: 0,
    y: 0,
    width: 40,
    height: 20,
    speed: 8
  });
  const enemiesRef = useRef<GameObject[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const enemyProjectilesRef = useRef<Projectile[]>([]);
  const enemyDirectionRef = useRef(1);
  const enemySpeedRef = useRef(1);
  const lastEnemyFireRef = useRef(0);
  
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
      
      // Position player at the bottom center
      playerRef.current.x = canvas.width / 2 - playerRef.current.width / 2;
      playerRef.current.y = canvas.height - 40;
      
      // Initialize enemies in a grid (5 rows, 10 columns)
      createEnemies();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Try to retrieve high score from localStorage
    const savedHighScore = localStorage.getItem('spaceInvadersHighScore');
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
  
  // Create enemies grid
  const createEnemies = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const enemies: GameObject[] = [];
    const rows = 5;
    const cols = 10;
    const enemyWidth = 30;
    const enemyHeight = 20;
    const padding = 15;
    
    const totalWidth = cols * (enemyWidth + padding) - padding;
    const startX = (canvas.width - totalWidth) / 2;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        enemies.push({
          x: startX + col * (enemyWidth + padding),
          y: 50 + row * (enemyHeight + padding),
          width: enemyWidth,
          height: enemyHeight,
          direction: enemyDirectionRef.current
        });
      }
    }
    
    enemiesRef.current = enemies;
  };
  
  // Game controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const player = playerRef.current;
      
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.x = Math.max(0, player.x - (player.speed || 0));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        player.x = Math.min(canvas.width - player.width, player.x + (player.speed || 0));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        if (gameOver) {
          restartGame();
        } else {
          if (!isPlaying) {
            setIsPlaying(true);
          } else {
            // Fire projectile if playing
            firePlayerProjectile();
          }
        }
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      
      // Update player position with mouse
      playerRef.current.x = Math.max(
        0,
        Math.min(
          canvas.width - playerRef.current.width,
          mouseX - playerRef.current.width / 2
        )
      );
    };
    
    const handleClick = () => {
      if (gameOver) {
        restartGame();
      } else {
        if (!isPlaying) {
          setIsPlaying(true);
        } else {
          // Fire projectile if playing
          firePlayerProjectile();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Add mouse handlers directly to canvas
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousemove', handleMouseMove);
      canvasRef.current.addEventListener('click', handleClick);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [gameOver, isPlaying]);
  
  // Fire player projectile
  const firePlayerProjectile = () => {
    if (projectilesRef.current.length >= 3) return; // Limit to 3 projectiles at a time
    
    const player = playerRef.current;
    
    projectilesRef.current.push({
      x: player.x + player.width / 2 - 2,
      y: player.y - 10,
      width: 4,
      height: 10,
      speed: 10,
      active: true
    });
  };
  
  // Fire enemy projectile
  const fireEnemyProjectile = () => {
    if (enemiesRef.current.length === 0) return;
    
    // Select a random enemy to fire
    const randomIndex = Math.floor(Math.random() * enemiesRef.current.length);
    const enemy = enemiesRef.current[randomIndex];
    
    enemyProjectilesRef.current.push({
      x: enemy.x + enemy.width / 2 - 2,
      y: enemy.y + enemy.height,
      width: 4,
      height: 10,
      speed: 5,
      active: true
    });
    
    lastEnemyFireRef.current = Date.now();
  };
  
  // Restart game
  const restartGame = () => {
    createEnemies();
    projectilesRef.current = [];
    enemyProjectilesRef.current = [];
    enemyDirectionRef.current = 1;
    enemySpeedRef.current = 1;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };
  
  // Game loop
  useEffect(() => {
    if (!isPlaying) return;
    
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
  
  // Update game state
  const updateGame = (deltaTime: number) => {
    if (!isPlaying || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Normalize deltaTime for consistent movement speeds
    const timeStep = deltaTime / 16.67; // 60 FPS = 16.67ms per frame
    
    // Update player projectiles
    projectilesRef.current.forEach(projectile => {
      projectile.y -= (projectile.speed || 0) * timeStep;
      
      // Remove projectiles that go off screen
      if (projectile.y + projectile.height < 0) {
        projectile.active = false;
      }
    });
    
    // Update enemy projectiles
    enemyProjectilesRef.current.forEach(projectile => {
      projectile.y += (projectile.speed || 0) * timeStep;
      
      // Remove projectiles that go off screen
      if (projectile.y > canvas.height) {
        projectile.active = false;
      }
      
      // Check collision with player
      if (
        projectile.active &&
        playerRef.current.x < projectile.x + projectile.width &&
        playerRef.current.x + playerRef.current.width > projectile.x &&
        playerRef.current.y < projectile.y + projectile.height &&
        playerRef.current.y + playerRef.current.height > projectile.y
      ) {
        setGameOver(true);
        projectile.active = false;
      }
    });
    
    // Filter out inactive projectiles
    projectilesRef.current = projectilesRef.current.filter(p => p.active);
    enemyProjectilesRef.current = enemyProjectilesRef.current.filter(p => p.active);
    
    // Update enemy movement
    let moveDown = false;
    let leftmostX = canvas.width;
    let rightmostX = 0;
    
    enemiesRef.current.forEach(enemy => {
      // Find leftmost and rightmost enemy positions
      leftmostX = Math.min(leftmostX, enemy.x);
      rightmostX = Math.max(rightmostX, enemy.x + enemy.width);
      
      // Move enemies sideways
      if (enemy.direction) {
        enemy.x += enemy.direction * enemySpeedRef.current * timeStep;
      }
    });
    
    // Check if enemies hit the edges
    if (rightmostX >= canvas.width || leftmostX <= 0) {
      moveDown = true;
      enemyDirectionRef.current *= -1;
    }
    
    // Move enemies down and reverse direction if needed
    if (moveDown) {
      enemiesRef.current.forEach(enemy => {
        enemy.y += 20;
        if (enemy.direction) enemy.direction = enemyDirectionRef.current;
      });
      
      enemySpeedRef.current += 0.2; // Increase speed each time they move down
    }
    
    // Check if enemies reached the bottom
    const lowestEnemyY = Math.max(...enemiesRef.current.map(e => e.y + e.height));
    if (lowestEnemyY >= playerRef.current.y) {
      setGameOver(true);
    }
    
    // Check for projectile-enemy collisions
    projectilesRef.current.forEach(projectile => {
      for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
        const enemy = enemiesRef.current[i];
        
        if (
          projectile.active &&
          projectile.x < enemy.x + enemy.width &&
          projectile.x + projectile.width > enemy.x &&
          projectile.y < enemy.y + enemy.height &&
          projectile.y + projectile.height > enemy.y
        ) {
          // Enemy hit
          enemiesRef.current.splice(i, 1);
          projectile.active = false;
          
          setScore(prevScore => {
            const newScore = prevScore + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('spaceInvadersHighScore', newScore.toString());
            }
            return newScore;
          });
          
          break;
        }
      }
    });
    
    // Enemy fire randomly
    if (Date.now() - lastEnemyFireRef.current > 1000 && Math.random() < 0.03) {
      fireEnemyProjectile();
    }
    
    // Check win condition
    if (enemiesRef.current.length === 0) {
      // Level cleared, create a new wave with increased speed
      createEnemies();
      enemySpeedRef.current += 0.5;
    }
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
    
    // Draw player with glow effect
    ctx.save();
    ctx.shadowColor = '#29dd3b';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#29dd3b';
    ctx.fillRect(
      playerRef.current.x,
      playerRef.current.y,
      playerRef.current.width,
      playerRef.current.height
    );
    
    // Draw player cockpit detail
    ctx.fillStyle = '#000000';
    ctx.fillRect(
      playerRef.current.x + playerRef.current.width / 2 - 3,
      playerRef.current.y,
      6,
      5
    );
    ctx.restore();
    
    // Draw enemies
    enemiesRef.current.forEach((enemy, index) => {
      // Different colors based on row
      const rowIndex = Math.floor(index / 10);
      const colors = ['#ff3030', '#ff9030', '#ffff30', '#30ff30', '#3030ff'];
      const color = colors[Math.min(rowIndex, colors.length - 1)];
      
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      ctx.fillStyle = color;
      
      // Draw enemy shape
      ctx.beginPath();
      ctx.moveTo(enemy.x, enemy.y + enemy.height);
      ctx.lineTo(enemy.x + enemy.width / 2, enemy.y);
      ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw player projectiles
    ctx.save();
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#ffffff';
    projectilesRef.current.forEach(projectile => {
      ctx.fillRect(
        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height
      );
    });
    ctx.restore();
    
    // Draw enemy projectiles
    ctx.save();
    ctx.shadowColor = '#ff3030';
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#ff3030';
    enemyProjectilesRef.current.forEach(projectile => {
      ctx.fillRect(
        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height
      );
    });
    ctx.restore();
    
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
      ctx.fillText('Click to Shoot, Move Mouse to Control', canvas.width / 2, canvas.height - 40);
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

export default SpaceInvadersGame;


import React, { useEffect, useState } from 'react';
import RunnerGame from './RunnerGame';
import BreakoutGame from './BreakoutGame';
import SpaceInvadersGame from './SpaceInvadersGame';

type GameType = 'runner' | 'breakout' | 'space-invaders';

const RandomGameSelector: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>('breakout');

  useEffect(() => {
    // Choose a random game on component mount
    const games: GameType[] = ['runner', 'breakout', 'space-invaders'];
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  }, []);

  return (
    <div className="w-full h-full">
      {selectedGame === 'runner' && <RunnerGame />}
      {selectedGame === 'breakout' && <BreakoutGame />}
      {selectedGame === 'space-invaders' && <SpaceInvadersGame />}
    </div>
  );
};

export default RandomGameSelector;

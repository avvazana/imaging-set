import { useState } from 'react';
import NameEntry from './NameEntry';
import GameRound from './GameRound';
import Scoreboard from './Scoreboard';

function App() {
  const [stage, setStage] = useState('name'); // name → playing → scoreboard
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [scores, setScores] = useState([]);

  const startGameForPlayer = (name) => {
    setCurrentPlayer(name);
    setStage('playing');
  };

  const endGameForPlayer = (score) => {
    if (!currentPlayer) return;
    setScores((prev) => [...prev, { name: currentPlayer, score }]);
    setCurrentPlayer(null);
    setStage('name');
  };
  

  const finishAllPlayers = () => {
    setStage('scoreboard');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {stage === 'name' && (
        <NameEntry onStart={startGameForPlayer} onFinish={finishAllPlayers} scores={scores} />
      )}
      {stage === 'playing' && (
        <GameRound playerName={currentPlayer} onEnd={endGameForPlayer} />
      )}
      {stage === 'scoreboard' && <Scoreboard scores={scores} />}
    </div>
  );
}

export default App;

import { useState } from 'react';
import GameRound from './GameRound';
import Scoreboard from './Scoreboard';
import NameEntry from './NameEntry';
import NameEntryInline from './NameEntryInline';

function App() {
  const [stage, setStage] = useState('name');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [scores, setScores] = useState([]);

  const startGameForPlayer = (name) => {
    setCurrentPlayer(name);
    setStage('playing');
  };

  const resetGame = () => {
    setScores([]);
    setCurrentPlayer(null);
    setStage('name'); // make sure this matches your splash screen entry point
  };
  

  const endGameForPlayer = (score, action) => {
    if (!currentPlayer) return;
    setScores((prev) => [...prev, { name: currentPlayer, score }]);
    setCurrentPlayer(null);

    if (action === 'next') {
      setStage('name-inline');
    } else if (action === 'end') {
      setStage('scoreboard');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {stage === 'name' && (
        <NameEntry onStart={startGameForPlayer} onFinish={() => setStage('scoreboard')} scores={scores} />
      )}
      {stage === 'name-inline' && (
        <NameEntryInline onStart={startGameForPlayer} mode="next" />
      )}
      {stage === 'playing' && (
        <GameRound playerName={currentPlayer} onEnd={endGameForPlayer} />
      )}
      {stage === 'scoreboard' && (
  <Scoreboard scores={scores} onRestart={resetGame} />
)}

    </div>
  );
}

export default App;

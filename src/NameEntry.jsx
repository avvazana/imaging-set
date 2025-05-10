import { useState } from 'react';

function NameEntry({ onStart, onFinish, scores }) {
  const [name, setName] = useState('');

  return (
    <div>
      <h2>Enter your name to play:</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '1rem' }}
      />
      <button onClick={() => name && onStart(name)}>Start Round</button>

      {scores.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={onFinish}>Finish Game & See Scoreboard</button>
        </div>
      )}
    </div>
  );
}

export default NameEntry;

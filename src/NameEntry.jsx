import { useState } from 'react';

function NameEntry({ onStart, onFinish, scores }) {
  const [name, setName] = useState('');

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '2.2rem',
        marginBottom: '1rem',
        color: '#5a3e85'
      }}>
        🧠 Imaging Set
      </h1>
  
      <p style={{
        fontSize: '1rem',
        marginBottom: '2rem',
        color: '#444',
        maxWidth: '400px',
        margin: '0 auto 2rem',
        lineHeight: '1.6'
      }}>
        A fast-paced pattern-matching challenge. Enter your name, match as many imaging sets as you can in 10 seconds, and see how you stack up on the scoreboard.
      </p>
  
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>Enter your name to play:</h2>
  
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Taylor"
        style={{
          padding: '0.6rem 1rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '2px solid #ccc',
          fontFamily: '"JetBrains Mono", monospace',
          marginBottom: '1rem',
          width: '240px',
          maxWidth: '90%'
        }}
      />
  
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => name && onStart(name)}
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            fontFamily: '"JetBrains Mono", monospace',
            backgroundColor: '#5a3e85',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Start Round
        </button>
      </div>
  
      {scores.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={onFinish}
            style={{
              backgroundColor: '#999',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.2rem',
              fontSize: '0.9rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Finish Game & See Scoreboard
          </button>
        </div>
      )}
    </div>
  );  
}

export default NameEntry;

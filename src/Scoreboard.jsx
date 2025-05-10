function Scoreboard({ scores, onRestart }) {
    const sorted = [...scores].sort((a, b) => b.score - a.score);
  
    return (
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#5a3e85' }}>🏁 Scoreboard</h2>
  
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {sorted.map((entry, idx) => (
            <div
              key={idx}
              style={{
                background: '#f9f7f3',
                padding: '1rem 2rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                fontFamily: '"JetBrains Mono", monospace',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{entry.name}</span>
              <span>
                {entry.score} {entry.score === 1 ? 'set' : 'sets'}
              </span>
            </div>
          ))}
        </div>
  
        <button
          onClick={onRestart}
          style={{
            marginTop: '3rem',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '6px',
            backgroundColor: '#5a3e85',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          🔁 New Game
        </button>
      </div>
    );
  }
  
  export default Scoreboard;
  
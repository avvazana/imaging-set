function Scoreboard({ scores }) {
    const sorted = [...scores].sort((a, b) => b.score - a.score);
  
    return (
      <div>
        <h2>🏆 Final Scoreboard</h2>
        <ul>
          {sorted.map((entry, idx) => (
            <li key={idx} style={{ marginBottom: '0.5rem' }}>
              {idx + 1}. <strong>{entry.name}</strong>: {entry.score} sets
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Scoreboard;
  
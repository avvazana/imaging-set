import { useState } from 'react';

function NameEntryInline({ onStart, mode }) {
  const [name, setName] = useState('');

  const heading = mode === 'initial' ? 'Enter your name to begin:' : 'Next player, enter your name:';

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 style={{ fontSize: '1.4rem', color: '#444', marginBottom: '1rem' }}>{heading}</h2>

      <input
        type="text"
        value={name}
        placeholder="e.g. Alex"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && name) onStart(name);
        }}
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

      <div>
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
    </div>
  );
}

export default NameEntryInline;

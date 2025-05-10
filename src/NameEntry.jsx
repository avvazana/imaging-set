import { useState } from 'react';

function NameEntry({ onStart, onFinish, scores }) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', position: 'relative' }}>
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
        A fast-paced pattern-matching challenge. Match as many imaging sets as you can in 10 seconds. Compete with friends and track your scores!
      </p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: '#eee',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontFamily: '"JetBrains Mono", monospace',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        📖 How to Play
      </button>

      <h2 style={{ marginBottom: '1rem', color: '#333' }}>Enter your name to play:</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && name) onStart(name);
        }}
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

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            textAlign: 'left',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontFamily: '"JetBrains Mono", monospace',
            transform: 'scale(0.95)',
            animation: 'popIn 0.2s ease-out forwards'
          }}>
            <h2 style={{ marginTop: 0, color: '#5a3e85' }}>📖 How to Play</h2>

            <p><strong>🧠 Your Goal:</strong> Identify the one card that completes a matching set with the two shown.</p>
            <p><strong>🧩 What Makes a Set?</strong> Each card has 4 features. For all 3 cards in a set, each feature must be either all the same or all different.</p>
            <p><strong>⏱️ You Have 10 Seconds:</strong> Match as many sets as possible before the timer runs out. Compete with friends and try to top the scoreboard!</p>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: '#5a3e85',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default NameEntry;

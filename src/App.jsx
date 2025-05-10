import { useState, useEffect } from 'react';
import { fullDeck } from './utils/cards';
import { generateRound } from './utils/roundLogic';
import './index.css';

function App() {
  const [round, setRound] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'

  useEffect(() => {
    setRound(generateRound(fullDeck));
  }, []);

  const handleSelect = (card) => {
    const isCorrect = card.id === round.correctCard.id;
    setSelectedId(card.id);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setSelectedId(null);
      setFeedback(null);
      setRound(generateRound(fullDeck));
    }, 1000);
  };

  if (!round) return <div style={{ padding: '2rem' }}>Loading...</div>;

  const cardStyle = {
    borderRadius: '12px',
    border: '2px solid #d8cfc1',
    backgroundColor: '#ffffff',
    color: '#222',
    padding: '1rem',
    width: '240px',
    fontFamily: '"JetBrains Mono", monospace',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, background-color 0.3s ease, border-color 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Imaging Set</h1>
      <h2 style={{ fontSize: '1rem', fontWeight: 400, color: '#555' }}>
        Find the third card that completes the Set
      </h2>

      {/* Anchor Cards */}
      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '16px',
        padding: '1.5rem',
        backgroundColor: '#fffefc',
        margin: '2rem 0',
        display: 'flex',
        gap: '1rem'
      }}>
        {[round.cardA, round.cardB].map((card) => (
          <div key={card.id} style={cardStyle}>
            <span>{card.sequence}</span><br />
            {card.orientation}<br />
            {card.location}<br />
            {card.size}
          </div>
        ))}
      </div>

      {/* Option Cards */}
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem 2rem',
    maxWidth: '660px',
    margin: '0 auto',
    justifyContent: 'center',
  }}
>
        {round.options.map((card) => {
          const isSelected = card.id === selectedId;
          let backgroundColor = '#ffffff';
          let borderColor = '#d8cfc1';

          if (isSelected && feedback === 'correct') {
            backgroundColor = '#dcfce7'; // soft green
            borderColor = '#4ade80';
          } else if (isSelected && feedback === 'incorrect') {
            backgroundColor = '#fee2e2'; // soft red
            borderColor = '#f87171';
          }

          return (
            <div
              key={card.id}
              onClick={() => handleSelect(card)}
              style={{
                ...cardStyle,
                backgroundColor,
                borderColor,
                pointerEvents: selectedId ? 'none' : 'auto',
              }}
              onMouseEnter={(e) => {
                if (!selectedId) e.currentTarget.style.backgroundColor = '#eae2ff';
              }}
              onMouseLeave={(e) => {
                if (!selectedId) e.currentTarget.style.backgroundColor = backgroundColor;
              }}
            >
              <span>{card.sequence}</span><br />
              {card.orientation}<br />
              {card.location}<br />
              {card.size}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{
          marginTop: '1rem',
          fontSize: '1.1rem',
          color: feedback === 'correct' ? '#15803d' : '#b91c1c',
        }}>
          {feedback === 'correct'
            ? 'Nice! That’s a valid set.'
            : 'Nope — try again next round.'}
        </div>
      )}
    </div>
  );
}

export default App;

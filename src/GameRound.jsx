import { useEffect, useState, useRef } from 'react';
import { fullDeck } from './utils/cards';
import { generateRound } from './utils/roundLogic';

function GameRound({ playerName, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [round, setRound] = useState(generateRound(fullDeck));
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const hasEndedRef = useRef(false);

  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [roundEnded, setRoundEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1 && !hasEndedRef.current) {
          clearInterval(timer);
          hasEndedRef.current = true;
          setRoundEnded(true);
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      hasEndedRef.current = false;
    };
  }, []);

  const handleSelect = (card) => {
    const isCorrect = card.id === round.correctCard.id;
    setSelectedId(card.id);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 1;
        scoreRef.current = newScore;
        return newScore;
      });
    }

    setTimeout(() => {
      setRound(generateRound(fullDeck));
      setSelectedId(null);
      setFeedback(null);
    }, 500);
  };

  const cardStyle = {
    borderRadius: '12px',
    border: '2px solid #d8cfc1',
    backgroundColor: '#ffffff',
    color: '#222',
    padding: '1rem',
    width: '220px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '0.95rem',
    lineHeight: '1.4',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, background-color 0.3s ease, border-color 0.3s ease',
    cursor: 'pointer',
  };

  const anchorCardStyle = {
    ...cardStyle,
    opacity: 0.7,
    border: '2px dashed #aaa',
    backgroundColor: '#f2f2f2',
    cursor: 'default',
  };

  const renderCard = (card, isSelectable = true, styleOverride = cardStyle) => {
    const isSelected = card.id === selectedId;
    let backgroundColor = styleOverride.backgroundColor;
    let borderColor = styleOverride.borderColor || '#d8cfc1';

    if (isSelected && feedback === 'correct') {
      backgroundColor = '#dcfce7';
      borderColor = '#4ade80';
    } else if (isSelected && feedback === 'incorrect') {
      backgroundColor = '#fee2e2';
      borderColor = '#f87171';
    }

    return (
      <div
        key={card.id}
        onClick={isSelectable && !selectedId ? () => handleSelect(card) : undefined}
        style={{
          ...styleOverride,
          backgroundColor,
          borderColor,
          pointerEvents: isSelectable && !selectedId && !roundEnded ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => {
          if (isSelectable && !selectedId && !roundEnded) e.currentTarget.style.backgroundColor = '#eae2ff';
        }}
        onMouseLeave={(e) => {
          if (isSelectable && !selectedId && !roundEnded) e.currentTarget.style.backgroundColor = backgroundColor;
        }}
      >
        {card.sequence}<br />
        {card.orientation}<br />
        {card.location}<br />
        {card.size}
      </div>
    );
  };

  return (
    <div>
      <h2>Player: {playerName}</h2>
      {!roundEnded && <p>Time left: {timeLeft}s | Score: {score}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {renderCard(round.cardA, false, anchorCardStyle)}
        {renderCard(round.cardB, false, anchorCardStyle)}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto',
          justifyContent: 'center',
        }}
      >
        {round.options.map((card) => renderCard(card, true))}
      </div>

      {roundEnded && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Score: {score}</h3>
          <button
            onClick={() => onEnd(score, 'next')}
            style={{
              marginRight: '1rem',
              padding: '0.6rem 1.2rem',
              fontSize: '1rem',
              borderRadius: '6px',
              backgroundColor: '#5a3e85',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Next Player
          </button>
          <button
            onClick={() => onEnd(score, 'end')}
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '1rem',
              borderRadius: '6px',
              backgroundColor: '#999',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            End Game
          </button>
        </div>
      )}
    </div>
  );
}

export default GameRound;

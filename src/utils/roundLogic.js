import { isValidSet } from './validateSet';

function getRandomTwo(deck) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

function findValidThird(deck, cardA, cardB) {
  return deck.find((card) => {
    const ids = new Set([card.id, cardA.id, cardB.id]);
    return ids.size === 3 && isValidSet(cardA, cardB, card);
  });
}

function getDistractors(deck, cardA, cardB, correctCard, count = 5) {
  const candidates = deck.filter((card) => {
    const ids = new Set([card.id, cardA.id, cardB.id]);
    return (
      ids.size === 3 &&
      !isValidSet(cardA, cardB, card) &&
      card.id !== correctCard.id
    );
  });

  return [...candidates].sort(() => Math.random() - 0.5).slice(0, count);
}

export function generateRound(deck) {
  const [cardA, cardB] = getRandomTwo(deck);
  const correctCard = findValidThird(deck, cardA, cardB);

  if (!correctCard) return generateRound(deck); // Retry if failed

  const distractors = getDistractors(deck, cardA, cardB, correctCard);
  const options = [...distractors, correctCard].sort(() => Math.random() - 0.5);

  return { cardA, cardB, options, correctCard };
}

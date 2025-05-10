export const SEQUENCES = ['T1', 'FLAIR', 'CT'];
export const ORIENTATIONS = ['Axial', 'Sagittal', 'Coronal'];
export const LOCATIONS = ['Cerebral hemisphere', 'Brainstem', 'Cerebellum'];
export const SIZES = ['Ditzel', 'Gadoot', 'Goomba'];

export const fullDeck = (() => {
  const deck = [];

  for (const sequence of SEQUENCES) {
    for (const orientation of ORIENTATIONS) {
      for (const location of LOCATIONS) {
        for (const size of SIZES) {
          deck.push({
            id: `${sequence}-${orientation}-${location}-${size}`,
            sequence,
            orientation,
            location,
            size,
          });
        }
      }
    }
  }

  return deck;
})();

export function isValidSet(cardA, cardB, cardC) {
    const features = ['sequence', 'orientation', 'location', 'size'];
  
    for (const feature of features) {
      const values = [cardA[feature], cardB[feature], cardC[feature]];
      const unique = new Set(values);
  
      if (unique.size === 2) {
        return false; // Two same, one different → invalid
      }
    }
  
    return true;
  }
  
export const shuffle = <T>(arr: T[]): T[] => {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
};

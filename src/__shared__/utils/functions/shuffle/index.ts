/**
 * @public
 */
export const shuffle = <T>(array: T[]): T[] => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }
  return arrayCopy;
};

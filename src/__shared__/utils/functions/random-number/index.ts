/**
 * @public
 */
export const randomNumber = <T>(array: [T, ...T[]]): number =>
  Math.floor(Math.random() * array.length);

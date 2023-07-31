import { shuffle } from "./index";

describe("shuffle", () => {
  test("引数が与えられたとき、配列の長さが等しいべき", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled.length).toStrictEqual(array.length);
  });

  test("引数が与えられたとき、同じ要素を持つ配列を返すべき", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    const sortedOriginal = [...array].sort();
    const sortedShuffled = [...shuffled].sort();
    expect(sortedShuffled).toStrictEqual(sortedOriginal);
  });

  test("引数が与えられたとき、元の配列を変更しないべき", () => {
    const array = [1, 2, 3, 4, 5];
    const copy = [...array];
    shuffle(array);
    expect(array).toStrictEqual(copy);
  });
});

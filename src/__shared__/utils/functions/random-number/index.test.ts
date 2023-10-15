import { randomNumber } from "./index";

describe("randomNumber関数のテスト", () => {
  const array: [number, ...number[]] = [1, 2, 3, 4, 5];

  test("返される数値は0以上かつ配列の長さ未満であるべき", () => {
    const result = randomNumber(array);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(array.length);
  });

  test("返される数値が整数であるべき", () => {
    const result = randomNumber(array);
    expect(Number.isInteger(result)).toBeTruthy();
  });
});

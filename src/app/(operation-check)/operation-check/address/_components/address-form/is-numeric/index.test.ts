import { isNumeric } from "./index";

describe("isNumeric", () => {
  test("文字列型の数字を受け取ったとき、trueを返すべき", () => {
    expect(isNumeric("1")).toBe(true);
  });
  test("文字列型以外の数字を受け取ったとき、falseを返すべき", () => {
    expect(isNumeric("a")).toBe(false);
  });
})

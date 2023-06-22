import { Prefecture } from "./prefecture";

describe("Prefecture", (): void => {
  describe("constructor()", () => {
    test("オブジェクトを生成したとき、オブジェクトが生成されるべき", () => {
      const prefecture = "東京都";
      const actual = new Prefecture({ value: prefecture });
      expect(actual).toStrictEqual(expect.any(Prefecture));
    });
  });

  describe("getter()", () => {
    it("指定した値をgetしたとき指定した値を取得できるべき", () => {
      const prefecture = "東京都";
      const actual = new Prefecture({ value: prefecture });
      expect(actual.value).toStrictEqual(prefecture);
    });
  });
});

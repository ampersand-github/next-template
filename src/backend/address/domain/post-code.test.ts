import { PostalCode } from "./post-code";

describe("PostalCode", (): void => {
  describe("constructor()", () => {
    test("郵便番号が7桁のとき、オブジェクトが生成されるべき", () => {
      const correctPostalCode = "1000001";
      const actual = new PostalCode({ value: correctPostalCode });
      expect(actual).toStrictEqual(expect.any(PostalCode));
    });
    test("郵便番号が7桁でないのとき、エラーを返すべき", () => {
      const badPostalCode = "100000";
      expect(badPostalCode.length).not.toStrictEqual(7);
      const actual = () => new PostalCode({ value: badPostalCode });
      const expected = "郵便番号桁数が7桁ではありません。7桁で入力してください";
      expect(actual).toThrowError(expected);
    });
  });

  describe("getter()", () => {
    it("指定した値をgetしたとき指定した値を取得できるべき", () => {
      const correctPostalCode = "1000001";
      const actual = new PostalCode({ value: correctPostalCode });
      expect(actual.value).toStrictEqual(correctPostalCode);
    });
  });
});

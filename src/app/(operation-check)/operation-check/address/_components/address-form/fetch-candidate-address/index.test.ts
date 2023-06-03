import { fetchCandidateAddress } from "./index";

describe("fetchCandidateAddress", () => {
  test("郵便番号を受け取ったとき、住所を返すべき", async () => {
    const actual = await fetchCandidateAddress("100-0001");
    const expected = [
      { prefecture: "東京都", city: "千代田区", town: "千代田" },
    ];
    expect(actual).toStrictEqual(expected);
  });
});

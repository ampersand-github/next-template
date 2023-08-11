import { DataItem } from "./index";
import { mergePopulationData } from "./merge-population-data";

describe("mergePopulationData", () => {
  it("引数を与えたとき、形式を変えて出力されるべき", () => {
    const input: DataItem[][] = [
      [
        { year: 2000, Tokyo: 1000 },
        { year: 2001, Tokyo: 1100 },
      ],
      [
        { year: 2000, Osaka: 500 },
        { year: 2001, Osaka: 600 },
      ],
    ];
    const expectedOutput: DataItem[] = [
      { year: 2000, Tokyo: 1000, Osaka: 500 },
      { year: 2001, Tokyo: 1100, Osaka: 600 },
    ];
    const result = mergePopulationData(input);
    expect(result).toStrictEqual(expectedOutput);
  });

  it("空配列を渡されたとき、空配列をかえすべき", () => {
    const input: DataItem[][] = [];
    const expectedOutput: DataItem[] = [];
    const result = mergePopulationData(input);
    expect(result).toStrictEqual(expectedOutput);
  });
});

import { IPopulation, PopulationLabel } from "../..";
import { convertTotalPopulationData } from "./convert-total-population-data";

describe("convertTotalPopulationData", () => {
  // [jestでテスト実行時console.errorで止まらないようにする | Simple is Beautiful.](https://blog.kozakana.net/2021/02/dont-stop-with-console-error-when-running-tests-in-jest/)
  jest
    .spyOn(console, "error")
    .mockImplementation((message) => console.log(message));

  const mockInput: IPopulation[] = [
    {
      prefCode: 1,
      prefName: "Tokyo",
      result: {
        boundaryYear: 2021,
        data: [
          {
            label: "総人口",
            data: [
              { year: 2020, value: 20000 },
              { year: 2021, value: 21000 },
            ],
          },
        ],
      },
    },
    {
      prefCode: 2,
      prefName: "Osaka",
      result: {
        boundaryYear: 2021,
        data: [
          {
            label: "総人口",
            data: [
              { year: 2020, value: 15000 },
              { year: 2021, value: 15500 },
            ],
          },
        ],
      },
    },
  ];

  const expectedOutput = [
    [
      { year: 2020, Tokyo: 2 },
      { year: 2021, Tokyo: 2.1 },
    ],
    [
      { year: 2020, Osaka: 1.5 },
      { year: 2021, Osaka: 1.55 },
    ],
  ];

  it("指定した引数を渡したとき、指定したデータが生成されるべき", () => {
    const actual = convertTotalPopulationData(mockInput, "総人口");
    expect(actual).toStrictEqual(expectedOutput);
  });

  it("指定した引数を渡したとき、ラベルが存在しない場合、エラーを返すべき", () => {
    const actual = () =>
      convertTotalPopulationData(mockInput, "fail" as PopulationLabel);
    expect(actual).toThrowError("failデータが見つかりませんでした");
  });
});

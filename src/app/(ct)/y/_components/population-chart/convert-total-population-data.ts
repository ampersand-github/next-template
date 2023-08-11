import { IPopulation, PopulationLabel } from "../..";
import { DataItem } from "./index";

export const convertTotalPopulationData = (
  populationList: IPopulation[],
  label: PopulationLabel
): DataItem[][] => {
  return populationList.map((population: IPopulation) => {
    const prefName = population.prefName;
    const totalPopulationData = population.result.data.find(
      (data) => data.label === label
    )?.data;

    if (!totalPopulationData) {
      // cloudLoggingで分析しやすくするために、console.errorでエラーを出力する
      console.error("totalPopulationData", totalPopulationData);
      throw new Error(`${label}データが見つかりませんでした`);
    }

    return totalPopulationData.map((data) => {
      return {
        year: data.year,
        [prefName]: data.value / 10000,
      };
    });
  });
};

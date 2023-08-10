"use client";
import { useAtomValue } from "jotai";
import { IPopulation, populationAtom, populationLabelAtom } from "../..";
import { convertTotalPopulationData } from "./convert-total-population-data";
import { PopulationChartPresenter } from "./index.presenter";
import { mergePopulationData } from "./merge-population-data";

export type DataItem = { year: number; [key: string]: number };

export const PopulationChart = () => {
  const values: IPopulation[] = useAtomValue(populationAtom);
  const label = useAtomValue(populationLabelAtom);

  const totalPopulationData = convertTotalPopulationData(values, label);
  const chartData = mergePopulationData(totalPopulationData);

  return <PopulationChartPresenter data={chartData} />;
};

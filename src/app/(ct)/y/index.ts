"use client";
import { atom } from "jotai";

export type PopulationLabel =
  | "総人口"
  | "年少人口"
  | "生産年齢人口"
  | "老年人口";

export interface IPopulation {
  prefCode: number;
  prefName: string;
  result: {
    boundaryYear: number;
    data: [
      {
        label: PopulationLabel;
        data: Array<{ year: number; value: number }>;
      }
    ];
  };
}

export const populationLabelAtom = atom<PopulationLabel>("総人口");
export const populationAtom = atom<IPopulation[]>([]);

export { PopulationChart } from "./_components/population-chart";
export { PopulationLabelRadioGroup } from "./_components/population-label-radio-group";
export { PrefecturesCheckBox } from "./_components/prefectures-checkbox";

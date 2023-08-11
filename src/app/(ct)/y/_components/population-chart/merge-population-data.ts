import { DataItem } from "./index";

type Year = string;
type YearlyPopulationDataMap = Map<Year, DataItem>;

const mergeYearlyData = (
  map: YearlyPopulationDataMap,
  data: DataItem
): YearlyPopulationDataMap => {
  const year: Year = String(data.year);
  const existingData: DataItem | {} = map.get(year) || {};
  const mergedData = { ...existingData, ...data };

  // 重複排除
  map.set(year, mergedData as DataItem);

  return map;
};

const mergeGroupIntoMap = (
  map: YearlyPopulationDataMap,
  group: DataItem[]
): YearlyPopulationDataMap => {
  return group.reduce(mergeYearlyData, map);
};

export const mergePopulationData = (
  populationDataGroups: DataItem[][]
): DataItem[] => {
  if (!populationDataGroups) return [];

  const yearlyPopulationDataMap: YearlyPopulationDataMap =
    populationDataGroups.reduce(mergeGroupIntoMap, new Map());

  // 配列にして返却
  return Array.from(yearlyPopulationDataMap.values());
};

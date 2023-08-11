"use client";
import { url } from "@/__shared__/utils/url";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSetAtom } from "jotai";
import { IPopulation, populationAtom } from "../../";
import { PrefecturesCheckboxPresenter } from "./index.presenter";

type Props = {
  prefCode: number;
  prefName: string;
  apiKey: string;
};

export const PrefecturesCheckBox = ({ prefCode, prefName, apiKey }: Props) => {
  const setAtom = useSetAtom(populationAtom);
  const RESAS_URL = `${url.RESAS_BASE_URL}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`;

  const handleChange = async (checked: CheckedState) => {
    const result = await fetch(RESAS_URL, { headers: { "X-API-KEY": apiKey } });
    const json = await result.json();

    // チェックされた都道府県データをatomに格納する
    // チェックが外された場合は、atomから削除する
    setAtom((prev: IPopulation[]) => {
      return checked
        ? prev.concat({ prefCode, prefName, result: json.result })
        : prev.filter(
            (item: IPopulation): boolean => item.prefCode !== prefCode
          );
    });
  };

  return (
    <PrefecturesCheckboxPresenter
      prefCode={prefCode}
      prefName={prefName}
      handleChange={handleChange}
    />
  );
};

"use client";

import { useSetAtom } from "jotai";
import { populationLabelAtom } from "../..";
import { PopulationLabelRadioGroupPresenter } from "./index.presenter";

export const PopulationLabelRadioGroup = () => {
  const setLabel = useSetAtom(populationLabelAtom);
  return <PopulationLabelRadioGroupPresenter handleClick={setLabel} />;
};

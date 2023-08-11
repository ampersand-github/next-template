import type { Meta, StoryObj } from "@storybook/react";
import { PopulationLabel } from "../..";
import { PopulationLabelRadioGroupPresenter } from "./index.presenter";

const meta: Meta<typeof PopulationLabelRadioGroupPresenter> = {
  title: "components/root/PopulationLabelRadioGroupPresenter",
  component: PopulationLabelRadioGroupPresenter,
};

export default meta;
type Story = StoryObj<typeof PopulationLabelRadioGroupPresenter>;
export const Default: Story = {
  args: {
    handleClick: (label: PopulationLabel) => {
      console.log("label", label);
    },
  },
};

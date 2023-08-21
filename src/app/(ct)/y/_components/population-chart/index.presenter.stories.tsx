import type { Meta, StoryObj } from "@storybook/react";
import { PopulationChartPresenter } from "./index.presenter";

const meta: Meta<typeof PopulationChartPresenter> = {
  title: "components/y/LineChartPresenter",
  component: PopulationChartPresenter,
};

export default meta;
type Story = StoryObj<typeof PopulationChartPresenter>;
export const Default: Story = {
  args: {
    data: [
      { year: 1960, value: 100 },
      { year: 1961, value: 200 },
      { year: 1962, value: 300 },
    ],
  },
};
export const ZeroData: Story = {
  args: {
    data: [],
  },
};

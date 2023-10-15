import type { Meta, StoryObj } from "@storybook/react";
import { PrefecturesCheckboxPresenter } from "./index.presenter";

const meta: Meta<typeof PrefecturesCheckboxPresenter> = {
  title: "components/y/PrefecturesCheckboxPresenter",
  component: PrefecturesCheckboxPresenter,
};

export default meta;
type Story = StoryObj<typeof PrefecturesCheckboxPresenter>;
export const Default: Story = {
  args: {
    prefCode: 1,
    prefName: "北海道",
    handleChange: () => {},
  },
};

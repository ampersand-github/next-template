import type { Meta, StoryObj } from "@storybook/react";
import { Presenter } from "./index.presenter";

const meta: Meta<typeof Presenter> = {
  title: "components/step1/Presenter",
  component: Presenter,
};

export default meta;
type Story = StoryObj<typeof Presenter>;
export const Default: Story = {
  args: {},
};

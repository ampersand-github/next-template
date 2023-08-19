import type { Meta, StoryObj } from "@storybook/react";
import { StepSix } from "./index";

const meta: Meta<typeof StepSix> = {
  title: "components/s/StepSix",
  component: StepSix,
};

export default meta;
type Story = StoryObj<typeof StepSix>;
export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";
import { StepFive } from "./index";

const meta: Meta<typeof StepFive> = {
  title: "components/s/StepFive",
  component: StepFive,
};

export default meta;
type Story = StoryObj<typeof StepFive>;
export const Default: Story = {
  args: {},
};

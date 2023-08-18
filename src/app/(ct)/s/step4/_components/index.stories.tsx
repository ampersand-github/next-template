import type { Meta, StoryObj } from "@storybook/react";
import { StepFour } from "./index";

const meta: Meta<typeof StepFour> = {
  title: "components/s/StepFour",
  component: StepFour,
};

export default meta;
type Story = StoryObj<typeof StepFour>;
export const Default: Story = {
  args: {},
};

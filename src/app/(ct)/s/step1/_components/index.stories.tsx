import type { Meta, StoryObj } from "@storybook/react";
import { StepOne } from "./index";

const meta: Meta<typeof StepOne> = {
  title: "components/s/StepOne",
  component: StepOne,
};

export default meta;
type Story = StoryObj<typeof StepOne>;
export const Default: Story = {
  args: {},
};

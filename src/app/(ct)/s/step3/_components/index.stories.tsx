import type { Meta, StoryObj } from "@storybook/react";
import { StepThree } from "./index";

const meta: Meta<typeof StepThree> = {
  title: "components/s/StepThree",
  component: StepThree,
};

export default meta;
type Story = StoryObj<typeof StepThree>;
export const Default: Story = {
  args: {},
};

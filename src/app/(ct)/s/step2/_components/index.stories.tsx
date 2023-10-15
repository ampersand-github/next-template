import type { Meta, StoryObj } from "@storybook/react";
import { StepTwo } from "./index";

const meta: Meta<typeof StepTwo> = {
  title: "components/s/StepTwo",
  component: StepTwo,
};

export default meta;
type Story = StoryObj<typeof StepTwo>;
export const Default: Story = {
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import { HeaderPresenter } from "./index.presenter";

const meta: Meta<typeof HeaderPresenter> = {
  title: "components/app/HeaderPresenter",
  component: HeaderPresenter,
};

export default meta;
type Story = StoryObj<typeof HeaderPresenter>;

export const Default: Story = {};

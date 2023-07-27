import { Meta, StoryObj } from "@storybook/react";
import { FooterPresenter } from "./index.presenter";

const meta: Meta<typeof FooterPresenter> = {
  title: "components/app/FooterPresenter",
  component: FooterPresenter,
};

export default meta;
type Story = StoryObj<typeof FooterPresenter>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { CardPresenter } from "./index.presenter";

const meta: Meta<typeof CardPresenter> = {
  title: "components/matching/CardPresenter",
  component: CardPresenter,
};

export default meta;
type Story = StoryObj<typeof CardPresenter>;
export const Default: Story = {};

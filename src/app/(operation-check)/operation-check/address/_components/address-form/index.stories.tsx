import type { Meta, StoryObj } from "@storybook/react";
import { AddressSelectDialog } from "./address-select-dialog";

const meta: Meta<typeof AddressSelectDialog> = {
  title: "components/operation-check/address/AddressSelectDialog",
  component: AddressSelectDialog,
};

export default meta;
type Story = StoryObj<typeof AddressSelectDialog>;

export const Default: Story = {};

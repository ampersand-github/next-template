import type { Meta, StoryObj } from "@storybook/react";
import { AddressForm } from "./address-form";

const meta: Meta<typeof AddressForm> = {
  title: "components/operation-check/address/AddressForm",
  component: AddressForm,
};

export default meta;
type Story = StoryObj<typeof AddressForm>;

export const Default: Story = {};

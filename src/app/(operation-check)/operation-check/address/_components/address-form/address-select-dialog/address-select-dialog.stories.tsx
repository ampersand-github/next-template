import type { Meta, StoryObj } from "@storybook/react";
import { useAtom } from "jotai";
import { selectedAddressAtom } from "../address-form";
import { AddressSelectDialog } from "./address-select-dialog";

const meta: Meta<typeof AddressSelectDialog> = {
  title: "components/operation-check/address/AddressSelectDialog",
  component: AddressSelectDialog,
  decorators: [
    (Story) => {
      const [selected] = useAtom(selectedAddressAtom);
      return (
        <>
          <Story />
          <p>{selected}</p>
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AddressSelectDialog>;

export const Default: Story = {
  args: {
    items: ["a", "b", "c"],
  },
};

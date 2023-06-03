import type { Meta, StoryObj } from "@storybook/react";
import { useAtom } from "jotai";
import { selectedAddressAtom } from "../index";
import { initialAddress } from "../initial-address";
import { AddressSelectDialog } from "./index";

const meta: Meta<typeof AddressSelectDialog> = {
  title: "components/operation-check/address/AddressSelectDialog",
  component: AddressSelectDialog,
  decorators: [
    (Story) => {
      const [selected] = useAtom(selectedAddressAtom);
      return (
        <>
          <Story />
          <p>{JSON.stringify(selected)}</p>
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AddressSelectDialog>;

export const Default: Story = {
  args: {
    items: [initialAddress, initialAddress],
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { useAtom } from "jotai";
import { isAddressSelectDialogOpenAtom } from "../index";
import { AddressSelectDialog } from "./index";

const meta: Meta<typeof AddressSelectDialog> = {
  title: "components/operation-check/address/AddressSelectDialog",
  component: AddressSelectDialog,
  decorators: [
    (Story) => {
      const [_, setIsOpen] = useAtom(isAddressSelectDialogOpenAtom);
      setIsOpen(true);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AddressSelectDialog>;

export const Default: Story = {
  args: {
    items: [
      {
        postCode: "1234567",
        prefecture: "東京都",
        city: "東京市",
        town: "TOKYO町",
        block: "1-2-3",
      },
      {
        postCode: "9876543",
        prefecture: "埼玉県",
        city: "さいたま市",
        town: "埼玉町",
        block: "",
      },
    ],
  },
};

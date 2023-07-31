import type { Meta, StoryObj } from "@storybook/react";
import { SectionInfo } from "./index.presenter";

const meta: Meta<typeof SectionInfo> = {
  title: "components/matching/SectionInfo",
  component: SectionInfo,
};

export default meta;
type Story = StoryObj<typeof SectionInfo>;
export const Default: Story = {
  args: {
    title: "ご利用料金",
    text: `迎車料金：740円\n迎車料金：740円\n`,
  },
};
export const LongText: Story = {
  args: {
    title: "ご利用料金",
    text: `利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ`,
  },
};

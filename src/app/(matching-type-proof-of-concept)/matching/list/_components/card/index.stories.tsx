import type { Meta, StoryObj } from "@storybook/react";
import { CardPresenter } from "./index.presenter";

const meta: Meta<typeof CardPresenter> = {
  title: "components/matching/CardPresenter",
  component: CardPresenter,
};

export default meta;
type Story = StoryObj<typeof CardPresenter>;
export const Default: Story = {
  args: {
    imageSrc: "https://picsum.photos/1600/900",
    companyName: "株式会社サンプル",
    salesArea: ["東京都", "神奈川県", "埼玉県"],
    description:
      "東京都を中心に活動する介護タクシー会社です。10年以上のベテランが複数人在籍しており、安心してご利用いただけます。ご利用のときは、お気軽にお問い合わせください。各種割引もご用意しております。",
    awards: ["賞1", "賞2", "賞3"],
  },
};

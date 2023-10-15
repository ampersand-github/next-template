import type { Meta, StoryObj } from "@storybook/react";
import { DetailPresenter } from "./index.presenter";

const meta: Meta<typeof DetailPresenter> = {
  title: "components/matching/IndexPresenter",
  component: DetailPresenter,
};

export default meta;
type Story = StoryObj<typeof DetailPresenter>;
export const Default: Story = {
  args: {
    imageSrc: " https://placehold.jp/160x90.png",
    priceInfo: `迎車料金：740円\n迎車料金：740円\n`,
    companyInfo: `代表者名：田中太郎\n会社住所：東京都 千代田区 1-1-1\n営業時間：8:00～18:00（時間外応相談)`,
    updateDate: "2023年07月31日",
    companyName: "タクシーラブラ",
    salesAreaInfo: "東京都 | 埼玉県 | 神奈川県",
    inquiryInfo: "電話アイコン、最大4つほど",
    aboutCompany:
      "東京都を中心に活動する介護タクシー会社です。10年以上のベテランが複数人在籍しており、安心してご利用いただけます。ご利用のときは、お気軽にお問い合わせください。各種割引もご用意しております。",
    qualificationInfo:
      "介護タクシーの資格を取得しているドライバーが対応します。",
    fixturesInfo: "車いす、ベビーカー、ストレッチャー、オキシジェンボンベ",
    message:
      "利用者の方へのメッセージ,利用者の方へのメッセージ,利用者の方へのメッセージ",
  },
};

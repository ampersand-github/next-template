import Image from "next/image";
import { SectionInfo } from "./index";

type Props = {
  imageSrc: string;
  priceInfo: string;
  companyInfo: string;
  updateDate: string;
  companyName: string;
  salesAreaInfo: string;
  inquiryInfo: string; // todo いらないというか、電話番号など必要
  aboutCompany: string;
  qualificationInfo: string;
  fixturesInfo: string;
  message: string;
};

export const DetailPresenter = ({
  imageSrc,
  priceInfo,
  companyInfo,
  updateDate,
  companyName,
  salesAreaInfo,
  inquiryInfo,
  aboutCompany,
  qualificationInfo,
  fixturesInfo,
  message,
}: Props) => {
  const RightSection = () => {
    return (
      <div className={"flex flex-col space-y-4"}>
        <div className={"space-y-4 rounded-xl bg-gray-50 p-4 md:p-8"}>
          {/* 会社名 */}
          <div className={"space-y-2 pb-4"}>
            <p className={"text-xs text-muted-foreground"}>
              更新日：{updateDate}
            </p>
            <p className={"text-4xl font-black"}>{companyName}</p>
          </div>

          {/* 活動地域 */}
          <SectionInfo title={"活動地域"} text={salesAreaInfo} />
          {/* お問い合わせ */}
          <SectionInfo title={"お問い合わせ"} text={inquiryInfo} />
          {/* 当社について */}
          <SectionInfo title={"当社について"} text={aboutCompany} />
          {/* 所有資格 */}
          <SectionInfo title={"所有資格"} text={qualificationInfo} />
          {/* 備品 */}
          <SectionInfo title={"備品"} text={fixturesInfo} />
          {/* 利用者の方へのメッセージ */}
          <SectionInfo title={"利用者の方へのメッセージ"} text={message} />
        </div>
      </div>
    );
  };

  return (
    <div className={"grid grid-cols-1 space-x-4 md:grid-cols-2"}>
      {/* 左 */}
      <div className={""}>
        <Image
          className={" mb-4 rounded-xl"}
          src={imageSrc}
          alt={"thumbnail"}
          width={1600}
          height={900}
        ></Image>

        <div className={"md:hidden"}>
          <div className={"mb-4 space-y-2 rounded-xl bg-gray-50 p-4 md:p-8"}>
            <RightSection />
          </div>
        </div>

        <div className={"mb-4 space-y-2 rounded-xl bg-gray-50 p-4 md:p-8"}>
          <SectionInfo title={"ご利用料金"} text={priceInfo} />
        </div>

        <div className={"mb-4 space-y-2 rounded-xl bg-gray-50 p-4 md:p-8"}>
          <SectionInfo title={"運営会社"} text={companyInfo} />
        </div>
      </div>

      {/* 右 */}
      <div className={"hidden md:inline-block"}>
        <RightSection />
      </div>
    </div>
  );
};

import Loading from "@/app/(matching-type-proof-of-concept)/loading";
import { Suspense } from "react";
import { DetailPresenter } from "./_components";

export default async function Page() {
  const imageSrc =
    "https://images.unsplash.com/photo-1690184432588-81068877d852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80";
  const companyName = "タクシーラブラ";

  const prefNames = ["東京都", "埼玉県", "神奈川県"];

  const awards = [
    "中型第二種免許",
    "介護福祉士",
    "患者等搬送乗務員適任者",
    "介護支援専門員",
    "介護職員初任者研修",
  ];

  const description =
    "東京都を中心に活動する介護タクシー会社です。10年以上のベテランが複数人在籍しており、安心してご利用いただけます。ご利用のときは、お気軽にお問い合わせください。各種割引もご用意しております。";

  // 住所
  // 営業時間8:00～18:00（時間外応相談）
  // お問い合わせ、電話、メール、ラインほか
  // 備品
  // 資格
  // 料金
  // 利用者の方へのメッセージ

  return (
    <div className={"flex flex-col items-center"}>
      <div className={"max-w-screen-xl space-y-4"}>
        <Suspense fallback={<Loading />}>
          <DetailPresenter
            imageSrc={imageSrc}
            priceInfo={`迎車料金：740円\n迎車料金：740円\n`}
            companyInfo={`代表者名：田中太郎\n会社住所：東京都 千代田区 1-1-1\n営業時間：8:00～18:00（時間外応相談)`}
            updateDate={"2023年07月31日"}
            companyName={companyName}
            salesAreaInfo={prefNames.join(" | ")}
            inquiryInfo={"電話アイコン、最大4つほど"}
            aboutCompany={description}
            qualificationInfo={awards.join("、 ")}
            fixturesInfo={"備品1, 2, 3, 4"}
            message={
              "利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ利用者の方へのメッセージ"
            }
          />
        </Suspense>
      </div>
    </div>
  );
}

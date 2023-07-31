import { randomNumber } from "@/__shared__/utils/functions/random-number";
import { shuffle } from "@/__shared__/utils/functions/shuffle";
import Loading from "@/app/(matching-type-proof-of-concept)/loading";
import { Suspense } from "react";
import { CardPresenter } from "./_components";

export default async function Page() {
  const imageSrc =
    "https://images.unsplash.com/photo-1690184432588-81068877d852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80";
  const companyNameList: [string, ...string[]] = [
    "タクシーラブラ",
    "介護タクシー会社名",
    "石垣地域密着介護会社",
    "介護タクシーベスト",
    "にこにこタクシー",
  ];
  const prefNames: [string, ...string[]] = [
    "東京都",
    "埼玉県",
    "神奈川県",
    "千葉県",
    "茨城県",
    "栃木県",
    "群馬県",
  ];

  const awards: [string, ...string[]] = [
    "中型第二種免許",
    "介護福祉士",
    "患者等搬送乗務員適任者",
    "介護支援専門員",
    "介護職員初任者研修",
    "介護職員実務者研修2",
  ];

  const description =
    "東京都を中心に活動する介護タクシー会社です。10年以上のベテランが複数人在籍しており、安心してご利用いただけます。ご利用のときは、お気軽にお問い合わせください。各種割引もご用意しております。";

  return (
    <div className={" flex flex-col items-center"}>
      <div className={"max-w-screen-xl space-y-8"}>
        <h1 className="text-2xl font-bold">介護タクシーの一覧</h1>
        <Suspense fallback={<Loading />}>
          <div className={"flex items-center"}>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(50)].map((_, i) => (
                <CardPresenter
                  key={i}
                  imageSrc={imageSrc}
                  companyName={companyNameList[randomNumber(companyNameList)]}
                  description={description}
                  salesArea={shuffle(prefNames).slice(
                    1,
                    randomNumber(prefNames)
                  )}
                  awards={shuffle(awards).slice(0, randomNumber(awards))}
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

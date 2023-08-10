import { url } from "@/__shared__/utils/url";
import Loading from "@/app/(cording-test)/yumemi/loading";
import { env } from "@/env.mjs";
import { Suspense } from "react";
import {
  PopulationChart,
  PopulationLabelRadioGroup,
  PrefecturesCheckBox,
} from "./index";

// todo 別のファイルに移動する
// todo 型を付ける
const fetchPrefectures = async (apiKey: string, url: string) => {
  const result = await fetch(url, { headers: { "X-API-KEY": apiKey } });
  const json = await result.json();
  return json.result;
};

export default async function Home() {
  const apiKey = env.NEXT_RESAS_API_KEY;
  const prefecturesUrl = url.RESAS_BASE_URL + "/prefectures";

  const prefectures = await fetchPrefectures(apiKey, prefecturesUrl);

  return (
    <main className="flex min-h-screen flex-col space-y-12">
      <Suspense fallback={<Loading />}>
        <div className={"flex flex-wrap justify-center"}>
          {prefectures.map(
            (item: { prefCode: number; prefName: string }, index: number) => (
              <>
                <PrefecturesCheckBox
                  key={index}
                  prefCode={item.prefCode}
                  prefName={item.prefName}
                  apiKey={apiKey}
                />
              </>
            )
          )}
        </div>
      </Suspense>
      <PopulationLabelRadioGroup />
      <Suspense fallback={<Loading />}>
        <PopulationChart />
      </Suspense>
    </main>
  );
}

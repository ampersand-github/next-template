import {
  PopulationChart,
  PopulationLabelRadioGroup,
  PrefecturesCheckBox,
} from "@/app/(ct)/y";
import Loading from "@/app/(ct)/y/loading";
import { Suspense } from "react";

type Props = {
  prefectures: { prefCode: number; prefName: string }[];
  apiKey: string;
};

export const Container = ({ prefectures, apiKey }: Props) => {
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
};

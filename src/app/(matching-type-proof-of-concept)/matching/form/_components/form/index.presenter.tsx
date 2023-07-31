import { Button } from "@/__shared__/components/ui/button";
import { Form } from "@/__shared__/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { ImageInputFormField } from "./image-input-form-field";
import { FormValues, schema } from "./index";
import { InputFormFieldPresenter } from "./input-form-fild";
import { PrefectureCheckboxFieldPresenter } from "./prefecture-checkbox-field";
import { TagInputFormFieldPresenter } from "./tag-input-form-field";
import { TextAreaFormFiledPresenter } from "./textarea-form-fild";

type Props = {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: z.infer<typeof schema>) => void;
};

export const MatchingFormPresenter = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImageInputFormField
          isRequired={true}
          control={form.control}
          name="thumbnail"
          label="写真"
          description="会社の顔になる写真をアップロードしてください"
        />

        <InputFormFieldPresenter
          isRequired={true}
          control={form.control}
          name={"companyName"}
          label={"会社名"}
          placeholder={"株式会社介護タクシー"}
          description={"会社名を入力してください"}
        />

        <InputFormFieldPresenter
          isRequired={true}
          control={form.control}
          name={"presidentName"}
          label={"代表者名"}
          placeholder={"田中 大吾"}
          description={"代表者名を入力してください"}
        />

        <InputFormFieldPresenter
          isRequired={true}
          control={form.control}
          name={"companyAddress"}
          label={"会社住所"}
          placeholder={"東京都千代田区1-1-1"}
          description={"会社の住所を入力してください"}
        />

        <TextAreaFormFiledPresenter
          isRequired={true}
          control={form.control}
          name={"bizHours"}
          label={"営業時間"}
          placeholder={`■ 月〜金：9:00 〜 18:00\n■ 定休日：土日祝日\n※営業時間外は応相談`}
          description={"営業時間を入力してください"}
        />

        <InputFormFieldPresenter
          isRequired={false}
          control={form.control}
          name={"companyURL"}
          label={"会社URL"}
          placeholder={"東京都千代田区1-1-1"}
          description={"会社URLを入力してください"}
        ></InputFormFieldPresenter>
        <InputFormFieldPresenter
          isRequired={false}
          control={form.control}
          name={"contactEmail"}
          label={"メールアドレス"}
          placeholder={"sample@gmail.com"}
          description={"お問い合わせ用のメールアドレスを入力してください"}
        />

        <InputFormFieldPresenter
          isRequired={false}
          control={form.control}
          name={"contactTel"}
          label={"電話番号"}
          placeholder={"09012345678"}
          description={
            "お問い合わせ用の電話番号を入力してください\n※ハイフンなしで入力してください\n※数字で入力してください"
          }
        />

        <TextAreaFormFiledPresenter
          isRequired={true}
          control={form.control}
          name={"fees"}
          label={"料金"}
          placeholder={`■ 運賃\n乗運賃（3kmまで) 800円\n5Kmまで 1500円\n10Kmまで 3000円\n■ レンタル\nストレッチャー 1000円\n車イス 500円\n `}
          description={"料金を入力してください"}
        />

        <PrefectureCheckboxFieldPresenter
          isRequired={true}
          control={form.control}
          name={"activityPrefecture"}
          label={"活動している都道府県"}
          description={`活動地域を選択してください`}
        />

        <TextAreaFormFiledPresenter
          isRequired={true}
          control={form.control}
          name={"activityArea"}
          label={"活動地域"}
          placeholder={`東京23区と埼玉県を中心に活動しています`}
          description={`活動地域の補足をしてください`}
        />

        <TagInputFormFieldPresenter
          isRequired={false}
          control={form.control}
          name={"qualification"}
          label={"資格"}
          placeholder={
            "普通自動車二種免許、介護職員初任者研修、レクリエーション介護士2級"
          }
          description={`利用者から見て魅力的な資格を左から順に書いてください\n資格を「、」を区切りにして入力してください`}
        />

        <TagInputFormFieldPresenter
          isRequired={false}
          control={form.control}
          name={"equipment"}
          label={"備品"}
          placeholder={"ストレッチャー、車イス、松葉杖"}
          description={`利用者から見て魅力的な備品を左から順に書いてください\n備品を「、」を区切りにして入力してください`}
        />
        <TextAreaFormFiledPresenter
          isRequired={false}
          control={form.control}
          name={"messageToUsers"}
          label={"利用者の方へのメッセージ"}
          placeholder={`気配りや思いやりを大事にして活動してまいます\nご利用者の皆様の生活を丁寧にサポートします`} // todo あとでてきとうに料金を書く
          description={`会社の特徴を書いてください\n 例えば、活動地域、当社の強み、など`}
        />

        <Button type="submit" className={"w-full"}>
          登録する
        </Button>
      </form>
    </Form>
  );
};

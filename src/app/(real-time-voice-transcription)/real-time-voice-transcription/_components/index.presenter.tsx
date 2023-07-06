import { Button } from "@/__shared__/components/ui/button";
import { Textarea } from "@/__shared__/components/ui/textarea";

type Props = {
  resultText: string;
  status: string;
  vrFunction: () => void;
};
export const SpeechRecognitionPresenter = ({
  resultText,
  status,
  vrFunction,
}: Props) => {
  return (
    <div>
      <h2
        className={
          "scroll-m-20  pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0"
        }
      >
        今の音声
      </h2>
      <Textarea
        id="result_text"
        cols={100}
        rows={2}
        value={resultText}
        readOnly
      />
      <p>ステータス:{status}</p>
      <br />
      <Button type="button" onClick={vrFunction}>
        録音する
      </Button>
      <div className={"h-8"}></div>
      <div className={"pt-4"}>
        <h2
          className={
            "scroll-m-20  pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0"
          }
        >
          録音結果
        </h2>
        <p>{localStorage.getItem("transcript") || ""}</p>
      </div>
    </div>
  );
};

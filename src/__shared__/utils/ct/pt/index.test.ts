import { AtLeast1 } from "@/__shared__/utils/ct/pt/interface";
import { arrayDiffChatGPT } from "@/__shared__/utils/ct/pt/prtimes.chatgpt";
import { arrayDiffMadeByMe } from "@/__shared__/utils/ct/pt/prtimes.madebyme";
import { arrayDiffOriginal } from "@/__shared__/utils/ct/pt/prtimes.original";

describe("PR-TIMESコーディングテスト", () => {
  const olds: AtLeast1<string> = ["a", "b", "c", "a", "b", "c", "a", "b", "c"];
  const news: AtLeast1<string> = ["a", "c", "d", "a", "c", "d", "a", "c", "d"];

  test("オリジナル", () => {
    const actual = arrayDiffOriginal(olds, news);
    const expected = { deleted: ["b"], created: ["d"] };
    expect(actual).toStrictEqual(expected);
    // 0.18342499993741512
    // 0.15402700006961823
    // 0.16864199936389923
    // 0.16888399980962276
    // 0.14997699856758118
  });

  test("自作", () => {
    const actual = arrayDiffMadeByMe(olds, news);
    const expected = { deleted: ["b"], created: ["d"] };
    expect(actual).toStrictEqual(expected);
    // 0.04211300052702427
    // 0.035319000482559204
    // 0.0429650004953146
    // 0.0390859991312027
    // 0.0400760006159544
  });

  test("ChatGPT", () => {
    const actual = arrayDiffChatGPT(olds, news);
    const expected = { deleted: ["b"], created: ["d"] };
    expect(actual).toStrictEqual(expected);
    // 0.01891399919986725
    // 0.018910998478531837
    // 0.01755400002002716
    // 0.013846000656485558
    // 0.016628999263048172
  });
});

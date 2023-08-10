import { AtLeast1 } from "@/__shared__/utils/cording-test/prtimes/interface";

/*
 * 配列oldと配列newを比較する
 * 配列oldにあって配列newにないものをdeletedに
 * 配列newにあって配列oldにないものをcreatedに格納して返す
 */

export const arrayDiffMadeByMe = <T>(
  olds: AtLeast1<T>,
  news: AtLeast1<T>
): {
  deleted: T[];
  created: T[];
} => {
  const startTime = performance.now(); // 開始時間

  const setOlds: Set<T> = new Set(olds);
  const setNews: Set<T> = new Set(news);

  const deleted: T[] = Array.from(setOlds).filter((x: T) => !setNews.has(x));
  const created: T[] = Array.from(setNews).filter((x: T) => !setOlds.has(x));

  const endTime = performance.now(); // 終了時間
  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

  return {
    deleted,
    created,
  };
};

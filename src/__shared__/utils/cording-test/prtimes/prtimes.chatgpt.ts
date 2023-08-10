import { AtLeast1 } from "@/__shared__/utils/cording-test/prtimes/interface";

export const arrayDiffChatGPT = <T>(
  olds: AtLeast1<T>,
  news: AtLeast1<T>
): {
  deleted: T[];
  created: T[];
} => {
  const startTime = performance.now(); // 開始時間

  const oldSet = new Set(olds);
  const newSet = new Set(news);

  const deleted: T[] = [];
  const created: T[] = [];

  // deletedの計算
  for (const item of oldSet) {
    if (!newSet.has(item)) {
      deleted.push(item);
    }
  }

  // createdの計算
  for (const item of newSet) {
    if (!oldSet.has(item)) {
      created.push(item);
    }
  }

  const endTime = performance.now(); // 終了時間
  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

  return {
    deleted,
    created,
  };
};

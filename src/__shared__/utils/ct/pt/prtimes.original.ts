export function arrayDiffOriginal(olds: any[], news: any[]) {
  // const startTime = performance.now(); // 開始時間

  let deleted = [];
  let created = [];

  for (let i = 0; i < olds.length; i++) {
    let isDeleted = true;
    for (let j = 0; j < news.length; j++) {
      if (olds[i] == news[j]) {
        isDeleted = false;
      }
    }
    if (isDeleted) {
      deleted.push(olds[i]);
    }
  }

  for (let i = 0; i < news.length; i++) {
    let isCreated = true;
    for (let j = 0; j < olds.length; j++) {
      if (news[i] == olds[j]) {
        isCreated = false;
      }
    }
    if (isCreated) {
      created.push(news[i]);
    }
  }

  // const endTime = performance.now(); // 終了時間
  // console.log(endTime - startTime); // 何ミリ秒かかったかを表示する

  return {
    deleted: Array.from(new Set(deleted)), // deletedから修正
    created: Array.from(new Set(created)), // createdから修正
  };
}

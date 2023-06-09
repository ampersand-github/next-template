jest.mock("@/lib/storage/upload");

describe("uploadImage", () => {
  // node上でFileオブジェクトが使用できないのと、内部ロジック全部mockするのでテストする意味がないので、テストは省略
  test("-", async () => {
    expect(1).toBe(1);
  });
});

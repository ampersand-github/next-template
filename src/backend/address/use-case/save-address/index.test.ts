import { SaveAddress } from "./index";

describe("SaveAddress", () => {
  const prisma = jestPrisma.client;
  const useCase = new SaveAddress(prisma);
  const requestType = {
    postalCode: "1234567",
    prefecture: "東京都",
    city: "渋谷区",
    town: "渋谷",
    block: "1-1-1",
    userId: "1",
  };

  test("ユーザーが存在するとき、住所が保存できるべき", async () => {
    await prisma.user.create({ data: { id: requestType.userId } });
    const actual = await useCase.execute(requestType);
    expect(requestType.postalCode).toStrictEqual(actual.postalCode);
    expect(requestType.prefecture).toStrictEqual(actual.prefecture);
    expect(requestType.city).toStrictEqual(actual.city);
    expect(requestType.town).toStrictEqual(actual.town);
    expect(requestType.block).toStrictEqual(actual.block);
  });
});

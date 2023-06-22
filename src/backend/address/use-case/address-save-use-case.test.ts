import { AddressSaveUseCase } from "./address-save-use-case";

describe("AddressSaveUseCase", () => {
  const prisma = jestPrisma.client;
  const useCase = new AddressSaveUseCase(prisma);
  const requestType = {
    address: {
      postalCode: "1234567",
      prefecture: "東京都",
      city: "渋谷区",
      town: "渋谷",
      block: "1-1-1",
    },
    userId: "1",
  };

  test("ユーザーが存在するとき、住所が保存できるべき", async () => {
    await prisma.user.create({ data: { id: requestType.userId } });
    const result = await useCase.execute(requestType);
    if (result.isSuccess()) {
      const _value = result.value;
      expect(_value.postalCode).toStrictEqual(requestType.address.postalCode);
      expect(_value.prefecture).toStrictEqual(requestType.address.prefecture);
      expect(_value.city).toStrictEqual(requestType.address.city);
      expect(_value.town).toStrictEqual(requestType.address.town);
      expect(_value.block).toStrictEqual(requestType.address.block);
    }
  });
});

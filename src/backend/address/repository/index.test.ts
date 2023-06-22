import { makeFakeAddress } from "@/backend/address";
import { UserId } from "@/backend/user";
import { AddressRepository } from "./index";

describe("AddressRepository", () => {
  const prisma = jestPrisma.client;
  const r = new AddressRepository();
  const fakeAddress = makeFakeAddress({ block: "fakeBlock" });
  const createUser = async (id: UserId) => {
    await prisma.user.create({ data: { id: id.toString() } });
  };

  describe("isExist", () => {
    test("データが存在するときはtrueを返すべき", async () => {
      await createUser(fakeAddress.id);
      await r.save(prisma, fakeAddress);
      const actual = await r.isExist(prisma, fakeAddress.id);
      expect(actual).toStrictEqual(true);
    });
    test("データが存在しないときはfalseを返すべき", async () => {
      const actual = await r.isExist(prisma, fakeAddress.id);
      expect(actual).toStrictEqual(false);
    });
  });

  describe("findOne", () => {
    test("データが存在するときはaddressを返すべき", async () => {
      await createUser(fakeAddress.id);
      await r.save(prisma, fakeAddress);
      const actual = await r.findOne(prisma, fakeAddress.id);
      expect(actual).toStrictEqual(fakeAddress);
    });
    test("データが存在しないときはundefinedを返すべき", async () => {
      const actual = await r.findOne(prisma, fakeAddress.id);
      expect(actual).toStrictEqual(undefined);
    });
  });

  describe("save", () => {
    test("新規にデータが保存できたとき、addressを返すべき", async () => {
      await createUser(fakeAddress.id);
      const actual = await r.save(prisma, fakeAddress);
      expect(actual).toStrictEqual(fakeAddress);
    });
    test("データを更新したとき、更新したaddressを返すべき", async () => {
      await createUser(fakeAddress.id);
      await r.save(prisma, fakeAddress);
      const updatedAddress = makeFakeAddress({
        userId: fakeAddress.id,
        block: "updatedBlock",
      });
      const updatedActual = await r.save(prisma, updatedAddress);
      expect(updatedActual).toStrictEqual(updatedAddress);
    });
  });
});

import { defaultAddress, makeFakeAddress } from "@/backend/address";
import { UserId } from "@/backend/user";
import { Address } from "../../domain";

describe("makeFakeAddress", () => {
  it("引数を指定せずにオブジェクトを生成したとき、デフォルト値がでオブジェクトが生成されるべき", () => {
    const actual: Address = makeFakeAddress({});
    expect(actual).toStrictEqual(expect.any(Address));
    expect(actual.id).toStrictEqual(expect.any(UserId));
    expect(actual.postalCode).toStrictEqual(defaultAddress.postalCode);
    expect(actual.prefecture).toStrictEqual(defaultAddress.prefecture);
    expect(actual.city).toStrictEqual(defaultAddress.city);
    expect(actual.town).toStrictEqual(defaultAddress.town);
    expect(actual.town).toStrictEqual(defaultAddress.town);
  });
  it("引数を指定してにオブジェクトを生成したとき、その値でオブジェクトが生成されるべき", () => {
    const userId = UserId.reBuild("4303AA73-D6F5-4198-9A00-2E94D8EDF422");
    const postalCode = "3309301";
    const prefecture = "埼玉県";
    const city = "さいたま市浦和区";
    const town = "高砂３丁目１５−１";
    const block = "一階";
    const actual = makeFakeAddress({
      userId,
      postalCode,
      prefecture,
      city,
      town,
      block,
    });
    expect(actual).toStrictEqual(expect.any(Address));
    expect(actual.id).toStrictEqual(expect.any(UserId));
    expect(actual.id).toStrictEqual(userId);
    expect(actual.postalCode).not.toStrictEqual(defaultAddress.postalCode);
    expect(actual.prefecture).not.toStrictEqual(defaultAddress.prefecture);
    expect(actual.city).not.toStrictEqual(defaultAddress.city);
    expect(actual.city).toStrictEqual(city);
    expect(actual.town).not.toStrictEqual(defaultAddress.town);
    expect(actual.town).toStrictEqual(town);
    expect(actual.block).not.toStrictEqual(defaultAddress.block);
    expect(actual.block).toStrictEqual(block);
  });
});

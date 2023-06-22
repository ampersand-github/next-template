import { convertToAddressDomain } from "@/backend/address";
import { Address } from "@/backend/address/domain";
import { UserId } from "@/backend/user";
import { Address as PrismaAddress } from "@prisma/client";

describe("convertToAddressDomain()", (): void => {
  test("引数を指定したとき、指定した引数の値のドメインオブジェクトが生成されるべき", () => {
    const props: PrismaAddress = {
      post_code: "1000001",
      prefecture: "東京都",
      city: "千代田区",
      town: "千代田市",
      block: null,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: "userId",
    };

    const actual = convertToAddressDomain(props);

    expect(actual).toStrictEqual(expect.any(Address));
    expect(actual.id).toStrictEqual(UserId.reBuild(props.user_id));
    expect(actual.postalCode).toStrictEqual(props.post_code);
    expect(actual.prefecture).toStrictEqual(props.prefecture);
    expect(actual.city).toStrictEqual(props.city);
    expect(actual.town).toStrictEqual(props.town);
    expect(actual.block).toStrictEqual(props.block || "");
  });
});

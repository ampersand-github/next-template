import { defaultAddress } from "@/backend/address";
import { UserId } from "@/backend/user";
import { Address, IAddress } from "./index";

describe("Address", () => {
  const props: IAddress = defaultAddress;

  describe("constructor()", () => {
    test("IDを指定してオブジェクトを生成したとき、指定したIDのオブジェクトが生成されるべき", () => {
      const id = "1234567-0000-1234-1111-123456789012";
      const userId = UserId.reBuild(id);
      const actual = Address.reBuild(props, userId);
      expect(actual).toStrictEqual(expect.any(Address));
      expect(actual.id.toString()).toStrictEqual(id);
    });
  });

  describe("getter()", () => {
    it("指定した値をgetしたとき指定した値を取得できるべき", () => {
      const id = "1234567-0000-1234-1111-123456789012";
      const userId = UserId.reBuild(id);
      const actual = Address.reBuild(props, userId);
      expect(actual.id).toStrictEqual(userId);
      expect(actual.postalCode).toStrictEqual(props.postalCode);
      expect(actual.prefecture).toStrictEqual(props.prefecture);
      expect(actual.city).toStrictEqual(props.city);
      expect(actual.town).toStrictEqual(props.town);
      expect(actual.block).toStrictEqual(props.block);
    });
  });
});

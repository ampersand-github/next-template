import { IUser, User } from "./index";
import { UserId } from "./user-id";

describe("User", () => {
  const props: IUser = {};

  describe("create()", () => {
    test("オブジェクトを生成したとき、オブジェクトが生成される", () => {
      const actual: User = User.create(props);
      expect(actual).toStrictEqual(expect.any(User));
    });
  });

  describe("reBuild()", () => {
    test("IDを指定してオブジェクトを生成したとき、指定したIDのオブジェクトが生成される", () => {
      const id = "1234567-0000-1234-1111-123456789012";
      const userId = UserId.reBuild(id);
      const actual: User = User.reBuild(props, userId);
      expect(actual).toStrictEqual(expect.any(User));
      expect(actual.id.equals(userId)).toStrictEqual(true);
    });
  });
});

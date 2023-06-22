import { UserId } from "@/backend/user";

describe("UserId", () => {
  describe("constructor()", () => {
    test("オブジェクトを生成したとき、オブジェクトが生成されるべき", () => {
      const userId = UserId.create();
      expect(userId).toStrictEqual(expect.any(UserId));
    });
    test("IDを指定してオブジェクトを生成したとき、指定したIDのオブジェクトが生成されるべき", () => {
      const userId = UserId.reBuild("test-id");
      expect(userId).toStrictEqual(expect.any(UserId));
      expect(userId.toString()).toStrictEqual("test-id");
    });
  });
});

import { Failure, Result, Success } from "@/lib/result/result";

describe("Result型", () => {
  const doSomething = (x: boolean): Result<string, Error> => {
    return x ? new Success("success") : new Failure(new Error("error"));
  };

  describe("Success型", () => {
    const result: Result<string, Error> = doSomething(true);
    test("正常系ならSuccess型が返るべき", () => {
      expect(result).toBeInstanceOf(Success);
    });
    test("正常系なら値が取得できるべき", () => {
      expect(result.value).toStrictEqual("success");
    });
    test("正常系ならisSuccessがtrueになるべき", () => {
      expect(result.isSuccess()).toBe(true);
    });
    test("正常系ならisFailureがfalseになるべき", () => {
      expect(result.isFailure()).toBe(false);
    });
  });

  describe("Failure型", () => {
    const result: Result<string, Error> = doSomething(false);
    test("正常系ならFailure型が返るべき", () => {
      expect(result).toBeInstanceOf(Failure);
    });
    test("正常系ならエラー型が取得できるべき", () => {
      expect(result.value).toStrictEqual(new Error("error"));
    });
    test("正常系ならisSuccessがfalseになるべき", () => {
      expect(result.isSuccess()).toBe(false);
    });
    test("正常系ならisFailureがtrueになるべき", () => {
      expect(result.isFailure()).toBe(true);
    });
  });
});

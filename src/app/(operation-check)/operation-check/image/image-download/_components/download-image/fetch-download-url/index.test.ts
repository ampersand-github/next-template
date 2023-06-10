import { fetchDownloadUrl } from "./index";

global.fetch = jest.fn();

// Mocking the env variable
jest.mock("@/env.mjs", () => ({
  env: { NEXT_PUBLIC_ORIGIN: "http://localhost" },
}));

describe("fetchDownloadUrl", () => {
  afterEach(() => jest.clearAllMocks());

  it("ロジックが正しいとき、URLが取得できるべき", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ url: "http://example.com/image.jpg" }),
      })
    );

    const actual = await fetchDownloadUrl();

    expect(actual.isSuccess()).toBe(true);
    expect(actual.value).toBe("http://example.com/image.jpg");
  });

  it("レスポンスが!okのとき、Failureを返すべき", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    const actual = await fetchDownloadUrl();

    expect(actual.isFailure()).toBe(true);
    expect(actual.value).toStrictEqual(new Error("画像の取得に失敗しました"));
  });

  it("パースに失敗したとき、Failureを返すべき", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ xxx: "http://example.com/image.jpg" }),
      })
    );

    const actual = await fetchDownloadUrl();

    expect(actual.isFailure()).toBe(true);
    expect(actual.value).toStrictEqual(new Error("値がありません"));
  });
});

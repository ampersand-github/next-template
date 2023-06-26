import { db } from "@/lib/db";

describe("jest-prisma-check", () => {
  test("userテーブルが存在するとき、trueを返すべき", async () => {
    const count = await db.user.count();
    expect(count >= 0).toBe(true);
  });
});

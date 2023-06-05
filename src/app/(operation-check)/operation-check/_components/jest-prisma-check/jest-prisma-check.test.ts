import { db } from "@/lib/db/db";

describe("jest-prisma-check", () => {
  test("userテーブルが存在するとき、trueを返すべき", async () => {
    await db.user.create({
      data: {
        id: "2",
      },
    });
    const one = await db.user.findUnique({
      where: {
        id: "2",
      }
    })
    console.log(one)
    const count = await db.user.count();
    expect(count >= 0).toBe(true);
  });
});

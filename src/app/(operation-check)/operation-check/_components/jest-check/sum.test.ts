import { sum } from "@/app/(operation-check)/operation-check/_components/jest-check/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("error", () => {
  expect(sum(1, 2)).toBe(4);
});

import { test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/under-write/spir/step1");
  await page.screenshot({ path: "tests/snapshots/screenshot1.png" });
  const product = page.getByRole("combobox", { name: "商品" });
  await product.click();
  await page.screenshot({ path: "tests/snapshots/screenshot2.png" });
  await page.keyboard.down("ArrowDown");
  await page.screenshot({ path: "tests/snapshots/screenshot3.png" });
  await page.keyboard.press("Enter");
  await page.screenshot({ path: "tests/snapshots/screenshot4.png" });
});

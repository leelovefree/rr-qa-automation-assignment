import { expect, test } from "@playwright/test";
import { DiscoverPage } from "../src/pages/discover.page";

test("refresh page on direct URL", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await page.goto("/popular");
  await page.reload();

  await expect(discoverPage.resultGrid).toBeVisible();
  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("check pagination near the end of the list", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();

  await page.getByRole("button", { name: "Page 55709" }).click();

  await expect(discoverPage.resultGrid).toBeVisible();
  await expect(discoverPage.resultCards.first()).toBeVisible();
});


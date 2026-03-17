import { expect, test } from "@playwright/test";
import { DiscoverPage } from "../src/pages/discover.page";

test("default page load", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();

  await expect(page).toHaveURL(/\/popular$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test.only("categories navigation", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();

  await discoverPage.selectCategory("Trend");
  await expect(page).toHaveURL(/\/trend$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();

  await discoverPage.selectCategory("Top rated");
  await expect(page).toHaveURL(/\/top$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();

  await discoverPage.selectCategory("Popular");
  await expect(page).toHaveURL(/\/popular$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();
});

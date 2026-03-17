import { expect, test } from "@playwright/test";
import { DiscoverPage } from "../src/pages/discover.page";

test("default page load", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();

  await expect(page).toHaveURL(/\/popular$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();
});


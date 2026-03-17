import { expect, test } from "@playwright/test";
import { DiscoverPage } from "../src/pages/discover.page";

test("default page load", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();

  await expect(page).toHaveURL(/\/popular$/);
  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("categories navigation", async ({ page }) => {
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

test("search by title", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.searchByTitle("Avatar");

  const titles = await discoverPage.getResultTitles();

  await expect(discoverPage.resultCards.first()).toBeVisible();
  expect(titles.join(" ")).toContain("Avatar");
});

test("filter by type", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.selectType("TV Shows");

  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("filter by year", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.selectYearRange("2024", "2025");

  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("filter by rating", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.setMinimumRating(3);

  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("filter by genre", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.selectGenre("Action");

  await expect(discoverPage.resultCards.first()).toBeVisible();
});

test("apply multiple filters together", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await discoverPage.goto();
  await discoverPage.selectType("Movie");
  await discoverPage.selectGenre("Action");
  await discoverPage.selectYearRange("2024", "2025");
  await discoverPage.setMinimumRating(3);

  await expect(discoverPage.resultCards.first()).toBeVisible();
});

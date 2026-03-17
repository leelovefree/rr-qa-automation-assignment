import { expect, test } from "@playwright/test";
import { DiscoverPage } from "../src/pages/discover.page";

test("default page load", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Verify default results are displayed", async () => {
    await expect(page).toHaveURL(/\/popular$/);
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });
});

test("categories navigation", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Switch to Trend category", async () => {
    await discoverPage.selectCategory("Trend");
    await expect(page).toHaveURL(/\/trend$/);
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });

  await test.step("Switch to Top rated category", async () => {
    await discoverPage.selectCategory("Top rated");
    await expect(page).toHaveURL(/\/top$/);
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });

  await test.step("Switch back to Popular category", async () => {
    await discoverPage.selectCategory("Popular");
    await expect(page).toHaveURL(/\/popular$/);
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });
});

test("search by title", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);
  let responseData: { results?: Array<{ title?: string; name?: string }> } = {};
  let responseUrl = "";

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Search for Avatar", async () => {
    const responsePromise = page.waitForResponse((response) => {
      return response.url().includes("search") && response.status() === 200;
    });

    await discoverPage.searchByTitle("Avatar");

    const response = await responsePromise;
    responseUrl = response.url();
    responseData = await response.json();
  });

  await test.step("Verify search API response", async () => {
    expect(responseUrl).toContain("Avatar");
    expect(responseData.results).toBeDefined();
    expect(responseData.results?.length).toBeGreaterThan(0);
  });

  await test.step("Verify search results match the keyword", async () => {
    const cards = await discoverPage.getResultCardsData();

    await expect(discoverPage.resultCards.first()).toBeVisible();
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      expect(card.title).toContain("Avatar");
    }
  });
});

test("filter by type", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);
  let responseUrl = "";

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Change type to TV Shows", async () => {
    const responsePromise = page.waitForResponse((response) => {
      const url = response.url();
      return (
        response.status() === 200 &&
        (url.includes("/tv/") || url.includes("discover/tv") || url.includes("trending/tv"))
      );
    });

    await discoverPage.selectType("TV Shows");

    const response = await responsePromise;
    responseUrl = response.url();
  });

  await test.step("Verify type-related API response", async () => {
    expect(responseUrl).toContain("tv");
  });

  await test.step("Verify results are displayed", async () => {
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });
});

test("filter by year", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Apply year range 2024 to 2025", async () => {
    await discoverPage.selectYearRange("2024", "2025");
  });

  await test.step("Verify at least one result matches the selected years", async () => {
    const cards = await discoverPage.getResultCardsData();

    await expect(discoverPage.resultCards.first()).toBeVisible();
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.some((card) => ["2024", "2025"].includes(card.year))).toBeTruthy();
  });
});

test("filter by rating", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Apply minimum rating filter", async () => {
    await discoverPage.setMinimumRating(3);
  });

  await test.step("Verify results are displayed", async () => {
    await expect(discoverPage.resultCards.first()).toBeVisible();
  });
});

test("filter by genre", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Apply Action genre filter", async () => {
    await discoverPage.selectGenre("Action");
  });

  await test.step("Verify at least one result matches the selected genre", async () => {
    const cards = await discoverPage.getResultCardsData();

    await expect(discoverPage.resultCards.first()).toBeVisible();
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.some((card) => card.genre === "Action")).toBeTruthy();
  });
});

test("apply multiple filters together", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
  });

  await test.step("Apply movie, genre, year, and rating filters", async () => {
    await discoverPage.selectType("Movie");
    await discoverPage.selectGenre("Action");
    await discoverPage.selectYearRange("2024", "2025");
    await discoverPage.setMinimumRating(3);
  });

  await test.step("Verify results match the combined filters", async () => {
    const cards = await discoverPage.getResultCardsData();

    await expect(discoverPage.resultCards.first()).toBeVisible();
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.some((card) => card.genre === "Action")).toBeTruthy();
    expect(cards.some((card) => ["2024", "2025"].includes(card.year))).toBeTruthy();
  });
});

test("pagination", async ({ page }) => {
  const discoverPage = new DiscoverPage(page);
  let firstTitleBefore = "";

  await test.step("Open the default page", async () => {
    await discoverPage.goto();
    firstTitleBefore = (await discoverPage.getResultCardsData())[0].title;
  });

  await test.step("Go to the next page", async () => {
    await discoverPage.goToNextPage();
  });

  await test.step("Verify the selected page and result list changed", async () => {
    expect(await discoverPage.getSelectedPageNumber()).toBe("2");

    const cardsAfter = await discoverPage.getResultCardsData();

    await expect(discoverPage.resultCards.first()).toBeVisible();
    expect(cardsAfter[0].title).not.toBe(firstTitleBefore);
  });
});

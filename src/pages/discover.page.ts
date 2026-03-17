import { expect, Locator, Page } from "@playwright/test";

export class DiscoverPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly resultGrid: Locator;
  readonly resultTitles: Locator;
  readonly resultCards: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("SEARCH");
    this.resultGrid = page.locator("div.grid");
    this.resultTitles = this.resultGrid.locator("p.text-blue-500");
    this.resultCards = this.resultGrid.locator("img[alt='Movie Poster']");
    this.nextPageButton = page.getByRole("button", { name: "Next page" });
  }

  async goto() {
    await this.page.goto("/");
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await expect(this.resultGrid).toBeVisible();
    await expect(this.resultCards.first()).toBeVisible();
  }

  async selectCategory(category: "Popular" | "Trend" | "Newest" | "Top rated") {
    await this.page.getByRole("link", { name: category, exact: true }).click();
    await this.waitForPageReady();
  }

  async searchByTitle(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.waitForPageReady();
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    await this.waitForPageReady();
  }

  async getResultTitles() {
    return this.resultTitles.allInnerTexts();
  }
}


import { expect, Locator, Page } from "@playwright/test";

export class DiscoverPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly typeInput: Locator;
  readonly genreInput: Locator;
  readonly yearFromInput: Locator;
  readonly yearToInput: Locator;
  readonly ratingOptions: Locator;
  readonly resultGrid: Locator;
  readonly resultTitles: Locator;
  readonly resultCards: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("SEARCH");
    this.typeInput = page.locator("#react-select-2-input");
    this.genreInput = page.locator("#react-select-3-input");
    this.yearFromInput = page.locator("#react-select-4-input");
    this.yearToInput = page.locator("#react-select-5-input");
    this.ratingOptions = page.locator("ul.rc-rate [role='radio']");
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

  async selectType(type: "Movie" | "TV Shows") {
    await this.selectReactOption(this.typeInput, type);
    await this.waitForPageReady();
  }

  async selectGenre(genre: string) {
    await this.selectReactOption(this.genreInput, genre);
    await this.waitForPageReady();
  }

  async selectYearRange(fromYear: string, toYear: string) {
    await this.selectReactOption(this.yearFromInput, fromYear);
    await this.selectReactOption(this.yearToInput, toYear);
    await this.waitForPageReady();
  }

  async setMinimumRating(stars: number) {
    await this.ratingOptions.nth(stars - 1).click();
    await this.waitForPageReady();
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    await this.waitForPageReady();
  }

  async getResultTitles() {
    return this.resultTitles.allInnerTexts();
  }

  private async selectReactOption(input: Locator, value: string) {
    await input.focus();
    await input.fill(value);
    await this.page.keyboard.press("Enter");
  }
}

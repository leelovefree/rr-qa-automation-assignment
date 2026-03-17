import { expect, Locator, Page } from "@playwright/test";

type ResultCard = {
  title: string;
  genre: string;
  year: string;
};

export class DiscoverPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly typeControl: Locator;
  readonly typeInput: Locator;
  readonly genreControl: Locator;
  readonly genreInput: Locator;
  readonly yearFromControl: Locator;
  readonly yearFromInput: Locator;
  readonly yearToControl: Locator;
  readonly yearToInput: Locator;
  readonly ratingOptions: Locator;
  readonly resultGrid: Locator;
  readonly resultTitles: Locator;
  readonly resultCards: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("SEARCH");
    this.typeControl = page.locator(".css-2b097c-container").nth(0);
    this.typeInput = page.locator("#react-select-2-input");
    this.genreControl = page.locator(".css-2b097c-container").nth(1);
    this.genreInput = page.locator("#react-select-3-input");
    this.yearFromControl = page.locator(".css-2b097c-container").nth(2);
    this.yearFromInput = page.locator("#react-select-4-input");
    this.yearToControl = page.locator(".css-2b097c-container").nth(3);
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
    const previousFirstTitle = await this.getFirstResultTitle();

    await Promise.all([
      this.page.waitForURL(this.getCategoryUrlPattern(category)),
      this.page.getByRole("link", { name: category, exact: true }).click(),
    ]);

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async searchByTitle(keyword: string) {
    const previousFirstTitle = await this.getFirstResultTitle();

    await this.searchInput.fill(keyword);

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async selectType(type: "Movie" | "TV Shows") {
    const currentType = await this.typeControl.locator(".css-1uccc91-singleValue").innerText();
    if (currentType.trim() === type) {
      return;
    }

    const previousFirstTitle = await this.getFirstResultTitle();

    await this.selectReactOption(this.typeControl, this.typeInput, type);

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async selectGenre(genre: string) {
    const previousFirstTitle = await this.getFirstResultTitle();

    await this.selectReactOption(this.genreControl, this.genreInput, genre);

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async selectYearRange(fromYear: string, toYear: string) {
    const previousFirstTitle = await this.getFirstResultTitle();

    await this.selectReactOption(this.yearFromControl, this.yearFromInput, fromYear);
    await this.selectReactOption(this.yearToControl, this.yearToInput, toYear);

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async setMinimumRating(stars: number) {
    const previousFirstTitle = await this.getFirstResultTitle();

    await this.ratingOptions.nth(stars - 1).click();

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async goToNextPage() {
    const previousFirstTitle = await this.getFirstResultTitle();

    await this.nextPageButton.click();

    await this.waitForResultsChanged(previousFirstTitle);
  }

  async getResultTitles() {
    return this.resultTitles.allInnerTexts();
  }

  async getResultCardsData(): Promise<ResultCard[]> {
    const cards = this.resultGrid.locator("> div");
    const count = await cards.count();
    const results: ResultCard[] = [];

    for (let index = 0; index < count; index++) {
      const card = cards.nth(index);
      const title = (await card.locator("p.text-blue-500").innerText()).trim();
      const meta = (await card.locator("p.text-gray-500").innerText()).trim();
      const [genre = "", year = ""] = meta.split(",").map((value) => value.trim());

      results.push({ title, genre, year });
    }

    return results;
  }

  private async selectReactOption(control: Locator, input: Locator, value: string) {
    await control.click();
    await input.fill(value);
    await this.page.getByText(value, { exact: true }).last().click();
  }

  private async getFirstResultTitle() {
    await this.waitForPageReady();
    return (await this.resultTitles.first().innerText()).trim();
  }

  private async waitForResultsChanged(previousFirstTitle: string) {
    await this.waitForPageReady();
    await expect(this.resultTitles.first()).not.toHaveText(previousFirstTitle);
  }

  private getCategoryUrlPattern(category: "Popular" | "Trend" | "Newest" | "Top rated") {
    const patterns = {
      Popular: /\/popular$/,
      Trend: /\/trend$/,
      Newest: /\/new$/,
      "Top rated": /\/top$/,
    } as const;

    return patterns[category];
  }
}

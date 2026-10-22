
import { $, $$, browser } from "@wdio/globals";

class StorePage {
  // Selectors
  get productCards() {
    return $$('[data-test="inventory-item"]');
  }

  get productNames() {
    return $$('[data-test="inventory-item-name"]');
  }

  get productPrices() {
    return $$('[data-test="inventory-item-price"]');
  }

  get categoryFilter() {
    return $('[data-test="filter-category"]');
  }

  get sortSelect() {
    return $('[data-test="sort-select"]');
  }

  // Navigation
  async open(): Promise<void> {
    await browser.url("/");
  }

  // Product information
  async getProductCount(): Promise<number> {
    return this.productCards.length;
  }

  async getProductNames(): Promise<string[]> {
    const cards = await this.productCards;

    if (await cards.length === 0) {
      return [];
    }

    await cards[0].waitForDisplayed();

    const names: string[] = [];

    for (const element of await this.productNames) {
      names.push((await element.getText()).trim());
    }

    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const cards = await this.productCards;

    if (await cards.length === 0) {
      return [];
    }

    await cards[0].waitForDisplayed();

    const prices: number[] = [];

    for (const element of await this.productPrices) {
      const priceText = await element.getText();
      const normalizedPrice = priceText
        .replace(/[$,]/g, "")
        .trim();
      const price = Number(normalizedPrice);

      if (!normalizedPrice || !Number.isFinite(price)) {
        throw new Error(
          `Unable to parse product price: "${priceText}"`
        );
      }

      prices.push(price);
    }

    return prices;
  }

  // Product filtering and sorting
  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectByAttribute(
      "value",
      category
    );
  }

  async sortBy(option: string): Promise<void> {
    await this.sortSelect.selectByAttribute("value", option);
  }

  // Cart actions
  async addProductToCart(productId: string): Promise<void> {
    const addToCartButton = $(
      `[data-test="add-to-cart-${productId}"]`
    );

    await addToCartButton.waitForClickable();
    await addToCartButton.click();
  }
}

export default new StorePage();

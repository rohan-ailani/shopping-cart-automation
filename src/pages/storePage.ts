
import { $, $$, browser } from "@wdio/globals";

class StorePage {
  // Selectors
  get productCards() {
    return $$('[data-test="inventory-item"]');
  }

  get categoryFilter() {
    return $('[data-test="filter-category"]');
  }

  get sortSelect() {
    return $('[data-test="sort-select"]');
  }

  // Navigation
  async open() {
    await browser.url("https://qa-task--oyettijon.replit.app");
  }

  // Product information
  async getProductCount(): Promise<number> {
    return this.productCards.length;
  }

  async getProductNames(): Promise<string[]> {
    const names = await $$('[data-test="inventory-item-name"]');
    const productNames: string[] = [];

    for (const name of names) {
      productNames.push(await name.getText());
    }

    return productNames;
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await $$(
      '[data-test="inventory-item-price"]'
    );

    const prices: number[] = [];

    for (const priceElement of priceElements) {
      const priceText = await priceElement.getText();
      const price = Number(
        priceText.replace("$", "").replace(",", "")
      );

      prices.push(price);
    }

    return prices;
  }

  // Product filtering and sorting
  async filterByCategory(category: string) {
    await this.categoryFilter.selectByAttribute(
      "value",
      category
    );
  }

  async sortBy(option: string) {
    await this.sortSelect.selectByAttribute("value", option);
  }

  // Cart actions
  async addProductToCart(productId: string): Promise<void> {
    await $(`[data-test="add-to-cart-${productId}"]`).click();
  }
}

export default new StorePage();
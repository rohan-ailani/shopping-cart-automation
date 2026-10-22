
import { $, $$, browser, expect } from "@wdio/globals";

class CartPage {
  // Selectors
  get cartNavigation() {
    return $('[data-test="nav-cart"]');
  }

  get cartBadge() {
    return $('[data-test="cart-badge"]');
  }

  get cartItems() {
    return $$('[data-test="cart-item"]');
  }

  get cartSubtotal() {
    return $('[data-test="cart-subtotal"]');
  }

  get cartTax() {
    return $('[data-test="cart-tax"]');
  }

  get cartTotal() {
    return $('[data-test="cart-total"]');
  }

  get cartItemTotals() {
    return $$('[data-test^="cart-item-total-"]');
  }

  get cartItemPrices() {
    return $$('[data-test="cart-item-price"]');
  }

  get cartItemNames() {
    return $$('[data-test="cart-item-name"]');
  }

  get removeButtons() {
    return $$('[data-test^="remove-item-"]');
  }

  get increaseButtons() {
    return $$('[data-test^="increase-qty-item-"]');
  }

  get decreaseButtons() {
    return $$('[data-test^="decrease-qty-item-"]');
  }

  // Navigation
  async openCart(): Promise<void> {
    await this.cartNavigation.waitForClickable();
    await this.cartNavigation.click();

    await expect(browser).toHaveUrl(
      "https://qa-task--oyettijon.replit.app/cart"
    );
  }

  // Cart information
  async getCartItemCount(): Promise<number> {
    return this.cartItems.length;
  }

  async getCartBadgeCount(): Promise<number> {
    if (!(await this.cartBadge.isDisplayed())) {
      return 0;
    }

    const count = Number(await this.cartBadge.getText());

    if (!Number.isInteger(count) || count < 0) {
      throw new Error(`Invalid cart badge count: ${count}`);
    }

    return count;
  }

  async getProductNames(): Promise<string[]> {
    const names: string[] = [];

    for (const element of await this.cartItemNames) {
      names.push((await element.getText()).trim());
    }

    return names;
  }

  async getQuantity(index = 0): Promise<number> {
    const item = (await this.cartItems)[index];

    if (!item) {
      throw new Error(
        `Cart item at index ${index} was not found.`
      );
    }

    const itemId = await item.getAttribute("data-test-item-id");

    if (!itemId) {
      throw new Error(
        `Missing data-test-item-id for cart item at index ${index}.`
      );
    }

    const productId = itemId.replace("cart-item-", "");
    const quantityElement = $(
      `[data-test="quantity-item-${productId}"]`
    );

    await quantityElement.waitForDisplayed();

    const quantity = Number(await quantityElement.getText());

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(
        `Invalid quantity for product "${productId}": ${quantity}`
      );
    }

    return quantity;
  }

  // Quantity and item actions
  async increaseQuantity(index = 0): Promise<void> {
    const button = (await this.increaseButtons)[index];

    if (!button) {
      throw new Error(
        `Increase quantity button at index ${index} was not found.`
      );
    }

    await button.waitForClickable();
    await button.click();
  }

  async decreaseQuantity(index = 0): Promise<void> {
    const button = (await this.decreaseButtons)[index];

    if (!button) {
      throw new Error(
        `Decrease quantity button at index ${index} was not found.`
      );
    }

    await button.waitForClickable();
    await button.click();
  }

  async removeItem(index = 0): Promise<void> {
    const button = (await this.removeButtons)[index];

    if (!button) {
      throw new Error(
        `Remove button at index ${index} was not found.`
      );
    }

    await button.waitForClickable();
    await button.click();
  }

  // Price calculations
  private parsePrice(priceText: string): number {
    const normalizedPrice = priceText
      .replace(/[$,]/g, "")
      .replace(" each", "")
      .trim();

    const price = Number(normalizedPrice);

    if (!normalizedPrice || !Number.isFinite(price)) {
      throw new Error(`Unable to parse price: "${priceText}"`);
    }

    return price;
  }

  async getSubtotal(): Promise<number> {
    return this.parsePrice(await this.cartSubtotal.getText());
  }

  async getTax(): Promise<number> {
    return this.parsePrice(await this.cartTax.getText());
  }

  async getTotal(): Promise<number> {
    return this.parsePrice(await this.cartTotal.getText());
  }

  async getItemUnitPrice(index = 0): Promise<number> {
    const priceElement = (await this.cartItemPrices)[index];

    if (!priceElement) {
      throw new Error(
        `Unit price at index ${index} was not found.`
      );
    }

    return this.parsePrice(await priceElement.getText());
  }

  async getItemTotal(index = 0): Promise<number> {
    const totalElement = (await this.cartItemTotals)[index];

    if (!totalElement) {
      throw new Error(
        `Item total at index ${index} was not found.`
      );
    }

    return this.parsePrice(await totalElement.getText());
  }
}

export default new CartPage();

class CartPage {
  get cartNavigation() {
    return $('[data-test="nav-cart"]');
  }

  get cartBadge() {
    return $('[data-test="cart-badge"]');
  }

  get cartItems() {
    return $$('[data-test="cart-item"]');
  }

  async openCart(): Promise<void> {
    await this.cartNavigation.click();
    await expect(browser).toHaveUrl(
      "https://qa-task--oyettijon.replit.app/cart"
    );
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.length;
  }

  async getCartBadgeCount(): Promise<number> {
    if (!(await this.cartBadge.isDisplayed())) {
      return 0;
    }

    return Number(await this.cartBadge.getText());
  }

  
async getProductNames(): Promise<string[]> {
  const nameElements = await $$('[data-test="cart-item-name"]');
  const names: string[] = [];

  for (const element of nameElements) {
    names.push(await element.getText());
  }

  return names;
}


async getQuantity(index = 0): Promise<number> {
  const cartItems = await this.cartItems;
  const item = cartItems[index];

  if (!item) {
    throw new Error(`Cart item at index ${index} was not found.`);
  }

  const itemId = await item.getAttribute("data-test-item-id");

  if (!itemId) {
    throw new Error(
      `Could not find data-test-item-id for cart item at index ${index}.`
    );
  }

  // Example: cart-item-8 becomes quantity-item-8
  const productId = itemId.replace("cart-item-", "");
  const quantityElement = $(`[data-test="quantity-item-${productId}"]`);

  await quantityElement.waitForExist({ timeout: 10000 });

  const quantityText = await quantityElement.getText();

  console.log(`Cart item: ${itemId}`);
  console.log(`Quantity text: ${quantityText}`);

  return Number(quantityText);
}

async increaseQuantity(index = 0): Promise<void> {
  const increaseButtons = $$('[data-test^="increase-qty-item-"]');

  await increaseButtons[index].click();
}

async decreaseQuantity(index = 0): Promise<void> {
  const decreaseButtons = $$('[data-test^="decrease-qty-item-"]');

  await decreaseButtons[index].click();
}


async removeItem(index = 0): Promise<void> {
  const itemCount = await this.getCartItemCount();

  console.log(`Cart items found: ${itemCount}`);
  console.log(`Attempting to remove item at index: ${index}`);

  if (index < 0 || index >= itemCount) {
    throw new Error(
      `Invalid cart item index: ${index}. Cart items: ${itemCount}`
    );
  }

  const removeButtons = await $$('[data-test^="remove-item-"]');
  const removeButton = removeButtons[index];

  await removeButton.waitForDisplayed();
  await removeButton.click();

  console.log(`Clicked remove button for cart item ${index}`);
}
}

export default new CartPage();

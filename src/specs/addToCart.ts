
import LoginPage from "../pages/loginPage";
import StorePage from "../pages/storePage";
import CartPage from "../pages/cartPage";
import products from "../data/products.json";

const TAX_RATE = 0.08;

describe("Add to Cart", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();

    await expect(
      $('[data-test="inventory-item"]')
    ).toBeDisplayed();
  });

  it("should display an empty cart when no products have been added", async () => {
    // Arrange
    await CartPage.openCart();

    // Assert
    expect(await CartPage.getCartItemCount()).toBe(0);
    expect(await CartPage.getCartBadgeCount()).toBe(0);
  });

 // BUG-002: Bolt T-Shirt Add to Cart Button Is Unresponsive
it("should add the Bolt T-Shirt to the cart", async () => {
  const initialCartCount = await CartPage.getCartBadgeCount();

  await StorePage.addProductToCart("bolt-t-shirt");

  const updatedCartCount = await CartPage.getCartBadgeCount();

  expect(updatedCartCount).toBe(initialCartCount + 1);

  await CartPage.openCart();

  const productNames = await CartPage.getProductNames();

  expect(productNames).toContain("Bolt T-Shirt");
});


  it("should add all selected products to the cart", async () => {
    // Arrange
    for (const product of products) {
      await StorePage.addProductToCart(product.id);
    }

    await CartPage.openCart();

    // Assert
    const cartItemCount = await CartPage.getCartItemCount();
    const productNames = await CartPage.getProductNames();

    expect(cartItemCount).toBe(products.length);
    expect(productNames).toHaveLength(products.length);

    for (const product of products) {
      expect(productNames).toContain(product.name);
    }
  });

  it("should remove a product from the cart", async () => {
    // Arrange
    for (const product of products) {
      await StorePage.addProductToCart(product.id);
    }

    await CartPage.openCart();

    const initialCount = await CartPage.getCartItemCount();
    const initialNames = await CartPage.getProductNames();

    expect(initialCount).toBe(products.length);

    const removedProductName = initialNames[0];

    // Act
    await CartPage.removeItem(0);

    // Assert
    const updatedCount = await CartPage.getCartItemCount();
    const updatedNames = await CartPage.getProductNames();
    const updatedBadgeCount = await CartPage.getCartBadgeCount();

    expect(updatedCount).toBe(initialCount - 1);
    expect(updatedBadgeCount).toBe(initialCount - 1);
    expect(updatedNames).not.toContain(removedProductName);
  });

  it("should increase and decrease product quantity", async () => {
    // Arrange
    await StorePage.addProductToCart(products[0].id);
    await CartPage.openCart();

    expect(await CartPage.getQuantity(0)).toBe(1);

    // Act and assert: increase quantity
    await CartPage.increaseQuantity(0);

    expect(await CartPage.getQuantity(0)).toBe(2);

    // Act and assert: decrease quantity
    await CartPage.decreaseQuantity(0);

    expect(await CartPage.getQuantity(0)).toBe(1);
  });

  it("should calculate the correct subtotal, tax, and total", async () => {
    // Arrange
    for (const product of products) {
      await StorePage.addProductToCart(product.id);
    }

    await CartPage.openCart();

    // Calculate expected subtotal from item prices and quantities
    const itemCount = await CartPage.getCartItemCount();
    let expectedSubtotal = 0;

    for (let i = 0; i < itemCount; i++) {
      const unitPrice = await CartPage.getItemUnitPrice(i);
      const quantity = await CartPage.getQuantity(i);

      expectedSubtotal += unitPrice * quantity;
    }

    expectedSubtotal = Number(expectedSubtotal.toFixed(2));

    // Calculate expected tax and total
    const expectedTax = Number(
      (expectedSubtotal * TAX_RATE).toFixed(2)
    );

    const expectedTotal = Number(
      (expectedSubtotal + expectedTax).toFixed(2)
    );

    // Assert
    expect(await CartPage.getSubtotal()).toBe(expectedSubtotal);
    expect(await CartPage.getTax()).toBe(expectedTax);
    expect(await CartPage.getTotal()).toBe(expectedTotal);
  });
});

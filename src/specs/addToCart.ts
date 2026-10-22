
import LoginPage from "../pages/loginPage";
import StorePage from "../pages/storePage";
import CartPage from "../pages/cartPage";
import products from "../data/products.json";

describe("Add to Cart", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();

    await expect(
      $('[data-test="inventory-item"]')
    ).toBeDisplayed();

    console.log("Login successful. Inventory page displayed.");
  });

  it("should display an empty cart when no products have been added", async () => {
    await CartPage.openCart();

    const cartItemCount = await CartPage.getCartItemCount();
    const cartBadgeCount = await CartPage.getCartBadgeCount();

    console.log(`Cart item count: ${cartItemCount}`);
    console.log(`Cart badge count: ${cartBadgeCount}`);

    expect(cartItemCount).toBe(0);
    expect(cartBadgeCount).toBe(0);
  });

  it("should add all selected products to the cart", async () => {
    console.log(`Adding ${products.length} products to the cart.`);

    for (const product of products) {
      await StorePage.addProductToCart(product.id);
    }

    console.log("All products added. Opening cart.");

    await CartPage.openCart();

    const cartItemCount = await CartPage.getCartItemCount();

    console.log(`Cart item count: ${cartItemCount}`);

    expect(cartItemCount).toBe(products.length);

    const productNames = await CartPage.getProductNames();

    expect(productNames).toHaveLength(products.length);

    for (const product of products) {
      expect(productNames).toContain(product.name);
    }

    console.log("PASS: Cart contains all selected products.");
  });

  it("should remove a product from the cart", async () => {
    // Arrange: add all products
    for (const product of products) {
      await StorePage.addProductToCart(product.id);
    }

    await CartPage.openCart();

    const initialCount = await CartPage.getCartItemCount();
    const initialNames = await CartPage.getProductNames();

    expect(initialCount).toBe(products.length);

    // Act: remove the first product
    const removedProductName = initialNames[0];

    console.log(`Removing product: ${removedProductName}`);

    await CartPage.removeItem(0);

    // Assert: verify the cart updates
    const updatedCount = await CartPage.getCartItemCount();
    const updatedNames = await CartPage.getProductNames();
    const updatedBadgeCount = await CartPage.getCartBadgeCount();

    console.log(`Expected cart count: ${initialCount - 1}`);
    console.log(`Actual cart count: ${updatedCount}`);
    console.log(`Updated cart badge: ${updatedBadgeCount}`);

    expect(updatedCount).toBe(initialCount - 1);
    expect(updatedBadgeCount).toBe(initialCount - 1);
    expect(updatedNames).not.toContain(removedProductName);

    console.log("PASS: Product removed successfully.");
  });


it("should increase and decrease product quantity", async () => {
  // Arrange: add products and open cart
  await StorePage.addProductToCart(products[0].id);
  await CartPage.openCart();

  const initialQuantity = await CartPage.getQuantity(0);

  console.log(`Initial quantity: ${initialQuantity}`);
  expect(initialQuantity).toBe(1);

  // Act: increase quantity
  await CartPage.increaseQuantity(0);

  const increasedQuantity = await CartPage.getQuantity(0);

  console.log(`Quantity after increase: ${increasedQuantity}`);
  expect(increasedQuantity).toBe(2);

  // Act: decrease quantity
  await CartPage.decreaseQuantity(0);

  const decreasedQuantity = await CartPage.getQuantity(0);

  console.log(`Quantity after decrease: ${decreasedQuantity}`);
  expect(decreasedQuantity).toBe(1);

  console.log("PASS: Product quantity increased and decreased correctly.");
});

});

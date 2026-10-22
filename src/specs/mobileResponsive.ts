
import { $, browser, expect } from "@wdio/globals";
import LoginPage from "../pages/loginPage";
import StorePage from "../pages/storePage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import contactDetails from "../data/contactDetails.json";
import products from "../data/products.json";

describe("Mobile responsive tests", () => {
  let originalWindowSize: { width: number; height: number };

  before(async () => {
    originalWindowSize = await browser.getWindowSize();
  });

  afterEach(async () => {
    await browser.setWindowSize(
      originalWindowSize.width,
      originalWindowSize.height
    );
  });

  it("should allow a user to log in on a mobile viewport", async () => {
    // Arrange: resize the browser to a mobile-sized window.
    await browser.setWindowSize(375, 812);
    await LoginPage.open();

    // Act: verify the login form is visible.
    const username = $('[data-test="username"]');
    const password = $('[data-test="password"]');

    await expect(username).toBeDisplayed();
    await expect(password).toBeDisplayed();

    // Select the Shopper practice account and log in.
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();

    // Assert: verify successful login.
    await expect(browser).toHaveUrl(
      "https://qa-task--oyettijon.replit.app/"
    );

    await expect($("#inventory-page")).toBeDisplayed();

    // Verify the page does not overflow horizontally.
    const pageDimensions = await browser.execute(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
    }));

    expect(pageDimensions.documentWidth).toBeLessThanOrEqual(
      pageDimensions.viewportWidth
    );

    // Clean up: log out.
    await LoginPage.logout();
  });

  it("should complete shopping and checkout on a mobile viewport", async () => {
    // Arrange: set the mobile viewport and log in.
    await browser.setWindowSize(375, 812);

    await LoginPage.open();
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();

    await expect($("#inventory-page")).toBeDisplayed();

    // Verify the products page fits the mobile viewport.
    let dimensions = await browser.execute(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth
    );

    // Select products near the top and bottom of the product list.
    // Exclude Bolt T-Shirt because it has a known Add to Cart defect.
    const firstProduct = products.find(
      (product) => product.id !== "bolt-t-shirt"
    );

    const lastProduct = [...products].reverse().find(
      (product) =>
        product.id !== "bolt-t-shirt" &&
        product.id !== firstProduct?.id
    );

    if (!firstProduct || !lastProduct) {
      throw new Error(
        "Could not find two usable products for the mobile test."
      );
    }

    // Act: add both products to the cart.
    await StorePage.addProductToCart(firstProduct.id);
    await StorePage.addProductToCart(lastProduct.id);

    await CartPage.openCart();

    // Verify the selected products and quantities.
    const cartProductNames = await CartPage.getProductNames();

    expect(cartProductNames).toContain(firstProduct.name);
    expect(cartProductNames).toContain(lastProduct.name);

    expect(await CartPage.getCartItemCount()).toBe(2);
    expect(await CartPage.getCartBadgeCount()).toBe(2);

    // Verify the cart has no horizontal overflow.
    dimensions = await browser.execute(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth
    );

    // Verify the cart total is displayed.
    expect(await CartPage.getSubtotal()).toBeGreaterThan(0);
    expect(await CartPage.getTotal()).toBeGreaterThan(
      await CartPage.getSubtotal()
    );

    // Proceed to checkout.
    await $('[data-test="checkout-button"]').click();

    await expect(CheckoutPage.checkoutPage).toBeDisplayed();

    // Verify the checkout form fits the mobile viewport.
    dimensions = await browser.execute(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth
    );

    // Enter valid shipping information.
    await CheckoutPage.enterShippingInformation(
      contactDetails.validContact.firstName,
      contactDetails.validContact.lastName,
      contactDetails.validContact.postalCode
    );

    await CheckoutPage.continueToSummary();

    // Verify the order summary.
    await expect(CheckoutPage.checkoutSummaryPage).toBeDisplayed();

    const summaryText =
      await CheckoutPage.checkoutSummaryPage.getText();

    expect(summaryText).toContain(firstProduct.name);
    expect(summaryText).toContain(lastProduct.name);
    expect(summaryText).toContain("Qty: 1");
    expect(summaryText).toContain(
      contactDetails.validContact.firstName
    );
    expect(summaryText).toContain(
      contactDetails.validContact.postalCode
    );

    // Complete the order.
    await CheckoutPage.finishButton.click();

    await expect($("body")).toHaveText(
      expect.stringContaining("Order Placed!")
    );

    await expect(
      $('[data-test="back-to-home"]')
    ).toBeDisplayed();
  });
});
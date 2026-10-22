
import LoginPage from "../pages/loginPage";
import StorePage from "../pages/storePage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import contactDetails from "../data/contactDetails.json";
import products from "../data/products.json";

describe("Checkout", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();

    await expect(
      $('[data-test="inventory-item"]')
    ).toBeDisplayed();

    // Add one product so checkout has an item to process.
    await StorePage.addProductToCart(products[0].id);
    await CartPage.openCart();
    await $('[data-test="checkout-button"]').click();
  });


it("should display validation errors when shipping information is empty", async () => {
  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.checkoutPage).toBeDisplayed();
  await expect(CheckoutPage.firstNameError).toBeDisplayed();
  await expect(CheckoutPage.lastNameError).toBeDisplayed();
  await expect(CheckoutPage.postalCodeError).toBeDisplayed();

  await expect(CheckoutPage.checkoutSummaryPage).not.toBeDisplayed();
});


it("should display an error when first name is missing", async () => {
  await CheckoutPage.enterShippingInformation(
    contactDetails.missingFirstName.firstName,
    contactDetails.missingFirstName.lastName,
    contactDetails.missingFirstName.postalCode
  );

  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.firstNameError).toBeDisplayed();
  await expect(CheckoutPage.checkoutPage).toBeDisplayed();
});

it("should display an error when last name is missing", async () => {
  await CheckoutPage.enterShippingInformation(
    contactDetails.missingLastName.firstName,
    contactDetails.missingLastName.lastName,
    contactDetails.missingLastName.postalCode
  );

  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.lastNameError).toBeDisplayed();
  await expect(CheckoutPage.checkoutPage).toBeDisplayed();
});

it("should display an error when postal code is missing", async () => {
  await CheckoutPage.enterShippingInformation(
    contactDetails.missingPostalCode.firstName,
    contactDetails.missingPostalCode.lastName,
    contactDetails.missingPostalCode.postalCode
  );

  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.postalCodeError).toBeDisplayed();
  await expect(CheckoutPage.checkoutPage).toBeDisplayed();
});

  it("should display the checkout page and shipping form", async () => {
    await expect(CheckoutPage.checkoutPage).toBeDisplayed();
    await expect(CheckoutPage.checkoutTitle).toHaveText("Checkout");
    await expect(CheckoutPage.firstNameInput).toBeDisplayed();
    await expect(CheckoutPage.lastNameInput).toBeDisplayed();
    await expect(CheckoutPage.postalCodeInput).toBeDisplayed();
    await expect(CheckoutPage.continueButton).toBeDisplayed();
  });

  it("should display the order preview and total", async () => {
    await expect(CheckoutPage.orderPreview).toBeDisplayed();
    await expect(CheckoutPage.previewTotal).toBeDisplayed();

    const previewTotal = await CheckoutPage.previewTotal.getText();
    expect(previewTotal).toMatch(/^\$\d+\.\d{2}$/);
  });

  it("should navigate back to the cart", async () => {
    await CheckoutPage.goBackToCart();

    await expect(browser).toHaveUrl(/\/cart$/);
  });

it("should submit valid shipping information and display the correct order summary", async () => {
  await CheckoutPage.enterShippingInformation(
    contactDetails.validContact.firstName,
    contactDetails.validContact.lastName,
    contactDetails.validContact.postalCode
  );

  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.checkoutSummaryPage).toBeDisplayed();

  const summaryText = await CheckoutPage.checkoutSummaryPage.getText();

  expect(summaryText).toContain(products[0].name);
  expect(summaryText).toContain("Qty: 1");
  expect(summaryText).toContain(contactDetails.validContact.firstName);
  expect(summaryText).toContain(contactDetails.validContact.postalCode);
  expect(summaryText).toContain("$44.99");
  expect(summaryText).toContain("$3.60");
  expect(summaryText).toContain("$48.59");
});


it("should complete the order and display confirmation", async () => {
  await CheckoutPage.enterShippingInformation(
    contactDetails.validContact.firstName,
    contactDetails.validContact.lastName,
    contactDetails.validContact.postalCode
  );

  await CheckoutPage.continueToSummary();

  await expect(CheckoutPage.checkoutSummaryPage).toBeDisplayed();

  await CheckoutPage.finishButton.click();

  // Verify the order confirmation message.
  await expect($("body")).toHaveText(
    expect.stringContaining("Order Placed!")
  );

  await expect($("body")).toHaveText(
    expect.stringContaining(
      "Thank you for your purchase. Your order has been successfully submitted."
    )
  );

  // Verify the Continue Shopping button is displayed.
await expect(
  $('[data-test="back-to-home"]')
).toBeDisplayed();
});


});

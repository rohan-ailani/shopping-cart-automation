
import { $, browser } from "@wdio/globals";

class CheckoutPage {
  // Page elements
  get checkoutPage() {
    return $('[data-test="checkout-page"]');
  }

  get checkoutTitle() {
    return $('[data-test="checkout-title"]');
  }

  get backToCartButton() {
    return $('[data-test="back-to-cart"]');
  }

  get firstNameInput() {
    return $('[data-test="checkout-first-name"]');
  }

  get lastNameInput() {
    return $('[data-test="checkout-last-name"]');
  }

  get postalCodeInput() {
    return $('[data-test="checkout-postal-code"]');
  }

  get firstNameError() {
    return $('[data-test="first-name-error"]');
  }

  get lastNameError() {
    return $('[data-test="last-name-error"]');
  }

  get postalCodeError() {
    return $('[data-test="postal-code-error"]');
  }

  get continueButton() {
    return $('[data-test="continue-to-summary"]');
  }

  get orderPreview() {
    return $('[data-test="cart-preview-summary"]');
  }

  get previewTotal() {
    return $('[data-test="preview-total"]');
  }

  get checkoutSummaryPage() {
    return $('[data-test="checkout-summary-page"]');
  }

  get finishButton() {
    return $('[data-test="finish-button"]');
  }

  // Page actions
  async openCheckout(): Promise<void> {
    await browser.url("/checkout");
    await this.checkoutPage.waitForDisplayed();
  }

  async enterShippingInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.waitForDisplayed();
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
  }

  async continueToSummary(): Promise<void> {
    await this.continueButton.waitForClickable();
    await this.continueButton.click();
  }

  async goBackToCart(): Promise<void> {
    await this.backToCartButton.waitForClickable();
    await this.backToCartButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.waitForClickable();
    await this.finishButton.click();
  }
}

export default new CheckoutPage();

import { $, $$, browser, expect } from "@wdio/globals";

class LoginPage {
  // Selectors
  get inputs() {
    return $$("input");
  }

  get buttons() {
    return $$("button");
  }

  // Navigation
  async open() {
    const url = "https://qa-task--oyettijon.replit.app";

    console.log(`Navigating to: ${url}`);
    await browser.url(url);

    console.log(`Current URL: ${await browser.getUrl()}`);
  }

  // Page inspection
  async logFormElements() {
    console.log("Inspecting input fields...");

    const inputs = await this.inputs;
    console.log(`Found ${inputs.length} input(s).`);

    for await (const [index, input] of inputs.entries()) {
      console.log(`Input ${index + 1}:`, {
        type: await input.getAttribute("type"),
        name: await input.getAttribute("name"),
        placeholder: await input.getAttribute("placeholder"),
        testId: await input.getAttribute("data-test"),
        ariaLabel: await input.getAttribute("aria-label"),
      });
    }

    console.log("Inspecting buttons...");

    const buttons = await this.buttons;
    console.log(`Found ${buttons.length} button(s).`);

    for await (const [index, button] of buttons.entries()) {
      console.log(`Button ${index + 1}:`, {
        text: await button.getText(),
        testId: await button.getAttribute("data-test"),
        ariaLabel: await button.getAttribute("aria-label"),
      });
    }
  }

  // Practice account selection
  async selectPracticeAccount(account: string) {
    const accountButton = $(
      `[data-test="hint-user-${account}"]`
    );

    console.log(`Selecting practice account: ${account}`);

    await expect(accountButton).toBeDisplayed();
    await accountButton.click();

    console.log(`Selected practice account: ${account}`);
  }

  // Login
  async login() {
    const loginButton = $('[data-test="login-button"]');

    await expect(loginButton).toBeDisplayed();
    await loginButton.click();
  }

  // Logout
  async logout() {
    const logoutButton = $('[data-test="logout-button"]');

    await expect(logoutButton).toBeDisplayed();
    await logoutButton.click();

    await expect(browser).toHaveUrl(
      "https://qa-task--oyettijon.replit.app/login"
    );
  }
}

export default new LoginPage();

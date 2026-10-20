import { $, browser, expect } from "@wdio/globals";
import LoginPage from "../pages/loginPage";
import accounts from "../data/accounts.json";

describe("Login page", () => {
  beforeEach(async () => {
    console.log("\n[Test Setup] Opening login page...");
    await LoginPage.open();
  });

  it("should navigate to the application login page", async () => {
    const expectedUrl = "https://qa-task--oyettijon.replit.app";

    console.log("[Test] Verifying the page body is displayed.");
    await expect($("body")).toBeDisplayed();

    const actualUrl = await browser.getUrl();

    console.log(`[Test] Expected URL: ${expectedUrl}`);
    console.log(`[Test] Actual URL: ${actualUrl}`);

    expect(actualUrl).toContain(expectedUrl);

    console.log("[Test] Navigation validation passed.");
  });

  it("should inspect login form selectors", async () => {
    console.log("[Test] Starting login form inspection.");

    await LoginPage.logFormElements();

    console.log("[Test] Login form inspection completed.");
  });


it("should populate credentials when selecting the Shopper account", async () => {
  await LoginPage.selectPracticeAccount("fern_signal");

  const username = $('[data-test="username"]');
  const password = $('[data-test="password"]');

  await expect(username).toHaveValue("fern_signal");
  await expect(password).toHaveValue("test_sauce");

  console.log("Shopper account credentials populated successfully.");
});

for (const account of accounts) {
  it(`should verify login access for ${account.username}`, async () => {
    console.log(`Testing account: ${account.username}`);

    await LoginPage.selectPracticeAccount(account.username);
    await LoginPage.login();

    if (account.expectedLogin) {
      await expect(browser).toHaveUrl(
        "https://qa-task--oyettijon.replit.app/"
      );

      await expect($('//*[@id="inventory-page"]')).toBeDisplayed();

      await LoginPage.logout();
    } else {
  await expect(browser).toHaveUrl(
    "https://qa-task--oyettijon.replit.app/login"
  );

  const loginError = $("p.text-red-700");

  await expect(loginError).toBeDisplayed();

  await expect(loginError).toHaveText(
    "Epic sadface below — Sorry, this user has been locked out."
  );

  console.log(`Login correctly denied for: ${account.username}`);

    }
  });
}  
});

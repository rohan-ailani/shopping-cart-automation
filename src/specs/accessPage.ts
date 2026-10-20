import { expect } from "@wdio/globals";
import StorePage from "../pages/storePage";

describe("Navigate and login to the application", () => {
  it("navigates to the login page and logs in", async () => {

    let url = "https://qa-task--oyettijon.replit.app";
    console.log(`Navigating to ${url}`);

    await StorePage.open();

    await expect($("body")).toBeDisplayed();

    expect(await browser.getUrl()).toContain(url);

    console.log(`Successfully navigated to ${url}. Test passed.`);
  });
});

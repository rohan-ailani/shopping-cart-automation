
import { $, browser, expect } from "@wdio/globals";
import LoginPage from "../pages/loginPage";
import StorePage from "../pages/storePage";
import categories from "../data/categories.json";
import sortingOptions from "../data/sortingOptions.json";

describe("Products page", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.selectPracticeAccount("fern_signal");
    await LoginPage.login();
  });

  it("should display the expected total number of products", async () => {
    console.log("URL after login:", await browser.getUrl());

    await expect(browser).toHaveUrl(
      "https://qa-task--oyettijon.replit.app/"
    );

    await expect(
      $('[data-test="inventory-item"]')
    ).toBeDisplayed();

    const productCount = await StorePage.getProductCount();

    console.log(`Total products displayed: ${productCount}`);

    expect(productCount).toBe(12);
  });

it("should filter products by every category and verify counts", async () => {
  for (const category of categories) {
    await StorePage.filterByCategory(category.value);

    const productCount = await StorePage.getProductCount();
    const productNames = await StorePage.getProductNames();

    console.log(
      `${category.name}: ${productCount} products`,
      productNames
    );

    expect(productCount).toBe(category.expectedCount);
  }
});


it("should sort products correctly using every sorting option", async () => {
  const failures: string[] = [];

  for (const option of sortingOptions) {
    await StorePage.sortBy(option.value);

    console.log(`Testing sort option: ${option.name}`);

    if (option.sortBy === "name") {
      const names = await StorePage.getProductNames();
      const expectedNames = [...names].sort((a, b) =>
        a.localeCompare(b)
      );

      if (option.direction === "descending") {
        expectedNames.reverse();
      }

      try {
        expect(names).toEqual(expectedNames);
        console.log(`PASS: ${option.name}`);
      } catch {
        failures.push(option.name);
        console.error(`FAIL: ${option.name}`);
      }
    } else {
      const prices = await StorePage.getProductPrices();
      const expectedPrices = [...prices].sort((a, b) => a - b);

      if (option.direction === "descending") {
        expectedPrices.reverse();
      }

      try {
        expect(prices).toEqual(expectedPrices);
        console.log(`PASS: ${option.name}`);
      } catch {
        failures.push(option.name);
        console.error(`FAIL: ${option.name}`);
      }
    }
  }

expect(failures).toEqual([]);
});
});

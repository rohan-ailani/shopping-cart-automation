# Shopping Cart Automation

A UI test automation project built with WebdriverIO, TypeScript, and Mocha to validate the functionality of a shopping cart web application, including authentication, product browsing, cart management, checkout, and mobile-responsive user journeys.

**Application under test:** [Shopping Cart Application](https://qa-task--oyettijon.replit.app/)

## Tech Stack

- WebdriverIO and TypeScript
- Mocha and expect-webdriverio
- Page Object Model (POM)
- JSON-based test data
- Git and GitHub

## Project Structure

```text
src/
├── data/
│   ├── accounts.json
│   ├── categories.json
│   ├── contactDetails.json
│   ├── products.json
│   └── sortingOptions.json
├── pages/
│   ├── loginPage.ts
│   ├── storePage.ts
│   ├── cartPage.ts
│   └── checkoutPage.ts
└── specs/
    ├── accessPage.ts
    ├── productsPage.ts
    ├── addToCart.ts
    ├── checkout.ts
    └── mobileResponsive.ts

BUG_REPORT.md
README.md
TEST_CASES.md
```

## Test Coverage

### Login and Authentication
- Verify navigation to the login page.
- Verify practice account credential population.
- Validate login access for configured accounts, including locked-out account handling.
- Verify logout functionality.

### Products Page
- Verify the total number of displayed products.
- Validate filtering across available categories and product counts.
- Validate sorting options and product ordering.

### Shopping Cart
- Verify the initial empty cart state.
- Add multiple products and verify cart contents and item counts.
- Remove products from the cart.
- Increase and decrease product quantities.
- Validate subtotal, tax, and grand total calculations.

### Checkout
- Verify checkout form and order preview.
- Validate required shipping information.
- Verify the order summary and totals.
- Complete an order and verify the confirmation message.
- Verify navigation back to the cart.

### Mobile Responsive Testing
- Verify login and logout using a mobile-sized browser viewport.
- Verify product selection and cart contents on a mobile-sized viewport.
- Complete checkout and verify order confirmation.
- Check for horizontal page overflow on key screens at the tested viewport size.

## Setup

Install project dependencies:

```bash
npm install
```

## Running Tests

Run the complete test suite:

```bash
npm run wdio
```

Run individual test suites:

```bash
npm run wdio -- --spec src/specs/accessPage.ts
npm run wdio -- --spec src/specs/productsPage.ts
npm run wdio -- --spec src/specs/addToCart.ts
npm run wdio -- --spec src/specs/checkout.ts
npm run wdio -- --spec src/specs/mobileResponsive.ts
```

## Test Cases and Defect Reporting

- [TEST_CASES.md](TEST_CASES.md): Test scenarios, expected results, and execution results.
- [BUG_REPORT.md](BUG_REPORT.md): Documented application defects, reproduction details, and supporting test evidence.

## Known Issues

The automation suite currently identifies known application defects:

- **BUG-001:** Price: High to Low sorting does not work as expected.
- **BUG-002:** The Bolt T-Shirt Add to Cart button does not add the product to the cart.

Refer to [BUG_REPORT.md](BUG_REPORT.md) for details. Tests reproducing known defects may fail intentionally until the application issues are resolved.
# Shopping Cart Automation

A UI test automation project built with **WebdriverIO, TypeScript, and Mocha** to validate a shopping cart web application. The framework covers authentication, product browsing, cart management, checkout, and mobile-responsive user journeys.

**Application Under Test:** [Shopping Cart Application](https://qa-task--oyettijon.replit.app/)

## Tech Stack

- WebdriverIO
- TypeScript
- Mocha and `expect-webdriverio`
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
- Validate filtering across available categories and verify product counts.
- Validate available sorting options and product ordering.

### Shopping Cart

- Verify the initial empty cart state.
- Add products and verify cart contents and item counts.
- Remove products from the cart.
- Increase and decrease product quantities.
- Validate subtotal, tax, and grand total calculations.

### Checkout

- Verify the checkout form and order preview.
- Validate required shipping information.
- Verify the order summary and totals.
- Complete an order and verify the confirmation message.
- Verify navigation back to the cart.

### Mobile Responsive Testing

- Verify login and logout using a mobile-sized browser viewport.
- Verify product selection and cart contents on a mobile-sized viewport.
- Complete checkout and verify order confirmation.
- Check for horizontal page overflow on key screens at the tested viewport size.

## Prerequisites

- Node.js and npm
- Google Chrome
- Git

## Setup

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/rohan-ailani/shopping-cart-automation.git
cd shopping-cart-automation
```

Install dependencies:

```bash
npm install
```

Ensure the required WebdriverIO dependencies and browser setup are available before running the tests.

## Running Tests

Run the complete test suite:

```bash
npm run wdio
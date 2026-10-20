# Shopping Cart Automation Framework

## Overview

A UI test automation framework built with **WebdriverIO, TypeScript, and Mocha** to validate the functionality of a shopping cart web application.

The project uses the Page Object Model (POM), reusable page interactions, data-driven testing, and automated assertions to support maintainable end-to-end testing.

**Application under test:** [Shopping Cart QA Task](https://qa-task--oyettijon.replit.app/)

**GitHub repository:** [shopping-cart-automation](https://github.com/rohan-ailani/shopping-cart-automation)

## Technology Stack

- **WebdriverIO:** Browser automation and test execution
- **TypeScript:** Typed test development
- **Mocha:** Test organization and execution
- **expect-webdriverio:** Assertions and browser validation
- **Page Object Model:** Reusable page interactions
- **JSON:** External test data
- **Chrome:** Browser execution
- **Git and GitHub:** Version control and project hosting

## Project Structure

```text
shopping-cart-automation/
├── src/
│   ├── data/
│   │   ├── accounts.json
│   │   ├── categories.json
│   │   └── sortingOptions.json
│   ├── pages/
│   │   ├── loginPage.ts
│   │   └── storePage.ts
│   └── specs/
│       ├── accessPage.ts
│       └── productsPage.ts
├── BUG_REPORT.md
├── README.md
├── TEST_CASES.md
├── package.json
├── tsconfig.json
└── wdio.conf.ts
```

## Implemented Test Coverage

### 1. Login and Access Control

The login test suite validates:

- Navigation to the application login page
- Login form inspection
- Practice account credential population
- Successful login for eligible practice accounts
- Access denial for a locked account
- Expected login error messages
- Logout after successful login

Practice account data and expected login outcomes are maintained in `src/data/accounts.json`.

### 2. Products Page

The Products Page test suite validates:

- Total number of products displayed
- Filtering products by every available category
- Expected product counts for each category
- Alphabetical sorting from A to Z
- Reverse alphabetical sorting from Z to A
- Price sorting from Low to High
- Price sorting from High to Low

Category and sorting test data are maintained separately in `src/data/categories.json` and `src/data/sortingOptions.json`.

The sorting tests validate the actual displayed order against the expected order.

## Known Defects

See [BUG_REPORT.md](BUG_REPORT.md) for reproduction steps, test evidence, and impact.

## Prerequisites

Install the following before running the tests:

- Node.js and npm
- Git
- Google Chrome

## Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/rohan-ailani/shopping-cart-automation.git
cd shopping-cart-automation
npm install
```

## Running Tests

### Run Login and Access Control Tests

```bash
npm run wdio -- --spec src/specs/accessPage.ts
```

### Run Products Page Tests

```bash
npm run wdio -- --spec src/specs/productsPage.ts
```

### Run the Full Test Suite

```bash
npm run wdio
```

**Note:** The Products Page sorting test currently reports a known failure due to BUG-001. This failure is documented rather than hidden or worked around in the test assertions.

## Framework Design

The framework follows these practices:

- **Page Object Model:** Page interactions are separated from test scenarios.
- **Data-driven testing:** Reusable JSON data defines practice accounts, product categories, and sorting options.
- **Reusable methods:** Page objects encapsulate actions such as login, logout, filtering, sorting, and retrieving product information.
- **Stable selectors:** Application-provided `data-test` attributes are used where available.
- **Automated assertions:** Tests validate navigation, access control, product counts, filtering, and sorting.
- **Defect reporting:** Identified application issues are documented with expected results, actual results, reproduction steps, and supporting test evidence.

## Test Documentation

See [TEST_CASES.md](TEST_CASES.md) for the detailed test scenarios and expected results.

See [BUG_REPORT.md](BUG_REPORT.md) for documented application defects.

## Next Steps

Planned extensions to the framework include:

- Cart initialization and product addition/removal
- Cart quantity updates
- Subtotal, tax, and grand total calculations
- Checkout form validation
- Order summary and order completion
- Selected responsive layout checks

These scenarios will be added as they are implemented and validated.

## Disclaimer

This project is intended for learning, demonstration, and software quality assurance assessment purposes. The application under test is a separate web application. Documented defects reflect observed behavior during testing.
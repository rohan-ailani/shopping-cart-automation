
# Shopping Cart Automation

A UI test automation project built with WebdriverIO, TypeScript, and Mocha to test a shopping cart web application.

**Application:** https://qa-task--oyettijon.replit.app/

## Tech Stack

- WebdriverIO and TypeScript
- Mocha and expect-webdriverio
- Page Object Model (POM)
- JSON test data
- Git and GitHub

## Project Structure

```text
src/
├── data/
│   ├── accounts.json
│   ├── categories.json
│   ├── products.json
│   └── sortingOptions.json
├── pages/
│   ├── loginPage.ts
│   ├── storePage.ts
│   └── cartPage.ts
└── specs/
    ├── accessPage.ts
    ├── productsPage.ts
    └── addToCart.ts

BUG_REPORT.md
README.md
TEST_CASES.md
```

## Test Coverage

- **Login:** Authentication, account validation, and logout
- **Products:** Product count, category filtering, and sorting
- **Shopping Cart:** Adding and removing products, item counts, and quantity controls

## Setup

Install dependencies:

```bash
npm install
```

## Run Tests

Run the complete test suite:

```bash
npm run wdio
```

Run an individual test suite:

```bash
npm run wdio -- --spec src/specs/accessPage.ts
npm run wdio -- --spec src/specs/productsPage.ts
npm run wdio -- --spec src/specs/addToCart.ts
```

## Known Issue

The Price: High to Low sorting test identifies a sorting defect in the application. See [BUG_REPORT.md](BUG_REPORT.md) for details.

## Documentation

- [TEST_CASES.md](TEST_CASES.md): Automated test scenarios and results
- [BUG_REPORT.md](BUG_REPORT.md): Known application defects

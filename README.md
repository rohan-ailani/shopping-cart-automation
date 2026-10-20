# Shopping Cart Automation Framework

## Overview

A UI test automation framework built with **WebdriverIO, TypeScript, and Mocha** to validate the functionality of a shopping cart web application.

The project uses the Page Object Model (POM), reusable page interactions, data-driven testing, and automated assertions to support maintainable end-to-end testing.

**Application under test:** https://qa-task--oyettijon.replit.app

**Repository:** https://github.com/rohan-ailani/shopping-cart-automation

## Technology Stack

- WebdriverIO for browser automation
- TypeScript for test development
- Mocha for test organization and execution
- expect-webdriverio for assertions
- Page Object Model for reusable page interactions
- JSON for external test data
- Chrome for browser execution

## Project Structure

```text
shopping-cart-automation/
├── src/
│   ├── data/
│   │   └── accounts.json
│   ├── pages/
│   │   ├── loginPage.ts
│   │   └── storePage.ts
│   └── specs/
│       └── accessPage.ts
├── wdio.conf.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── TEST_CASES.md
```

### Key Files

- `src/data/accounts.json`: Practice account test data and expected login outcomes.
- `src/pages/loginPage.ts`: Login page interactions, practice account selection, login, and logout.
- `src/pages/storePage.ts`: Store page functionality as the framework develops.
- `src/specs/accessPage.ts`: Automated login page and account access tests.
- `wdio.conf.ts`: WebdriverIO configuration.
- `tsconfig.json`: TypeScript compiler configuration.
- `TEST_CASES.md`: Detailed test cases, steps, expected results, and test coverage.

## Prerequisites

Install the following:

- Node.js and npm
- Git
- Google Chrome

## Bug Reports

See [BUG_REPORT.md](BUG_REPORT.md) for documented application defects.

##
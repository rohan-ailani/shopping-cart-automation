## Executive Summary

This project demonstrates a maintainable UI test automation framework built with WebdriverIO, TypeScript, and Mocha using the Page Object Model (POM).

The framework validates key shopping workflows, including login and access control, product filtering and sorting, cart management, checkout validation, order completion, and mobile-responsive layouts. It uses reusable page objects, JSON-based test data, and stable `data-test` selectors to support readable, maintainable, and reliable automated tests.

**Continuous Integration:** GitHub Actions is configured to run the WebdriverIO test suite automatically on pushes to `main` and pull requests targeting `main`, with an option to trigger runs manually. This integrates automated regression testing into the development workflow and provides execution results to help identify issues early.

The latest full-suite execution completed **27 tests, with 25 passing and 2 failing**. The two failures reproduce documented application defects involving high-to-low price sorting and adding the Bolt T-Shirt to the cart. Both regression tests are intentionally retained to verify the issues once fixes are available.

Supporting documentation includes test cases, execution results, and detailed bug reports with reproduction steps and regression considerations.

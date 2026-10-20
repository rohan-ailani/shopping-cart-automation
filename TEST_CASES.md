# Test Cases: Shopping Cart Automation

## 1. Purpose

This document describes the test cases implemented in the Shopping Cart Automation Framework.

The initial test suite focuses on login page validation, practice account credential population, authentication outcomes, inventory page visibility, and logout.

**Application under test:** https://qa-task--oyettijon.replit.app

**Test framework:** WebdriverIO, TypeScript, Mocha

## 2. Test Data

The practice account data is maintained in `src/data/accounts.json`.

| Username | Description | Expected outcome |
|---|---|---|
| `fern_signal` | Shopper | Login allowed |
| `quiet_lock` | Locked account | Login denied |
| `lens_warp` | Image variation | Login allowed |
| `count_echo` | Cart badge | Login allowed |

These outcomes represent the current expected behaviour configured in the test data.

## 3. Test Cases

### TC-LOGIN-001: Verify login page navigation

**Objective:** Confirm that the application login page loads.

**Preconditions:** The application is available.

**Steps:**
1. Navigate to the application.
2. Verify that the page body is displayed.
3. Retrieve the current browser URL.
4. Verify that the URL contains the expected application URL.

**Expected result:** The application loads successfully and the expected URL is present.

**Automation status:** Automated.

### TC-LOGIN-002: Inspect login form elements

**Objective:** Identify the login page's input fields and buttons.

**Preconditions:** The login page is loaded.

**Steps:**
1. Locate all input fields.
2. Log each input's type, name, placeholder, test ID, and accessible label.
3. Locate all buttons.
4. Log each button's text, test ID, and accessible label.

**Expected result:** The discovered form elements and their identifying attributes are logged.

**Automation status:** Automated diagnostic.

**Note:** The current test inspects and logs the elements; it does not assert that every expected element exists.

### TC-LOGIN-003: Verify practice account credential population

**Objective:** Confirm that selecting the Shopper practice account populates the login form.

**Preconditions:** The login page is loaded.

**Test data:**
- Username: `fern_signal`
- Password: `test_sauce`

**Steps:**
1. Select the Shopper practice account.
2. Locate the username input.
3. Locate the password input.
4. Verify that the username matches the expected value.
5. Verify that the password matches the expected value.

**Expected result:** Both input fields contain the expected credentials.

**Automation status:** Automated.

### TC-LOGIN-004: Verify Shopper account login and logout

**Objective:** Confirm that the Shopper account can access the inventory page and log out.

**Preconditions:** The login page is loaded.

**Test data:** `fern_signal`

**Steps:**
1. Select the Shopper practice account.
2. Click the login button.
3. Verify navigation to the inventory page.
4. Verify that the inventory page element is displayed.
5. Click the logout button.
6. Verify that the browser returns to the login page.

**Expected result:** The account logs in successfully, the inventory page is visible, and logout returns the user to the login page.

**Automation status:** Automated through the data-driven account test.

### TC-LOGIN-005: Verify locked account login is denied

**Objective:** Confirm that the locked account cannot access the inventory page.

**Preconditions:** The login page is loaded.

**Test data:** `quiet_lock`

**Steps:**
1. Select the locked practice account.
2. Click the login button.
3. Verify that the browser remains on the login page.
4. Verify that the login error element is displayed.
5. Verify the exact error message.

**Expected result:** Login is rejected, and the following message is displayed:

`Epic sadface below — Sorry, this user has been locked out.`

**Automation status:** Automated.

### TC-LOGIN-006: Verify Image variation account login and logout

**Objective:** Confirm that the Image variation account can access the inventory page and log out.

**Preconditions:** The login page is loaded.

**Test data:** `lens_warp`

**Steps:**
1. Select the Image variation practice account.
2. Click the login button.
3. Verify navigation to the inventory page.
4. Verify that the inventory page element is displayed.
5. Click the logout button.
6. Verify that the browser returns to the login page.

**Expected result:** The account logs in successfully, the inventory page is visible, and logout returns the user to the login page.

**Automation status:** Automated.

### TC-LOGIN-007: Verify Cart badge account login and logout

**Objective:** Confirm that the Cart badge account can access the inventory page and log out.

**Preconditions:** The login page is loaded.

**Test data:** `count_echo`

**Steps:**
1. Select the Cart badge practice account.
2. Click the login button.
3. Verify navigation to the inventory page.
4. Verify that the inventory page element is displayed.
5. Click the logout button.
6. Verify that the browser returns to the login page.

**Expected result:** The account logs in successfully, the inventory page is visible, and logout returns the user to the login page.

**Automation status:** Automated.

## 4. Current Coverage Summary

| Area | Coverage |
|---|---|
| Login page navigation | Automated |
| Login form element inspection | Automated diagnostic |
| Practice account credential population | Automated |
| Successful authentication | Automated |
| Locked account rejection | Automated |
| Inventory page visibility | Automated |
| Logout after successful login | Automated |

**Latest recorded execution:** 7 passing tests.

The execution result reflects the latest run reported during development. Run the suite again to confirm the current result.

## 5. Planned Test Cases

The following scenarios are not yet documented as completed automation and remain candidates for future development:

- Login with an incorrect password
- Login with an unknown username
- Submit empty username and password fields
- Validate required-field messages
- Verify product count and product listing
- Validate category filters and sorting
- Verify initial cart state
- Add and remove products from the cart
- Increase and decrease item quantities
- Validate subtotal, tax, and grand total calculations
- Complete checkout and verify order summary
- Verify order completion and confirmation
- Validate selected mobile responsive behaviours

### TC-PRODUCT-001: Verify Total Product Count

**Objective:** Confirm that the Products page displays the expected total number of products.

**Preconditions:** The user is logged in successfully with the Shopper practice account.

**Test data:**
- Expected product count: `12`

**Steps:**
1. Log in using the Shopper practice account.
2. Verify that the Products page is displayed.
3. Locate the product cards.
4. Count the displayed products.
5. Compare the actual count against the expected count.

**Expected result:** The Products page displays exactly 12 products.

**Automation status:** Automated.

---

### TC-PRODUCT-002: Verify Product Filtering by Category

**Objective:** Confirm that selecting each available category displays only the products belonging to that category.

**Preconditions:** The user is logged in successfully and the Products page is displayed.

**Test data:**

| Category | Expected product count |
|---|---:|
| Apparel | 5 |
| Accessories | 4 |
| Gear | 2 |
| Books | 1 |

**Steps:**
1. Log in using the Shopper practice account.
2. Locate the category filter.
3. Select Apparel.
4. Verify that five products are displayed.
5. Repeat the filtering process for Accessories, Gear, and Books.
6. Verify the displayed product count for each category.

**Expected result:** Each category displays the expected number of products. The category filter updates the product listing according to the selected category.

**Automation status:** Automated.

**Test data source:** `src/data/categories.json`

---

### TC-PRODUCT-003: Verify Product Sorting by Name, A to Z

**Objective:** Confirm that products can be sorted alphabetically in ascending order by product name.

**Preconditions:** The user is logged in successfully and all products are displayed.

**Test data:**
- Sorting option: `Name: A to Z`
- Option value: `name-az`
- Expected direction: Ascending alphabetical order

**Steps:**
1. Log in using the Shopper practice account.
2. Locate the product sorting dropdown.
3. Select `Name: A to Z`.
4. Retrieve the displayed product names in their current order.
5. Compare the displayed order with the expected alphabetical order.

**Expected result:** Product names are displayed in ascending alphabetical order.

**Automation status:** Automated.

---

### TC-PRODUCT-004: Verify Product Sorting by Name, Z to A

**Objective:** Confirm that products can be sorted alphabetically in descending order by product name.

**Preconditions:** The user is logged in successfully and all products are displayed.

**Test data:**
- Sorting option: `Name: Z to A`
- Option value: `name-za`
- Expected direction: Descending alphabetical order

**Steps:**
1. Log in using the Shopper practice account.
2. Locate the product sorting dropdown.
3. Select `Name: Z to A`.
4. Retrieve the displayed product names in their current order.
5. Compare the displayed order with the expected reverse alphabetical order.

**Expected result:** Product names are displayed in descending alphabetical order.

**Automation status:** Automated.

---

### TC-PRODUCT-005: Verify Product Sorting by Price, Low to High

**Objective:** Confirm that products can be sorted by price in ascending order.

**Preconditions:** The user is logged in successfully and all products are displayed.

**Test data:**
- Sorting option: `Price: Low to High`
- Option value: `price-low`
- Expected direction: Ascending numerical order

**Steps:**
1. Log in using the Shopper practice account.
2. Locate the product sorting dropdown.
3. Select `Price: Low to High`.
4. Retrieve the displayed product prices.
5. Compare the displayed order with the expected ascending numerical order.

**Expected result:** Products are displayed from the lowest price to the highest price.

**Automation status:** Automated.

---

### TC-PRODUCT-006: Verify Product Sorting by Price, High to Low

**Objective:** Confirm that products can be sorted by price in descending order.

**Preconditions:** The user is logged in successfully and all products are displayed.

**Test data:**
- Sorting option: `Price: High to Low`
- Option value: `price-high`
- Expected direction: Descending numerical order

**Steps:**
1. Log in using the Shopper practice account.
2. Locate the product sorting dropdown.
3. Select `Price: High to Low`.
4. Retrieve the displayed product prices.
5. Compare the displayed order with the expected descending numerical order.

**Expected result:** Products are displayed from the highest price to the lowest price.

**Actual result:** Products remain displayed in ascending price order, from lowest to highest.

**Automation status:** Automated.

**Test result:** Failed due to a known application defect.

**Defect reference:** BUG-001 in `BUG_REPORT.md`.

**Notes:** The automated test intentionally retains the expected descending order. The assertion should not be changed to match the incorrect application behavior.

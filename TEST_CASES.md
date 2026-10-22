# Test Cases

## Login and Access Control

| ID | Test Case | Expected Result |
|---|---|---|
| TC-LOGIN-001 | Open the login page | Login page is displayed |
| TC-LOGIN-002 | Validate login form elements | Expected form elements are present |
| TC-LOGIN-003 | Populate credentials using a practice account | Correct credentials are populated |
| TC-LOGIN-004 | Log in with a valid account | User successfully logs in |
| TC-LOGIN-005 | Log in with a locked account | Access is denied and an error is displayed |
| TC-LOGIN-006 | Verify inventory page access | Products page is displayed after login |
| TC-LOGIN-007 | Log out | User returns to the login page |

## Products Page

| ID | Test Case | Expected Result |
|---|---|---|
| TC-PRODUCT-001 | Verify product count | 12 products are displayed |
| TC-PRODUCT-002 | Filter by category | Correct products are displayed for each category |
| TC-PRODUCT-003 | Sort products by name A to Z | Products appear in ascending alphabetical order |
| TC-PRODUCT-004 | Sort products by name Z to A | Products appear in descending alphabetical order |
| TC-PRODUCT-005 | Sort prices Low to High | Prices appear in ascending order |
| TC-PRODUCT-006 | Sort prices High to Low | Prices appear in descending order |

**Known issue:** TC-PRODUCT-006 detects a sorting defect. See [BUG_REPORT.md](BUG_REPORT.md).

## Shopping Cart

| ID | Test Case | Expected Result |
|---|---|---|
| TC-CART-001 | Verify initial cart state | Cart is empty and badge count is zero |
| TC-CART-002 | Add selected products to the cart | Expected products and item count are displayed |
| TC-CART-003 | Remove a product from the cart | Product is removed and counts are updated |
| TC-CART-004 | Increase and decrease product quantity | Quantity updates correctly |
| TC-CART-005 | Verify subtotal, tax, and grand total | Subtotal matches item prices and quantities, tax is calculated at 8%, and grand total is correct |
| TC-CART-006 | Add Bolt T-Shirt to the cart | Product is added and the cart badge updates to reflect the addition |

**Known issue:** TC-CART-006 reproduces a defect where the Bolt T-Shirt Add to Cart button does not add the product. See [BUG_REPORT.md](BUG_REPORT.md). Keep this test as a regression test; do not weaken the expected result to make it pass.

## Checkout Tests

| ID | Test Scenario | Test Steps | Expected Result |
|---|---|---|---|
| TC-CHK-001 | Verify checkout page and shipping form | Navigate to checkout from the cart | Checkout page, shipping fields, and Continue button are displayed |
| TC-CHK-002 | Verify order preview and total | Open checkout with a product in the cart | Order preview and formatted total are displayed |
| TC-CHK-003 | Verify navigation back to cart | Click the back-to-cart link on checkout | User returns to the cart page |
| TC-CHK-004 | Submit valid shipping information | Enter a valid first name, last name, and postal code; click Continue | Order summary is displayed with the expected product, quantity, shipping details, subtotal, tax, and total |
| TC-CHK-005 | Complete an order and verify confirmation | Submit valid shipping information, then click Finish | Order confirmation message and Continue Shopping button are displayed |
| TC-CHK-006 | Verify validation when all shipping fields are empty | Leave first name, last name, and postal code empty; click Continue | Validation errors appear for all required fields; user remains on checkout page |
| TC-CHK-007 | Verify validation when first name is missing | Enter last name and postal code; leave first name empty; click Continue | First name validation error appears; user remains on checkout page |
| TC-CHK-008 | Verify validation when last name is missing | Enter first name and postal code; leave last name empty; click Continue | Last name validation error appears; user remains on checkout page |
| TC-CHK-009 | Verify validation when postal code is missing | Enter first and last name; leave postal code empty; click Continue | Postal code validation error appears; user remains on checkout page |

## Mobile Responsive Tests

| ID | Test Case | Expected Result |
|---|---|---|
| TC-MOB-001 | Verify login and inventory page at a mobile viewport | Login form and inventory page are usable at a 375 × 812 viewport, with no horizontal overflow |
| TC-MOB-002 | Verify cart and checkout flow at a mobile viewport | Products can be added to the cart, totals are displayed, shipping information can be submitted, and order confirmation is displayed without horizontal overflow |

**Note:** These tests resize the browser viewport to a mobile-sized dimension. They do not represent full physical-device or device-emulation testing.

## Execution Notes

**Latest full-suite run:** 25 tests passed and 2 tests failed across 5 spec files.

- **Login and access control:** 7 tests passed.
- **Products page:** 2 tests passed and 1 test failed. The sorting regression test failed for the **Price: High to Low** option, reproducing BUG-001.
- **Shopping cart:** 5 tests passed and 1 test failed. The Bolt T-Shirt Add to Cart test reproduced BUG-002.
- **Checkout:** 9 tests passed.
- **Mobile responsive:** 2 tests passed.

**Known defects:** BUG-001 (Price: High to Low sorting) and BUG-002 (Bolt T-Shirt Add to Cart) remain open pending application fixes and retesting.

Tests for known defects are intentionally retained as regression tests. Their assertions should not be weakened to produce a passing result.

**Note:** Results reflect the latest reported full-suite run. Re-run the affected tests after application or automation changes.

## Future Test Ideas

- Invalid login credentials and empty login fields.
- Cart persistence after navigation or page refresh.
- Additional checkout edge cases and order confirmation validation.
- Additional viewport sizes and responsive layout checks.
- Additional product and quantity combinations for pricing calculations.


## Future Test Ideas

- Invalid login credentials and empty login fields
- Cart persistence after navigation or page refresh
- Additional checkout edge cases and order confirmation validation
- Additional viewport sizes and responsive layout checks
- Additional product and quantity combinations for pricing calculations
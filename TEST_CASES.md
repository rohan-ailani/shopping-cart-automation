
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
| TC-PRODUCT-006 | Sort prices High to Low | Prices should appear in descending order |

**Known issue:** TC-PRODUCT-006 detects a sorting defect. See [BUG_REPORT.md](BUG_REPORT.md).

## Shopping Cart

| ID | Test Case | Expected Result |
|---|---|---|
| TC-CART-001 | Verify initial cart state | Cart is empty and badge count is zero |
| TC-CART-002 | Add selected products to the cart | Expected products and item count are displayed |
| TC-CART-003 | Remove a product from the cart | Product is removed and counts are updated |
| TC-CART-004 | Increase and decrease product quantity | Quantity updates correctly |

## Execution Notes

- Login and access control: 7 tests previously reported passing.
- Shopping cart: 4 tests passed in the latest reported run.
- Products page: Price High to Low sorting has a known defect.

Run the test suites again to confirm the latest results.

## Planned Tests

- Invalid login credentials and empty fields
- Cart persistence between pages
- Cart subtotal and total calculations
- Checkout and order confirmation
- Responsive layout checks

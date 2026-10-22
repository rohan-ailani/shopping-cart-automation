# Bug Report

## BUG-001: Price: High to Low Sort Displays Products in Ascending Price Order

**Status:** Open  
**Severity:** Medium  
**Priority:** High  
**Category:** Products Page / Sorting  
**Environment:** Chrome, WebdriverIO + TypeScript  
**Application:** [Shopping Cart QA Task](https://qa-task--oyettijon.replit.app/)

### Summary

Selecting the **Price: High to Low** sorting option displays products from lowest price to highest price instead of highest to lowest. The sorting behavior does not match the selected option.

### Preconditions

- The application is accessible.
- The user is logged in with the Shopper practice account.
- The Products page displays the available products.

### Steps to Reproduce

1. Open the application and log in using the Shopper practice account.
2. Navigate to the Products page.
3. Locate the product sorting dropdown.
4. Select **Price: High to Low**.
5. Observe the order of the displayed product prices.

### Expected Result

Products should be sorted by price in descending order, from highest to lowest.

Example:

`$49.99, $44.99, $29.99, $24.99, ... , $4.99`

### Actual Result

Products remain sorted in ascending order, from lowest to highest.

Observed order:

`$4.99, $7.99, $8.99, $9.99, $12.99, $14.99, $15.99, $15.99, $24.99, $29.99, $44.99, $49.99`

### Impact

Users who select **Price: High to Low** cannot reliably find the most expensive products first. This reduces the accuracy and usability of the product sorting feature.

### Testing Evidence

The automated WebdriverIO sorting test fails when comparing the expected descending price sequence against the actual ascending price sequence.

- **Test suite:** `src/specs/productsPage.ts`
- **Test case:** `should sort products correctly using every sorting option`
- **Assertion:** Expected descending prices; received ascending prices.
- **Result:** Failed

### Recommendation

Investigate the application's price-sorting logic and ensure the `price-high` option sorts product prices in descending order.

### Notes

The **Price: Low to High** option should continue to sort products in ascending order. Verify that correcting the descending sort does not introduce a regression in the ascending sort or the name-sorting options.

### BUG-002: Bolt T-Shirt Add to Cart Button Is Unresponsive

- **Severity:** High
- **Priority:** High
- **Status:** Open
- **Area:** Products Page

**Steps to Reproduce**
1. Log in with a valid practice account.
2. Navigate to the products page.
3. Locate the Bolt T-Shirt ($15.99).
4. Click the **Add to Cart** button.

**Expected Result**

The product is added to the cart, the cart badge updates, and the button reflects the updated state.

**Actual Result**

Clicking the Add to Cart button produces no visible response. The product is not added to the cart.

**Automation Evidence**
- Automated test: `should add the Bolt T-Shirt to the cart`
- Test file: `src/specs/addToCart.ts`
- Result: Failed
- Expected cart badge count: `1`
- Actual cart badge count: `0`
- Other cart tests: 5 passed

**Conclusion:** The automated test reproduces the reported issue. Clicking Add to Cart for the Bolt T-Shirt does not update the cart badge as expected.

**Affected Element**

`[data-test="add-to-cart-bolt-t-shirt"]`

**Notes**

Verify whether the defect is isolated to the Bolt T-Shirt or affects other products.
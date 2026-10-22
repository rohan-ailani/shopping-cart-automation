# Bug Report

## BUG-001: Price: High to Low Sort Displays Products in Ascending Price Order

**Status:** Open  
**Severity:** Medium  
**Priority:** High  
**Category:** Products Page / Sorting  
**Environment:** Chrome, WebdriverIO, TypeScript  
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

Products are displayed in ascending price order, from lowest to highest.

Observed order:

`$4.99, $7.99, $8.99, $9.99, $12.99, $14.99, $15.99, $15.99, $24.99, $29.99, $44.99, $49.99`

### Impact

Users who select **Price: High to Low** cannot reliably find the most expensive products first. This reduces the accuracy and usability of the product sorting feature.

### Testing Evidence

- **Test suite:** `src/specs/productsPage.ts`
- **Test case:** `should sort products correctly using every sorting option`
- **Assertion:** Expected descending prices but received ascending prices.
- **Result:** Failed

The automated test reproduces the incorrect sorting behavior.

### Recommendation

Investigate the application's price-sorting logic and ensure the `price-high` option sorts product prices in descending order.

### Regression Considerations

After fixing the defect, verify that:

- **Price: High to Low** sorts prices in descending order.
- **Price: Low to High** continues to sort prices in ascending order.
- Both name-sorting options continue to work correctly.

---

## BUG-002: Bolt T-Shirt Add to Cart Button Is Unresponsive

**Status:** Open  
**Severity:** High  
**Priority:** High  
**Category:** Products Page / Shopping Cart  
**Environment:** Chrome, WebdriverIO, TypeScript  
**Application:** [Shopping Cart QA Task](https://qa-task--oyettijon.replit.app/)

### Summary

Clicking the **Add to Cart** button for the Bolt T-Shirt ($15.99) produces no visible response. The product is not added to the shopping cart.

### Preconditions

- The application is accessible.
- The user is logged in with a valid practice account.
- The Products page displays the Bolt T-Shirt.

### Steps to Reproduce

1. Log in with a valid practice account.
2. Navigate to the Products page.
3. Locate the Bolt T-Shirt priced at $15.99.
4. Click its **Add to Cart** button.
5. Observe the cart badge and product button state.

### Expected Result

- The product is added to the cart.
- The cart badge updates to reflect the addition.
- The button reflects the updated cart state, if applicable.

### Actual Result

Clicking the Add to Cart button produces no visible response. The product is not added to the cart, and the cart badge remains at zero.

### Impact

Users cannot add the Bolt T-Shirt to their cart through the product listing. This prevents the normal purchase flow for the affected product.

### Testing Evidence

- **Test file:** `src/specs/addToCart.ts`
- **Test case:** `should add the Bolt T-Shirt to the cart`
- **Affected element:** `[data-test="add-to-cart-bolt-t-shirt"]`
- **Expected cart badge count:** `1`
- **Actual cart badge count:** `0`
- **Result:** Failed

The automated test reproduces the issue. The other five shopping cart tests passed in the reported run.

### Recommendation

Investigate the Bolt T-Shirt's Add to Cart event handling and cart update logic. Confirm that clicking the button adds the correct product and updates the cart badge and button state.

### Regression Considerations

After fixing the defect, verify that:

- The Bolt T-Shirt can be added to the cart.
- The cart badge reflects the updated cart count.
- The product's cart state updates correctly.
- Adding and removing other products continues to work.
- Quantity changes and subtotal, tax, and total calculations remain correct.

### Further Investigation

Verify whether the defect is isolated to the Bolt T-Shirt or affects other products.

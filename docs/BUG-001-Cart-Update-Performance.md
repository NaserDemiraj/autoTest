BUG-001 — Cart takes excessively long to update after increasing product quantity

Environment
- Application: Shopware 6 Storefront – Solution25 Demo Store
- Browser: Brave
- Operating System: Windows
- Test Type: Manual Functional Testing

Product
- Westin Test 12 cm

Severity: Medium

Severity Justification
The issue does not prevent the user from completing a purchase because the quantity and total eventually become correct.
However, the unusually long update time makes the storefront appear slow or unresponsive. This may cause users to believe that their action was not registered and potentially click the quantity control multiple times.

Preconditions
- The Solution25 Shopware 6 demo storefront is accessible.
- The product “Westin Test 12 cm” is available.
- The product has been added to the cart.
- Product quantity is initially set to 1.

Steps to Reproduce
1. Open the Solution25 Shopware 6 demo storefront.
2. Search for “Westin Test 12 cm”.
3. Open the product.
4. Add the product to the cart.
5. Open the cart.
6. Increase the product quantity from 1 to 2.
7. Observe the cart while the quantity is being updated.

Expected Result
- The cart should update promptly after the quantity is changed.
- The expected behavior is:
  - Quantity changes from 1 to 2.
  - Cart total is recalculated correctly.
  - The update completes without an unusually long loading period.
  - The user receives clear feedback that the action has been processed.

Actual Result
- The quantity and total eventually become correct, but the cart takes an unusually long time to finish loading/updating after the quantity is increased.
- During this period, the interface can appear unresponsive or as if the action has not been processed.

Reproducibility: Yes — observed during manual testing.

User Impact
- The issue can negatively affect the shopping experience because:
  - Users may think the quantity change failed.
  - Users may click the quantity control repeatedly.
  - Users have to wait unnecessarily.
  - The storefront may appear slow or unreliable.
  - Repeated interactions could potentially lead to unintended quantity changes if requests are processed asynchronously.

Suggested Investigation
- Cart quantity-update request performance.
- Frontend loading/update handling.
- Network request and response times.
- Backend/cart processing time.
- Whether an unnecessary page or cart refresh is being triggered.
- Whether the UI can update the quantity and total without waiting for a full cart refresh.

Evidence
- Attach a screenshot or short screen recording showing the cart taking an unusually long time to finish updating after changing the quantity from 1 to 2.

Bug Classification
- Type: Performance / Usability
- Severity: Medium
- Priority: Medium–High

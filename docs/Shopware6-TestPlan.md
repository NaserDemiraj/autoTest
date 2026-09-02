Shopware 6 Storefront — Manual Test Plan

QA / Automation Tester Intern – Practical Exercise

Test Information
Environment: Solution25 Shopware 6 Demo Store
Test Type: Manual Functional Testing
Application: Shopware 6 Storefront
Tested Flow: Product Browsing → Cart → Guest Checkout → Order

Test Cases

TC-001 — Search and Open a Product
Preconditions
Storefront is accessible.

Steps
1. Open the storefront.
2. Search for “Westin Test 12 cm”.
3. Open the product from the search results.

Expected Result
- The relevant product is displayed in the search results.
- The product detail page opens successfully.

Priority: High

TC-002 — Add Product to Cart
Preconditions
Product detail page is accessible.
Product is available.

Steps
1. Open “Westin Test 12 cm”.
2. Click Add to Cart.
3. Open the cart.

Expected Result
- The product is successfully added to the cart.
- The correct product and price are displayed.

Priority: High

TC-003 — Complete Guest Checkout Using Cash on Delivery
Preconditions
Storefront is accessible.
A product is available in the cart.
User is not logged in.

Steps
1. Open the cart.
2. Click Checkout.
3. Continue as a Guest without creating an account.
4. Enter valid customer information.
5. Enter valid delivery and billing information.
6. Select Cash on Delivery as the payment method.
7. Review the order.
8. Place/confirm the order.

Expected Result
- Guest checkout completes successfully without requiring account creation.
- The selected product and quantity are correct.
- Customer, delivery and billing information are correct.
- Cash on Delivery is selected successfully.
- The order is placed successfully.
- An order confirmation page and order number are displayed.

Priority: High

TC-004 — Change Product Quantity
Preconditions
Product is in the cart with quantity 1.

Steps
1. Open the cart.
2. Increase the product quantity from 1 to 2.
3. Observe the cart while it updates.

Expected Result
- Product quantity changes to 2.
- Cart total is recalculated correctly.
- Update should complete within a reasonable amount of time.

Observed Result
- Quantity and price eventually became correct.
- The cart took an unusually long time to finish loading/updating.

Priority: High

TC-005 — Remove Product from Cart
Preconditions
Product is available in the cart.

Steps
1. Open the cart.
2. Remove the product.

Expected Result
- Product is removed successfully.
- Cart contents and total are updated correctly.

Priority: Medium

TC-006 — Change Product Size
Preconditions
Product has multiple size variants.

Steps
1. Open the product page.
2. Select a different available size.

Expected Result
- The selected size changes successfully.
- The selected variant is reflected correctly.

Observed Result
- Size change worked successfully.
- The page performs a full-page reload after changing the size.

Priority: Medium

TC-007 — Filter Products by Price
Preconditions
Product listing contains products with different prices.

Steps
1. Open a product listing.
2. Apply a price filter.

Expected Result
- Only products matching the selected price range are displayed.

Priority: Medium

TC-008 — Filter Products by Color and Size
Preconditions
Product listing contains filterable products.

Steps
1. Open a product listing.
2. Apply a color filter.
3. Apply a size filter.

Expected Result
- Displayed products match the selected color and size filters.

Priority: Medium

TC-009 — Add Product to Favourites
Preconditions
Product is available.

Steps
1. Open a product.
2. Add the product to favourites.
3. Check the favourites icon.

Expected Result
- Product is added to favourites.
- Favourites count is updated.

Priority: Medium

TC-010 — Verify Order History
Preconditions
A successful order has been placed.

Steps
1. Open the user Profile.
2. Open Orders.

Expected Result
- The completed order is displayed in the order history.

Priority: High

TC-011 — User Authentication
Preconditions
Authentication functionality is available.

Steps
1. Test valid login.
2. Test user registration.
3. Test logout.

Expected Result
- Login works successfully.
- Registration works successfully.
- Logout works successfully.

Priority: Medium

TC-012 — Invalid Email Format During Checkout (Negative)
Preconditions
Checkout page is accessible.

Steps
1. Enter an invalid email address such as test@.
2. Attempt to continue with checkout.

Expected Result
- Invalid email format is rejected.
- The user cannot continue until a valid email address is entered.
- Appropriate validation is displayed.

Priority: High

TC-013 — Invalid Discount Code (Negative)
Preconditions
Cart or checkout page is accessible.

Steps
1. Enter an invalid discount code.
2. Apply the discount code.

Expected Result
- The invalid discount code is rejected.
- No discount is applied to the order.
- An appropriate error/validation message is displayed.

Priority: Medium

TC-014 — Checkout With Missing Required Information (Negative)
Preconditions
Checkout page is accessible.

Steps
1. Leave a required checkout field empty.
2. Attempt to continue with checkout.

Expected Result
- Required-field validation is displayed.
- Checkout cannot continue until the required information is provided.

Priority: High

Edge Cases and Observations

TC-015 — Very Long Customer Name
Preconditions
Checkout form is accessible.

Steps
1. Enter a customer name longer than 255 characters.
2. Attempt to continue.

Expected Result
- The application prevents invalid input from being submitted.

Observed Result
- The application displayed: “The input must be no longer than 255 characters.”

TC-016 — Special Characters in Input Fields
Preconditions
Checkout/address forms are accessible.

Steps
1. Enter supported special characters in customer and address fields.
2. Continue through the form.

Expected Result
- Special characters are either accepted or properly validated.
- The form does not break or produce unexpected behavior.

Observed Result
- Special characters could be entered in customer, address and other form fields without breaking the form.

TC-017 — Non-Standard Street / Postal Code
Preconditions
Checkout/address form is accessible.

Steps
1. Enter alphabetic/random values in the street field.
2. Enter alphabetic/random values in the postal code field.
3. Attempt to continue.

Expected Result
- Input should be validated according to the expected address and postal-code format.

Observed Result
- Random alphabetic values were accepted.

Note: Documented as an observation because exact market-specific validation requirements were not provided.

TC-018 — Minimal Values in Address Fields
Preconditions
Checkout/address form is accessible.

Steps
1. Enter one-character values in address/customer fields.
2. Attempt to continue.

Expected Result
- Appropriate minimum-length validation should be applied where required.

Observed Result
- One-character values could be entered and accepted in several fields.

Note: Documented as an observation because specific minimum-length requirements were not provided.

Additional Testing Observations

- Cart quantity updates eventually produced the correct quantity and price, but the update/loading process was unusually slow.
- Changing the product size worked correctly but triggered a full-page reload.
- Price filtering worked correctly.
- Color and size filtering worked correctly.
- Adding products to favourites worked and the favourites count was updated.
- Login, registration and logout worked correctly.
- Completed orders were displayed under Profile → Orders.
- Address and postal-code fields accepted arbitrary alphabetic values; this was documented as an observation because exact market-specific validation requirements were not available.

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: guest-checkout.spec.ts >> guest checkout full flow
- Location: tests\guest-checkout.spec.ts:7:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Add to Cart').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Add to Cart').first()

```

```yaml
- main:
  - heading "demo.opencart.com" [level=1]
  - heading "Performing security verification" [level=2]
  - paragraph: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
- contentinfo:
  - text: "Ray ID:"
  - code: a34be52d290dbc1a
  - text: Performance and Security by
  - link "Cloudflare, opens in a new tab":
    - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=j
    - text: Cloudflare
  - link "Privacy, opens in a new tab":
    - /url: https://www.cloudflare.com/privacypolicy/
    - text: Privacy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = process.env.BASE_URL || 'https://demo.opencart.com/';
  4  | 
  5  | // This test assumes the demo site structure; adjust selectors for your target store.
  6  | 
  7  | test('guest checkout full flow', async ({ page }) => {
  8  |   // Open storefront
  9  |   await page.goto(BASE_URL);
  10 |   await expect(page).toHaveURL(/demo.opencart.com/);
  11 | 
  12 |   // Add first product to cart (assuming product list has Add to Cart buttons)
  13 |   const firstAdd = page.locator('text=Add to Cart').first();
> 14 |   await expect(firstAdd).toBeVisible();
     |                          ^ Error: expect(locator).toBeVisible() failed
  15 |   await firstAdd.click();
  16 | 
  17 |   // Open cart
  18 |   await page.locator('a:has-text("shopping cart")').first().click();
  19 |   await expect(page).toHaveURL(/route=checkout\/cart/);
  20 |   await expect(page.locator('h1')).toContainText(/Shopping Cart/i);
  21 | 
  22 |   // Proceed to checkout
  23 |   await page.locator('a:has-text("Checkout")').click();
  24 |   await expect(page).toHaveURL(/route=checkout\/checkout/);
  25 | 
  26 |   // Choose Guest Checkout option
  27 |   await page.locator('input[name="account"][value="guest"]').check();
  28 |   await page.locator('input[value="Continue"]').nth(0).click();
  29 | 
  30 |   // Fill billing details
  31 |   await page.fill('input[name="firstname"]', 'Test');
  32 |   await page.fill('input[name="lastname"]', 'User');
  33 |   await page.fill('input[name="email"]', 'test.user+' + Date.now() + '@example.com');
  34 |   await page.fill('input[name="telephone"]', '1234567890');
  35 |   await page.fill('input[name="address_1"]', '123 Testing Ave');
  36 |   await page.fill('input[name="city"]', 'Testville');
  37 |   await page.fill('input[name="postcode"]', '12345');
  38 |   await page.selectOption('select[name="country_id"]', '223'); // United States (may vary)
  39 |   await page.selectOption('select[name="zone_id"]', '3613');
  40 |   await page.locator('input[value="Continue"]').nth(1).click();
  41 | 
  42 |   // Delivery method continue
  43 |   await page.locator('input[value="Continue"]').nth(2).click();
  44 | 
  45 |   // Agree to terms if present and continue to payment
  46 |   const agree = page.locator('input[name="agree"]');
  47 |   if (await agree.count() > 0) {
  48 |     await agree.check();
  49 |   }
  50 |   await page.locator('input[value="Continue"]').nth(3).click();
  51 | 
  52 |   // Confirm order (may be a button with text 'Confirm Order')
  53 |   const confirm = page.locator('input[value="Confirm Order"], button:has-text("Confirm Order")');
  54 |   await expect(confirm).toBeVisible();
  55 |   await confirm.click();
  56 | 
  57 |   // Verify order confirmation
  58 |   await expect(page.locator('h1')).toContainText(/Your Order Has Been Placed|Your order has been placed/i);
  59 | });
  60 | 
```
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://automationteststore.com/';

// Improved guest checkout flow using accessible selectors and stronger assertions.
test('guest checkout full flow', async ({ page }, testInfo) => {
  // Helper: capture screenshot on failure
  testInfo.attachments = testInfo.attachments || [];
  try {
    // Open storefront
    await page.goto(BASE_URL);
    const baseHost = new URL(BASE_URL).hostname.replace('.', '\\.');
    await expect(page).toHaveURL(new RegExp(baseHost));

    // Navigate directly to a known product page on Automation Test Store
    const productUrl = `${BASE_URL.replace(/\/$/, '')}/index.php?rt=product/product&product_id=50`;
    await page.goto(productUrl);
    await expect(page).toHaveURL(/product\/product/);
    // On product page, try several Add-to-Cart fallbacks
    const productAddLocators = [
      () => page.getByRole('link', { name: /add to cart/i }).first(),
      () => page.getByRole('button', { name: /add to cart/i }).first(),
      () => page.locator('button#button-cart'),
      () => page.locator('button[title*="Add to Cart"]'),
      () => page.locator('input#button-cart'),
      () => page.getByRole('button', { name: /add/i }).first(),
    ];

    let added = false;
    for (const getLoc of productAddLocators) {
      const loc = getLoc();
      if (await loc.count() > 0) {
        try {
          await expect(loc).toBeVisible({ timeout: 3000 });
          await loc.click();
          added = true;
          break;
        } catch {
          // continue
        }
      }
    }
    if (!added) {
      throw new Error('Could not add product to cart from product page with available fallbacks');
    }

    // Open cart by href
    const cartLink = page.locator('a[href*="checkout/cart"]').first();
    await expect(cartLink).toBeVisible({ timeout: 5000 });
    await cartLink.click();
    await expect(page).toHaveURL(/checkout\/cart/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/shopping cart/i);

    // Proceed to checkout
    const checkoutLink = page.getByRole('link', { name: /checkout/i }).first();
    await expect(checkoutLink).toBeVisible();
    await checkoutLink.click();
    await expect(page).toHaveURL(/route=checkout\/checkout/);

    // Choose Guest Checkout option (fallback to name-based locator)
    const guestRadio = page.locator('input[name="account"][value="guest"]');
    await expect(guestRadio).toBeVisible();
    await guestRadio.check();
    await page.getByRole('button', { name: /continue/i }).nth(0).click();

    // Fill billing details (use name attributes but assert visibility first)
    await expect(page.locator('input[name="firstname"]')).toBeVisible();
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="lastname"]', 'User');
    await page.fill('input[name="email"]', `test.user+${Date.now()}@example.com`);
    await page.fill('input[name="telephone"]', '1234567890');
    await page.fill('input[name="address_1"]', '123 Testing Ave');
    await page.fill('input[name="city"]', 'Testville');
    await page.fill('input[name="postcode"]', '12345');

    // Prefer selecting by visible label/value if available
    await page.selectOption('select[name="country_id"]', { label: 'United States' }).catch(() => {});
    await page.selectOption('select[name="zone_id"]', { index: 1 }).catch(() => {});

    // Continue from Billing
    await page.getByRole('button', { name: /continue/i }).nth(1).click();
    await page.waitForTimeout(500); // small pause for dynamic steps

    // Delivery method continue
    await page.getByRole('button', { name: /continue/i }).nth(2).click();

    // Agree to terms if present and continue to payment
    const agree = page.locator('input[name="agree"]');
    if (await agree.count() > 0) await agree.check();
    await page.getByRole('button', { name: /continue/i }).nth(3).click();

    // Confirm order
    const confirm = page.getByRole('button', { name: /confirm order/i }).first();
    await expect(confirm).toBeVisible({ timeout: 10000 });
    await confirm.click();

    // Verify order confirmation (URL or heading)
    await expect(page).toHaveURL(/route=checkout\/success/).catch(async () => {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/your order has been placed|your order was placed/i);
    });
  } catch (err) {
    const screenshot = await page.screenshot({ fullPage: true });
    testInfo.attachments.push({ name: 'failure-screenshot', body: screenshot, contentType: 'image/png' });
    throw err;
  }
});

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://demowebshop.tricentis.com/';

// Demowebshop guest checkout flow
test('guest checkout full flow', async ({ page }, testInfo) => {
  // Helper: capture screenshot on failure
  testInfo.attachments = testInfo.attachments || [];
  try {
    // Navigate to books category and add the first book to cart
    await page.goto(`${BASE_URL.replace(/\/$/, '')}/books`);
    await expect(page).toHaveURL(/\/books/);
    // Open first product detail and click its add-to-cart on the product page
    const firstProduct = page.locator('h2.product-title a').first();
    if (await firstProduct.count() > 0) {
      await firstProduct.click();
      const productAdd = page.locator('button:has-text("Add to cart"), input[value="Add to cart"]').first();
      await expect(productAdd).toBeVisible({ timeout: 10000 });
      await productAdd.click();
    } else {
      // Fallback: click first listing Add to cart
      const addBtn = page.locator('text=Add to cart').first();
      await expect(addBtn).toBeVisible({ timeout: 10000 });
      await addBtn.click();
    }
    // Wait briefly for add-to-cart to process
    await page.waitForTimeout(1000);

    // Wait a moment for add-to-cart AJAX to complete, then navigate to the cart page
    await page.waitForTimeout(1000);
    const cartUrl = `${BASE_URL.replace(/\/$/, '')}/cart`;
    await page.goto(cartUrl);
    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible({ timeout: 10000 });

    // Proceed to checkout
    const checkoutBtn = page.getByRole('button', { name: /checkout/i }).first();
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    // If redirected to login, choose Checkout as Guest or wait for billing form
    const checkoutAsGuest = page.locator('input[value="Checkout as Guest"], button:has-text("Checkout as Guest")');
    // Wait for either the guest option or the billing form to appear
    await Promise.race([
      checkoutAsGuest.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
      page.locator('#BillingNewAddress_FirstName').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    ]);
    if (await checkoutAsGuest.count() > 0 && await checkoutAsGuest.isVisible()) {
      await checkoutAsGuest.first().click();
    }

    // Fill billing details (nopCommerce billing field IDs)
    await expect(page.locator('#BillingNewAddress_FirstName')).toBeVisible({ timeout: 20000 });
    await page.fill('#BillingNewAddress_FirstName', 'Test');
      await page.fill('#BillingNewAddress_LastName', 'User');
      await page.fill('#BillingNewAddress_Email', `test.user+${Date.now()}@example.com`);
      await page.selectOption('#BillingNewAddress_CountryId', { label: 'United States' }).catch(() => {});
      await page.fill('#BillingNewAddress_City', 'Testville');
      await page.fill('#BillingNewAddress_Address1', '123 Testing Ave');
      await page.fill('#BillingNewAddress_ZipPostalCode', '12345');
      await page.fill('#BillingNewAddress_PhoneNumber', '1234567890');

    // Continue from Billing
    await page.getByRole('button', { name: /continue/i }).nth(0).click();

    // Continue through shipping and payment steps
    await page.getByRole('button', { name: /continue/i }).nth(1).click();
    await page.getByRole('button', { name: /continue/i }).nth(2).click();

    // Confirm order
    const confirm = page.getByRole('button', { name: /confirm/i }).first();
    await expect(confirm).toBeVisible({ timeout: 10000 });
    await confirm.click();

    // Verify order confirmation message
    await expect(page.locator('h1')).toContainText(/thank you/i);
  } catch (err) {
    const screenshot = await page.screenshot({ fullPage: true });
    testInfo.attachments.push({ name: 'failure-screenshot', body: screenshot, contentType: 'image/png' });
    throw err;
  }
});

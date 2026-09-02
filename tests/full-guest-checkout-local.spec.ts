import path from 'path';
import { test, expect } from '@playwright/test';

// This test runs against a local static demo site served by npm script `demo:start` on port 3000.
const DEMO_URL = process.env.BASE_URL || 'http://localhost:3000';

test('full guest checkout on local demo', async ({ page }) => {
  // Open storefront
  await page.goto(`${DEMO_URL}/index.html`);
  await expect(page).toHaveURL(new RegExp('localhost:3000/index.html'));
  // Add product
  const add = page.getByTestId('add-to-cart-1');
  await expect(add).toBeVisible();
  await add.click();
  // Cart page
  await expect(page).toHaveURL(new RegExp('/cart.html'));
  await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();
  // Ensure cart has item
  await expect(page.locator('.row')).toHaveCount(1);
  // Checkout
  await page.getByTestId('checkout-button').click();
  await expect(page).toHaveURL(/checkout.html/);
  // Fill guest billing info
  await page.fill('[data-test-id="first-name"]', 'Test');
  await page.fill('[data-test-id="last-name"]', 'User');
  await page.fill('[data-test-id="email"]', `test.user+${Date.now()}@example.com`);
  await page.fill('[data-test-id="address"]', '123 Test Ave');
  await page.fill('[data-test-id="city"]', 'Testville');
  await page.fill('[data-test-id="postal"]', '12345');
  // Confirm
  await page.getByTestId('confirm-order').click();
  await expect(page).toHaveURL(/confirm.html/);
  await expect(page.locator('h1')).toContainText(/thank you/i);
});

import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should add product to cart', async ({ page }) => {
    // Go to product page
    await page.goto('/products/vacuums/the-bottom-feeder');

    // Wait for the page to load and Shopify product to be fetched
    await page.waitForTimeout(2000);

    // Check that Add to Cart button is enabled (not showing "Loading...")
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeVisible();

    // Log the button text
    const buttonText = await addToCartButton.textContent();
    console.log('Button text:', buttonText);

    // Listen for console logs
    page.on('console', msg => {
      if (msg.text().includes('[Shopify]') || msg.text().includes('[Cart]') || msg.text().includes('[ProductPage]')) {
        console.log('Browser log:', msg.text());
      }
    });

    // Click Add to Cart
    await addToCartButton.click();

    // Wait for network request
    await page.waitForTimeout(3000);

    // Check if cart drawer opened
    const cartDrawer = page.locator('[class*="cart"], [class*="drawer"], [role="dialog"]').first();

    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/cart-test.png', fullPage: true });

    // Log any errors from the page
    const errors = await page.evaluate(() => {
      return (window as unknown as { __cartErrors?: string[] }).__cartErrors || [];
    });
    console.log('Page errors:', errors);
  });

  test('should fetch product variant from Shopify', async ({ page }) => {
    // Listen for console logs
    const logs: string[] = [];
    page.on('console', msg => {
      logs.push(msg.text());
    });

    // Go to product page
    await page.goto('/products/vacuums/the-bottom-feeder');

    // Wait for Shopify fetch
    await page.waitForTimeout(3000);

    // Check logs for variant ID
    const variantLogs = logs.filter(log => log.includes('variant') || log.includes('Shopify') || log.includes('ProductPage'));
    console.log('Variant-related logs:', variantLogs);

    // Check button state
    const addToCartButton = page.getByRole('button', { name: /add to cart|loading/i });
    const buttonText = await addToCartButton.textContent();
    console.log('Final button text:', buttonText);

    // It should say "Add to Cart" not "Loading..."
    await expect(addToCartButton).not.toHaveText(/loading/i, { timeout: 10000 });
  });

  test('debug: check Shopify API response', async ({ page }) => {
    // Intercept Shopify API calls
    const apiResponses: { url: string; status: number; body: string }[] = [];

    page.on('response', async response => {
      if (response.url().includes('shopify') && response.url().includes('graphql')) {
        try {
          const body = await response.text();
          apiResponses.push({
            url: response.url(),
            status: response.status(),
            body: body.substring(0, 1000), // First 1000 chars
          });
        } catch {
          // Response already consumed
        }
      }
    });

    // Go to product page
    await page.goto('/products/vacuums/the-bottom-feeder');
    await page.waitForTimeout(2000);

    // Click Add to Cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    if (await addToCartButton.isEnabled()) {
      await addToCartButton.click();
      await page.waitForTimeout(3000);
    }

    // Log API responses
    console.log('Shopify API responses:', JSON.stringify(apiResponses, null, 2));
  });
});

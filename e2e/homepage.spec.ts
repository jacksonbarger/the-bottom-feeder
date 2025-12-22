import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/The Bottom Feeder/);

    // Check header is visible
    await expect(page.locator('header')).toBeVisible();

    // Check hero section exists - logo image is the main visual element
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation links exist (use first() since there may be mobile + desktop nav)
    await expect(page.getByRole('link', { name: /products/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /support/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');

    // Click on Products link in navigation
    await page.getByRole('link', { name: /products/i }).first().click();

    // Verify we're on products page
    await expect(page).toHaveURL(/\/products/);
  });

  test('should have 360 viewer section', async ({ page }) => {
    await page.goto('/');

    // Check for 360 viewer section - text is split: "Experience the" + "Innovation"
    await expect(page.getByText(/Experience the/i)).toBeVisible();
    await expect(page.getByText(/Innovation/i).first()).toBeVisible();
  });
});

test.describe('Product Pages', () => {
  test('should load vacuum product page', async ({ page }) => {
    await page.goto('/products/vacuums/the-bottom-feeder');

    // Check product title exists (use first() since there may be multiple h1/h2 elements)
    await expect(page.getByRole('heading', { name: /bottom feeder/i }).first()).toBeVisible();

    // Check add to cart button
    await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();

    // Check price is displayed (use first() since price may appear multiple times)
    await expect(page.getByText(/\$/).first()).toBeVisible();
  });

  test('should have proper SEO metadata', async ({ page }) => {
    await page.goto('/products/vacuums/the-bottom-feeder');

    // Check page has proper title
    await expect(page).toHaveTitle(/Bottom Feeder.*\| The Bottom Feeder/);
  });
});

test.describe('Navigation', () => {
  test('should have working mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for mobile menu button (may have aria-label or other accessibility attributes)
    const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("menu")').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Check menu opens - use first() since there may be multiple matches
      await expect(page.getByRole('link', { name: /products/i }).first()).toBeVisible();
    } else {
      // If no mobile menu button, navigation may be visible directly on mobile
      await expect(page.locator('nav, header').first()).toBeVisible();
    }
  });
});

test.describe('Security Headers', () => {
  test('should have security headers', async ({ page }) => {
    const response = await page.goto('/');

    // Check for important security headers
    const headers = response?.headers() || {};

    // These should be present after our security configuration
    expect(headers['x-frame-options']).toBeDefined();
    expect(headers['x-content-type-options']).toBeDefined();
  });
});

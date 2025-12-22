import { test, expect } from '@playwright/test';

test.describe('Extra Battery Kit Cart', () => {
  test('should add Extra Battery Kit at correct price ($2124)', async ({ page }) => {
    // Intercept Shopify API calls
    const apiResponses: { url: string; body: string }[] = [];
    
    page.on('response', async response => {
      if (response.url().includes('shopify') && response.url().includes('graphql')) {
        try {
          const body = await response.text();
          apiResponses.push({
            url: response.url(),
            body: body,
          });
        } catch {
          // Response already consumed
        }
      }
    });

    // Go to Extra Battery Kit product page
    await page.goto('/products/vacuums/the-bottom-feeder-extra-battery');
    await page.waitForTimeout(3000);

    // Check button text
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    
    const buttonText = await addToCartButton.textContent();
    console.log('Button text:', buttonText);

    // Click Add to Cart
    await addToCartButton.click();
    await page.waitForTimeout(3000);

    // Check API responses for correct product
    let foundExtraBatteryKit = false;
    let cartPrice = '';
    
    for (const resp of apiResponses) {
      if (resp.body.includes('extra Battery Kit') || resp.body.includes('extra-battery')) {
        foundExtraBatteryKit = true;
      }
      if (resp.body.includes('cartLinesAdd')) {
        const match = resp.body.match(/"amount":"(\d+\.?\d*)"/);
        if (match) {
          cartPrice = match[1];
        }
        console.log('Cart response:', resp.body.substring(0, 500));
      }
    }
    
    console.log('API Responses count:', apiResponses.length);
    console.log('Found Extra Battery Kit:', foundExtraBatteryKit);
    console.log('Cart price:', cartPrice);
    
    // Verify price is $2124 (Extra Battery Kit) not $1535 (base vacuum)
    expect(parseFloat(cartPrice)).toBe(2124.0);
  });
});

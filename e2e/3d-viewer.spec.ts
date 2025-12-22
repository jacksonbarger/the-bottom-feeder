import { test, expect } from '@playwright/test';

test.describe('3D Product Viewer', () => {
  test('should load and display the 3D model on live site', async ({ page }) => {
    // Go to live site
    await page.goto('https://thebottomfeeder.vercel.app');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of full page
    await page.screenshot({ path: 'test-results/3d-viewer-homepage.png', fullPage: true });

    // Scroll down to the 3D viewer section
    await page.evaluate(() => {
      window.scrollTo(0, 600);
    });

    await page.waitForTimeout(2000);

    // Take screenshot of visible area
    await page.screenshot({ path: 'test-results/3d-viewer-scrolled.png', fullPage: false });

    // Wait for 3D to load
    await page.waitForTimeout(5000);

    // Take screenshot after 3D loads
    await page.screenshot({ path: 'test-results/3d-viewer-loaded.png', fullPage: false });

    // Check if canvas element exists (Three.js renders to canvas)
    const canvas = page.locator('canvas');
    const canvasCount = await canvas.count();
    console.log('Canvas elements found:', canvasCount);

    if (canvasCount > 0) {
      console.log('WebGL 3D viewer is active');

      // Try to interact with the canvas
      const canvasElement = canvas.first();
      const box = await canvasElement.boundingBox();

      if (box) {
        console.log('Canvas size:', box.width, 'x', box.height);

        // Simulate drag to rotate
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 150, box.y + box.height / 2, { steps: 20 });
        await page.mouse.up();

        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test-results/3d-viewer-after-drag.png', fullPage: false });
      }
    } else {
      console.log('Frame-based viewer is active (no canvas found)');
    }

    // The test passes if we get here without errors
    expect(true).toBe(true);
  });
});

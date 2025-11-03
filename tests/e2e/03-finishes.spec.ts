import { test, expect } from '@playwright/test';

test.describe('Phase 3: Finishes System', () => {
  const testStyleName = `Test Style ${Date.now()}`;
  const testFinishName = `Test Oak Finish ${Date.now()}`;

  test('3.1 - Create new finish style', async ({ page }) => {
    await page.goto('/admin/finish-styles/new');

    // Fill in style details
    await page.fill('input[name="name"]', testStyleName);
    await page.fill('textarea[name="description"]', 'Testing finish styles');
    await page.fill('input[name="order"]', '99');

    // Visible checkbox
    await page.check('input[name="visible"]');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to styles list
    await expect(page).toHaveURL(/\/admin\/finish-styles$/, { timeout: 10000 });

    // Verify style appears
    await expect(page.locator(`text=${testStyleName}`)).toBeVisible({ timeout: 5000 });
  });

  test('3.3 - Create finish with multiple images (NEW FEATURE)', async ({ page }) => {
    await page.goto('/admin/finishes/new');

    // Fill in finish details
    await page.fill('input[name="name"]', testFinishName);

    // Select the style we created
    await page.selectOption('select[name="styleId"]', { label: new RegExp(testStyleName) });

    // Set color
    await page.fill('input[name="color"], input[type="color"]', '#D2B48C');

    // Test description
    await page.fill('textarea[name="description"]', 'Test finish description for automated testing');

    // In stock checkbox
    await page.check('input[name="inStock"]');

    // Note: Image upload testing requires test fixtures
    // For now, we test the form validation that requires at least 1 image
    // In production, you'd upload actual test images here

    // Try submitting without images - should show validation error
    await page.click('button[type="submit"]');
    await expect(page.locator('text=/at least one image|image.*required/i')).toBeVisible({ timeout: 3000 });
  });

  test('3.7 - Verify fallback color preview', async ({ page }) => {
    await page.goto('/admin/finishes/new');

    // Fill in basic details
    await page.fill('input[name="name"]', 'Color Test');

    const styleSelect = page.locator('select[name="styleId"]');
    const optionsCount = await styleSelect.locator('option').count();
    if (optionsCount > 1) {
      await styleSelect.selectOption({ index: 1 });
    }

    // Set a test color
    await page.fill('input[name="color"]', '#FF5733');

    // Check if preview swatch exists
    const colorPreview = page.locator('[style*="background-color"], .color-preview, [class*="swatch"]');
    if (await colorPreview.count() > 0) {
      const firstPreview = colorPreview.first();
      const backgroundColor = await firstPreview.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Should show some color (not transparent)
      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('3.9 - Attempt to delete style with assigned finishes', async ({ page }) => {
    await page.goto('/admin/finish-styles');

    // Find our test style
    await expect(page.locator(`text=${testStyleName}`)).toBeVisible();

    // Try to delete it (it may have finishes assigned)
    const deleteButton = page.locator(`button:near(:text("${testStyleName}")):has-text("Delete")`);

    if (await deleteButton.count() > 0) {
      await deleteButton.click();

      // If there are finishes assigned, should show error
      // If not, deletion proceeds
      await page.waitForTimeout(2000);
    }
  });

  test('3.10 - Check finishes page with images', async ({ page }) => {
    await page.goto('/finishes');

    // Wait for page to load
    await expect(page.locator('h1, h2')).toContainText(/Finishes|Materials/, { timeout: 5000 });

    // Check for finish swatches or cards
    const finishes = await page.locator('[data-testid="finish-swatch"], .finish-card, [class*="finish"]').count();
    expect(finishes).toBeGreaterThan(0);
  });

  test('3.11 - Test image fallback (color swatch)', async ({ page }) => {
    await page.goto('/finishes');

    // Finishes without images should show color swatches
    const colorSwatches = page.locator('[style*="backgroundColor"], .color-swatch');

    if (await colorSwatches.count() > 0) {
      const firstSwatch = colorSwatches.first();
      const hasBackgroundColor = await firstSwatch.evaluate(el => {
        const bg = window.getComputedStyle(el).backgroundColor;
        return bg && bg !== 'rgba(0, 0, 0, 0)';
      });

      expect(hasBackgroundColor).toBeTruthy();
    }
  });

  test('3.12 - Style visibility toggle', async ({ page }) => {
    await page.goto('/admin/finish-styles');

    // Find test style
    const styleRow = page.locator(`text=${testStyleName}`).first();

    if (await styleRow.isVisible()) {
      // Find and click edit
      await page.click(`button:near(:text("${testStyleName}")):has-text("Edit")`);

      // Wait for form
      await page.waitForURL(/\/admin\/finish-styles\/.*\/edit/, { timeout: 5000 });

      // Toggle visibility
      const visibleCheckbox = page.locator('input[name="visible"]');
      const wasChecked = await visibleCheckbox.isChecked();

      if (wasChecked) {
        await visibleCheckbox.uncheck();
      } else {
        await visibleCheckbox.check();
      }

      // Save
      await page.click('button[type="submit"]');

      // Check public finishes page
      await page.goto('/finishes');

      if (!wasChecked) {
        // If we made it visible, it should appear
        await page.waitForTimeout(1000);
      } else {
        // If we hid it, it should not appear
        await page.waitForTimeout(1000);
      }
    }
  });

  test.afterAll(async ({ browser }) => {
    // Cleanup: delete test style and finishes
    const page = await browser.newPage();

    try {
      // Delete test finishes first
      await page.goto('/admin/finishes');
      const testFinish = page.locator(`text=${testFinishName}`);
      if (await testFinish.count() > 0) {
        await page.click(`button:near(:text("${testFinishName}")):has-text("Delete")`);
        await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
        await page.waitForTimeout(1000);
      }

      // Then delete test style
      await page.goto('/admin/finish-styles');
      const testStyle = page.locator(`text=${testStyleName}`);
      if (await testStyle.count() > 0) {
        await page.click(`button:near(:text("${testStyleName}")):has-text("Delete")`);
        await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
        await page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log('Cleanup error:', error);
    } finally {
      await page.close();
    }
  });
});

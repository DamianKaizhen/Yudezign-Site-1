import { test, expect } from '@playwright/test';

test.describe('Phase 1: Authentication & Access Control', () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Start without auth

  test('1.1 - Login with correct password', async ({ page }) => {
    await page.goto('/admin/login');

    await page.fill('input[type="password"]', 'Ufs@13246');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('1.2 - Login with incorrect password', async ({ page }) => {
    await page.goto('/admin/login');

    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Invalid password')).toBeVisible({ timeout: 5000 });

    // Should stay on login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('1.4 - Protected route access without authentication', async ({ page }) => {
    // Try to access protected route without logging in
    await page.goto('/admin/projects');

    // Should redirect to login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe('Phase 1: Session Management (Authenticated)', () => {
  // These tests use the authenticated state from setup

  test('1.3 - Session persistence after page refresh', async ({ page }) => {
    await page.goto('/admin');

    // Verify we're on dashboard
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Refresh page
    await page.reload();

    // Should still be logged in
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('1.5 - Logout functionality', async ({ page }) => {
    await page.goto('/admin');

    // Find and click logout button
    await page.click('button:has-text("Logout"), a:has-text("Logout")');

    // Should redirect to login page
    await expect(page).toHaveURL(/\/admin\/login/, { timeout: 5000 });

    // Try to access protected route
    await page.goto('/admin');

    // Should redirect back to login
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

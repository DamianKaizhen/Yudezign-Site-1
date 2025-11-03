import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '../.auth/admin.json');

/**
 * Authentication Setup
 * Runs once before all tests to log in and save authenticated state
 */
setup('authenticate as admin', async ({ page }) => {
  // Navigate to login page
  await page.goto('/admin/login');

  // Wait for page to load
  await expect(page.locator('h1')).toContainText('Admin Login', { timeout: 10000 });

  // Fill in password (from env or default)
  const password = process.env.ADMIN_PASSWORD || 'Ufs@13246';
  await page.fill('input[type="password"]', password);

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard
  await page.waitForURL('**/admin', { timeout: 10000 });

  // Verify we're logged in by checking for dashboard content
  await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 5000 });

  // Save signed-in state to file
  await page.context().storageState({ path: authFile });

  console.log('✅ Authentication successful - saved to', authFile);
});

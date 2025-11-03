import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Phase 2: Projects Management', () => {
  const testProjectTitle = `Test Kitchen Project ${Date.now()}`;
  const testImagePath = path.join(__dirname, '../fixtures/test-image.jpg');

  test.beforeAll(async () => {
    // Note: In a real scenario, you'd create a test image fixture
    // For now, we'll handle missing file gracefully in tests
  });

  test('2.4 - View projects list', async ({ page }) => {
    await page.goto('/admin/projects');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Projects', { timeout: 5000 });

    // Check for table or grid of projects
    const projectsExist = await page.locator('[data-testid="project-item"], .card, tr').count();
    expect(projectsExist).toBeGreaterThan(0);
  });

  test('2.5 - Category filter', async ({ page }) => {
    await page.goto('/admin/projects');

    // Find and use category filter
    const filterExists = await page.locator('select, [role="combobox"]').count();
    if (filterExists > 0) {
      await page.selectOption('select:has-text("Category"), select >> nth=0', 'kitchens');

      // Wait for filtering to complete
      await page.waitForTimeout(1000);

      // Projects should be filtered
      await expect(page.locator('text=kitchens')).toBeVisible();
    }
  });

  test('2.6 - Search functionality', async ({ page }) => {
    await page.goto('/admin/projects');

    // Find search input
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('kitchen');
      await page.waitForTimeout(500);

      // Results should update
      const results = await page.locator('[data-testid="project-item"], .card').count();
      expect(results).toBeGreaterThan(0);
    }
  });

  test('2.1 - Create new project with full data', async ({ page }) => {
    await page.goto('/admin/projects/new');

    // Fill in project details
    await page.fill('input[name="title"]', testProjectTitle);
    await page.selectOption('select[name="category"]', 'kitchens');
    await page.fill('input[name="location"]', 'Houston, TX');
    await page.fill('input[name="finish"]', 'Natural Oak');
    await page.fill('input[name="cabinetStyle"]', 'European Frameless');
    await page.fill('input[name="turnaroundTime"]', '2 weeks');
    await page.fill('textarea[name="description"]', 'Test project description for automated testing');

    // Add features
    const addFeatureButton = page.locator('button:has-text("Add Feature")');
    if (await addFeatureButton.count() > 0) {
      await addFeatureButton.click();
      await page.fill('input[placeholder*="feature"]', 'Soft-close hinges');
      await addFeatureButton.click();
      await page.fill('input[placeholder*="feature"]:nth-child(2)', 'Under-cabinet lighting');
    }

    // Note: Image upload testing requires actual test fixtures
    // For now, we test form submission without images

    // Submit form
    await page.click('button[type="submit"]:has-text("Create"), button:has-text("Save")');

    // Wait for success
    await expect(page).toHaveURL(/\/admin\/projects$/, { timeout: 10000 });

    // Verify project appears in list
    await expect(page.locator(`text=${testProjectTitle}`)).toBeVisible({ timeout: 5000 });
  });

  test('2.3 - Validation - missing required fields', async ({ page }) => {
    await page.goto('/admin/projects/new');

    // Try submitting without filling required fields
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=/required|Required/')).toBeVisible({ timeout: 3000 });
  });

  test('2.7 - Edit existing project', async ({ page }) => {
    await page.goto('/admin/projects');

    // Find the test project we created
    const projectRow = page.locator(`text=${testProjectTitle}`).first();
    await expect(projectRow).toBeVisible({ timeout: 5000 });

    // Click edit button
    await page.click(`button:near(:text("${testProjectTitle}")):has-text("Edit")`);

    // Wait for form to load
    await page.waitForURL(/\/admin\/projects\/.*\/edit/, { timeout: 5000 });

    // Update title
    const updatedTitle = `${testProjectTitle} EDITED`;
    await page.fill('input[name="title"]', updatedTitle);

    // Save changes
    await page.click('button[type="submit"]:has-text("Save"), button:has-text("Update")');

    // Should redirect back to list
    await expect(page).toHaveURL(/\/admin\/projects$/, { timeout: 10000 });

    // Verify updated project appears
    await expect(page.locator(`text=${updatedTitle}`)).toBeVisible({ timeout: 5000 });
  });

  test('2.9 - Delete project', async ({ page }) => {
    await page.goto('/admin/projects');

    // Find the edited test project
    const editedTitle = `${testProjectTitle} EDITED`;
    await expect(page.locator(`text=${editedTitle}`)).toBeVisible({ timeout: 5000 });

    // Click delete button
    await page.click(`button:near(:text("${editedTitle}")):has-text("Delete")`);

    // Handle confirmation modal
    await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');

    // Wait for deletion
    await page.waitForTimeout(2000);

    // Project should no longer exist
    await expect(page.locator(`text=${editedTitle}`)).not.toBeVisible({ timeout: 5000 });
  });

  test('2.11 - Check home page projects display', async ({ page }) => {
    await page.goto('/');

    // Wait for projects section
    await expect(page.locator('text=/Featured Projects|Our Work|Portfolio/')).toBeVisible({ timeout: 5000 });

    // Check for project cards
    const projectCards = await page.locator('[data-testid="project-card"], .project-card, img[alt*="project"]').count();
    expect(projectCards).toBeGreaterThan(0);
  });

  test('2.12 - Check portfolio category page', async ({ page }) => {
    await page.goto('/portfolio/kitchens');

    // Should show kitchen projects
    await expect(page.locator('h1, h2')).toContainText(/Kitchens|Kitchen/);

    // Projects should be displayed
    const projects = await page.locator('[data-testid="project-card"], .card').count();
    expect(projects).toBeGreaterThan(0);
  });
});

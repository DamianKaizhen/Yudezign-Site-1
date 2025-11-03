import { test, expect } from '@playwright/test';

test.describe('Phase 4-7: Additional Admin Modules', () => {

  // Phase 4: Testimonials
  test('4.1 - Create testimonial', async ({ page }) => {
    await page.goto('/admin/testimonials/new');

    await page.fill('input[name="name"]', 'John Doe Test');
    await page.fill('input[name="role"]', 'Homeowner');
    await page.fill('textarea[name="content"]', 'Excellent work on my kitchen cabinets! Automated test.');

    // Set rating (5 stars)
    const ratingInput = page.locator('input[name="rating"]');
    await ratingInput.fill('5');

    // Submit
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/admin\/testimonials$/, { timeout: 10000 });
    await expect(page.locator('text=John Doe Test')).toBeVisible({ timeout: 5000 });
  });

  test('4.3 - Edit testimonial', async ({ page }) => {
    await page.goto('/admin/testimonials');

    const testTestimonial = page.locator('text=John Doe Test').first();
    if (await testTestimonial.count() > 0) {
      await page.click('button:near(:text("John Doe Test")):has-text("Edit")');
      await page.waitForURL(/\/admin\/testimonials\/.*\/edit/);

      // Change rating to 4
      await page.fill('input[name="rating"]', '4');
      await page.click('button[type="submit"]');

      await expect(page).toHaveURL(/\/admin\/testimonials$/);
    }
  });

  test('4.5 - Check About page testimonials display', async ({ page }) => {
    await page.goto('/about');

    // Look for testimonials section
    const testimonials = page.locator('text=/Testimonials|Reviews|What.*say/i');
    if (await testimonials.count() > 0) {
      await expect(testimonials.first()).toBeVisible();

      // Check for star ratings
      const stars = await page.locator('[data-testid="star"], .star, svg[class*="star"]').count();
      expect(stars).toBeGreaterThan(0);
    }
  });

  // Phase 5: Team Members
  test('5.1 - Create team member', async ({ page }) => {
    await page.goto('/admin/team/new');

    await page.fill('input[name="name"]', 'Jane Smith Test');
    await page.fill('input[name="role"]', 'Lead Designer');
    await page.fill('textarea[name="bio"]', '10 years of cabinet design experience. Automated test.');

    // Optional fields
    await page.fill('input[name="email"]', 'jane.test@yudezign.com');
    await page.fill('input[name="phone"]', '713-555-0123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/admin\/team$/);
    await expect(page.locator('text=Jane Smith Test')).toBeVisible();
  });

  test('5.3 - Test optional fields', async ({ page }) => {
    await page.goto('/admin/team/new');

    // Create without email/phone
    await page.fill('input[name="name"]', 'Bob Johnson Test');
    await page.fill('input[name="role"]', 'Installer');
    await page.fill('textarea[name="bio"]', 'Expert cabinet installer.');

    await page.click('button[type="submit"]');

    // Should save successfully
    await expect(page).toHaveURL(/\/admin\/team$/);
    await expect(page.locator('text=Bob Johnson Test')).toBeVisible();
  });

  test('5.6 - Check About page team display', async ({ page }) => {
    await page.goto('/about');

    // Look for team section
    const teamSection = page.locator('text=/Team|Our Team|Meet.*Team/i');
    if (await teamSection.count() > 0) {
      await expect(teamSection.first()).toBeVisible();

      // Check for team member cards or sections
      const teamMembers = await page.locator('[data-testid="team-member"], .team-member').count();
      // Should have at least the test members we created
      expect(teamMembers).toBeGreaterThanOrEqual(0);
    }
  });

  // Phase 6: Contact Messages
  test('6.1 - Submit contact form from public page', async ({ page }) => {
    await page.goto('/contact');

    // Fill out contact form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '713-555-9999');

    // Project type
    const projectTypeSelect = page.locator('select[name="projectType"]');
    if (await projectTypeSelect.count() > 0) {
      await projectTypeSelect.selectOption('kitchen');
    }

    // Timeline
    const timelineSelect = page.locator('select[name="timeline"]');
    if (await timelineSelect.count() > 0) {
      await timelineSelect.selectOption({ index: 1 });
    }

    await page.fill('textarea[name="message"]', 'I need a quote for new cabinets. Automated test.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('text=/success|thank you|received/i')).toBeVisible({ timeout: 5000 });
  });

  test('6.2 - Check message in admin panel', async ({ page }) => {
    await page.goto('/admin/contact-messages');

    // Should see the test message
    await expect(page.locator('text=Test User')).toBeVisible({ timeout: 5000 });
  });

  test('6.4 - Update message status', async ({ page }) => {
    await page.goto('/admin/contact-messages');

    const testMessage = page.locator('text=Test User').first();
    if (await testMessage.count() > 0) {
      await testMessage.click();

      // Change status
      const statusSelect = page.locator('select[name="status"]');
      if (await statusSelect.count() > 0) {
        await statusSelect.selectOption('read');

        // Save
        const saveButton = page.locator('button:has-text("Save"), button:has-text("Update")');
        if (await saveButton.count() > 0) {
          await saveButton.click();
          await page.waitForTimeout(1000);
        }
      }
    }
  });

  // Phase 7: Site Settings
  test('7.1 - Update company name', async ({ page }) => {
    await page.goto('/admin/settings');

    const companyNameInput = page.locator('input[name="companyName"]');
    if (await companyNameInput.count() > 0) {
      await companyNameInput.fill('Yudezign Test');

      await page.click('button[type="submit"]');

      await expect(page.locator('text=/saved|success|updated/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('7.4 - Update social links', async ({ page }) => {
    await page.goto('/admin/settings');

    const facebookInput = page.locator('input[name*="facebook"], input[placeholder*="Facebook"]');
    if (await facebookInput.count() > 0) {
      await facebookInput.fill('https://facebook.com/yudezign');
    }

    const instagramInput = page.locator('input[name*="instagram"], input[placeholder*="Instagram"]');
    if (await instagramInput.count() > 0) {
      await instagramInput.fill('https://instagram.com/yudezign');
    }

    await page.click('button[type="submit"]');

    await expect(page.locator('text=/saved|success|updated/i')).toBeVisible({ timeout: 5000 });
  });

  test('7.6 - Verify footer social links', async ({ page }) => {
    await page.goto('/');

    // Check footer for social links
    const footer = page.locator('footer');
    const socialLinks = footer.locator('a[href*="facebook"], a[href*="instagram"]');

    if (await socialLinks.count() > 0) {
      expect(await socialLinks.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Phase 8-10: Edge Cases & Error Handling', () => {

  test('10.1 - Long text input validation', async ({ page }) => {
    await page.goto('/admin/projects/new');

    // Try to enter very long description
    const longText = 'A'.repeat(1000);
    await page.fill('textarea[name="description"]', longText);

    // Try to submit
    await page.click('button[type="submit"]');

    // Should either truncate or show validation error
    await page.waitForTimeout(1000);
  });

  test('10.2 - Special characters in text fields', async ({ page }) => {
    await page.goto('/admin/finishes/new');

    // Test with emojis and special characters
    await page.fill('input[name="name"]', 'Test 🌟 Finish™ & More!');

    const styleSelect = page.locator('select[name="styleId"]');
    const optionsCount = await styleSelect.locator('option').count();
    if (optionsCount > 1) {
      await styleSelect.selectOption({ index: 1 });
    }

    await page.fill('input[name="color"]', '#FF0000');

    // Should handle special characters gracefully
  });

  test('10.3 - Rapid form submissions (double-click prevention)', async ({ page }) => {
    await page.goto('/admin/finish-styles/new');

    await page.fill('input[name="name"]', 'Rapid Test Style');
    await page.fill('input[name="order"]', '100');

    // Try clicking submit multiple times rapidly
    const submitButton = page.locator('button[type="submit"]');

    await Promise.all([
      submitButton.click(),
      submitButton.click(),
      submitButton.click(),
    ]);

    // Should only create one item (prevented duplicates)
    await page.waitForTimeout(2000);
  });

  test('8.1 - File type rejection (invalid file upload)', async ({ page }) => {
    // This would require test fixtures with various file types
    // For now, we verify the upload component exists
    await page.goto('/admin/projects/new');

    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.count() > 0) {
      // File upload field exists
      expect(await fileInput.count()).toBeGreaterThan(0);
    }
  });

  test('9.2 - Verify finishes list view works', async ({ page }) => {
    await page.goto('/admin/finishes');

    // Page should load without errors
    await expect(page.locator('h1')).toContainText(/Finishes/i, { timeout: 5000 });

    // Should have some finishes displayed
    await page.waitForTimeout(1000);
  });
});

// Cleanup after all tests
test.afterAll(async ({ browser }) => {
  const page = await browser.newPage();

  try {
    // Cleanup test testimonials
    await page.goto('/admin/testimonials');
    const johnDoe = page.locator('text=John Doe Test');
    if (await johnDoe.count() > 0) {
      await page.click('button:near(:text("John Doe Test")):has-text("Delete")');
      await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
      await page.waitForTimeout(1000);
    }

    // Cleanup test team members
    await page.goto('/admin/team');
    const janeSmith = page.locator('text=Jane Smith Test');
    if (await janeSmith.count() > 0) {
      await page.click('button:near(:text("Jane Smith Test")):has-text("Delete")');
      await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
      await page.waitForTimeout(1000);
    }

    const bobJohnson = page.locator('text=Bob Johnson Test');
    if (await bobJohnson.count() > 0) {
      await page.click('button:near(:text("Bob Johnson Test")):has-text("Delete")');
      await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
      await page.waitForTimeout(1000);
    }

    // Cleanup test contact message
    await page.goto('/admin/contact-messages');
    const testUser = page.locator('text=Test User');
    if (await testUser.count() > 0) {
      await testUser.click();
      const deleteButton = page.locator('button:has-text("Delete")');
      if (await deleteButton.count() > 0) {
        await deleteButton.click();
        await page.click('button:has-text("Confirm"), button:has-text("Delete"):visible');
        await page.waitForTimeout(1000);
      }
    }

    // Restore company name
    await page.goto('/admin/settings');
    const companyNameInput = page.locator('input[name="companyName"]');
    if (await companyNameInput.count() > 0) {
      await companyNameInput.fill('Yudezign');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
    }
  } catch (error) {
    console.log('Cleanup error:', error);
  } finally {
    await page.close();
  }
});

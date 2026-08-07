import { expect, test, type Page } from '@playwright/test';

/**
 * Sales portal end-to-end tests.
 *
 * REQUIRES `vercel dev` — plain `npm run dev` does not serve api/, so every
 * login here would fail. playwright.config.ts now starts the right server.
 *
 * Requires these in .env.local:
 *   SALES_REP_PASSWORD, SALES_MANAGER_PASSWORD, SALES_JWT_SECRET
 *
 * The tests that matter most are the last two groups: the role boundary (a rep
 * must never receive manager content) and offline behaviour (a network failure
 * must not log a rep out mid-show).
 */

const REP_PASSWORD = process.env.SALES_REP_PASSWORD ?? '';
const MANAGER_PASSWORD = process.env.SALES_MANAGER_PASSWORD ?? '';

// The portal owns its own session; don't inherit the admin storage state.
test.use({ storageState: { cookies: [], origins: [] } });

async function signIn(page: Page, password: string) {
  await page.goto('/sales/login');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/sales');
}

test.describe('gate', () => {
  test('redirects an unauthenticated visitor to login', async ({ page }) => {
    await page.goto('/sales');
    await expect(page).toHaveURL(/\/sales\/login/);
    await expect(page.getByRole('heading', { name: 'Rep access' })).toBeVisible();
  });

  test('rejects a wrong password without setting a cookie', async ({ page }) => {
    await page.goto('/sales/login');
    await page.getByLabel('Password').fill('definitely-not-the-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('That password was not recognised.')).toBeVisible();

    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'sales_token')).toBeUndefined();
  });

  test('is excluded from search engines', async ({ page }) => {
    await page.goto('/sales/login');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /noindex/);
  });
});

test.describe('rep session', () => {
  test.skip(!REP_PASSWORD, 'SALES_REP_PASSWORD is not set');

  test.beforeEach(async ({ page }) => {
    await signIn(page, REP_PASSWORD);
  });

  test('lands on Start here with the canon rule', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();
    await expect(page.getByText('Read these three before you talk to anyone')).toBeVisible();
  });

  test('does not show the Manager tab', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Portal sections' });
    await expect(nav.getByRole('link', { name: 'Answers' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Manager' })).toHaveCount(0);
  });

  test('receives no manager key in the content payload', async ({ page }) => {
    // The assertion that actually matters — hiding the tab is cosmetic, the
    // server not sending the data is the boundary.
    const response = await page.request.get('/api/sales/content');
    expect(response.ok()).toBeTruthy();

    const payload = await response.json();
    expect(payload.role).toBe('rep');
    expect(payload).not.toHaveProperty('manager');
    expect(JSON.stringify(payload)).not.toContain('A rep with no written comp plan leaves');
  });

  test('blocks the manager route directly', async ({ page }) => {
    await page.goto('/sales/manager');
    await expect(page.getByRole('heading', { name: 'Manager access only' })).toBeVisible();
  });

  test('renders a blocked answer as a verbatim script', async ({ page }) => {
    await page.goto('/sales/answers?s=money');
    const card = page.locator('#ak-05-01');
    await expect(card).toBeVisible();
    await expect(card.getByText('Say this word for word')).toBeVisible();
    await expect(card.getByText(/Terms are set in your written agreement/)).toBeVisible();
  });

  test('finds an answer by search and deep-links to it', async ({ page }) => {
    await page.getByRole('button', { name: 'Search the portal' }).first().click();
    await page.getByLabel('Search the portal').fill('lead time');

    const firstResult = page.getByRole('dialog').getByRole('button').nth(1);
    await expect(firstResult).toBeVisible();
    await firstResult.click();

    await expect(page).toHaveURL(/\/sales\/answers/);
    await expect(page.locator('#ak-04-01')).toBeVisible();
  });

  test('keeps sub-tabs in the URL so a screen can be shared', async ({ page }) => {
    await page.goto('/sales/pitch');
    await page.getByRole('tab', { name: 'Never say' }).click();
    await expect(page).toHaveURL(/t=never-say/);
    await expect(page.getByText('Read this out loud once.')).toBeVisible();
  });
});

test.describe('manager session', () => {
  test.skip(!MANAGER_PASSWORD, 'SALES_MANAGER_PASSWORD is not set');

  test('sees the manager tab and its content', async ({ page }) => {
    await signIn(page, MANAGER_PASSWORD);

    const nav = page.getByRole('navigation', { name: 'Portal sections' });
    await expect(nav.getByRole('link', { name: 'Manager' })).toBeVisible();

    await page.goto('/sales/manager');
    await expect(
      page.getByRole('heading', { name: 'Compensation and quota — proposal' })
    ).toBeVisible();

    const response = await page.request.get('/api/sales/content');
    const payload = await response.json();
    expect(payload.role).toBe('manager');
    expect(payload).toHaveProperty('manager');
  });
});

test.describe('offline resilience', () => {
  test.skip(!REP_PASSWORD, 'SALES_REP_PASSWORD is not set');

  test('keeps working with no network instead of logging out', async ({ page }) => {
    // The whole reason this portal exists rather than a PDF: a rep in an
    // exhibition hall with no signal must not lose the playbook.
    await signIn(page, REP_PASSWORD);
    await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();

    await page.context().setOffline(true);
    await page.reload();

    await expect(page).toHaveURL(/\/sales$/);
    await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();
    await expect(page.getByText(/Offline — showing your saved copy/)).toBeVisible();

    await page.context().setOffline(false);
  });

  test('does log out when the server authoritatively says no', async ({ page }) => {
    await signIn(page, REP_PASSWORD);

    // A 401 is the one outcome that must clear the session — otherwise a
    // revoked password would never take effect on a device.
    await page.route('**/api/sales/auth', (route) =>
      route.fulfill({ status: 401, contentType: 'application/json', body: '{"authenticated":false}' })
    );
    await page.reload();

    await expect(page).toHaveURL(/\/sales\/login/);

    const hint = await page.evaluate(() => window.localStorage.getItem('yudz_portal_session_v1'));
    expect(hint).toBeNull();
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test.skip(!REP_PASSWORD, 'SALES_REP_PASSWORD is not set');

  test('does not scroll the page horizontally on a wide table', async ({ page }) => {
    await signIn(page, REP_PASSWORD);
    await page.goto('/sales/products?t=dimensions');
    await expect(page.getByText('Memorise these.')).toBeVisible();

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(overflows).toBeFalsy();
  });
});

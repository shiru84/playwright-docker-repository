import { test, expect } from '@playwright/test';

test('go to s.com, accept cookies', async ({ page }) => {
  await page.goto('https://samsung.com/uk/',{ waitUntil: 'domcontentloaded'});
  //accept cookies
  const acceptCookies = page.locator('#onetrust-accept-btn-handler');
  if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
  }

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

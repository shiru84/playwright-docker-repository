import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.samsung.com/pl/');
  await page.locator('[class*="truste-button1"]').nth(0).click();
  await page.locator('[class*="nv00-gnb-v4__l0-menu-list nv00-gnb-v4__l0-menu-list--left"]').first().click();
  await page.getByRole('button', { name: 'Titanium Pinkgold' }).click();
  await page.getByRole('link', { name: 'Buy:Galaxy S25 Ultra (Samsung' }).click();
  await page.getByText('Galaxy S25 Edge 6.7-inch display Claim £250 cashback From £33.31/mo. or £').click();
  await page.getByText('*All prices include insurance').click();
  await page.getByRole('button', { name: 'Preview image of the Samsung' }).click();
  await expect(page.locator('#hubble-service-guide-layer')).toContainText('Get peace of mind for your Samsung Galaxy, with worldwide cover designed by the people who made it.');
});
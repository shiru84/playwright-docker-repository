import { test, expect, Page } from '@playwright/test';
import { beforeEach } from 'node:test';

  
  const cardSelector = '[class*="-item_1333"]';
  const triggerURL = 'https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a26-5g-black-256gb-sm-a266bzkceub/?at_preview_token=lPv1Qdfi-QTb5_ujzWBBUncrrQaq-AMtBE_5tP-IpHQ&at_preview_index=1_2&at_preview_listed_activities_only=false';
  const variantB = 'https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a36-5g-awesome-lavender-256gb-sm-a366blvgeub/?at_preview_token=lPv1Qdfi-QTb5_ujzWBBUncrrQaq-AMtBE_5tP-IpHQ&at_preview_index=1_2&at_preview_listed_activities_only=false';
  const variantC = 'https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a36-5g-awesome-lavender-256gb-sm-a366blvgeub/?at_preview_token=lPv1Qdfi-QTb5_ujzWBBUncrrQaq-AMtBE_5tP-IpHQ&at_preview_index=1_3&at_preview_listed_activities_only=false';
  const copyVariantB1 = 'Finance your upgrade';
  const subCopyVariantB1 = 'Upgrade and spread the cost over 24 months at 0% APR representative with Samsung Finance.‡';
  const copyVariantB2 = 'Upgrade and spread the cost';
  const subCopyVariantB2 = 'Select Samsung Finance when you check out to pay in 24 monthly instalments at 0% APR representative.‡';
  const copyVariantB3 = 'Get your upgrade today';
  const subCopyVariantB3 = 'Spread the cost of a new Galaxy over 24 months at 0% APR representative with Samsung Finance.‡';
  const copyVariantC1 = 'Get an instant discount'; 
  const subCopyVariantC1 = 'Upgrade for less when you trade in an old smartphone.‡';
  const copyVariantC2 = 'Money off your upgrade'; 
  const subCopyVariantC2 = 'Upgrade for less when you trade in an old smartphone – get an instant discount now.‡';
  const copyVariantC3 = 'Trade in and upgrade'; 
  const subCopyVariantC3 = 'Don’t forget you get an instant discount when you trade in an old smartphone. Upgrade your phone for less now.‡';
  
test.beforeEach('accept cookies', async ({ page }) => {
  
  await page.goto('https://www.samsung.com/uk' ,{ waitUntil: 'domcontentloaded' });

const acceptCookies = page.locator('#truste-consent-button');

await page.waitForSelector('#truste-consent-button', {
  state: 'visible',
  timeout: 35000,
});
if (await acceptCookies.isVisible()) {
  await acceptCookies.click();
};
});
async function testItself (page, url: string, copy: string, subcopy: string) {
  // naviagate to target URL
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator(cardSelector).waitFor();
  //find the target activity on the page
  await page.locator(cardSelector).scrollIntoViewIfNeeded();
  await expect(page.locator(cardSelector)).toContainText(copy);
  await expect(page.locator(cardSelector)).toContainText(subcopy);
  };
test('Finance Test 1 - 2nd visit', async ({ page }) => {
await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
await testItself(page, variantB, copyVariantB1, subCopyVariantB1);
});
test('Finance Test 2 - 3rd visit', async ({ page }) => {
  await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.goto(variantB);
  await testItself(page, variantB, copyVariantB2, subCopyVariantB2);
  });
  test('Finance Test 3 - 4th visit', async ({ page }) => {
    await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.goto(variantB);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await testItself(page, variantB, copyVariantB3, subCopyVariantB3);
    });
test('Trade In Test 1 - 2nd visit', async ({ page }) => {
  await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await testItself(page, variantC, copyVariantC1, subCopyVariantC1);
  });
  test('Trade In Test 2 - 3rd visit', async ({ page }) => {
    await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.goto(variantC);
    await testItself(page, variantC, copyVariantC2, subCopyVariantC2);
    });
    test('Trade In Test 3 - 4th visit', async ({ page }) => {
      await page.goto(triggerURL,{ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await page.goto(variantC);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await testItself(page, variantC, copyVariantC3, subCopyVariantC3);
      });
   



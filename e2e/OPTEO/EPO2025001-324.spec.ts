import { test, expect } from '@playwright/test';
const financeCopy ='0% Finance options available'; 
const financeSubCopy = 'From 52.04 £/mo. for 24 months *.';

test('test', async ({ page }) => {
  await page.goto('https://shop.samsung.com/uk/');
  await page.locator('[class*="truste-button1"]').nth(0).click();
  // await page.goto('https://shop.samsung.com/uk/cart?at_preview_token=GNrzCKGZQW-ezFQUEN8gn8IO_t7shUFvqsnsF53Dvx8&at_preview_index=1_2&at_preview_listed_activities_only=true');
  await page.goto('https://p1-smn2-api-cdn.shop.samsung.com/tokocommercewebservices/v2/uk/addToCart/multi?fields=BASIC&newCart=FALSE&products%5B0%5D.productCode=SM-S938BAKDEUB&products%5B0%5D.qty=1&redirect=CART');
  await page.goto('https://shop.samsung.com/uk/cart?at_preview_token=GNrzCKGZQW-ezFQUEN8gn8IO_t7shUFvqsnsF53Dvx8&at_preview_index=1_2&at_preview_listed_activities_only=true');
  await expect(page.locator('[class*="coe-324-miracle-finance-options-in-cart--section"]')).toContainText(financeCopy);
  await expect(page.locator('[class*="coe-324-miracle-finance-options-in-cart--section"]')).toContainText(financeSubCopy);
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Galaxy S25 Ultra view product' }).first().click();
  // const page1 = await page1Promise;
  // await page1.getByLabel('Buy now').click();
  // await page1.getByRole('link', { name: '% Finance available, view options' }).click();
  // await expect(page1.locator('#hubble-eip-layer')).toContainText('£52.05');
  // await expect(page1.locator('#hubble-eip-layer')).toContainText('£34.70');
});
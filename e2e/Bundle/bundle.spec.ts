import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
//mainsite

async function mainsite(page){
    await page.goto('https://www.samsung.com/uk/mobile/bundle-deals/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.getByRole('heading', { name: 'Innovation Bundle' }).click();
}
async function studentCUG(page){
    await page.goto('https://www.samsung.com/uk/multistore/uk_networks/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(20000);
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.waitForTimeout(1500);
    await page.goto('https://www.samsung.com/uk/multistore/uk_networks/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Sign in with Samsung' }).click( { timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Email address' }).fill('mykola.r@samsung.com');
    await page.waitForTimeout(1500);
    await page.getByTestId('test-button-next').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Password' }).fill('M88kolasas!');
    await page.waitForTimeout(1500);
    await page.getByTestId('test-button-signin').click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Not now' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Not now' }).click();

    // await page.getByRole('heading', { name: 'Innovation Bundle' }).click();
}

test.beforeEach('Go to page, accept cookies', async ({ page }) => {
    await mainsite(page);
    // await studentCUG(page);
   
});

test('Assert static copy', async ({ page }) => {
    
    await expect(page.locator('[class*="ch-dt-16 ch-mo-16"]')).toContainText('Innovation Bundle');
    await expect(page.locator('[class*="ch-dt-38 ch-mo-28"]')).toContainText('Buy together and save');
    await expect(page.locator('[class*="ch-dt-18 ch-mo-17"]')).toContainText('Get 10% off select Galaxy Watches & Buds when you buy with any smartphone, tablet, watch or laptop*');
    await expect(page.locator('#content')).toContainText('*Purchase from Samsung.com by 20/01/26. Discount applies automatically at checkout when eligible products are added to the basket. Only one discounted product per full-priced product. The discount will be applied to the device with the lowest value only. Discounts can\'t be used in combination with any other offer, including trade-in, price drops and voucher codes.');
    await expect(page.locator('[class*="step-label"]').first()).toContainText('Browse and pick an item');
    await expect(page.locator('[class*="step-label"]').nth(1)).toContainText('Add the item to your bundle');
    await expect(page.locator('[class*="step-label"]').nth(2)).toContainText('Repeat steps 1 and 2 for your next item');
    await expect(page.locator('[class*="step-label"]').nth(3)).toContainText('Add to basket to enjoy the savings');
});
test('Assert dynamic copy', async ({ page }) => {

await page.getByText('Start here').click();
await expect(page.locator('[class*="sc-bczRLJ bOzQrY"]').nth(0)).toContainText('Start here');
await expect(page.locator('[class*="sc-bczRLJ bOzQrY"]').nth(2)).toContainText('More items, more savings');
await page.getByText('Subtotal £0.00Total price£0.').click();
await expect(page.locator('[class*="sc-bczRLJ ezXnkj"]')).toContainText('Subtotal £0.00');
await expect(page.locator('[class*="sc-bczRLJ cwFQQA"]').nth(0)).toContainText('Total price');
await expect(page.locator('[class*="sc-bczRLJ cwFQQA"]').nth(2)).toContainText('You save');
await expect(page.locator('[class*="info-tooltip"]')).toContainText('Total saving includes bundle and promotional savings. Plus any free gift value, if applicable.');
await expect(page.locator('#bundle-builder-v21')).toContainText('Add bundle to basket');
await expect(page.locator('#selectFirstItem')).toContainText('Select first item');
await page.getByRole('button', { name: 'Select first item' }).click();
await page.locator('#product-list0').getByText('Galaxy S25 Ultra').click();
await page.getByRole('button', { name: 'Add to bundle' }).click();
await expect(page.locator('#bundle-builder-v21')).toContainText('Save extra 10%');
await expect(page.locator('#bundle-builder-v21')).toContainText('on your second item');
await page.getByRole('button', { name: 'Select second item' }).click();
await expect(page.locator('#bundle-builder-v21')).toContainText('£1,349.00');
await expect(page.locator('#bundle-builder-v21')).toContainText('£1,349');
await expect(page.locator('#selectSecondItem')).toContainText('Select second item');
await page.locator('#product-list0').getByText('Galaxy Watch7 Bluetooth (40mm)').click();
await page.getByRole('button', { name: 'Add to bundle' }).click();
// await expect(page.locator('[class*="sc-bczRLJ cwFQQA"]')).toContainText('£1,564.10');

await page.locator('[class*="sc-bczRLJ cwFQQA"]').nth(1).click();
const totalValue = await page.locator('[class*="sc-bczRLJ cwFQQA"]').nth(1).innerText();
console.log(totalValue);

// await page.locator('cx-cart-item-v2').filter({ hasText: 'Galaxy S25 UltraTitanium' }).getByLabel('Remove').click();
await page.getByRole('button', { name: 'Add bundle to basket' }).click();
// await page.goto('https://shop.samsung.com/uk/cart');
const orderSummary= page.locator('cx-order-summary-v2');
await expect(orderSummary).toContainText(totalValue, {timeout: 15000,});
 });
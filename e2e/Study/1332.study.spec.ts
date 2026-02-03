import { test, expect } from '@playwright/test';

const cardSelector = '[class*="features-switch-to-galaxy__item features-switch-to-galaxy__exception js-switch-item"]';
const triggerURL = 'https://www.samsung.com/uk/smartphones/galaxy-z-flip7/?at_preview_token=7P6DzWMiplSrBoTB8YX6fHWEFq-r1NJA9GWwjZnLpb4&at_preview_index=1_2&at_preview_listed_activities_only=false';
const variantB = '?at_preview_token=7P6DzWMiplSrBoTB8YX6fHWEFq-r1NJA9GWwjZnLpb4&at_preview_index=1_2&at_preview_listed_activities_only=false';
const variantC = '?at_preview_token=7P6DzWMiplSrBoTB8YX6fHWEFq-r1NJA9GWwjZnLpb4&at_preview_index=1_3&at_preview_listed_activities_only=false';
const FlipURL = 'https://www.samsung.com/uk/smartphones/galaxy-z-flip7/';
const FoldURL = 'https://www.samsung.com/uk/smartphones/galaxy-z-fold7/';
const copyVariantB1 = 'Finance your upgrade';
const subCopyVariantB1 = /Upgrade.*and spread the cost over 24 months at 0% APR representative with Samsung Finance.‡/i;
const copyVariantB2 = 'Upgrade and spread the cost';
const subCopyVariantB2 = 'Select Samsung Finance when you check out to pay in 24 monthly instalments at 0% APR representative.‡';
const copyVariantC1 = 'Get an instant discount';
const subCopyVariantC1 = /Upgrade.*for less when you trade in an old smartphone.‡/;
const copyVariantC2 = 'Money off your upgrade';
const subCopyVariantC2 = /Upgrade.*for less when you trade in an old smartphone – get an instant discount now.‡/;
const copyVariantC3 = 'Trade in and upgrade';
const subCopyVariantC3 = 'Don’t forget you get an instant discount when you trade in an old smartphone. Upgrade your phone for less now.‡';
const copyVariantB3 = 'Get your upgrade today';
const subCopyVariantB3 = 'Spread the cost of a new Galaxy over 24 months at 0% APR representative with Samsung Finance.‡';
const FlipAltText = 'Galaxy Z Flip7 in Blue Shadow is on an angle and slightly unfolded showing the cover screen';
const FoldAltText = 'Galaxy Z Fold7 in Blue Shadow and slightly unfolded showing the cover screen';
const TradeInDisclaimer = '‡ Purchase from Samsung.com. Values vary by model and condition. Purchased phone will be blocked if you fail to send us your Trade In device. For all values and full T&Cs., visit Samsung.com/uk/trade-in/terms';
const FinanceDisclaimer1 = '‡ Subject to status and credit check. 18+ UK only. Rate offered could be higher than the representative APR shown. Orders require a 10% deposit and up to 24 fixed monthly payments.';
const FinanceDisclaimer2 = 'Samsung Electronics (UK) Limited (Registered no: 03086621), registered at Samsung House, 2000 Hillswood Drive, Chertsey, Surrey KT16 0RS, United Kingdom, acts as credit broker and not lender, and is authorised and regulated by the FCA (FRN 727333). Glow Financial Services Limited, 71 Queen Victoria Street, London EC4V 4BE. Registered No. 09127663, authorised and regulated by the FCA (Reference No. 751308), acting as lender, under brand licence as Samsung Finance (powered by Glow) through Samsung Electronics (UK) Limited. Samsung Electronics (UK) Limited works with multiple lenders.';
const preVisitedPages = [
  {
    name: 'Homepage',
    url: 'https://www.samsung.com/uk/',
  },
  {
    name: 'Smartphones PLP',
    url: 'https://www.samsung.com/uk/smartphones/',
  },
  {
    name: 'Offers page',
    url: 'https://www.samsung.com/uk/offers/',
  },
  {
    name: 'Support page',
    url: 'https://www.samsung.com/uk/support/',
  },
];

// test.beforeEach('accept cookies', async ({ page }) => {

//   await page.goto('https://www.samsung.com/uk/', { waitUntil: 'domcontentloaded' });
//   await page.getByRole('button', { name: 'Accept All' }).click();
// });
async function assertCopy(page, url: string, copy: string, subcopy: string) {
  await page.getByRole('menuitem', { name: 'Switch to Galaxy' }).click();
  await page.keyboard.press('PageDown');
  await page.waitForTimeout(1500);
  const card = page.locator(cardSelector).first();
  await expect(card).toContainText(copy, { timeout: 15000 });
  await expect(card).toContainText(subcopy, { timeout: 15000 });
  return card;
};
async function assertDisclaimer(page, disclaimerCopy: string) {
  await expect(page.locator('body')).toContainText(disclaimerCopy, { timeout: 10000 }
  );
}
async function assertAltText(card, altText: string) {
  const image = card.locator('img');
  await expect(image).toHaveAttribute('alt', altText);
};
async function testItself(page, url: string, copy: string, subcopy: string, altText: string, disclaimerCopy: string) {
  const card = await assertCopy(page, url, copy, subcopy);
  await assertAltText(card, altText);
  await assertDisclaimer(page, disclaimerCopy);
  //FOR MOBILE ONLY
  await page.waitForTimeout(5000);
  await card.scrollIntoViewIfNeeded();
  await card.click();
  //FOR MOBILE ONLY
  await assertLinkedURL(page, url);
}
async function assertLinkedURL(page, url: string) {
  await page.getByRole('link', { name: 'Buy', exact: true }).click();
  await expect(page).toHaveURL(url + 'buy/');
}
async function visitWithReload(page, url: string, reloads: number) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  for (let i = 0; i < reloads; i++) {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
  }
}
for (const precondition of preVisitedPages) {
  test.describe(`Precondition: ${precondition.name}`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(precondition.url, { waitUntil: 'domcontentloaded' });
      // await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'Accept All' }).click({ timeout: 10000 }).catch(() => {});
    });

    test('Finance Flip Test 1 - 2nd visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantB, 0);
      await testItself(page, FlipURL, copyVariantB1, subCopyVariantB1, FlipAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Finance Flip Test 2 - 3rd visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantB, 1);
      await testItself(page, FlipURL, copyVariantB2, subCopyVariantB2, FlipAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Finance Flip Test 3 - 4th visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantB, 2);
      await testItself(page, FlipURL, copyVariantB3, subCopyVariantB3, FlipAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Finance Fold Test 4 - 2nd visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantB, 0);
      await testItself(page, FoldURL, copyVariantB1, subCopyVariantB1, FoldAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Finance Fold Test 5 - 3rd visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantB, 1);
      await testItself(page, FoldURL, copyVariantB2, subCopyVariantB2, FoldAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Finance Fold Test 6 - 4th visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantB, 2);
      await testItself(page, FoldURL, copyVariantB3, subCopyVariantB3, FoldAltText, FinanceDisclaimer1 + FinanceDisclaimer2)
    });
    test('Trade In Flip Test 1 - 2nd visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantC, 0);
      await testItself(page, FlipURL, copyVariantC1, subCopyVariantC1, FlipAltText, TradeInDisclaimer)
    });
    test('Trade In Flip Test 2 - 3rd visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantC, 1);
      await testItself(page, FlipURL, copyVariantC2, subCopyVariantC2, FlipAltText, TradeInDisclaimer)
    });
    test('Trade In Flip Test 3 - 4th visit', async ({ page }) => {
      await visitWithReload(page, FlipURL + variantC, 2);
      await testItself(page, FlipURL, copyVariantC3, subCopyVariantC3, FlipAltText, TradeInDisclaimer)
    });
    test('Trade In Fold Test 4 - 2nd visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantC, 0);
      await testItself(page, FoldURL, copyVariantC1, subCopyVariantC1, FoldAltText, TradeInDisclaimer)
    });
    test('Trade In Fold Test 5 - 3rd visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantC, 1);
      await testItself(page, FoldURL, copyVariantC2, subCopyVariantC2, FoldAltText, TradeInDisclaimer)
    });
    test('Trade In Fold Test 6 - 4th visit', async ({ page }) => {
      await visitWithReload(page, FoldURL + variantC, 2);
      await testItself(page, FoldURL, copyVariantC3, subCopyVariantC3, FoldAltText, TradeInDisclaimer)
    });

  });
}
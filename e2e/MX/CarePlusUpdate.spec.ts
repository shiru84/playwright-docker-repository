import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';


const smartURLs = ['https://www.samsung.com/uk/smartphones/galaxy-s25/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s25-ultra/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s24-ultra/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s24/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s24-fe/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s23/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-s23-ultra/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a56-5g/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a36-5g/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-z-fold7/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-z-flip7/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-z-flip7-fe/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-z-fold6/buy/',
    'https://www.samsung.com/uk/smartphones/galaxy-z-flip6/buy/'
];
const tabURLs = [
    'https://www.samsung.com/uk/tablets/galaxy-tab-s11/buy/',
    'https://www.samsung.com/uk/tablets/galaxy-tab-s10-fe/buy/',
    'https://www.samsung.com/uk/tablets/galaxy-tab-s10/buy/',
    'https://www.samsung.com/uk/tablets/galaxy-tab-s9/buy/',
    'https://www.samsung.com/uk/tablets/galaxy-tab-a9/buy/'
]
const watchURLs = [
    'https://www.samsung.com/uk/watches/galaxy-watch8/buy/',
'https://www.samsung.com/uk/watches/galaxy-watch-ultra-2025/buy/',
'https://www.samsung.com/uk/watches/galaxy-watch7/buy/',
'https://www.samsung.com/uk/watches/galaxy-watch6/buy/'
]
const bookURLs = [
    'https://www.samsung.com/uk/computers/galaxy-book/galaxy-book5-pro/buy/', 
'https://www.samsung.com/uk/computers/galaxy-book/galaxy-book5-pro360/buy/',
'https://www.samsung.com/uk/computers/galaxy-book/galaxy-book4-ultra/buy/',
'https://www.samsung.com/uk/computers/galaxy-book/galaxy-book4-edge/buy/'

]
test.beforeEach('Go to page, accept cookies', async ({ page }) => {
    await page.goto('https://www.samsung.com/uk/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Accept All' }).click();


});
async function runCarePlusTest(page, url: string) {
    await page.goto(url,{ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.getByText('*All prices include insurance').click();
    // What is Samsung Care+ and how does it work?
    await page.getByText('What is Samsung Care+ and how does it work?').click();
    // await page.getByRole('button', { name: 'Preview image of the Samsung' }).click();
    await expect(page.locator('#hubble-service-guide-layer')).toContainText('Get peace of mind for your Samsung Galaxy, with worldwide cover designed by the people who made it.');
    await expect(page.locator('#hubble-service-guide-layer')).toContainText('What’s covered: - Unlimited repairs for accidental damage - Unlimited repairs for breakdown after the manufacturer warranty ends - Samsung certified repairs and parts - Worldwide walk-in repair (subject to local at availability) - Replacement if we can’t repair it - Free battery replacement if it’s below 80% capacity Only included in Samsung Care+ with Theft & Loss - Replacement if your device is stolen or lost - Knox Guard to lock a missing smartphone or tablet and keep your content private What’s not covered - Excess fee for each claim - Cosmetic damage and normal wear and tear that doesn’t affect how your device works - Defects covered by your Samsung warranty Samsung Care+ Terms and Conditions Samsung Care+ with Theft & Loss Terms and Conditions Samsung Care+ is available within 60 days of device purchase. Theft and Loss requires activation of Knox Guard and is subject to limit of two claims per year. Battery replacement available monthly plans only after expiry of Samsung manufacturer’s warranty. Excess payable. Terms and conditions apply. Subject to eligibility. UK residents aged 18+. Samsung Care+ is brought to you by bolttech Insurance Services (UK) limited, which is authorised and regulated by the Financial Conduct Authority (FRN 832644). Claims are administered by bolttech Device Protection (Ireland) Limited registered in Ireland and underwritten by AmTrust Specialty Limited, authorised and regulated by the Prudential Regulation Authority and the Financial Conduct Authority (FRN 202189).');

}

test.describe('Care Plus tests - Smartphone', () => {
    for (const url of smartURLs) {
      test(`Care Plus - Smart - ${url}`, async ({ page }) => {
        await runCarePlusTest(page, url);
      });
    }
  });
  
  test.describe('Care Plus tests - Tablet', () => {
    for (const url of tabURLs) {
      test(`Care Plus - Tab - ${url}`, async ({ page }) => {
        await runCarePlusTest(page, url);
      });
    }
  });
  test.describe('Care Plus tests - Watch', () => {
    for (const url of watchURLs) {
      test(`Care Plus - Watch - ${url}`, async ({ page }) => {
        await runCarePlusTest(page, url);
      });
    }
  });
  test.describe('Care Plus tests - Book', () => {
    for (const url of bookURLs) {
      test(`Care Plus - Book - ${url}`, async ({ page }) => {
        await runCarePlusTest(page, url);
      });
    }
  });

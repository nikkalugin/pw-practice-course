import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('.filter hasText', ({ page }) => {
    page.locator('//button').filter({ hasText: 'Sign up' });
    page.getByRole('button').filter({ hasText: 'Sign' });
    page.locator('//button', { hasText: 'Sign in' });
    page.getByRole('button', { name: 'Sign up' });
});

test('.filter hasNotText', ({ page }) => {
    page.locator('//button').filter({ hasNotText: 'Sign' });
});

test('.filter has', async ({ page }) => {
    await page.locator('//a').filter({ has: page.locator('span.icon-telegram') }).highlight();
});

test('.filter hasNot', async ({ page }) => {
    await page.locator('//a').filter({ hasNot: page.locator('span.icon-telegram') }).highlight();
});

test('.locator.locator', async ({ page }) => {
    await page.locator('//nav').locator('//a').highlight();
});
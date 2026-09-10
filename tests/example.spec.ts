import { test, expect } from '@playwright/test';

test.beforeAll(() => {
    console.log('GLOBAL Before all');
});

test.beforeEach(() => {
    console.log('GLOBAL Before each');
});

test.afterEach(() => {
    console.log('GLOBAL After each');
});

test.afterAll(() => {
    console.log('GLOBAL After all');
});

test.describe('Example tests 1', () => {

    test.beforeEach(() => {
        console.log('LOCAL Before each');
    });

    test('has title 1', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('get started link 1', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // Click the get started link.
        await page.getByRole('link', { name: 'Get started' }).click();

        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});

test.describe('Example tests 2', () => {

    test('has title 2', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('get started link 2', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // Click the get started link.
        await page.getByRole('link', { name: 'Get started' }).click();

        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});
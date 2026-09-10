import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('Site access', async  () => {
});

test('page.locator - XPath', ({ page }) => {
    const title = page.locator('//h1');
    const allButtons = page.locator('//button');
    const allButtonsXpath = page.locator('xpath=//button');

});

test('page.locator - CSS', async ({ page }) => {
    const title = page.locator('h1');
    const titleCss = page.locator('css=h1');
    const button = page.locator('.btn-primary');
    await button.click();
});

test('getByRole', ({ page }) => {
    page.getByRole('button');
});

test('getByText', ({ page }) => {
    page.getByText('Do more!');
});

test('getByPlaceholder', ({ page }) => {
    page.getByPlaceholder('');
});

test('getByAltText', ({ page }) => {
    page.getByAltText('Instructions');
});

test('getByLabel', ({ page }) => {
    page.getByLabel('Email');
});

test('getByTitle', ({ page }) => {
    page.getByTitle('');
});

test('getByTestId', ({ page }) => {
    page.getByTestId('test');
});
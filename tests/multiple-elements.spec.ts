import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('count', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    console.log(await elements.count());
});

test('first', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.first().highlight();
});

test('last', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.last().highlight();
});

test('nth', async ({ page }) => {
    const elements = page.locator('.socials_icon');
    await elements.nth(2).highlight();
});

test('all', async ({ page }) => {
    const elements = page.locator('a');
    for(const item of await elements.all()) {
        const text = await item.textContent();
        console.log(text);
    }
});
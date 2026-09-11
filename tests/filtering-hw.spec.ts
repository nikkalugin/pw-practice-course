import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('Завдання 1: Порахувати всі кнопки на сторінці', async ({ page }) => {
    const buttons = page.getByRole('button');
    console.log(await buttons.count());
});

test('Завдання 2: Фільтрація кнопок за текстом (hasText)', async ({ page }) => {
    const buttons = page.getByRole('button');
    await buttons.filter({ hasText: 'Sign In' }).highlight();
});
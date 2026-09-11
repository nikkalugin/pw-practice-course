import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('Завдання 1: Перевірка видимості кнопки “Sign In”', async ({ page }) => {
    const signIn = page.getByRole('button', { name: 'Sign In' });
    await expect(signIn).toBeVisible();
});

test('Завдання 2: Перевірка тексту заголовка (toHaveText)', async ({ page }) => {
    const heading = page.locator('h1.hero-descriptor_title');
    await expect(heading).toHaveText('Do more!');
});

test('Завдання 3: Перевірка кількості елементів (toHaveCount)', async ({ page }) => {
    const imgs = page.getByAltText('Instructions');
    await expect(imgs).toHaveCount(2);
});
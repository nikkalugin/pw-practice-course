import test from "@playwright/test";

test('Завдання 1: Пошук кнопки “Sign In” різними способами', async ({ page }) => {
    await page.goto('');

    // CSS
    const cssBtn = page.locator('button.header_signin');
    await cssBtn.highlight();

    // XPath
    const xpathBtn = page.locator('//button[contains(@class, "header_signin")]');
    await xpathBtn.highlight();

    // getByRole
    const getByRoleBtn = page.getByRole('button', { name:'Sign In' });
    await getByRoleBtn.highlight();
});

test('Завдання 2: Пошук елементів навігації у хедері', async ({ page }) => {
    await page.goto('');

    const header = page.locator('header');

    // Home
    const homeBtn = header.getByText('Home');
    await homeBtn.highlight();

    // About
    const aboutBtn = header.getByText('About');
    await aboutBtn.highlight();

    // Contacts
    const contactsBtn = header.getByText('Contacts');
    await contactsBtn.highlight();
});
import test, { expect } from "@playwright/test";

test.describe('CodeGen Sign In tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign In' }).click();
    });
    
    test('Successful Sign In', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('expeditiontomysoul+test123@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('ForTheHorde99!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading')).toContainText('Garage');
    });

    test('Sign In with empty email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).focus();
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await page.getByRole('textbox', { name: 'Password' }).fill('ForTheHorde99!');
        await expect(page.getByText('Email required')).toBeVisible();
    });

    test('Sign In with empty password', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('expeditiontomysoul+test123@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).focus();
        await page.getByRole('textbox', { name: 'Password' }).blur();
        await expect(page.getByText('Password required')).toBeVisible();
    });
    
    test('Sign incorrect email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('qweqweasdzxc');
        await page.getByRole('textbox', { name: 'Password' }).fill('ForTheHorde99!');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });
    
    test('Sign In with wrong password', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('expeditiontomysoul+test123@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('ForTheHorde99');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
    });

});
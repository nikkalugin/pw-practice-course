import test, { expect } from "@playwright/test";

let email: string;

test.describe('Sign Up Verification', () => {

    test.beforeEach(async ({ page }) => {
        email = `nik+aqa${Date.now()}@gmail.com`;

        await page.goto('');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.locator('h4.modal-title')).toHaveText('Registration');
    });

    test.describe('Sign Up Process', () => {

        test('Successful Sign Up Process', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Garage' })).toHaveText('Garage');
        });

        test('Verifying that user cant sign up with an existing email', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.getByRole('heading', { name: 'Garage' })).toHaveText('Garage');
            await page.locator('a.btn.btn-link.text-danger').click();
            await page.getByRole('button', { name: 'Sign up' }).click();
            await expect(page.locator('h4.modal-title')).toHaveText('Registration');
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await page.getByRole('button', { name: 'Register' }).click();
            await expect(page.locator('p.alert-danger')).toHaveText('User already exists');
        });

    });

    test.describe('Registration Form', () => {
        
        test('Registration Form is successfully closed', async ({ page }) => {
            await page.locator('button.close').click();
            await expect(page.locator('div.modal-content')).not.toBeVisible();
        });

    });

    test.describe('Name field', () => {

        test('Verify "Name required" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupName').focus();
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name required');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value is numeric', async ({ page }) => {
            await page.locator('#signupName').fill('123');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name is invalid');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value is cyrillic word', async ({ page }) => {
            await page.locator('#signupName').fill('Тест');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name is invalid');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value are symbols', async ({ page }) => {
            await page.locator('#signupName').fill('!$%&');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name is invalid');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value are entering spaces', async ({ page }) => {
            await page.locator('#signupName').fill('   ');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name is invalid');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name has to be from 2 to 20 characters long" error appears when data value with 1 character', async ({ page }) => {
            await page.locator('#signupName').fill('q');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name has to be from 2 to 20 characters long" error appears when data value with 21 characters', async ({ page }) => {
            await page.locator('#signupName').fill('qqqqqqqqqqqqqqqqqqqqA');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
            await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupName').blur();
            await expect(page.locator('div.invalid-feedback')).not.toBeVisible();
            await expect(page.locator('#signupName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Last Name field', () => {
        
        test('Verify "Last name required" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupLastName').focus();
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name required');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value is numeric', async ({ page }) => {
            await page.locator('#signupLastName').fill('123');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name is invalid');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value is cyrillic word', async ({ page }) => {
            await page.locator('#signupLastName').fill('Тест');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name is invalid');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value are symbols', async ({ page }) => {
            await page.locator('#signupLastName').fill('!#%&');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name is invalid');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value are entering spaces', async ({ page }) => {
            await page.locator('#signupLastName').fill('   ');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name is invalid');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name has to be from 2 to 20 characters long" error appears when data value with 1 character', async ({ page }) => {
            await page.locator('#signupLastName').fill('q');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name has to be from 2 to 20 characters long" error appears when data value with 21 characters', async ({ page }) => {
            await page.locator('#signupLastName').fill('qqqqqqqqqqqqqqqqqqqqA');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
            await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async ({ page }) => {
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupLastName').blur();
            await expect(page.locator('div.invalid-feedback')).not.toBeVisible();
            await expect(page.locator('#signupLastName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Email field', () => {

        test('Verify "Email required" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupEmail').focus();
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email required');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when @ is absent', async ({ page }) => {
            await page.locator('#signupEmail').fill('testgmail.com');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has entering spaces', async ({ page }) => {
            await page.locator('#signupEmail').fill('test @ gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email does not have dots', async ({ page }) => {
            await page.locator('#signupEmail').fill('test@gmailcom');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has @ at the beginning', async ({ page }) => {
            await page.locator('#signupEmail').fill('@testgmail.com');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has @ at the ending', async ({ page }) => {
            await page.locator('#signupEmail').fill('testgmail.com@');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has 1 character in domain', async ({ page }) => {
            await page.locator('#signupEmail').fill('test@gmail.c');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has different symbols in domain', async ({ page }) => {
            await page.locator('#signupEmail').fill('test@gmail.c!o$m');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
            await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async ({ page }) => {
            await page.locator('#signupEmail').fill('test@gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(page.locator('div.invalid-feedback')).not.toBeVisible();
            await expect(page.locator('#signupEmail')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Password field', () => {

        test('Verify "Password required" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupPassword').focus();
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password required');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
        
        test('Verify error appears when password has 7 characters', async ({ page }) => {
            await page.locator('#signupPassword').fill('asdasda');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has 16 characters', async ({ page }) => {
            await page.locator('#signupPassword').fill('asdasdaasdasdaas');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no integers', async ({ page }) => {
            await page.locator('#signupPassword').fill('QwertyQwerty');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no capital letters', async ({ page }) => {
            await page.locator('#signupPassword').fill('qwertyqwerty1');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no small letters', async ({ page }) => {
            await page.locator('#signupPassword').fill('QWERTYQWERTY1');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async ({ page }) => {
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupPassword').blur();
            await expect(page.locator('div.invalid-feedback')).not.toBeVisible();
            await expect(page.locator('#signupPassword')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Re-enter password', () => {

        test('Verify "Re-enter password required" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupRepeatPassword').focus();
            await page.locator('#signupRepeatPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Re-enter password required');
            await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Passwords do not match" error appears while field is empty', async ({ page }) => {
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123');
            await page.locator('#signupRepeatPassword').blur();
            await expect(page.locator('div.invalid-feedback')).toHaveText('Passwords do not match');
            await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async ({ page }) => {
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').blur();
            await expect(page.locator('div.invalid-feedback')).not.toBeVisible();
            await expect(page.locator('#signupRepeatPassword')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Register button', () => {

        test('Verify "Register" button is enabled when all fields are filled in correctly', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
        });

        test('Verify "Register" button is disabled when Registration Form is open', async ({ page }) => {
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Name" field has incorrect value', async ({ page }) => {
            await page.locator('#signupName').fill('T');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Last Name" field has incorrect value', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('T');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Email" field has incorrect value', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill('test@@@test.s');
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Password" and "Re-enter Password" fields have incorrect values', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        });

        test('Verify "Register" button becomes enable after correcting invalid values', async ({ page }) => {
            await page.locator('#signupName').fill('Tester');
            await page.locator('#signupLastName').fill('Testerenko');
            await page.locator('#signupEmail').fill(email);
            await page.locator('#signupPassword').fill('Qwerty123!');
            await page.locator('#signupRepeatPassword').fill('Qwerty123');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
            await page.locator('#signupRepeatPassword').fill('Qwerty123!');
            await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
        });

    });

});
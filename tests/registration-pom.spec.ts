import test, { expect } from "@playwright/test";
import { HomePage } from "../pom/pages/HomePage";
import { SignUpForm } from "../pom/forms/SignUpForm";
import { GaragePage } from "../pom/pages/GaragePage";

let email: string;
let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;

test.describe('Sign Up Verification', () => {

    test.beforeEach(async ({ page }) => {
        email = `nik+aqa${Date.now()}@gmail.com`;
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignUpForm();
        await expect(signUpForm.registrationTitle).toHaveText('Registration');
    });

    test.describe('Sign Up Process', () => {

        test('Successful Sign Up Process', async () => {
            await signUpForm.signUp('Tester', 'Testerenko', email, 'Qwerty123!', 'Qwerty123!');
            await expect(garagePage.pageHeading).toHaveText('Garage');
        });

        test('Verifying that user cant sign up with an existing email', async () => {
            await signUpForm.signUp('Tester', 'Testerenko', email, 'Qwerty123!', 'Qwerty123!');
            await expect(garagePage.pageHeading).toHaveText('Garage');
            await garagePage.clickLogOutButton();
            await homePage.openSignUpForm();
            await expect(signUpForm.registrationTitle).toHaveText('Registration');
            await signUpForm.signUp('Tester', 'Testerenko', email, 'Qwerty123!', 'Qwerty123!');
            await expect(signUpForm.userErrorMessage).toHaveText('User already exists');
        });

    });

    test.describe('Registration Form', () => {
        
        test('Registration Form is successfully closed', async () => {
            await signUpForm.clickCloseButton();
            await expect(signUpForm.registrationForm).not.toBeVisible();
        });

    });

    test.describe('Name field', () => {

        test('Verify "Name required" error appears while field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.nameField);
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name required');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value is numeric', async () => {
            await signUpForm.enterName('123');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value is cyrillic word', async () => {
            await signUpForm.enterName('Тест');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value are symbols', async () => {
            await signUpForm.enterName('!№%?');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name is invalid" error appears when data value are entering spaces', async () => {
            await signUpForm.enterName('   ');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name has to be from 2 to 20 characters long" error appears when data value with 1 character', async () => {
            await signUpForm.enterName('q');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Name has to be from 2 to 20 characters long" error appears when data value with 21 characters', async () => {
            await signUpForm.enterName('qqqqqqqqqqqqqqqqqqqqA');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.errorMessage).not.toBeVisible();
            await expect(signUpForm.nameField).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Last Name field', () => {
        
        test('Verify "Last name required" error appears while field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.lastNameField);
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name required');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value is numeric', async () => {
            await signUpForm.enterLastName('123');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value is cyrillic word', async () => {
            await signUpForm.enterLastName('Тест');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value are symbols', async () => {
            await signUpForm.enterLastName('!#%&');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name is invalid" error appears when data value are entering spaces', async () => {
            await signUpForm.enterLastName('   ');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name has to be from 2 to 20 characters long" error appears when data value with 1 character', async () => {
            await signUpForm.enterLastName('q');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Last name has to be from 2 to 20 characters long" error appears when data value with 21 characters', async () => {
            await signUpForm.enterLastName('qqqqqqqqqqqqqqqqqqqqA');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async () => {
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.errorMessage).not.toBeVisible();
            await expect(signUpForm.lastNameField).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Email field', () => {

        test('Verify "Email required" error appears while field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.emailField);
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email required');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when @ is absent', async () => {
            await signUpForm.enterEmail('testgmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has entering spaces', async () => {
            await signUpForm.enterEmail('test @ gmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email does not have dots', async () => {
            await signUpForm.enterEmail('test@gmailcom');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has @ at the beginning', async () => {
            await signUpForm.enterEmail('@testgmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has @ at the ending', async () => {
            await signUpForm.enterEmail('testgmail.com@');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has 1 character in domain', async () => {
            await signUpForm.enterEmail('test@gmail.c');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Email is incorrect" error appears when email has different symbols in domain', async () => {
            await signUpForm.enterEmail('test@gmail.c!o$m');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async () => {
            await signUpForm.enterEmail('test@gmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.errorMessage).not.toBeVisible();
            await expect(signUpForm.emailField).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Password field', () => {

        test('Verify "Password required" error appears while field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.passwordField);
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password required');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
        
        test('Verify error appears when password has 7 characters', async () => {
            await signUpForm.enterPassword('asdasda');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has 16 characters', async () => {
            await signUpForm.enterPassword('asdasdaasdasdaas');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no integers', async () => {
            await signUpForm.enterPassword('QwertyQwerty');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no capital letters', async () => {
            await signUpForm.enterPassword('qwertyqwerty1');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify error appears when password has no small letters', async () => {
            await signUpForm.enterPassword('QWERTYQWERTY1');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async () => {
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.errorMessage).not.toBeVisible();
            await expect(signUpForm.passwordField).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Re-enter password', () => {

        test('Verify "Re-enter password required" error appears while field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.repeatPasswordField);
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.errorMessage).toHaveText('Re-enter password required');
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify "Passwords do not match" error appears while field is empty', async () => {
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123');
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.errorMessage).toHaveText('Passwords do not match');
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

        test('Verify that value is successfully passed', async () => {
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.errorMessage).not.toBeVisible();
            await expect(signUpForm.repeatPasswordField).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });

    });

    test.describe('Register button', () => {

        test('Verify "Register" button is enabled when all fields are filled in correctly', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await expect(signUpForm.registerButton).toBeEnabled();
        });

        test('Verify "Register" button is disabled when Registration Form is open', async () => {
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Name" field has incorrect value', async () => {
            await signUpForm.enterName('T');
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Last Name" field has incorrect value', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.enterLastName('T');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Email" field has incorrect value', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.enterEmail('test@@@test.s');
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify "Register" button is disabled when "Password" and "Re-enter Password" fields have incorrect values', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify "Register" button becomes enable after correcting invalid values', async () => {
            await signUpForm.enterName('Tester');
            await signUpForm.enterLastName('Testerenko');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Qwerty123!');
            await signUpForm.enterRepeatPassword('Qwerty123');
            await expect(signUpForm.registerButton).toBeDisabled();
            await signUpForm.enterRepeatPassword('Qwerty123!');
            await expect(signUpForm.registerButton).toBeEnabled();
        });

    });

});
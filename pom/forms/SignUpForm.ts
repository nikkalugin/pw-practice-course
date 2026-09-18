import { expect, Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class SignUpForm extends BaseForm {
    public readonly registrationTitle: Locator = this.page.locator('h4.modal-title');
    public readonly nameField: Locator = this.page.locator('#signupName');
    public readonly lastNameField: Locator = this.page.locator('#signupLastName');
    public readonly emailField: Locator = this.page.locator('#signupEmail');
    public readonly passwordField: Locator = this.page.locator('#signupPassword');
    public readonly repeatPasswordField: Locator = this.page.locator('#signupRepeatPassword');
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    private readonly closeButton: Locator = this.page.locator('button.close');
    public readonly userErrorMessage: Locator = this.page.locator('p.alert-danger');
    public readonly registrationForm: Locator = this.page.locator('div.modal-content');
    public readonly errorMessage: Locator = this.page.locator('div.invalid-feedback');

    async signUp(name: string, lastName: string, email: string, password: string, reenterPassword: string): Promise<void> {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(reenterPassword);
        await this.clickRegisterButton();
    }

    async enterName(name: string) {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async enterRepeatPassword(repeatedPassword: string) {
        await this.repeatPasswordField.fill(repeatedPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }

    async focusOnField(field: Locator) {
        await field.focus();
    }

    async blurOnField(field: Locator) {
        await field.blur();
    }
}
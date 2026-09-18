import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up'});

    async navigate() {
        await super.navigate('/');
    }

    async openSignInForm() {
        this.signInButton.click();
    }

    async openSignUpForm() {
        this.signUpButton.click();
    }
}
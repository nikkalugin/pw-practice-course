import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GaragePage extends BasePage {
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly logOutButton: Locator = this.page.locator('a.btn.btn-link.text-danger');

    async navigate() {
        await super.navigate('/panel/garage');
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}
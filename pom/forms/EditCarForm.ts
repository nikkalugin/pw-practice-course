import { Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class EditCarForm extends BaseForm {
    private readonly removeCarButton: Locator = this.page.locator('.btn-outline-danger');
    private readonly confirmRemovingButton: Locator = this.page.locator('.btn-danger');

    async removeOpenedCar() {
        await this.removeCarButton.click();
        await this.confirmRemovingButton.click();
    }
}
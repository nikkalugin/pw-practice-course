import { expect, Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class AddCarForm extends BaseForm {
    public readonly formTitle: Locator = this.page.locator('.modal-title', { hasText: 'Add a car' });
    private readonly brandDropdown: Locator = this.page.locator('#addCarBrand');
    private readonly modelDropdown: Locator = this.page.locator('#addCarModel');
    private readonly mileageField: Locator = this.page.locator('#addCarMileage');
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add', exact: true });
    private readonly cancelButton: Locator = this.page.getByRole('button', { name: 'Cancel' });
    private readonly closeIcon: Locator = this.page.locator('button[aria-label="Close"]');

    private async waitForModelUpdate() {
        await this.page.waitForTimeout(500);
    }

    async addNewCar(brand: string, model: string, mileage: string) {
        await this.selectBrand(brand);
        await this.waitForModelUpdate();
        await this.selectModel(model);
        await this.enterMileage(mileage);
        await this.clickAddCarButton();
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption(brand);
    }

    async selectModel(model: string) {
        await this.modelDropdown.selectOption(model);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }
}
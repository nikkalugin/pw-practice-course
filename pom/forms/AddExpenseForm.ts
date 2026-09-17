import { expect, Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class AddExpenseForm extends BaseForm {
    public readonly formTitle: Locator = this.page.locator('.modal-title', { hasText: 'Add an expense' });
    private readonly vehicleDropdown: Locator = this.page.locator('#addExpenseCar');
    private readonly reportDateField: Locator = this.page.locator('#addExpenseDate');
    public readonly mileageField: Locator = this.page.locator('#addExpenseMileage');
    private readonly numbersOfLitersField: Locator = this.page.locator('#addExpenseLiters');
    private readonly totalCostField: Locator = this.page.locator('#addExpenseTotalCost');
    private readonly addExpenseButton: Locator = this.page.getByRole('button', { name: 'Add', exact: true });
    public readonly futureDateErrorMessage: Locator = this.page.locator('.alert-danger', { hasText: 'Report date has to be less than tomorrow' });
    public readonly lessOrEqualMileageErrorMessage: Locator = this.page.locator('.alert-danger', { 
        hasText: `First expense mileage must not be less or equal to car initial mileage. Car initial mileage is` 
    });
    public readonly wrongLitersErrorMessage: Locator = this.page.locator('.invalid-feedback p', { 
        hasText: 'Liters has to be from 0.01 to 9999' 
    });
    public readonly wrongTotalCostErrorMessage: Locator = this.page.locator('.invalid-feedback p', {
        hasText: 'Total cost has to be from 0.01 to 1000000'
    });

    async verifyFormIsOpen() {
        await expect(this.formTitle).toBeVisible();
    }

    async selectVehicle(vehicle: string) {
        await this.vehicleDropdown.selectOption(vehicle);
    }

    async enterReportDate(date: string) {
        await this.reportDateField.fill(date);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async enterNumberOfLiters(liters: string) {
        await this.numbersOfLitersField.fill(liters);
    }

    async enterTotalCost(cost: string) {
        await this.totalCostField.fill(cost);
        await this.totalCostField.blur();
    }

    async addNewExpense(mileage: string, liters: string, cost: string, vehicle?: string, date?: string) {
        await expect(this.vehicleDropdown).toBeEnabled();
        await this.page.waitForTimeout(300);
        if (vehicle) {
            await this.selectVehicle(vehicle);
        }
        
        if (date) {
            await this.enterReportDate(date);
        }

        await this.enterMileage(mileage);
        await this.enterNumberOfLiters(liters);
        await this.enterTotalCost(cost);
        await this.clickAddExpenseButton();
    }

    async clickAddExpenseButton() {
        await this.addExpenseButton.click();
    }
}
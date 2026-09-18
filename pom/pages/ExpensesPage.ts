import { Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ExpensesPage extends BasePage {
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Fuel expenses' });
    private readonly addExpenseButton: Locator = this.page.getByRole('button', { name: 'Add an expense'});
    private readonly lastAddedExpenseEntry: Locator = this.page.locator('.expenses_table tr').nth(1);
    private readonly successAddingExpense: Locator = this.page.locator('.alert-success p', { hasText: 'Fuel expense added' });

    async navigate() {
        await super.navigate('/panel/expenses');
    }

    async openAddExpenseForm() {
        await this.addExpenseButton.click();
        await this.page.waitForTimeout(300);
    }

    async verifyLastExpenseIsAdded(expectedDate: string, expectedMileage: string, expectedLiters: string, expectedCost: string) {
        const formattedCost = expectedCost.includes('.') 
            ? `${expectedCost} USD` 
            : `${expectedCost}.00 USD`;

        await expect(this.successAddingExpense).toBeVisible();
        await expect(this.lastAddedExpenseEntry.locator('td').nth(0)).toHaveText(expectedDate);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(1)).toHaveText(expectedMileage);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(2)).toHaveText(`${expectedLiters}L`);
        await expect(this.lastAddedExpenseEntry.locator('td').nth(3)).toHaveText(formattedCost);
    }
}
import { expect, test } from "../utils/fixtures/pagesFixtures";
import GarageService from "../utils/api/services/GarageService";
import { getSidFromStorageState } from "../utils/storageState/storageState";
import { faker } from '@faker-js/faker';
import { generateExpenseData } from "../utils/factories/expenses.factory";
import { generateCurrentDate, generateFutureDate } from "../utils/factories/dates.factory";

test.describe('Fuel Expenses tests', () => {

    let garageService: GarageService;

    test.use({ storageState: '.states/testUser2.json' });

    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        const sid = getSidFromStorageState('.states/testUser2.json');
        await garageService.addCar(sid, 1, 1, 999);
    });

    test('Correct adding of expense with valid data', async ({ app }) => {
        const { formattedDate } = generateCurrentDate();
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost);
        await app.expensesPage.verifyLastExpenseIsAdded(formattedDate, mileage, numberOfLiters, totalCost);
    });

    test('Validation - future date', async ({ app }) => {
        const { formattedDate } = generateFutureDate();
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost, undefined, formattedDate);
        await expect(app.addExpenseForm.futureDateErrorMessage).toBeVisible();
    });

    test('Validation - adding expense with current number of mileage', async ({ app }) => {
        const { numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        const newMileage = await app.addExpenseForm.mileageField.inputValue();
        await app.addExpenseForm.addNewExpense(newMileage, numberOfLiters, totalCost);
        await expect(app.addExpenseForm.lessOrEqualMileageErrorMessage).toBeVisible();
    });

    test('Validation - zero or negative number of liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: -10, litersMax: 0 });

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    });

    test('Validation - zero or negative total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: -10, costMax: 0 });

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongTotalCostErrorMessage).toBeVisible();
    });

    test('Validation - more than 9999 liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: 10000, litersMax: 500000 });

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    });

    test('Validation - more than 1000000 total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: 10000000, costMax: 100000001 });

        await app.expensesPage.navigate();
        await expect(app.expensesPage.pageHeading).toBeVisible();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.verifyFormIsOpen();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongTotalCostErrorMessage).toBeVisible();
    });
});
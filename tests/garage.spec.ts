import { expect } from "@playwright/test";
import { test } from "../utils/fixtures/pagesFixtures";

test.describe('Garage tests', () => {

    test.use({ storageState: '.states/testUser1.json' });

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
        await expect(app.addCarForm.formTitle).toBeVisible();
    });

    test.describe('Adding cars', () => {

        test('Add new car - BMW X5', async ({ app }) => {
            await app.addCarForm.addNewCar('BMW', 'X5', '999');
            await app.garagePage.verifyCarIsAdded('BMW X5', '999');
        });

        test('Add new car - Audi Q7', async ({ app }) => {
            await app.addCarForm.addNewCar('Audi', 'Q7', '999');
            await app.garagePage.verifyCarIsAdded('Audi Q7', '999');
        });

        test.afterEach(async ({ app }) => {
            await app.garagePage.openEditCarForm(0);
            await app.editCarForm.removeOpenedCar();
            await app.garagePage.verifyCarIsRemoved();
        });

    });

    test('Add new car without mileage', async ({ app }) => {
        await app.addCarForm.selectBrand('Audi');
        await app.addCarForm.selectModel('TT');
        await expect(app.addCarForm.addCarButton).toBeDisabled();
    });

    test('Close "Add new car" from via "Cancel" button', async ({ app }) => {
        await app.addCarForm.clickCancelButton();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });

    test('Close "Add new car" from via close button', async ({ app }) => {
        await app.addCarForm.clickCloseIcon();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });

});
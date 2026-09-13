import test, { expect } from "@playwright/test";
import { GaragePage } from "../pom/pages/GaragePage";
import { HomePage } from "../pom/pages/HomePage";
import { SignInForm } from "../pom/forms/SignInForm";
import { AddCarForm } from "../pom/forms/AddCarForm";

test.describe('Garage tests', () => {

    let garagePage: GaragePage;
    let homePage: HomePage;
    let signInForm: SignInForm;
    let addCarForm: AddCarForm;

    test.use({ storageState: '.states/auth.json' });

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        addCarForm = new AddCarForm(page);
        
        await garagePage.navigate();
        await garagePage.openAddCarForm();
        await expect(addCarForm.formTitle).toBeVisible();
    });
    
    test('Add new car - BMW X5', async () => {
        await addCarForm.addNewCar('BMW', 'X5', '999');
        await addCarForm.verifyCarIsAdded('BMW X5', '999');
    });

    test('Add new car - Audi Q7', async () => {
        await addCarForm.addNewCar('Audi', 'Q7', '999');
        await addCarForm.verifyCarIsAdded('Audi Q7', '999');
    });

    test('Add new car without mileage', async () => {
        await addCarForm.selectBrand('Audi');
        await addCarForm.selectModel('TT');
        await expect(addCarForm.addCarButton).toBeDisabled();
    });

    test('Close "Add new car" from via "Cancel" button', async () => {
        await addCarForm.clickCancelButton();
        await expect(addCarForm.formTitle).not.toBeVisible();
    });

    test('Close "Add new car" from via close button', async () => {
        await addCarForm.clickCloseIcon();
        await expect(addCarForm.formTitle).not.toBeVisible();
    });

});
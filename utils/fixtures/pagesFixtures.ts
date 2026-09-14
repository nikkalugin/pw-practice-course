import { test as base, Page } from '@playwright/test';
import { GaragePage } from '../../pom/pages/GaragePage';
import { HomePage } from "../../pom/pages/HomePage";
import { SignInForm } from "../../pom/forms/SignInForm";
import { AddCarForm } from "../../pom/forms/AddCarForm";
import { EditCarForm } from '../../pom/forms/EditCarForm';

type App = {
    page: Page;
    garagePage: GaragePage;
    homePage: HomePage;
    signInForm: SignInForm;
    addCarForm: AddCarForm;
    editCarForm: EditCarForm;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            garagePage: new GaragePage(page),
            homePage: new HomePage(page),
            signInForm: new SignInForm(page),
            addCarForm: new AddCarForm(page),
            editCarForm: new EditCarForm(page)
        };
        await use(app);
    }
});

// export const test = base.extend<Pages>({
//     garagePage: async ({ page }, use) => {
//         const garagePage = new GaragePage(page);
//         await use(garagePage);
//     },
//     homePage: async ({ page }, use) => {
//         const homePage = new HomePage(page);
//         await use(homePage);
//     },
//     signInForm: async ({ page }, use) => {
//         const signInForm = new SignInForm(page);
//         await use(signInForm);
//     },
//     addCarForm: async ({ page, garagePage }, use) => {
//         await garagePage.navigate();
//         await garagePage.openAddCarForm();
//         const addCarForm = new AddCarForm(page);
//         await use(addCarForm);
//     },
//     addCarFormWithRemovingCar: async ({ addCarForm, garagePage, editCarForm }, use) => {
//         await garagePage.navigate();
//         await garagePage.openAddCarForm();
//         await expect(addCarForm.formTitle).toBeVisible();
//         await use(addCarForm);
//         await garagePage.openEditCarForm(0);
//         await editCarForm.removeOpenedCar();
//         await garagePage.verifyCarIsRemoved();
//     },
//     addCarFormAsUser1: async ({ browser }, use) => {
//         const context = await browser.newContext({
//             storageState: '.states/testUser1.json'
//         });
//         const page = await context.newPage();
//         const garagePage = new GaragePage(page);
//         const addCarForm = new AddCarForm(page);

//         await garagePage.navigate();
//         await garagePage.openAddCarForm();
//         await expect(addCarForm.formTitle).toBeVisible();
//         await use(addCarForm);
//         await context.close();
//     },
//     addCarFormAsUser2: async ({ browser }, use) => {
//         const context = await browser.newContext({
//             storageState: '.states/testUser2.json'
//         });
//         const page = await context.newPage();
//         const garagePage = new GaragePage(page);
//         const addCarForm = new AddCarForm(page);

//         await garagePage.navigate();
//         await garagePage.openAddCarForm();
//         await expect(addCarForm.formTitle).toBeVisible();
//         await use(addCarForm);
//         await context.close();
//     },
//     editCarForm: async ({ page }, use) => {
//         const editCarForm = new EditCarForm(page);
//         await use(editCarForm);
//     }
// });

export { expect } from '@playwright/test';
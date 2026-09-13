import test, { expect } from "@playwright/test";
import { GaragePage } from "../../pom/pages/GaragePage";
import { HomePage } from "../../pom/pages/HomePage";
import { SignInForm } from "../../pom/forms/SignInForm";
import { AddCarForm } from "../../pom/forms/AddCarForm";
import { testUser1 } from "../../test-data/validUsers";

let garagePage: GaragePage;
let homePage: HomePage;
let signInForm: SignInForm;
let addCarForm: AddCarForm;

test('Log in as testUser1 and save Storage State', async ({ page, context }) => {
    garagePage = new GaragePage(page);
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    addCarForm = new AddCarForm(page);

    await homePage.navigate();
    await homePage.openSignInForm();
    await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await expect(garagePage.pageHeading).toContainText('Garage');

    await context.storageState({ path: '.states/auth.json' });
});
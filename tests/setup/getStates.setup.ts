import { expect } from "@playwright/test";
import { testUser1, testUser2 } from "../../test-data/validUsers";
import { test } from "../../utils/fixtures/pagesFixtures";

test('Log in as testUser1 and save Storage State', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await expect(app.garagePage.pageHeading).toContainText('Garage');

    await context.storageState({ path: '.states/testUser1.json' });
    await context.close();
});

test('Log in as testUser2 and save Storage State', async ({ context, app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
    await app.signInForm.signInWithCredentials(testUser2.email, testUser2.password);
    await expect(app.garagePage.pageHeading).toContainText('Garage');

    await context.storageState({ path: '.states/testUser2.json' });
    await context.close();
});
import { expect } from "@playwright/test";
import { testUser1, testUser2 } from "../../test-data/validUsers";
import { test as setup } from "@playwright/test";
import AuthService from "../../utils/api/services/AuthService";

setup.describe('Get storage state for test users', () => {
    setup('Log in as testUser1 and save Storage State', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser1.email, testUser1.password);
        expect(response.status()).toBe(200);

        await request.storageState({ path: '.states/testUser1.json' });
    });

    setup('Log in as testUser2 and save Storage State', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser2.email, testUser2.password);
        expect(response.status()).toBe(200);

        await request.storageState({ path: '.states/testUser2.json' });
    });
});
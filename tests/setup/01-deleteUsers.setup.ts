import { test as setup } from "@playwright/test";
import UsersService from "../../utils/api/services/UsersService";
import AuthService from "../../utils/api/services/AuthService";
import { testUser1, testUser2 } from "../../test-data/validUsers";

let usersService: UsersService;
let authService: AuthService;

setup.describe('Delete users via API', () => {

    setup.beforeEach(({ request }) => {
        usersService = new UsersService(request);
        authService = new AuthService(request);
    });

    setup('Delete user testUser1', async () => {
        const sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
        await usersService.deleteUser(sid);
    });

    setup('Delete user testUser2', async () => {
        const sid = await authService.getAuthCookie(testUser2.email, testUser2.password);
        await usersService.deleteUser(sid);
    });
    
});
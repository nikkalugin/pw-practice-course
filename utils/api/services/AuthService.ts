import { APIRequestContext, expect } from "@playwright/test";

export default class AuthService {

    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string, password: string) {
        return this.request.post('/api/auth/signin', {
            data: {
                email,
                password
            }
        });
    }

    async getAuthCookie(email: string, password: string) {
        const response = await this.signIn(email, password);
        const sid = response.headers()['set-cookie'].split(';')[0];
        expect(response.status()).toBe(200);
        expect(sid).toContain('sid=');
        return sid;
    }
}
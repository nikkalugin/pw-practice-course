import test, { expect } from '@playwright/test';
import { testUser1 } from '../../test-data/validUsers';
import GarageService from '../../utils/api/services/GarageService';
import AuthService from '../../utils/api/services/AuthService';
import { generateNewCar } from '../../utils/api/factories/Cars.factory';

let garageService: GarageService;
let authService: AuthService;
let sid: string;
let carToRemovedId: string;

test.describe('Removing cars', () => {
    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        authService = new AuthService(request);
    });

    test.beforeAll(async ({ request }) => {
        garageService = new GarageService(request);
        authService = new AuthService(request);

        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);

        const newCar = generateNewCar(1, 1, 123);

        const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);
        carToRemovedId = addedCar.id;
    });

    test('Remove a car', async () => {
        const response = await garageService.removeCar(sid, carToRemovedId);

        expect(response.status()).toBe(200);
    });

    test('Remove a car with invalid id', async () => {
        const response = await garageService.removeCar(sid, '523235235234', true);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('Car not found');
    });
});
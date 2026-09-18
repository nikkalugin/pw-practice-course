import test, { expect } from '@playwright/test';
import { testUser1 } from '../../test-data/validUsers';
import GarageService from '../../utils/api/services/GarageService';
import AuthService from '../../utils/api/services/AuthService';
import { generateNewCar } from '../../utils/api/factories/Cars.factory';

let garageService: GarageService;
let authService: AuthService;

test.beforeEach(async ({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
});

test.describe('Get brands and models', () => {
    test('Get all brands', async () => {
        const brands = await garageService.getAllBrands();

        expect(brands).toHaveLength(5);
    });

    test('Get brand by id', async () => {
        const brand = await garageService.getBrandById(3);

        expect(brand.id).toBe(3);
        expect(brand.title).toBe('Ford');
    });

    test('Get brand by invalid id', async () => {
        const response = await garageService.getBrandById(89, false);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car brands found with this id');
    });

    test('Get all models', async () => {
        const models = await garageService.getAllModels();

        expect(models).toHaveLength(23);
    });

    test('Get model by id', async () => {
        const model = await garageService.getModelById(2);

        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8');
    });

    test('Get model by invalid id', async () => {
        const response = await garageService.getModelById(77, false);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id');
    });
});

test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);

        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    });

    test.describe('Removing cars', () => {
        let carToRemovedId: string;

        test.beforeAll(async ({ request }) => {
            garageService = new GarageService(request);

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

    test.describe('Adding new cars', () => {
        let addedCarsToRemove: string[] = [];

        test('Add new car - Ford Fiesta', async () => {
            const newCar = generateNewCar(3, 11, 123);

            const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);
            
            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();
            addedCarsToRemove.push(addedCar.id);
        });

        test('Add new car - Audi TT', async () => {
            const newCar = generateNewCar(1, 1, 123);

            const addedCar = await garageService.addCar(sid, newCar.carBrandId, newCar.carModelId, newCar.mileage);

            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();
            addedCarsToRemove.push(addedCar.id);
        });

        test.afterAll(async ({ request }) => {
            garageService = new GarageService(request);

            for (const id of addedCarsToRemove) {
                await garageService.removeCar(sid, id);
            }
        });
    });
});
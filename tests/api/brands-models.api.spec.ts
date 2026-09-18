import test, { expect } from '@playwright/test';
import GarageService from '../../utils/api/services/GarageService';

let garageService: GarageService;

test.beforeEach(async ({ request }) => {
    garageService = new GarageService(request);
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
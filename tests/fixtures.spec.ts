import { chromium } from "@playwright/test";
import { test, expect } from "../utils/fixtures/screenSizesFixtures";

test.describe('Fixtures', () => {

    test.skip('open wiki without fixtures', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.wikipedia.org/');
    });

    test('open wiki with small screen', async ({ smallScreen }) => {
        await smallScreen.goto('https://www.wikipedia.org/');
    });

    test('open wiki with medium screen', async ({ mediumScreen }) => {
        await mediumScreen.goto('https://www.wikipedia.org/');
    });

    test('open wiki with big screen', async ({ bigScreen }) => {
        await bigScreen.goto('https://www.wikipedia.org/');
    });
});
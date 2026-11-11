import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.evaluate(() => {
        document.cookie = "1=false";
        document.cookie = "2=false";
        document.cookie = "3=false";
    }

    );
});

test('TEST-1-RESET', async ({ page }) => {
    //Preconditions
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    });

    //Execution Steps
    await page.getByRole('link', { name: 'Reset' }).click();

    //Postconditions
    const names = page.getByRole('list', { name: 'Cat names' }).getByRole('listitem');
    await expect(names.nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(names.nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(names.nth(2)).toHaveText('ID 3. Mistoffelees');
})

test('TEST-2-CATALOG', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Catalog' }).click();

    //Postconditions
    const photos = page.getByRole('list', { name: 'Cat photos' }).getByRole('listitem');
    await expect(photos.nth(1).getByRole('img')).toHaveAttribute('src', '/images/cat2.jpg')
})

test('TEST-3-LISTING', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Catalog' }).click();

    //Postconditions
    const names = page.getByRole('list', { name: 'Cat names' }).getByRole('listitem');
    await expect(names).toHaveCount(3);
    await expect(names.nth(2)).toHaveText('ID 3. Mistoffelees');

})

test('TEST-4-RENT-A-CAT', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();

    //Postconditions
    await expect(page.getByRole('button', { name: 'Rent', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Return', exact: true })).toBeVisible();
})

test('TEST-5-RENT', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.locator('#rentID').fill('1');
    await page.getByRole('button', { name: 'Rent', exact: true }).click();

    //Postconditions
    const names = page.getByRole('list', { name: 'Cat names' }).getByRole('listitem');
    await expect(names.nth(0)).toHaveText('Rented out');
    await expect(names.nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(names.nth(2)).toHaveText('ID 3. Mistoffelees');
    await expect(page.getByText('Success!', { exact: true })).toBeVisible();
})

test('TEST-6-RETURN', async ({ page }) => {
    //Preconditions
    await page.evaluate(() => {
        document.cookie = "2=true";
        document.cookie = "3=true";
    });

    //Execution Steps
    await page.getByRole('link', { name: 'Rent-A-Cat' }).click();
    await page.locator('#returnID').fill('2');
    await page.getByRole('button', { name: 'Return', exact: true }).click();

    //Postconditions
    const names = page.getByRole('list', { name: 'Cat names' }).getByRole('listitem');
    await expect(names.nth(0)).toHaveText('ID 1. Jennyanydots');
    await expect(names.nth(1)).toHaveText('ID 2. Old Deuteronomy');
    await expect(names.nth(2)).toHaveText('Rented out');
    await expect(page.getByText('Success!', { exact: true })).toBeVisible();
})

test('TEST-7-FEED-A-CAT', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();

    //Postconditions
    await expect(page.getByRole('button', { name: 'Feed', exact: true })).toBeVisible();

})

test('TEST-8-FEED', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
    await page.locator('#catnips').fill('6');
    await page.getByRole('button', { name: 'Feed', exact: true }).click();

    //Postconditions
    await expect(page.getByText('Nom, nom, nom.', { exact: true })).toBeVisible({ timeout: 10000 });

})

test('TEST-9-GREET-A-CAT', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.getByRole('link', { name: 'Greet-A-Cat' }).click();

    //Postconditions
    await expect(page.getByText('Meow!Meow!Meow!', { exact: true })).toBeVisible();
})

test('TEST-10-GREET-A-CAT-WITH-NAME', async ({ page }) => {
    //Preconditions
    //none

    //Execution Steps
    await page.goto('http://localhost:8080/greet-a-cat/Jennyanydots');

    //Postconditions
    await expect(page.getByText('Meow! from Jennyanydots.', { exact: true })).toBeVisible();
})

test('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {
    //Preconditions
    await page.evaluate(() => {
        document.cookie = "1=true";
        document.cookie = "2=true";
        document.cookie = "3=true";
    });

    //Execution Steps
    await page.getByRole('link', { name: 'Feed-A-Cat' }).click();

    //Postconditions
    await expect(page.locator('body')).toHaveScreenshot();
})


import { test, expect } from '@playwright/test';

test('set document scroll', async ({ page }) => {
  await page.goto('http://localhost:5000/tests/fixtures/document-scroll.html');
  let block = page.locator('#content');
  let toggle = page.locator('#toggle');

  await test.step('initial position', async () => {
    let { y } = await block.boundingBox();
    expect(y).toBe(0);
  });

  await test.step('default scroll behavior', async () => {
    await page.mouse.wheel(0, 50);
    await page.waitForTimeout(50);
    let { y } = await block.boundingBox();
    expect(y).toBe(-50);
  });

  await test.step('locked scroll attempt', async () => {
    await toggle.click();
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(50);
    let { y } = await block.boundingBox();
    expect(y).toBe(-50);
  });

  await test.step('unlock scroll', async () => {
    await toggle.click();
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(50);
    let { y } = await block.boundingBox();
    expect(y).toBe(-200);
  });
});

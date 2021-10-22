import { test, expect } from '@playwright/test';

test('scroll lock toggle', async ({ page }) => {
  await page.goto('http://localhost:8080/tests/fixtures/document-scroll.html');
  let block = page.locator('#content');
  let toggle = page.locator('#toggle');

  // ensure the page is not scrolled
  let { y: initialPosition } = await block.boundingBox();
  expect(initialPosition).toBe(0);

  // first, scroll page by 50px
  await page.mouse.wheel(0, 50);
  await page.waitForTimeout(50);
  let { y: scrolledPosition } = await block.boundingBox();
  expect(scrolledPosition).toBe(-50);

  // lock body scroll, try scrolling page
  await toggle.click();
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(50);
  let { y: lockedPosition } = await block.boundingBox();
  expect(lockedPosition).toBe(scrolledPosition);

  // unlock body scroll, try scrolling page
  await toggle.click();
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(50);
  let { y: renewedPosition } = await block.boundingBox();
  expect(renewedPosition).not.toBe(scrolledPosition);
  expect(renewedPosition).toBe(-200);
});

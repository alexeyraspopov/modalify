import { test, expect } from '@playwright/test';

test('scroll lock toggle', async ({ page }) => {
  await page.goto('http://localhost:8080/tests/fixtures/');
  let block = page.locator('#content');
  let toggle = page.locator('#toggle');

  // ensure the page is not scrolled
  let initialPosition = await block.evaluate((node) => node.getBoundingClientRect().top);
  expect(initialPosition).toBe(0);

  // first, scroll page by 50px
  await page.mouse.wheel(0, 50);
  await page.waitForTimeout(50);
  let scrolledPosition = await block.evaluate((node) => node.getBoundingClientRect().top);
  expect(scrolledPosition).toBe(-50);

  // lock body scroll, try scrolling page
  await toggle.click();
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(50);
  let lockedPosition = await block.evaluate((node) => node.getBoundingClientRect().top);
  expect(lockedPosition).toBe(scrolledPosition);

  // unlock body scroll, try scrolling page
  await toggle.click();
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(50);
  let renewedPosition = await block.evaluate((node) => node.getBoundingClientRect().top);
  expect(renewedPosition).not.toBe(scrolledPosition);
  expect(renewedPosition).toBe(-200);
});

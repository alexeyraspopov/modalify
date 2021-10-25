import { test, expect } from '@playwright/test';

test('create focus scope', async ({ page }) => {
  await page.goto('http://localhost:5000/tests/fixtures/focus-scope.html');
  let open = page.locator('#open');
  let close = page.locator('#close');
  let scope = page.locator('#scope');

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="outside-first"]')).toBeFocused();

  await open.click();
  await expect(open).not.toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="scope-first"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="scope-second"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="scope-third"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="scope-first"]')).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('[name="scope-third"]')).toBeFocused();

  await page.locator('[name="scope-first"]').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[name="scope-second"]')).toBeFocused();

  await close.click();
  await page.waitForTimeout(50);
  await page.keyboard.press('Tab');
  await expect(page.locator('[name="outside-second"]')).toBeFocused();
});

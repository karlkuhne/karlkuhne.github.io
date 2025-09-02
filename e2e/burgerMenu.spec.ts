import { test, expect } from '@playwright/test';

test('should open nav menu when burgerMenu is clicked', async ({ page }) => {

  await page.setViewportSize({ width: 200, height: 800 });
  await page.goto('http://localhost:3000');

  await page.waitForFunction(() => {
    return window.useNuxtApp?.().isHydrating === false;
  });

  const burgerMenu = page.locator('#burgerMenu');
  const mainNav = page.locator('#main-nav');

  await burgerMenu.click();

  await expect(burgerMenu).toHaveClass(/active/);
  await expect(mainNav).toHaveClass(/active/);
});
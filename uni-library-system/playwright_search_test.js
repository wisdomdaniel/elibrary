import { test, expect } from '@playwright/test';

test('Search functionality works', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // Login
  await page.fill('input[type="email"]', 'student@uni.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/student');

  // Check if dashboard is loaded
  await expect(page.locator('h1')).toContainText('Welcome back');

  // Find search bar
  const searchInput = page.locator('input[placeholder*="Search for materials"]');
  await expect(searchInput).toBeVisible();

  // Type something
  await searchInput.fill('Data Structures');

  // Check if search results appear
  await expect(page.locator('h2')).toContainText('Search Results for "Data Structures"');

  // Verify at least one result
  const resultsCount = await page.locator('div.grid > div').count();
  expect(resultsCount).toBeGreaterThan(0);

  await page.screenshot({ path: 'search_test.png' });
});

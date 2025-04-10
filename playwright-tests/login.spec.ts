import { test, expect } from '@playwright/test';

test('homepage fetches backend message', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading')).toContainText('Hello from the backend!');
});

import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';

test('GET /brandsList - returns all brands', async ({ request }) => {
  const response = await request.get(
    `${BASE_API_URL}${endpoints.brands}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.brands).toBeDefined();
  expect(Array.isArray(body.brands)).toBe(true);
  expect(body.brands.length).toBeGreaterThan(0);
});
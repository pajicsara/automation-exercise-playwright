import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';

test('@api @search POST /searchProduct - returns matching products for valid query', async ({ request }) => {
  const response = await request.post(
    `${BASE_API_URL}${endpoints.search}`,
    {
      form: {
        search_product: 'top',
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});

test('@api @negative POST /searchProduct - returns 400 when search parameter is missing', async ({ request }) => {
  const response = await request.post(
    `${BASE_API_URL}${endpoints.search}`,
    {
      form: {},
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(400);
  expect(body.message).toContain(
    'search_product parameter is missing'
  );
});
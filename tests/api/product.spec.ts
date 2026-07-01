import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';

test('@api @products GET /productsList - returns all products', async ({ request }) => {
  const response = await request.get(
    `${BASE_API_URL}${endpoints.products}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});

test('@api @products GET /productsList - validates product structure', async ({ request }) => {
  const response = await request.get(
    `${BASE_API_URL}${endpoints.products}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  const firstProduct = body.products[0];

  expect(firstProduct).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
    })
  );
});

test('@api @products @negative POST /productsList - returns method not supported', async ({ request }) => {
  const response = await request.post(
    `${BASE_API_URL}${endpoints.products}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});

import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';

test('GET /productsList - returns all products', async ({ request }) => {
  const response = await request.get(
    `${BASE_API_URL}${endpoints.products}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});

test('GET /productsList - validates product structure', async ({ request }) => {
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

test('POST /verifyLogin - returns user exists message', async ({ request }) => {
  const response = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        email: 'sa.pajic@yopmail.com',
        password: 'teamH2411',
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.text();

  expect(body).toContain('User exists');
});
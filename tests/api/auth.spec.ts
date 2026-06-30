import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';
import { testData } from '../resources/testData';

test('POST /verifyLogin - returns success for valid credentials', async ({ request }) => {
  const user = testData.stableUser;

  const response = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        email: user.email,
        password: user.password,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

test('POST /verifyLogin - returns error for invalid credentials', async ({ request }) => {
  const user = testData.invalidUser;

  const response = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        email: user.email,
        password: user.password,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});

test('POST /verifyLogin - returns validation error when email is missing', async ({ request }) => {
  const user = testData.stableUser;

  const response = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        password: user.password,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(400);
  expect(body.message).toContain(
    'email or password parameter is missing'
  );
});
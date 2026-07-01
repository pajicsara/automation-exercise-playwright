import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';
import { testData } from '../resources/testData';

test('@api @auth POST /verifyLogin - returns success for valid credentials', async ({ request }) => {
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

test('@api @negative POST /verifyLogin - returns error for invalid credentials', async ({ request }) => {
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

  expect(response.status()).toBe(200); //status code is 200 and that is expected

  const body = await response.json();

  expect(body.responseCode).toBe(404); //but response code is 404
  expect(body.message).toBe('User not found!');
});

test('@api @negative POST /verifyLogin - returns validation error when email is missing', async ({ request }) => {
  const user = testData.stableUser;

  const response = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        password: user.password,
      },
    }
  );

  expect(response.status()).toBe(200); //status code is 200, but responseCode is 400

  const body = await response.json();

  expect(body.responseCode).toBe(400); //status code is 200, but responseCode is 400
  expect(body.message).toContain(
    'email or password parameter is missing'
  );
});
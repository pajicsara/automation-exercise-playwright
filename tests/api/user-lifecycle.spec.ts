import { test, expect } from '@playwright/test';
import { BASE_API_URL, endpoints } from '../api/services/endpoints';
import { testData } from '../resources/testData';

test('User lifecycle - create, login and delete user', async ({ request }) => {
  const user = testData.generateUser();

  // Create user
  const createResponse = await request.post(
    `${BASE_API_URL}${endpoints.createAccount}`,
    {
      form: user,
    }
  );

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe('User created!');

  // Verify login
  const loginResponse = await request.post(
    `${BASE_API_URL}${endpoints.login}`,
    {
      form: {
        email: user.email,
        password: user.password,
      },
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  expect(loginBody.responseCode).toBe(200);
  expect(loginBody.message).toBe('User exists!');

  // Delete user
  const deleteResponse = await request.delete(
    `${BASE_API_URL}${endpoints.deleteAccount}`,
    {
      form: {
        email: user.email,
        password: user.password,
      },
    }
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe('Account deleted!');
});
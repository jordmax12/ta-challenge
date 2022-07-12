const mockGet = jest.fn();

const { handler } = require('../../verify-otp');

const mockEmail = 'unit@test.com';
const mockPassword = '1234';

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      get: mockGet,
    })),
  },
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe('testing the OTP helper file', () => {
  test('success handler call - 200 status code', async () => {
    mockGet.mockReturnValueOnce({
      promise: () => ({
        Item: {
          id: mockEmail,
          password: mockPassword,
          expire: 1000,
          expire_at: new Date().toISOString(),
        },
      }),
    });
    const result = await handler({
      queryStringParameters: {
        email: mockEmail,
        password: mockPassword,
      },
    });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ access_token: 'fake-access-token', refresh_token: 'fake-refresh-token' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  test('password mismatch - 404 status code', async () => {
    mockGet.mockReturnValueOnce({
      promise: () => ({
        Item: {
          id: mockEmail,
          password: '4321',
          expire: 1000,
          expire_at: new Date().toISOString(),
        },
      }),
    });
    const result = await handler({
      queryStringParameters: {
        email: mockEmail,
        password: mockPassword,
      },
    });

    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ error: 'Password incorrect.' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  test('error handler call - 400 status code', async () => {
    const result = await handler({
      queryStringParameters: {
        email: mockEmail,
      },
    });

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({ error: 'email and password are required as a query string parameter for this request.' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});

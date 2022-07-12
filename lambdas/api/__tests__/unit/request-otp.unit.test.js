const mockPut = jest.fn();
const mockGet = jest.fn();

const { handler } = require('../../request-otp');

const mockEmail = 'unit@test.com';

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      put: mockPut,
      get: mockGet,
    })),
  },
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe('testing the OTP helper file', () => {
  test('success handler call - 200 status code', async () => {
    mockPut.mockReturnValueOnce({ promise: () => Promise.resolve(true) });
    const result = await handler({
      queryStringParameters: {
        email: mockEmail,
      },
    });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  test('error handler call - 400 status code', async () => {
    const result = await handler({});

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({ error: 'email is required as a query string parameter for this request.' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});

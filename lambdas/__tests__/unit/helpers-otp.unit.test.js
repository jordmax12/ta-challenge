const mockPut = jest.fn();
const mockGet = jest.fn();

const { OTP_TABLE } = process.env;

const { createOTPItem, createOTPPassword, getOTP, updateOTP } = require('../../helpers/otp');

const mockEmail = 'unit@test.com';
const mockOtpPassword = 1234;
const ISOPattern = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

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
  test('testing create otp item', () => {
    const result = createOTPItem(mockEmail, mockOtpPassword);
    expect(result).toEqual(
      expect.objectContaining({
        id: mockEmail,
        otpPassword: mockOtpPassword,
        expire: 1000 * 60 * 60,
        // expire_at: expect.toMatch(ISOPattern), // TODO: try to figure out how to do this here, this doesnt work.
      })
    );
    expect(result.expire_at).toMatch(ISOPattern); // TODO: try to figure out how to do above.
  });
  test('testing create password', () => {
    const result = createOTPPassword();
    expect(result.length).toEqual(4);
  });
  test('testing getOTP - success', async () => {
    mockGet.mockReturnValueOnce({
      promise: () => ({
        Item: {
          id: mockEmail,
          otpPassword: mockOtpPassword,
          expire: 1000 * 60 * 60,
          expire_at: new Date().toISOString(),
        },
      }),
    });

    const result = await getOTP(mockEmail);
    expect(result).toEqual(
      expect.objectContaining({
        id: mockEmail,
        otpPassword: mockOtpPassword,
        expire: 1000 * 60 * 60,
        // expire_at: expect.toMatch(ISOPattern), // TODO: try to figure out how to do this here, this doesnt work.
      })
    );

    expect(result.expire_at).toMatch(ISOPattern); // TODO: try to figure out how to do above.

    expect(mockGet).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: OTP_TABLE,
        Key: {
          id: mockEmail,
        },
      })
    );
  });
  test('testing getOTP - null', async () => {
    const mockNullEmail = 'null@test.com';
    mockGet.mockReturnValueOnce({
      promise: () => ({
        null: true,
      }),
    });

    const result = await getOTP(mockNullEmail);
    expect(result).toEqual(null);
    expect(mockGet).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: OTP_TABLE,
        Key: {
          id: mockNullEmail,
        },
      })
    );
  });
  test('testing updateOtp - null', async () => {
    mockPut.mockReturnValueOnce({ promise: () => Promise.resolve(true) });
    const mockItem = {
      id: mockEmail,
      otpPassword: mockOtpPassword,
      expire: 1000 * 60 * 60,
      expire_at: new Date().toISOString(),
    };
    const result = await updateOTP(mockItem);
    expect(result).toBeTruthy();
    expect(mockPut).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: OTP_TABLE,
        Item: mockItem,
      })
    );
  });
});

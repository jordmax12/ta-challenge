const mockSendEmail = jest.fn(() => ({
  promise: () => true,
}));

const { sendEmail } = require('../../helpers/ses');

jest.mock('aws-sdk', () => ({
  config: {
    update: jest.fn(() => true),
  },
  SES: jest.fn().mockImplementation(() => ({
    sendEmail: mockSendEmail,
  })),
}));

beforeAll(() => {});

describe('testing the ses helper file', () => {
  test('success', async () => {
    mockSendEmail.mockReturnValue({
      promise: () => Promise.resolve(true),
    });
    const mockEmail = 'unit@test.com';
    const mockPassword = '1234';

    const result = await sendEmail(mockEmail, mockPassword);
    expect(result).toBeTruthy();
    expect(mockSendEmail.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        Destination: expect.objectContaining({
          CcAddresses: ['jordmax12@gmail.com'],
          ToAddresses: [mockEmail],
        }),
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: 'Hello\n\nHere is your One Time Password to use: 1234',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Thoughtful Automation Challenge OTP Password',
          },
        },
        Source: 'jordmax12@gmail.com',
      })
    );
  });
});

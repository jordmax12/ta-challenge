const AWS = require('aws-sdk');

const { REGION } = process.env;

AWS.config.update({
  region: REGION,
});

const CC_EMAIL = 'jordmax12@gmail.com';
const client = new AWS.SES({ apiVersion: '2010-12-01' });
/**
 * Helper function to send an email using SES.
 * @param {String} toEmail Email you want to send to
 * @param {String} otpPassword Password you want to send in the email body.
 * @returns true if success, false if error.
 */
const sendEmail = async (toEmail, otpPassword) => {
  const params = {
    Destination: {
      CcAddresses: [CC_EMAIL],
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Hello\n\nHere is your One Time Password to use: ${otpPassword}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Thoughtful Automation Challenge OTP Password',
      },
    },
    Source: CC_EMAIL,
  };

  try {
    await client.sendEmail(params).promise();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = {
  sendEmail,
};

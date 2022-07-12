const { createOTPItem, createOTPPassword, updateOTP } = require('./helpers/otp');
const { validateRequest } = require('./helpers/validator');
const { returnHelper } = require('./helpers/response');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  if (!validateRequest(['email'], event.queryStringParameters)) {
    return returnHelper(400, { error: 'email is required as a query string parameter' });
  }

  const {
    queryStringParameters: { email },
  } = event;

  const newPassword = createOTPPassword();
  const newOtp = createOTPItem(email, newPassword);
  await updateOTP(newOtp);

  return returnHelper(200, { success: true });
};

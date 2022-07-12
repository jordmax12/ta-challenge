const { getOTP } = require('./helpers/otp');
const { validateRequest } = require('./helpers/validator');
const { returnHelper } = require('./helpers/response');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  if (!validateRequest(['email', 'password'], event.queryStringParameters)) {
    return returnHelper(400, {
      error: 'email and password are required as a query string parameter for this request.',
    });
  }

  const {
    queryStringParameters: { email, password },
  } = event;

  const test = await getOTP(email);
  console.log({
    test,
  });

  const { password: currentOtpPassword } = test;

  if (currentOtpPassword !== password) {
    return returnHelper(404, {
      error: 'Password incorrect.',
    });
  }

  // NOTE; in real world scenario we would have some auth provider that would send back some access tokens
  // giving the user ability to make api calls and thus actually login. But figured this was out of scope
  // for this challenge.

  return returnHelper(200, {
    access_token: 'fake-access-token',
    refresh_token: 'fake-refresh-token',
  });
};

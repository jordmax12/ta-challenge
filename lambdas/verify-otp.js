const { deleteOTP, getOTP } = require('./helpers/otp');
const { validateRequest } = require('./helpers/validator');
const { returnHelper } = require('./helpers/response');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  if (!validateRequest(['email', 'password'], event.queryStringParameters)) {
    return returnHelper(400, {
      error: '`email` and `password` are required as a query string parameter for this request.',
    });
  }

  const {
    queryStringParameters: { email, password },
  } = event;

  const fetchOtp = await getOTP(email);

  if (!fetchOtp) {
    return returnHelper(404, {
      error: 'Email seemingly invalid.',
    });
  }

  if (fetchOtp.otpPassword !== password.toString()) {
    return returnHelper(404, {
      error: 'Password incorrect.',
    });
  }

  await deleteOTP(email);
  // NOTE; in real world scenario we would have some auth provider that would send back some access tokens
  // giving the user ability to make api calls and thus actually login. But figured this was out of scope
  // for this challenge.

  return returnHelper(200, {
    access_token: 'fake-access-token',
    refresh_token: 'fake-refresh-token',
  });
};

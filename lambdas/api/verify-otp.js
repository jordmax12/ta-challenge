const { createOTPItem, createOTPPassword, updateOTP } = require('./helpers/otp');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  return {
    status: 200,
    body: JSON.stringify({}),
  };
};

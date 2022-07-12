const AWS = require('aws-sdk');

const { DYNAMO_DB_ENDPOINT, OTP_TABLE } = process.env;

const client = new AWS.DynamoDB.DocumentClient({
  endpoint: DYNAMO_DB_ENDPOINT,
  region: 'us-east-1',
  apiVersion: '2012-08-10',
  sslEnabled: false,
});

const OTP_NUM_DIGITS = 4;
const OTP_ALLOWED_DIGIT_VALUES = '0123456789';

/**
 * Helper function to add milliseconds to an ISO string.
 * @param {String} isoString ISO 8601 string.
 * @param {Int} ms Milliseconds
 * @returns date provided + milliseonds back in Date form.
 */
const convertMSToTimestamp = (isoString, ms) => {
  const dateConverted = new Date(isoString).getTime();
  return new Date(dateConverted + ms).toISOString();
};
/**
 * Helper function to create an OTP item.
 * @param {String} id email of the user.
 * @param {String} otpPassword The OTP password we are creating and sending to the user to login.
 * @returns Object ready to be sent to DDB.
 */
const createOTPItem = (id, otpPassword) => {
  const now = new Date().toISOString();
  const expire = 1000 * 60 * 60; // this should be an hour
  return {
    id,
    otpPassword,
    expire,
    expire_at: convertMSToTimestamp(now, expire),
  };
};
/**
 * Helper function to generate an OTP password.
 * @returns Generated OTP password, using the constants that define the allowed digits anf the length.
 */
const createOTPPassword = () =>
  [...Array(OTP_NUM_DIGITS).keys()].reduce((acc) => acc + OTP_ALLOWED_DIGIT_VALUES[Math.floor(Math.random() * 10)], '');
/**
 * Helper function to retrieve a OTP from DDB.
 * @param {String} id email of the user.
 * @returns Item if exists
 */
const getOTP = async (id) => {
  const result = client
    .get({
      TableName: OTP_TABLE,
      Key: {
        id,
      },
    })
    .promise();
  return result?.Item || null;
};
/**
 * Helper function to update an OTP item in DDB.
 * @param {Object} record OTP Object.
 * @returns result of document client put function.
 */
const updateOTP = async (record) =>
  client
    .put({
      TableName: OTP_TABLE,
      Item: { ...record },
    })
    .promise();

module.exports = {
  createOTPItem,
  createOTPPassword,
  getOTP,
  updateOTP,
};

const { returnHelper } = require('./helpers/response');
const { sendEmail } = require('./helpers/ses');

module.exports.handler = async ({ Records }) => {
  console.log(JSON.stringify(Records, null, 4));
  const promises = Records.map(
    async ({
      dynamodb: {
        NewImage: {
          id: { S: email },
          otpPassword: { S: password },
        },
      },
    }) => sendEmail(email, password)
  );

  await Promise.all(promises);
  return returnHelper(200, { success: true });
};

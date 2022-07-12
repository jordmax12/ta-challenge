const { returnHelper } = require('./helpers/response');
const { sendEmail } = require('./helpers/ses');

// TODO: if no new image, does this lambda trigger? if so we need to handle this.
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

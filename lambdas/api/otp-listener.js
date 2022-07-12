const { returnHelper } = require('./helpers/response');

// TODO: if no new image, does this lambda trigger? if so we need to handle this.
module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  return returnHelper(200, { success: true });
};

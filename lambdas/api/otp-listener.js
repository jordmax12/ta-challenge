const { returnHelper } = require('./helpers/response');

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 4));
  return returnHelper(200, { success: true });
};

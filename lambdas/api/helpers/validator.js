/**
 * Helper function to validate a request.
 * @param {Array} requiredProperties Array of required properties you want to validate.
 * @param {Object} queryStringParameters queryStringParameters from the event.
 * @returns True if all the required properties exist, false if not.
 */
const validateRequest = (requiredProperties, queryStringParameters = {}) =>
  requiredProperties.filter((prop) => !!queryStringParameters[prop]).length === requiredProperties.length;

module.exports = {
  validateRequest,
};

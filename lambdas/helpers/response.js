/**
 * Helper function to create a formatted response object.
 * @param {Int} statusCode HTTP Status Code.
 * @param {Object} body Body you want to send in the response.
 * @returns Formatted response object.
 */
const returnHelper = (statusCode = 200, body = {}) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  returnHelper,
};

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

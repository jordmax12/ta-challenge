const { validateRequest } = require('../../helpers/validator');

describe('testing the validateRequest helper file', () => {
  test('success, returns true', () => {
    const result = validateRequest(['test1', 'test2'], { test1: true, test2: true });
    expect(result).toEqual(true);
  });
  test('error, returns false', () => {
    const result = validateRequest(['test1', 'test2'], { test1: true });
    expect(result).toEqual(false);
  });
});

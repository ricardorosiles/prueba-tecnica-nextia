import { throwNewError } from './throwNewError';

jest.mock('./logger', () => ({
  error: jest.fn(),
}));

describe('testing throwNewError function ', () => {
  it('should throw a new error', async () => {
    const internalError = {
      httpCode: 404,
      code: 'CUSTOM_001',
      detail: 'the token was not received with the correct format',
    };
    const errorFunc = () => {
      throwNewError('login error', internalError);
    };
    expect(errorFunc).toThrow(Error);
  });
});

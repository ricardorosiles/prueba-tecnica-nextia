import { APY_KEY_NAME, checkApiKeyAuth, apiKeyAuth } from './apiKeyAuth';
import authErrors from '../constants/internalErrors/authentication';

const password = 'qwerty';
const throwNewErrorMock = jest.fn();

jest.mock('../helpers/throwNewError', () => ({
  throwNewError: (error: string) => throwNewErrorMock(error),
}));

describe('testing apiKeyAuth middleware', () => {
  it('[checkApiKeyAuth] should return true on result', () => {
    const req: any = {
      headers: {
        [APY_KEY_NAME]: password,
      },
    };
    process.env.FUNCTIONS_API_KEY = password;
    const result = checkApiKeyAuth(req);
    expect(result).toBe(true);
  });

  it('[apiKeyAuth] should return next function by allowSkip', () => {
    const req: any = {
      headers: {},
    };
    const res: any = {};
    const next = jest.fn();
    apiKeyAuth({ allowSkip: true })(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(throwNewErrorMock).toBeCalledTimes(0);
  });

  it('[apiKeyAuth] should return next function by api checkApiKeyAuth', () => {
    const req: any = {
      headers: {
        [APY_KEY_NAME]: password,
      },
    };
    process.env.FUNCTIONS_API_KEY = password;
    const res: any = {};
    const next = jest.fn();
    apiKeyAuth()(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(throwNewErrorMock).toBeCalledTimes(0);
  });

  it('[apiKeyAuth] should throw a not authorized error', () => {
    const req: any = {
      headers: {
        [APY_KEY_NAME]: password,
      },
    };
    process.env.FUNCTIONS_API_KEY = '1234';
    const res: any = {};
    const next = jest.fn();
    apiKeyAuth()(req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(throwNewErrorMock).toBeCalledTimes(1);
    expect(throwNewErrorMock).toBeCalledWith(authErrors.NOT_AUTHORIZED.detail);
  });
});

beforeEach(() => {
  process.env.FUNCTIONS_API_KEY = undefined;
});

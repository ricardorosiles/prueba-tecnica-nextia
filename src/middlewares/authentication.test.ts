import { Request, Response, NextFunction } from 'express';
import { authentication, validateToken } from './authentication';
import authErrors from '../constants/internalErrors/authentication';
import '../helpers/throwNewError';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const res: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn(),
  locals: {},
};
const next: NextFunction = jest.fn();

const throwNewError = jest.fn();
const hasValidToken = jest.fn(() => true);

jest.mock('../helpers/throwNewError', () => ({
  throwNewError: (error: string) => throwNewError(error),
}));
jest.mock('../services/firebase', () => ({
  hasValidToken: () => hasValidToken(),
}));

describe('testing authentication middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should throw request without token error', async () => {
    const req: Partial<Request> = {
      headers: {},
    };
    await authentication(req as Request, res as Response, next);
    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.NO_TOKEN_PROVIDED.detail);
  });

  it('should throw not valid token error', async () => {
    const req: Partial<Request> = {
      headers: {
        authorization: '12345',
      },
    };

    await authentication(req as Request, res as Response, next);
    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.INVALID_TOKEN.detail);
  });

  it('should return next function', async () => {
    const req: Partial<Request> = {
      headers: {
        authorization: token,
      },
    };

    await authentication(req as Request, res as Response, next);
    expect(throwNewError).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });

  it('should throw couldnt authorize error', async () => {
    const req: Partial<Request> = {
      headers: {
        authorization: token,
      },
    };

    hasValidToken.mockImplementation(() => false);
    await authentication(req as Request, res as Response, next);
    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.NOT_AUTHORIZED.detail);
  });

  it('should throw request without token error for validate token', async () => {
    await validateToken('');
    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.NO_TOKEN_PROVIDED.detail);
  });

  it('should throw not valid token error for validate token', async () => {
    await validateToken('eyJhbGciOi');

    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.INVALID_TOKEN.detail);
  });

  it('should throw couldnt authorize error for validate token', async () => {
    hasValidToken.mockImplementation(() => false);
    await validateToken(token);

    expect(throwNewError).toBeCalledTimes(1);
    expect(throwNewError).toBeCalledWith(authErrors.NOT_AUTHORIZED.detail);
  });
});

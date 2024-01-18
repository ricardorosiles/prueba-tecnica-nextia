import { Request, Response } from 'express';
import user from '../constants/internalErrors/user';
import { errorHandler } from './errorHandler';
import { CustomError } from '../helpers/throwNewError';

const req: any = {};
const res: Partial<Response> = {
  json: jest.fn(),
  status: jest.fn(),
};
const next = jest.fn();

jest.mock('../helpers/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('errorhandler middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('test error handler with full info error', async () => {
    const error: CustomError = {
      name: 'custom error',
      message: 'some error',
      detail: 'detailed error',
      httpCode: 400,
      code: 'CUSTOM_001',
    };

    await errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toBeCalledTimes(1);
  });
  it('test handler with partial info error', async () => {
    const error: Partial<CustomError> = {
      name: 'custom error',
      code: 'CUSTOM_001',
    };

    res.locals = {
      token: {
        user_id: '113123',
      },
    };

    await errorHandler(error as CustomError, req as Request, res as Response, next);
    expect(res.status).toBeCalledTimes(1);
  });
  it('test error handler without print the error', async () => {
    const error: CustomError = {
      name: 'custom error',
      message: 'some error',
      detail: 'detailed error',
      httpCode: 400,
      code: user.NOT_FOUND_ALERTS.code,
    };

    await errorHandler(error, req as Request, res as Response, next);
    expect(res.status).toBeCalledTimes(1);
  });
});

import { Request, Response } from 'express';
import { recover } from './recover';
import user from '../../constants/internalErrors/user';

const throwNewError = jest.fn();
const getUserIdByEmailMock = jest.fn();
const updatePasswordByEmailMock = jest.fn();
const decryptPasswordMock = jest.fn();

jest.mock('../../services/user', () => ({
  getUserIdByEmail: () => getUserIdByEmailMock(),
  updatePasswordByEmail: () => updatePasswordByEmailMock(),
}));

jest.mock('../../helpers/throwNewError', () => ({
  throwNewError: (error: string) => throwNewError(error),
}));

jest.mock('../../helpers/encryptPassword', () => ({
  decryptPassword: () => decryptPasswordMock(),
}));

beforeEach(() => jest.resetAllMocks());

describe('testing auth recover controller', () => {
  test('should be a success recovery password', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'ricardo.rosiles08@gmail.com',
        password: 'Password1.',
      },
    };

    const res: Partial<Response> = {
      json: jest.fn(),
      status: jest.fn(),
    };

    updatePasswordByEmailMock.mockImplementation(() => true);
    getUserIdByEmailMock.mockImplementation(() => true);

    await recover(req as Request, res as Response);
    expect(throwNewError).toHaveBeenCalledTimes(0);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({});
  });

  test('should first', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'ricardo.rosiles08@gmail.com',
        password: 'Password1.',
      },
    };

    const res: Partial<Response> = {
      json: jest.fn(),
    };

    getUserIdByEmailMock.mockImplementation(() => false);

    await recover(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(throwNewError).toHaveBeenCalledTimes(1);
    expect(throwNewError).toHaveBeenCalledWith(user.NOT_FOUND.detail);
  });

  test('should second', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'ricardo.rosiles08@gmail.com',
        password: 'Password1',
      },
    };

    const res: Partial<Response> = {
      json: jest.fn(),
    };

    getUserIdByEmailMock.mockImplementation(() => true);
    decryptPasswordMock.mockImplementation(() => true);

    await recover(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(throwNewError).toHaveBeenCalledTimes(1);
    expect(throwNewError).toHaveBeenCalledWith(user.EQUALS_PASSWORD.detail);
  });
});

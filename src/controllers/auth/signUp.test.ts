import { Request, Response } from 'express';
import { signUpWithEmail } from './signUp';
import user from '../../constants/internalErrors/user';

const throwNewError = jest.fn();
const getUserIdByEmailMock = jest.fn();
const createUserBySignUpMock = jest.fn();

const tokenInfo = {
  email: 'user@gmail.com',
  user_id: '12345',
  email_verified: true,
};
const bodyInfo = {
  name: 'FirstName',
  last_name: 'LastName',
};

jest.mock('../../services/user', () => ({
  getUserIdByEmail: () => getUserIdByEmailMock(),
  createUserBySignUp: () => createUserBySignUpMock(),
}));

jest.mock('../../helpers/throwNewError', () => ({
  throwNewError: (error: string) => throwNewError(error),
}));

beforeEach(() => jest.resetAllMocks());

describe('testing auth signUpWithEmail controller', () => {
  it('should be a success signUpWithEmail', async () => {
    const userData = {
      email: 'user@gmail.com',
      name: 'mr user',
    };

    const req: Partial<Request> = {
      body: bodyInfo,
    };
    const res: Partial<Response> = {
      json: jest.fn(),
      status: jest.fn(),
      locals: {
        token: tokenInfo,
      },
    };

    createUserBySignUpMock.mockImplementation(() => userData);

    await signUpWithEmail(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      data: userData,
    });
  });

  it('should throw a user exists error', async () => {
    const req: Partial<Request> = {
      body: bodyInfo,
    };
    const res: Partial<Response> = {
      locals: {
        token: tokenInfo,
      },
    };

    getUserIdByEmailMock.mockImplementation(() => true);

    await signUpWithEmail(req as Request, res as Response);
    expect(throwNewError).toHaveBeenCalledTimes(2);
    expect(throwNewError).toHaveBeenCalledWith(user.ALREADY_EXIST.detail);
  });

  // it('should be a success signUpWithEmail with signuptype parameter', async () => {
  //   const userData = {
  //     email: 'user@gmail.com',
  //     name: 'mr user',
  //   };
  //   const roleData = {
  //     id: 'ce886c34-12b1-4404-b228-88cfade237ff',
  //     name: 'administrator',
  //   };
  //   const req: Partial<Request> = {
  //     body: {
  //       ...bodyInfo,
  //       sign_up_type: 'web',
  //       role_name: 'administrator',
  //     },
  //   };
  //   const res: Partial<Response> = {
  //     json: jest.fn(),
  //     status: jest.fn(),
  //     locals: {
  //       token: tokenInfo,
  //     },
  //   };
  //   validateFormatText.mockImplementation(() => true);
  //   existsUserByUserId.mockImplementation(() => false);
  //   createUserBySignUpMock.mockImplementation(() => userData);
  //   findUserRoleByNameMock.mockImplementation(() => roleData);
  //   veryficationAccountEmail.mockImplementationOnce(() => ({ status: 200 }));

  //   await signUpWithEmail(req as Request, res as Response);
  //   expect(res.json).toBeCalledTimes(1);
  //   expect(res.json).toBeCalledWith({
  //     data: userData,
  //   });
  // });

  // it('should throw a email validation error', async () => {
  //   const req: Partial<Request> = {
  //     body: bodyInfo,
  //   };
  //   const res: Partial<Response> = {
  //     locals: {
  //       token: tokenInfo,
  //     },
  //   };
  //   validateFormatText.mockImplementation(() => true);
  //   existsUserByUserId.mockImplementation(() => false);
  //   veryficationAccountEmail.mockImplementationOnce(() => ({ status: 400 }));

  //   await signUpWithEmail(req as Request, res as Response);
  //   expect(throwNewError).toBeCalledTimes(1);
  //   expect(throwNewError).toBeCalledWith(email.VERIFICATION_ERROR.detail);
  // });

  // it('should throw a name and last_name error format', async () => {
  //   const req: Partial<Request> = {
  //     body: bodyInfo,
  //   };
  //   const res: Partial<Response> = {
  //     json: jest.fn(),
  //     status: jest.fn(),
  //     locals: {
  //       token: tokenInfo,
  //     },
  //   };
  //   validateFormatText.mockImplementation(() => false);

  //   await signUpWithEmail(req as Request, res as Response);
  //   expect(throwNewError).toBeCalledTimes(1);
  //   expect(throwNewError).toBeCalledWith(user.CREATION.detail);
  // });
});

/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { throwNewError } from '../helpers/throwNewError';
import authErrors from '../constants/internalErrors/authentication';
import { hasValidToken } from '../services/firebase';
import { parseJwt } from '../helpers/jwt';

type FirebaseToken = {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: string;
  user_id: string;
  sub: string;
  iat: string;
  exp: string;
  email: string;
  email_verified: boolean;
};

export const validateToken = async (headerToken: string | undefined) => {
  if (!headerToken) {
    return throwNewError(authErrors.NO_TOKEN_PROVIDED.detail, authErrors.NO_TOKEN_PROVIDED);
  }

  const [tokenType, token] = headerToken.split(' ');
  if (tokenType !== 'Bearer') {
    return throwNewError(authErrors.INVALID_TOKEN.detail, authErrors.INVALID_TOKEN);
  }

  const isValid = await hasValidToken(token);
  if (!isValid) return throwNewError(authErrors.NOT_AUTHORIZED.detail, authErrors.NOT_AUTHORIZED);

  return JSON.parse(parseJwt(token)) as FirebaseToken;
};

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers.authorization;
  const token = await validateToken(headerToken);

  res.locals = {
    ...res.locals,
    token,
  };
  next();
};

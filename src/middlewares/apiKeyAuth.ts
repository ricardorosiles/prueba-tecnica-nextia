/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { throwNewError } from '../helpers/throwNewError';
import authErrors from '../constants/internalErrors/authentication';

export type ApiKeyAuthEnv = {
  FUNCTIONS_API_KEY: string;
};

type ApiKeyParams = {
  allowSkip?: boolean;
};

export const APY_KEY_NAME = 'x-api-key';

export const checkApiKeyAuth = (req: Request) => {
  const { FUNCTIONS_API_KEY } = process.env as ApiKeyAuthEnv;
  const apiKey = req.headers[APY_KEY_NAME];
  return apiKey === FUNCTIONS_API_KEY;
};

export const apiKeyAuth =
  (params?: ApiKeyParams) => (req: Request, _res: Response, next: NextFunction) => {
    const { allowSkip } = params || {};
    if (allowSkip && !req.headers[APY_KEY_NAME]) {
      next();
      return;
    }

    if (checkApiKeyAuth(req)) {
      next();
      return;
    }

    throwNewError(authErrors.NOT_AUTHORIZED.detail, authErrors.NOT_AUTHORIZED);
  };

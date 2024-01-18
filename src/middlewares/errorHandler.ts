/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { LOG_CODES_NOT_ALLOWED } from '../constants/general';
import { logger } from '../helpers/logger';
import { CustomError } from '../helpers/throwNewError';

const printRequestError = (err: CustomError, req: Request, res: Response) => {
  if (LOG_CODES_NOT_ALLOWED.includes(err.code)) return;

  logger.error({
    method: req.method,
    url: req.url,
    message: err.message,
    code: err.code,
    firebase_user_id: res.locals?.token?.user_id || null,
    date: new Date().toISOString(),
    httpCode: err.httpCode,
    httpBody: req.body,
    httpQuery: req.query,
  });
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(err.httpCode || 500);
  printRequestError(err, req, res);
  res.json({
    code: err.code,
    detail: err.message || err.detail,
  });
};

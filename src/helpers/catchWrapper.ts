/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express';

export const catchWrapper = (cb: Function) => (req: Request, res: Response, next: NextFunction) =>
  cb(req, res, next)?.catch(next);

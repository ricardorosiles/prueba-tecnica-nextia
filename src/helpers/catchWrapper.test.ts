import { Request, Response, NextFunction } from 'express';
import { catchWrapper } from './catchWrapper';

describe('get controller user', () => {
  it('should called the main function', async () => {
    const helloWorld = jest.fn();
    const req = {};
    const res = {};
    const next = jest.fn();

    catchWrapper(helloWorld)(req as Request, res as Response, next as NextFunction);
    expect(helloWorld).toBeCalledTimes(1);
  });

  it('should be called next funcion on catch', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const helloWorld = () => ({
      catch: next,
    });

    catchWrapper(helloWorld)(req as Request, res as Response, next as NextFunction);
    expect(next).toBeCalledTimes(1);
  });
});

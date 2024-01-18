/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';

type AllowURL = Array<{
  url: string;
  method: string;
}>;

export const removeLastChartSlash = (word: string) => {
  if (word.slice(-1) !== '/') return word;

  return word.substring(0, word.length - 1);
};

export const removeQueryParams = (word: string) => {
  if (!word.includes('?')) return word;

  const [url] = word.split('?');
  return url;
};

export const setWhitelist =
  (allowUrls: AllowURL, cb: Function) => (req: Request, res: Response, next: NextFunction) => {
    const UUID_REGEX = /((\w{4,12}-?)){5}/g;
    const url = removeQueryParams(req.url.replace(UUID_REGEX, ':id'));

    if (
      allowUrls.some(
        (allowUrl) =>
          removeLastChartSlash(url) === removeLastChartSlash(allowUrl.url) &&
          allowUrl.method === req.method,
      )
    ) {
      return next();
    }
    return cb(req, res, next);
  };

export const hasMatchUrl = (allowUrls: AllowURL, req: Request) => {
  const UUID_REGEX = /((\w{4,12}-?)){5}/g;
  const url = removeQueryParams(req.url.replace(UUID_REGEX, ':id'));
  return allowUrls.some(
    (allowUrl) =>
      removeLastChartSlash(url) === removeLastChartSlash(allowUrl.url) &&
      allowUrl.method === req.method,
  );
};

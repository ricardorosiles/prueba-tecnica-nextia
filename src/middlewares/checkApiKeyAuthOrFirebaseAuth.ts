import { Request, Response, NextFunction } from 'express';
import { ALLOWED_URLS, APPLICABLE_API_KEY_URLS } from '../constants/routesName';
import { catchWrapper } from '../helpers/catchWrapper';
import { hasMatchUrl, setWhitelist } from '../helpers/middleware';
import { checkApiKeyAuth } from './apiKeyAuth';
import { authentication } from './authentication';

export const checkApiKeyAuthOrFirebaseAuth =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (hasMatchUrl(APPLICABLE_API_KEY_URLS, req) && checkApiKeyAuth(req)) {
      next();
      return;
    }
    setWhitelist(ALLOWED_URLS, catchWrapper(authentication))(req, res, next);
  };

import httpStatus from '../httpStatus';

export default {
  INVALID_TOKEN: {
    httpCode: httpStatus.UNAUTHORIZED,
    code: 'not_authorized',
    detail: 'Invalid token',
  },
  NO_TOKEN_PROVIDED: {
    httpCode: httpStatus.UNAUTHORIZED,
    code: 'invalid_token',
    detail: 'No token provided',
  },
  NOT_AUTHORIZED: {
    httpCode: httpStatus.UNAUTHORIZED,
    code: 'not_enough_privileges',
    detail: 'Could not authorize',
  },
};

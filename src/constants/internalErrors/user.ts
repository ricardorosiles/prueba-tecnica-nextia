import httpStatus from '../httpStatus';

export default {
  CREATION: {
    httpCode: httpStatus.BAD_REQUEST,
    code: 'bad_user_request',
    detail: 'The correct data was not sent to create a user',
  },
  ALREADY_EXIST: {
    httpCode: httpStatus.CONFLICT,
    code: 'user_duplicated',
    detail: 'user already exists',
  },
  NOT_FOUND: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'user_not_found',
    detail: 'There is no user with the provided auth token',
  },
  NOT_FOUND_PASSWORD: {
    httpCode: httpStatus.CONFLICT,
    code: 'password_not_equals',
    detail: 'Password does not match',
  },
  EQUALS_PASSWORD: {
    httpCode: httpStatus.CONFLICT,
    code: 'password_equals',
    detail: 'The password you entered is the same as before.',
  },
  NOT_FOUND_ID: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'user_id_not_found',
    detail: 'There is no user with the provided id',
  },
  FORBIDDEN: {
    httpCode: httpStatus.FORBIDDEN,
    code: 'administrator_forbidden',
    detail: 'The user has not the administrators permissions',
  },
  NOT_FOUND_ALERTS: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'client_alerts_not_found',
    detail: 'There are not client alerts',
  },
  BAD_PARAMS: {
    httpCode: httpStatus.BAD_REQUEST,
    code: 'bad_user_params',
    detail: 'incorrect format in query params',
  },
  BAD_BODY: {
    httpCode: httpStatus.BAD_REQUEST,
    code: 'bad_user_params',
    detail: 'incorrect body',
  },
  BLOCKED_CREATION: {
    httpCode: httpStatus.CONFLICT,
    code: 'blocked_user_creation',
    detail: 'user could not be created',
  },
  FORBIDDEN_USER: {
    httpCode: httpStatus.FORBIDDEN,
    code: 'administrator_forbidden',
    detail: "The user has not the administrator's permissions",
  },
  BAD_GUEST_PARAMS: {
    httpCode: httpStatus.BAD_REQUEST,
    code: 'bad_client_guests_params',
    detail: 'Incorrect format in query params',
  },
  NOT_FOUND_GUESTS: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'not_client_guests_found',
    detail: 'There are not guests for the client',
  },
};

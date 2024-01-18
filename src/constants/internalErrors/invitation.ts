import httpStatus from '../httpStatus';

export default {
  CREATION: {
    httpCode: httpStatus.BAD_REQUEST,
    code: 'bad_user_request',
    detail: 'The correct data was not sent to create a invitation',
  },
  BLOCKED_CREATION: {
    httpCode: httpStatus.CONFLICT,
    code: 'blocked_user_creation',
    detail: 'invitation could not be created',
  },
  NOT_FOUND_ID: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'user_id_not_found',
    detail: 'There is no invitation with the provided id',
  },
  NOT_FOUND: {
    httpCode: httpStatus.NOT_FOUND,
    code: 'invitation_not_found',
    detail: 'There is no invitation with the provided auth token',
  },
};

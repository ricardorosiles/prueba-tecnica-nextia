export type InternalError = {
  httpCode: number;
  code: string;
  detail?: string;
};

export type CustomError = Error & InternalError;

export const throwNewError = (message: string, internalError: InternalError) => {
  const { httpCode, code, detail } = internalError;
  const error = new Error(message) as CustomError;
  error.httpCode = httpCode;
  error.code = code;
  error.detail = detail;
  throw error;
};

/* eslint-disable max-len */
import Validator, { SyncCheckFunction, AsyncCheckFunction } from 'fastest-validator';
import { throwNewError, InternalError } from './throwNewError';

type Check = SyncCheckFunction | AsyncCheckFunction;
type ItemCheck = {
  type: string;
  min?: number;
  max?: number;
};
export type Schema = {
  [key: string]:
    | {
        type: string;
        optional?: boolean;
        items?: string | ItemCheck;
        enum?: Array<string>;
        min?: number;
        max?: number;
        integer?: boolean;
      }
    | boolean
    | string
    | number;
};
const validator = new Validator();
const paramIdSchema = {
  $$strict: true,
  $$root: true,
  type: 'uuid',
};

export const errorValidator = async (data: any, checkFunction: Check, error: InternalError) => {
  const checkedData = await checkFunction(data);
  if (Array.isArray(checkedData) && checkedData.length > 0) {
    const concated = checkedData.map((res) => res.message).join(' ');
    throwNewError(concated, error);
  }
  return false;
};

export const generateValidatorFunc = (schema: Schema, internalError: InternalError) => {
  const checkFunction = validator.compile(schema);
  const isValidFunction = (data: any) => errorValidator(data, checkFunction, internalError);

  return isValidFunction;
};

export const generateArrayOfObjectSchema = (props: Array<{ name: string; type: string }>) => {
  const result: any = {
    type: 'array',
    items: {
      type: 'object',
      strict: true,
      props: {},
    },
    optional: true,
  };
  props.forEach((prop) => {
    result.items.props[prop.name] = { type: prop.type, optional: true };
    if (prop.name.slice(-3) === '_id') {
      result.items.props[prop.name].type = 'uuid';
    }
  });
  return result;
};

export const isValidParamId = (internalError: InternalError) =>
  generateValidatorFunc(paramIdSchema, internalError);

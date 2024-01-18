import { generateValidatorFunc, isValidParamId } from '../helpers/validator';
import * as verifier from './verifier';
import user from '../constants/internalErrors/user';

const userCreationBodySchema = verifier.typeMainObjectStrict({
  name: verifier.typeString(),
  last_name: verifier.typeString(),
  email: verifier.typeString(),
  department_number: verifier.typeString(),
  password: verifier.typeStringOptionalMax(50),
});

const userLoginSchema = verifier.typeMainObjectStrict({
  email: verifier.typeString(),
  password: verifier.typeString(),
});

export const isValidCreationUserBody = generateValidatorFunc(userCreationBodySchema, user.CREATION);
export const isValidUserLoginBody = generateValidatorFunc(userLoginSchema, user.BAD_BODY);
export const isValidUserId = isValidParamId(user.BAD_PARAMS);

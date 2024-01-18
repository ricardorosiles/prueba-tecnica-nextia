import { Request, Response } from 'express';
import { getUserIdByEmail, updatePasswordByEmail } from '../../services/user';
import { isValidUserLoginBody } from '../../validators/user';
import user from '../../constants/internalErrors/user';
import { throwNewError } from '../../helpers/throwNewError';
import { decryptPassword } from '../../helpers/encryptPassword';

export const recover = async (req: Request, res: Response) => {
  await isValidUserLoginBody(req.body);

  const { email, password } = req.body;

  const userFound = await getUserIdByEmail(email);
  if (!userFound) {
    throwNewError(user.NOT_FOUND.detail, user.NOT_FOUND);
    return;
  }

  const comparePassword = decryptPassword(password, userFound.password);

  if (comparePassword) {
    throwNewError(user.EQUALS_PASSWORD.detail, user.EQUALS_PASSWORD);
    return;
  }

  await updatePasswordByEmail(email, password);

  res.status(204);
  res.json({});
};

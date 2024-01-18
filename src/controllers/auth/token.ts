import { Request, Response } from 'express';
import { generateBearerToken } from '../../services/firebase';
import { getUserIdByEmail } from '../../services/user';
import user from '../../constants/internalErrors/user';
import { throwNewError } from '../../helpers/throwNewError';
import { isValidUserLoginBody } from '../../validators/user';
import { decryptPassword } from '../../helpers/encryptPassword';

export const token = async (req: Request, res: Response) => {
  await isValidUserLoginBody(req.body);

  const { email, password } = req.body;

  const userFound = await getUserIdByEmail(email);
  if (!userFound) {
    throwNewError(user.NOT_FOUND.detail, user.NOT_FOUND);
    return;
  }

  const comparePassword = decryptPassword(password, userFound.password);

  if (!comparePassword) {
    throwNewError(user.NOT_FOUND_PASSWORD.detail, user.NOT_FOUND_PASSWORD);
    return;
  }

  const token = await generateBearerToken(email);
  const newToken = token.split('Bearer ')[1];

  res.json({
    data: {
      ...userFound,
      token: newToken,
    },
  });
};

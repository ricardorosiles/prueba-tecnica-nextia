import { Request, Response } from 'express';
import user from '../../constants/internalErrors/user';
import { throwNewError } from '../../helpers/throwNewError';
import { createUserBySignUp, getUserIdByEmail } from '../../services/user';
import { isValidCreationUserBody } from '../../validators/user';

export const signUpWithEmail = async (req: Request, res: Response) => {
  await isValidCreationUserBody(req.body);

  const { name, last_name, email, department_number, password } = req.body;

  const newUser = {
    email,
    name,
    last_name,
    department_number,
    password,
  };

  const existUser = await getUserIdByEmail(email);
  if (existUser) {
    throwNewError(user.ALREADY_EXIST.detail, user.ALREADY_EXIST);
    return;
  }

  const userCreated = await createUserBySignUp(newUser);
  res.status(201);
  res.json({
    data: { ...userCreated },
  });
};

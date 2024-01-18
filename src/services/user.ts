import { database } from '../database';
import { decryptPassword, encryptPassword } from '../helpers/encryptPassword';
import { UserCreationAttributes, UserSignUpCreationAttributes } from '../models/user';
import { createFirebaseUserByEmail, generateBearerToken } from './firebase';

export const createOneUser = async (data: UserCreationAttributes) => {
  const { name, last_name, email, password, department_number, firebase_user_id } = data;
  const userCreated = await database.user.create({
    name,
    last_name,
    email,
    password,
    department_number,
    firebase_user_id,
  });
  return userCreated.toJSON();
};

export const getUserIdByEmail = async (email: string) => {
  const userFound = await database.user.findOne({ where: { email } });
  if (!userFound) return null;

  return userFound.toJSON();
};

export const createUserBySignUp = async (data: UserSignUpCreationAttributes) => {
  const { password, email } = data;

  const newPassword = await encryptPassword(password);
  const firebase_user_id = await createFirebaseUserByEmail(email, password);

  const user = await createOneUser({
    ...data,
    password: newPassword,
    firebase_user_id: firebase_user_id.uid,
  });

  const token = await generateBearerToken(email);

  const newToken = token.split('Bearer ')[1];

  return { ...user, token: newToken };
};

export const updatePasswordByEmail = async (email: string, passwordBody: string) => {
  const newPassword = await encryptPassword(passwordBody);

  const [isPasswordUpdated] = await database.user.update(
    { password: newPassword },
    {
      where: {
        email,
      },
    },
  );
  return Boolean[isPasswordUpdated];
};

export const findByUserIdFirebase = async (id: string) => {
  const foundUser = await database.user.findOne({
    attributes: ['id', 'name', 'email'],
    where: {
      firebase_user_id: id,
    },
  });
  if (!foundUser) return null;

  return foundUser;
};

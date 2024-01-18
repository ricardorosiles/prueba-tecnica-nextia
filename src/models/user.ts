import { Optional, ModelDefined, DataTypes, Sequelize, FindOptions } from 'sequelize';
import * as modelNames from '../constants/modelNames';

export type UserAttributes = {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  department_number: string | null;
  firebase_user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
};

export type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'name'
  | 'last_name'
  | 'email'
  | 'password'
  | 'department_number'
  | 'firebase_user_id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
>;
export type UserUpdateAttributes = Partial<UserAttributes>;
export type UserFindOptions = FindOptions<UserAttributes>;
export type UserDefined = ModelDefined<UserAttributes, UserCreationAttributes>;

export type UserSignUpCreationAttributes = UserCreationAttributes & {};

export const defineUserModel = (sequelize: Sequelize) => {
  const User: UserDefined = sequelize.define(
    modelNames.USER,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      department_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      firebase_user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: modelNames.USER,
      paranoid: true,
    },
  );

  return User;
};

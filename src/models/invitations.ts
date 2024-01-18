import { Optional, ModelDefined, DataTypes, Sequelize, FindOptions } from 'sequelize';
import * as modelNames from '../constants/modelNames';

export type InvitationAttributes = {
  id: string;
  name: string;
  invitation_time: string;
  invitation_expiration_date: string;
  description: string;
  user_id?: string;

  created_at: string;
  updated_at: string;
  deleted_at: null;
};

export type InvitationCreationAttributes = Optional<
  InvitationAttributes,
  | 'id'
  | 'name'
  | 'invitation_time'
  | 'invitation_expiration_date'
  | 'description'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
>;
export type InvitationUpdateAttributes = Partial<InvitationAttributes>;
export type InvitationFindOptions = FindOptions<InvitationAttributes>;
export type InvitationDefined = ModelDefined<InvitationAttributes, InvitationCreationAttributes>;

export type InvitationSignUpCreationAttributes = InvitationCreationAttributes & {};

export type InvitationFindAllResult = Pick<
  InvitationAttributes,
  'id' | 'name' | 'invitation_time' | 'invitation_expiration_date' | 'description'
>;

export const defineInvitationModel = (sequelize: Sequelize) => {
  const Invitation: InvitationDefined = sequelize.define(
    modelNames.INVITATION,
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
      invitation_time: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      invitation_expiration_date: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: modelNames.USER,
          key: 'id',
        },
      },
    },
    {
      tableName: modelNames.INVITATION,
      paranoid: true,
    },
  );

  return Invitation;
};

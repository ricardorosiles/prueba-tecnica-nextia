import { QueryInterface, DataTypes } from 'sequelize';
import { catchQueryInterface, getTableName } from '../util';

const TABLE_NAME = getTableName('invitation');
export const up = async (queryInterface: QueryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(
      TABLE_NAME,
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
            model: 'user',
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      { transaction },
    );
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    catchQueryInterface(err);
  }
};

export const down = async (queryInterface: QueryInterface) => {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(TABLE_NAME, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    catchQueryInterface(err);
  }
};

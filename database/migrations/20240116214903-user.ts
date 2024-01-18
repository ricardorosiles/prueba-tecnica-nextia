import { QueryInterface, DataTypes } from 'sequelize';
import { catchQueryInterface, getTableName } from '../util';

const TABLE_NAME = getTableName('user');
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

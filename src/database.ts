import { Sequelize, Dialect, Op } from 'sequelize';
import { logger } from './helpers/logger';
import { defineUserModel } from './models/user';
import { defineInvitationModel } from './models/invitations';

const {
  DATABASE_NAME = '',
  DATABASE_USERNAME = '',
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_PORT = '8080',
  DATABASE_LOGGING = 'false',
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  dialect: DATABASE_DIALECT as Dialect,
  define: {
    freezeTableName: true,
  },
  logging: DATABASE_LOGGING === 'true',
});

export const database = {
  sequelize,
  Op,
  user: defineUserModel(sequelize),
  invitation: defineInvitationModel(sequelize),
};

(Sequelize as any).postgres.DECIMAL.parse = (value: any) => parseFloat(`${value}`);
(Sequelize as any).postgres.BIGINT.parse = (value: any) => parseInt(`${value}`, 10);

export const closeDatabase = () => sequelize.close();

sequelize
  .authenticate()
  .then(async () => {
    logger.info('db authenticate success');
    // await initRedis();
  })
  .catch((err) => logger.error(`db authenticate error: ${err.message}`));

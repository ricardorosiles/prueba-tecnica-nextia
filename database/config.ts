import dotenv from 'dotenv';

dotenv.config({ path: `./${process.env.NODE_ENV || 'development'}.env` });
const DEFAULT_SCHEMA = 'public';
process.env.DATABASE_SCHEMA = process.env.DATABASE_SCHEMA || DEFAULT_SCHEMA;

export const username = process.env.DATABASE_USERNAME;
export const password = process.env.DATABASE_PASSWORD;
export const database = process.env.DATABASE_NAME;
export const host = process.env.DATABASE_HOST;
export const port = process.env.DATABASE_PORT;
export const dialect = process.env.DATABASE_DIALECT;
export const seederStorage = 'sequelize';
export const seederStorageTableName = 'SequelizeSeederHistory';
export const migrationStorageTableName = 'SequelizeMigrationHistory';
export const logging = process.env.DATABASE_LOGGING === 'true';

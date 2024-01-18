import { generateValidatorFunc } from '../helpers/validator';
import * as verifier from './verifier';

const AVAILABLE_SCHEMES = ['public', 'testdb'];
const NODE_ENVS = ['development', 'production', 'staging', 'test'];
const DATABASE_DIALECTS = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake'];

const schema = verifier.typeMainObject({
  NODE_ENV: verifier.typeStringEnum(NODE_ENVS),
  DATABASE_NAME: verifier.typeString(),
  DATABASE_USERNAME: verifier.typeString(),
  DATABASE_PASSWORD: verifier.typeString(),
  DATABASE_HOST: verifier.typeString(),
  DATABASE_PORT: verifier.typeNumber(),
  PORT: verifier.typeNumber(),
  DATABASE_DIALECT: verifier.typeStringEnum(DATABASE_DIALECTS),

  DATABASE_SCHEMA: verifier.typeStringOptionalEnum(AVAILABLE_SCHEMES),
});

export const isValidEnvFile = generateValidatorFunc(schema, {
  httpCode: -1,
  code: 'ENV_FILE_001',
  detail: 'required environment variables are missing or some variable is not valid',
});

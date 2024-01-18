import dotenv from 'dotenv';
import { isValidEnvFile } from '../validators/environment';

dotenv.config({ path: `./${process.env.NODE_ENV || 'development'}.env` });

isValidEnvFile({
  ...process.env,
  PORT: parseInt(process.env.PORT as string, 10),
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT as string, 10),
});

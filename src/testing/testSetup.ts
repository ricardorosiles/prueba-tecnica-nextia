import dotenv from 'dotenv';
import { APY_KEY_NAME } from '../middlewares/apiKeyAuth';

dotenv.config({ path: `./${process.env.NODE_ENV || 'development'}.env` });

// eslint-disable-next-line import/first
import { generateToken } from '../services/firebase';

const testSetup = async () => {
  process.env.TOKEN = await generateToken();
};

export const getApiTokenHeader = () => ({
  [APY_KEY_NAME]: process.env.FUNCTIONS_API_KEY as string,
});

export const getBearerToken = () => `Bearer ${process.env.TOKEN}`;
export const getTemporalUserEmail = () => `${process.env.TEMPORAL_USER_EMAIL}`;
export const getBillingEmail = () => `${process.env.BILLING_EMAIL}`;

export const getBearerTokenHeader = () => ({
  authorization: getBearerToken(),
});

export default testSetup;

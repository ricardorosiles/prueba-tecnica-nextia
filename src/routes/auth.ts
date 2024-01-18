import express from 'express';

import {
  POST_AUTH_SIGN_UP_EMAIL,
  POST_AUTH_LOGIN,
  PATCH_AUTH_RECOVERY_PASSWORD,
} from '../constants/routesName';
import { catchWrapper } from '../helpers/catchWrapper';
import { signUpWithEmail } from '../controllers/auth/signUp';
import { token } from '../controllers/auth/token';
import { recover } from '../controllers/auth/recover';

export const auth = express.Router();

auth.post(POST_AUTH_SIGN_UP_EMAIL.url, catchWrapper(signUpWithEmail));
auth.post(POST_AUTH_LOGIN.url, catchWrapper(token));
auth.patch(PATCH_AUTH_RECOVERY_PASSWORD.url, catchWrapper(recover));

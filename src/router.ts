import express from 'express';
import { auth } from './routes/auth';
import { invitation } from './routes/invitation';

export const router = express.Router();

router.use(auth);
router.use(invitation);

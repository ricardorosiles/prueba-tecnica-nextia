import express from 'express';
import {
  GET_ALL_INVITATIONS,
  GET_INVITATIONS,
  POST_INVITATION_CREATE,
} from '../constants/routesName';
import { catchWrapper } from '../helpers/catchWrapper';
import { createInvitation } from '../controllers/invitation/create';
import { readAll, readOne } from '../controllers/invitation/read';

export const invitation = express.Router();

invitation.post(POST_INVITATION_CREATE.url, catchWrapper(createInvitation));
invitation.get(GET_INVITATIONS.url, catchWrapper(readOne));
invitation.get(GET_ALL_INVITATIONS.url, catchWrapper(readAll));

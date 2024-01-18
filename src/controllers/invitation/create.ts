import { Request, Response } from 'express';
import { create } from '../../services/invitation';
import { isValidCreationInvitationBody } from '../../validators/invitation';
import { throwNewError } from '../../helpers/throwNewError';
import user from '../../constants/internalErrors/user';

export const createInvitation = async (req: Request, res: Response) => {
  const { user_id } = res.locals.token;
  console.log(user_id);
  await isValidCreationInvitationBody(req.body);
  const invitation = await create(req.body, user_id);

  if (!invitation) {
    throwNewError(user.NOT_FOUND.detail, user.NOT_FOUND);
    return;
  }

  res.status(201);
  res.json({
    data: invitation,
  });
};

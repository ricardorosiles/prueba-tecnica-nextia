import { Request, Response } from 'express';
import { isValidUserId } from '../../validators/user';
import { throwNewError } from '../../helpers/throwNewError';
import invitation from '../../constants/internalErrors/invitation';
import { findAll, findOneById } from '../../services/invitation';

export const readOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await isValidUserId(id);

  const userFound = await findOneById(id);
  if (!userFound) {
    throwNewError(invitation.NOT_FOUND_ID.detail, invitation.NOT_FOUND_ID);
    return;
  }

  res.json({
    data: userFound,
  });
};

export const readAll = async (req: Request, res: Response) => {
  // await isValidReadAllType(req.query);
  const itemFounded = await findAll(req.query);
  console.log(itemFounded);
  if (itemFounded.data.length === 0) {
    throwNewError('invitations not found', invitation.NOT_FOUND);
    return;
  }
  res.json(itemFounded);
};

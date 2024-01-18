import { Request, Response } from 'express';
import invitation from '../../constants/internalErrors/invitation';
import { throwNewError } from '../../helpers/throwNewError';
import { updateById } from '../../services/invitation';

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  const invitationUpdated = await updateById(id, req.body);
  if (!invitationUpdated) {
    throwNewError('invitation not found', invitation.NOT_FOUND);
    return;
  }
  res.json({
    data: invitationUpdated,
  });
};

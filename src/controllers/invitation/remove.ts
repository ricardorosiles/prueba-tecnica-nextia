import { Request, Response } from 'express';
import invitation from '../../constants/internalErrors/invitation';
import { throwNewError } from '../../helpers/throwNewError';
import { removeById } from '../../services/invitation';

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const removedPlan = await removeById(id);

  if (!removedPlan) {
    throwNewError('invitation not found', invitation.NOT_FOUND);
    return;
  }
  res.json({
    data: removedPlan,
  });
};

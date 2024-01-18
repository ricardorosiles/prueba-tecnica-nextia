import { InvitationAttributes } from '../models/invitations';
import { database } from '../database';

export const createOneInvitation = async (data: InvitationAttributes) => {
  const invitationCreated = await database.invitation.create(data);
  return invitationCreated.toJSON();
};

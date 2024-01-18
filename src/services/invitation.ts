import { database } from '../database';
import { getLimitAndOffset } from '../helpers/pagination';
import { InvitationAttributes, InvitationFindAllResult } from '../models/invitations';
import { createOneInvitation } from '../providers/invitation';
import { findByUserIdFirebase } from './user';

export type InvitationFilterParams = {
  page?: string;
  page_size?: string;
  search?: string;
};

export const create = async (data: InvitationAttributes, userId: string) => {
  const user = await findByUserIdFirebase(userId);
  console.log(user);

  if (!user.toJSON()) return null;

  const invitation = await createOneInvitation({ ...data, user_id: user.toJSON().id });

  return invitation;
};

export const findOneById = async (id: string) => {
  const userFound = await database.user.findOne({
    include: {
      model: database.invitation,
      where: { id },
    },
  });
  return userFound;
};

export const findAll = async (params: InvitationFilterParams) => {
  const { page, page_size, search } = params;
  const { limit, offset } = getLimitAndOffset(page, page_size);

  const query: any = {
    limit,
    offset,
    where: {},
    include: [
      {
        model: database.invitation,
      },
    ],
  };

  if (search && search !== '') {
    query.where.name = {
      [database.Op.iLike]: `%${search?.trim()}%`,
    };
  }

  const invitationData = await database.user.findAndCountAll(query);

  return {
    count: invitationData.count,
    data: invitationData.rows.map((invitation) => invitation.toJSON()),
  };
};

export const destroyInvitationById = async (id: string) => {
  const invitationDeleted = await database.invitation.destroy({ where: { id } });
  return Boolean(invitationDeleted);
};

export const updateInvitationById = async (id: string, data: any) => {
  const [isUpdated] = await database.invitation.update(data, {
    where: { id },
  });
  return Boolean(isUpdated);
};

export const getFullInvitationById = async (id: string) => {
  const invitationFound = await database.invitation.findOne({ where: { id } });
  if (!invitationFound) return null;

  return invitationFound.toJSON();
};

export const removeById = async (id: string) => destroyInvitationById(id);

export const updateById = async (id: string, data: any) => {
  const isUpdated = await updateInvitationById(id, data);
  if (!isUpdated) return null;
  return getFullInvitationById(id);
};

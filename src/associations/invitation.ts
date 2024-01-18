import { database } from '../database';

const init = () => {
  database.user.hasMany(database.invitation, {
    foreignKey: database.invitation.getAttributes().user_id.field,
    sourceKey: database.user.getAttributes().id.field,
  });
};

export default init();

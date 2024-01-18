import { generateValidatorFunc } from '../helpers/validator';
import * as verifier from './verifier';
import invitation from '../constants/internalErrors/invitation';

const invitationCreationBodySchema = verifier.typeMainObjectStrict({
  name: verifier.typeString(),
  invitation_time: verifier.typeString(),
  invitation_expiration_date: verifier.typeString(),
  description: verifier.typeString(),
});

export const isValidCreationInvitationBody = generateValidatorFunc(
  invitationCreationBodySchema,
  invitation.CREATION,
);

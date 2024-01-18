type ArrayAllowedURL = Array<{
  url: string;
  method: string;
}>;

export const POST_AUTH_LOGIN = { url: '/v1/auth/token', method: 'POST' };
export const PATCH_AUTH_RECOVERY_PASSWORD = { url: '/v1/auth/recovery-password', method: 'PATCH' };
export const POST_AUTH_SIGN_UP_EMAIL = { url: '/v1/auth/sign-up/email', method: 'POST' };

export const POST_INVITATION_CREATE = { url: '/v1/invitation', method: 'POST' };
export const GET_INVITATIONS = { url: '/v1/invitation/:id', method: 'GET' };
export const GET_ALL_INVITATIONS = { url: '/v1/invitation', method: 'GET' };

export const ALLOWED_URLS: ArrayAllowedURL = [
  POST_AUTH_LOGIN,
  PATCH_AUTH_RECOVERY_PASSWORD,
  POST_AUTH_SIGN_UP_EMAIL,
];

export const APPLICABLE_API_KEY_URLS: ArrayAllowedURL = [];

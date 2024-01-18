/* eslint-disable import/prefer-default-export */
export const AUTH_PROVIDERS = {
  PASSWORD: 'password',
  CUSTOM: 'custom',
  GOOGLE: 'google.com',
  FACEBOOK: 'facebook.com',
  APPLE: 'apple.com',
};

export const SIGNUP_TYPES = ['web', 'app'];

export const DEFAULT_EMAIL_PASSWORD = 'Q!W@E#R$T%Y^U&I*I*';

export enum BasicAuthProviderEnum {
  DOC_SOLUTIONS = 'doc_solutions',
  AVR_BILLING = 'avr_billing',
}

export const BASIC_AUTH_PROVIDERS = {
  [BasicAuthProviderEnum.DOC_SOLUTIONS]: {
    auth_username: `${process.env.BAUTH_DOCS_USERNAME}`,
    auth_password: `${process.env.BAUTH_DOCS_PASSWORD}`,
  },
  [BasicAuthProviderEnum.AVR_BILLING]: {
    auth_username: `${process.env.BAUTH_AVR_USERNAME}`,
    auth_password: `${process.env.BAUTH_AVR_PASSWORD}`,
  },
};

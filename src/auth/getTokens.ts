import { TOKENS } from './constants';

export function getTokens() {
  return {
    accessToken: TOKENS.accessToken,
    refreshToken: TOKENS.refreshToken,
    expiration: TOKENS.expiration,
  };
}

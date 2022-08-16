export type RequestKakaoOauthBody = {
  authorizationCode: string;
  redirectUri: string;
};

export type RequesNaverOauthBody = {
  authorizationCode: string;
  redirectUri: string;
  state: string;
};

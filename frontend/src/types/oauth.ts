export type OAuthUserInfo = {
  platformId: number;
  email: string;
  username: string;
  profileImageUrl: string;
};

export type RequestOauthLoginBody = OAuthUserInfo & {
  platformType: "KAKAO" | "NAVER" | "GOOGLE";
};

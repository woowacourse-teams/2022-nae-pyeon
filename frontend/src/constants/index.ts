import { colors } from "@/styles/theme";

const REGEX = {
  EMAIL: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/,
  USERNAME: /^.{1,64}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/,
  TEAM_NAME: /^.{1,20}$/,
  TEAM_NICKNAME: /^.{1,20}$/,
  TEAM_DESCRIPTION: /^.{1,80}$/,
  ROLLINGPAPER_TITLE: /^.{1,20}$/,
};

const COLORS = {
  GREEN: {
    value: colors.LIGHT_GREEN_300,
    name: "연두색",
  },
  RED: { value: colors.RED_300, name: "빨간색" },
  YELLOW: { value: colors.YELLOW_300, name: "노란색" },
  BLUE: { value: colors.SKY_BLUE_300, name: "파란색" },
  PURPLE: { value: colors.PURPLE_300, name: "보라색" },
  PINK: { value: colors.PINK_300, name: "핑크색" },
};

const TOTAL_TEAMS_PAGING_COUNT = 5;

const MYPAGE_ROLLINGPAPER_PAGING_COUNT = 5;
const MYPAGE_MESSAGE_PAGING_COUNT = 5;

const MY_TEAM_COUNT = 5;
const MAIN_PAGE_ROLLINGPAPER_COUNT = 5;

const SOCIAL_LOGIN_PLATFORM = {
  KAKAO: "KAKAO",
  NAVER: "NAVER",
  GOOGLE: "GOOGLE",
} as const;

const KAKAO_OAUTH_URL = {
  AUTHORIZE_CODE: (inviteCode = "") =>
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&response_type=code&state=${inviteCode}`,
  TOKEN: (authorize_code: string) =>
    `https://kauth.kakao.com/oauth/token?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&grant_type=authorization_code&client_secret=${process.env.KAKAO_CLIENT_SECRET}&code=${authorize_code}`,
  USER_INFO:
    'https://kapi.kakao.com/v2/user/me?secure_resource=true&property_keys=["kakao_account.profile","kakao_account.email"]',
};

const GOOGLE_OAUTH_URL = {
  AUTHORIZE_CODE: (inviteCode = "") =>
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&response_type=code&state=${inviteCode}`,
};

const RECIPIENT = {
  TEAM: "TEAM",
  MEMBER: "MEMBER",
} as const;

const COOKIE_KEY = {
  ACCESS_TOKEN: "accessToken",
} as const;

export {
  REGEX,
  COLORS,
  TOTAL_TEAMS_PAGING_COUNT,
  MYPAGE_ROLLINGPAPER_PAGING_COUNT,
  MYPAGE_MESSAGE_PAGING_COUNT,
  MY_TEAM_COUNT,
  MAIN_PAGE_ROLLINGPAPER_COUNT,
  SOCIAL_LOGIN_PLATFORM,
  KAKAO_OAUTH_URL,
  GOOGLE_OAUTH_URL,
  RECIPIENT,
  COOKIE_KEY,
};

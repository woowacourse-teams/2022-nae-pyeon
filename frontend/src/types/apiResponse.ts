import {
  Rollingpaper,
  Message,
  ReceivedRollingpaper,
  SentMessage,
  User,
  Team,
  TeamMember,
} from "@/types";

// Kakao OAuth
export interface PostKakaoOauthResponse {
  accessToken: string;
  refreshToken: string;
  id: User["id"];
}

// Google OAuth
export interface PostGoogleOauthResponse {
  accessToken: string;
  refreshToken: string;
  id: User["id"];
}

// member
export interface GetUserProfileResponse extends User {}

export interface GetMyReceivedRollingpapersResponse {
  totalCount: number;
  currentPage: number;
  rollingpapers: ReceivedRollingpaper[];
}

export interface GetMySentMessagesResponse {
  totalCount: number;
  currentPage: number;
  messages: SentMessage[];
}

// message
export interface PostMessageResponse {
  id: Message["id"];
}

// rollingpaper
export interface GetRollingpaperResponse extends Rollingpaper {}

export interface PostTeamRollingpaperResponse {
  id: Rollingpaper["id"];
}

export interface PostMemberRollingpaperResponse {
  id: Rollingpaper["id"];
}

// team
export interface GetTeamResponse extends Team {}

export interface GetTeamWithInviteCodeResponse extends Team {}

export interface GetMyTeamsResponse {
  totalCount: number;
  currentPage: number;
  teams: Team[];
}

export interface GetTeamSearchResultResponse {
  totalCount: number;
  currentPage: number;
  teams: Team[];
}

export interface GetTeamMembersResponse {
  members: TeamMember[];
}

export interface GetTeamRollingpapersResponse {
  rollingpapers: Pick<Rollingpaper, "id" | "title" | "to" | "recipient">[];
}

export interface GetTeamMyNicknameResponse {
  nickname: TeamMember["nickname"];
}

export interface PostTeamResponse {
  id: Team["id"];
}

export interface PostTeamWithInviteCodeResponse {
  inviteCode: string;
}

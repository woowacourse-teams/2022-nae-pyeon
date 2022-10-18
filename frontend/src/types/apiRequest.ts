import { Message, Rollingpaper, Team, TeamMember } from ".";

// oauth
export interface OauthRequest {
  authorizationCode: string;
  redirectUri: string;
}

// member
export interface GetMyReceivedRollingpapersRequest {
  page: number;
  count: number;
}

export interface GetMySentMessagesRequest {
  page: number;
  count: number;
}

// message
export interface PostMessageRequest
  extends Pick<Message, "content" | "color" | "anonymous" | "secret"> {
  rollingpaperId: Rollingpaper["id"];
}
export interface PutMessageRequest
  extends Pick<Message, "id" | "content" | "color" | "anonymous" | "secret"> {
  rollingpaperId: Rollingpaper["id"];
}

export interface DeleteMessageRequest {
  rollingpaperId: Rollingpaper["id"];
  id: Message["id"];
}

export interface PostLikeRequest {
  rollingpaperId: Rollingpaper["id"];
  id: Message["id"];
}

export interface DeleteLikeRequest {
  rollingpaperId: Rollingpaper["id"];
  id: Message["id"];
}

// rollingpaper
export interface GetRollingpaperRequest {
  teamId: Team["id"];
  id: Rollingpaper["id"];
}

export interface PostTeamRollingpaperRequest {
  teamId: Team["id"];
  title: Rollingpaper["title"];
}

export interface PostMemberRollingpaperRequest {
  teamId: Team["id"];
  title: Rollingpaper["title"];
  addresseeId: TeamMember["id"];
}

// teams
export interface GetTeamSearchResultRequest {
  keyword: string;
  count: number;
}

export interface PostTeamRequest extends Omit<Team, "id" | "joined"> {
  nickname: TeamMember["nickname"];
}

export interface PostTeamMemberRequest extends TeamMember {}
export interface PostTeamMemberWithInviteCodeRequest {
  inviteCode: string;
  nickname: TeamMember["nickname"];
}

export interface PutTeamNicknameRequest extends TeamMember {}

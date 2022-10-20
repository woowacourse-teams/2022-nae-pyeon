import {
  User,
  Message,
  Recipient,
  Rollingpaper,
  Team,
  TeamMember,
  ValueOf,
  Notification,
} from ".";
import { ROLLINGPAPER_ORDER } from "@/constants";

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

export interface PutMyUsernameRequest {
  username: User["username"];
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

export interface GetTeamRollingpapersRequest {
  id: Team["id"];
  order?: ValueOf<typeof ROLLINGPAPER_ORDER>;
  filter?: Lowercase<Recipient>;
}

export interface PostTeamRequest extends Omit<Team, "id" | "joined"> {
  nickname: TeamMember["nickname"];
}

export interface PostTeamMemberRequest extends TeamMember {}

export interface PostTeamInviteCodeRequest {
  id: Team["id"];
}
export interface PostTeamMemberWithInviteCodeRequest {
  inviteCode: string;
  nickname: TeamMember["nickname"];
}

// notification

export interface PutNotificationRequest {
  id: Notification["id"];
}

export interface PutTeamNicknameRequest extends TeamMember {}

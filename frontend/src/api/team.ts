import { appClient, requestApi } from "@/api";

import { Team, TeamMember } from "@/types";
import { ApiOptions } from "@/types/api";

import {
  GetTeamSearchResultRequest,
  PostTeamRequest,
  PostTeamMemberWithInviteTokenRequest,
} from "@/types/apiRequest";

import {
  GetTeamResponse,
  GetTeamWithInviteTokenResponse,
  GetMyTeamsResponse,
  GetTeamSearchResultResponse,
  GetTeamMembersResponse,
  GetTeamRollingpapersResponse,
  GetTeamMyNicknameResponse,
  PostTeamResponse,
  PostTeamInviteTokenResponse,
} from "@/types/apiResponse";

const getTeam = async (id: Team["id"], options?: ApiOptions) =>
  requestApi<GetTeamResponse>(() => appClient.get(`/teams/${id}`), options);

const getTeamWithInviteToken = async (
  inviteToken: string,
  options?: ApiOptions
) =>
  requestApi<GetTeamWithInviteTokenResponse>(
    () => appClient.get(`/teams/invite?inviteToken=${inviteToken}`),
    options
  );

const getMyTeams =
  (teamPageCount = 5, options?: ApiOptions) =>
  async ({ pageParam = 0 }) =>
    requestApi<GetMyTeamsResponse>(
      () => appClient.get(`teams/me?page=${pageParam}&count=${teamPageCount}`),
      options
    );

const getTeamSearchResult =
  ({ keyword, count }: GetTeamSearchResultRequest, options?: ApiOptions) =>
  async ({ pageParam = 0 }) =>
    requestApi<GetTeamSearchResultResponse>(
      () =>
        appClient.get(
          `teams?keyword=${keyword}&page=${pageParam}&count=${count}`
        ),
      options
    );

const getTeamMembers = async (id: Team["id"], options?: ApiOptions) =>
  requestApi<GetTeamMembersResponse>(
    () => appClient.get(`/teams/${id}/members`),
    options
  );

const getTeamRollingpapers = async (id: Team["id"], options?: ApiOptions) =>
  requestApi<GetTeamRollingpapersResponse>(
    () => appClient.get(`/teams/${id}/rollingpapers`),
    options
  );

const getTeamMyNickname = async (id: Team["id"], options?: ApiOptions) =>
  requestApi<GetTeamMyNicknameResponse>(
    () => appClient.get(`/teams/${id}/me`).then((response) => response.data),
    options
  );

const postTeam = async (
  { name, description, emoji, color, nickname, secret }: PostTeamRequest,
  options?: ApiOptions
) =>
  requestApi<PostTeamResponse>(
    () =>
      appClient.post("/teams", {
        name,
        description,
        emoji,
        color,
        nickname,
        secret,
      }),
    options
  );

const postTeamMember = async (
  { id, nickname }: TeamMember,
  options?: ApiOptions
) => requestApi(() => appClient.post(`/teams/${id}`, { nickname }), options);

const postTeamMemberWithInviteToken = async (
  { inviteToken, nickname }: PostTeamMemberWithInviteTokenRequest,
  options?: ApiOptions
) =>
  requestApi(
    () =>
      appClient.post(`/teams/invite/join`, {
        inviteToken,
        nickname,
      }),
    options
  );

const postTeamInviteToken = async (id: Team["id"], options?: ApiOptions) =>
  requestApi<PostTeamInviteTokenResponse>(
    () => appClient.post(`/teams/${id}/invite`),
    options
  );

const putTeamNickname = async (
  { id, nickname }: TeamMember,
  options?: ApiOptions
) => requestApi(() => appClient.put(`/teams/${id}/me`, { nickname }), options);

export {
  getMyTeams,
  getTeamSearchResult,
  getTeam,
  getTeamMembers,
  getTeamRollingpapers,
  getTeamWithInviteToken,
  getTeamMyNickname,
  postTeam,
  postTeamMember,
  postTeamMemberWithInviteToken,
  postTeamInviteToken,
  putTeamNickname,
};

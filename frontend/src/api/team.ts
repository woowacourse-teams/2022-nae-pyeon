import { appClient, requestApi } from "@/api";

import { Team, TeamMember } from "@/types";

import {
  GetTeamSearchResultRequest,
  PostTeamRequest,
  PostTeamMemberWithInviteCodeRequest,
} from "@/types/apiRequest";

const getTeam = async (id: Team["id"]) =>
  requestApi(() => appClient.get(`/teams/${id}`));

const getTeamWithInviteCode = async (inviteCode: string) =>
  requestApi(() => appClient.get(`/teams/invite?inviteCode=${inviteCode}`));

const getMyTeams =
  (teamPageCount = 5) =>
  async ({ pageParam = 0 }) =>
    requestApi(() =>
      appClient.get(`teams/me?page=${pageParam}&count=${teamPageCount}`)
    );

const getTeamSearchResult =
  ({ keyword, count }: GetTeamSearchResultRequest) =>
  async ({ pageParam = 0 }) =>
    requestApi(() =>
      appClient.get(`teams?keyword=${keyword}&page=${pageParam}&count=${count}`)
    );

const getTeamMembers = async (id: Team["id"]) =>
  requestApi(() => appClient.get(`/teams/${id}/members`));

const getTeamRollingpapers = async (id: Team["id"]) =>
  requestApi(() => appClient.get(`/teams/${id}/rollingpapers`));

const getTeamMyNickname = async (id: Team["id"]) =>
  requestApi(() => appClient.get(`/teams/${id}/me`));

const postTeam = async ({
  name,
  description,
  emoji,
  color,
  nickname,
  secret,
}: PostTeamRequest) =>
  requestApi(() =>
    appClient.post("/teams", {
      name,
      description,
      emoji,
      color,
      nickname,
      secret,
    })
  );

const postTeamMember = async ({ id, nickname }: TeamMember) =>
  requestApi(() => appClient.post(`/teams/${id}`, { nickname }));

const postTeamMemberWithInviteCode = async ({
  inviteCode,
  nickname,
}: PostTeamMemberWithInviteCodeRequest) =>
  requestApi(() =>
    appClient.post(`/teams/invite/join`, {
      inviteCode,
      nickname,
    })
  );

const postTeamInviteCode = async (id: Team["id"]) =>
  requestApi(() => appClient.post(`/teams/${id}/invite`));

const putTeamNickname = async ({ id, nickname }: TeamMember) =>
  requestApi(() => appClient.put(`/teams/${id}/me`, { nickname }));

export {
  getMyTeams,
  getTeamSearchResult,
  getTeam,
  getTeamMembers,
  getTeamRollingpapers,
  getTeamWithInviteCode,
  getTeamMyNickname,
  postTeam,
  postTeamMember,
  postTeamMemberWithInviteCode,
  postTeamInviteCode,
  putTeamNickname,
};

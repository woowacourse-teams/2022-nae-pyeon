import { appClient } from "@/api";
import { Team } from "@/types";

interface SearchRequest {
  keyword: string;
  count: number;
}

const getMyTeams =
  (teamPageCount = 5) =>
  async ({ pageParam = 0 }) =>
    appClient
      .get(`teams/me?page=${pageParam}&count=${teamPageCount}`)
      .then((response) => response.data);

const getTeamSearchResult =
  ({ keyword, count }: SearchRequest) =>
  async ({ pageParam = 0 }) =>
    appClient
      .get(`teams?keyword=${keyword}&page=${pageParam}&count=${count}`)
      .then((response) => response.data);

const getTeam = (id: number) =>
  appClient.get(`/teams/${id}`).then((response) => response.data);

const getTeamMembers = (id: number) =>
  appClient.get(`/teams/${id}/members`).then((response) => response.data);

const getTeamRollingpapers = (id: number) =>
  appClient.get(`/teams/${id}/rollingpapers`).then((response) => {
    return response.data;
  });

const getTeamWithInviteToken = (inviteToken: string) =>
  appClient
    .get(`/teams/invite?inviteToken=${inviteToken}`)
    .then((response) => response.data);

const getTeamMyNickname = (id: number) =>
  appClient.get(`/teams/${id}/me`).then((response) => response.data);

const postTeam = ({
  name,
  description,
  emoji,
  color,
  nickname,
  secret,
}: Omit<Team, "id" | "joined">) =>
  appClient
    .post("/teams", {
      name,
      description,
      emoji,
      color,
      nickname,
      secret,
    })
    .then((response) => response.data);

const postTeamInviteToken = ({ id }: Pick<Team, "id">) =>
  appClient.post(`/teams/${id}/invite`).then((response) => response.data);

const putTeamNickname = ({ id, nickname }: Pick<Team, "id" | "nickname">) =>
  appClient
    .put(`/teams/${id}/me`, { nickname })
    .then((response) => response.data);

const postTeamMember = ({ id, nickname }: Pick<Team, "id" | "nickname">) =>
  appClient
    .post(`/teams/${id}`, { nickname })
    .then((response) => response.data);

const postTeamMemberWithInviteToken = ({
  inviteToken,
  nickname,
}: Pick<Team, "nickname"> & { inviteToken: string }) =>
  appClient
    .post(`/teams/invite/join`, { inviteToken, nickname })
    .then((response) => response.data);

export {
  getMyTeams,
  getTeamSearchResult,
  getTeam,
  getTeamMembers,
  getTeamRollingpapers,
  getTeamWithInviteToken,
  postTeam,
  getTeamMyNickname,
  postTeamMember,
  postTeamMemberWithInviteToken,
  postTeamInviteToken,
  putTeamNickname,
};

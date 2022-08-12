import { appClient } from "@/api";
import { Team } from "@/types";

interface TeamNicknameArgs {
  teamId: number;
  nickname: string;
}

interface SearchArgs {
  keyword: string;
  count: number;
}

const getMyTeams =
  (teamPageCount = 5) =>
  async ({ pageParam = 0 }) => {
    const data = appClient
      .get(`teams/me?page=${pageParam}&count=${teamPageCount}`)
      .then((response) => response.data);
    return data;
  };

const getTeamSearchResult =
  ({ keyword, count }: SearchArgs) =>
  async ({ pageParam = 0 }) => {
    const data = appClient
      .get(`teams?keyword=${keyword}&page=${pageParam}&count=${count}`)
      .then((response) => response.data);
    return data;
  };

const getTeam = (teamId: number) =>
  appClient.get(`/teams/${teamId}`).then((response) => response.data);

const getTeamMembers = (teamId: number) =>
  appClient.get(`/teams/${teamId}/members`).then((response) => response.data);

const getTeamRollingpapers = (teamId: number) =>
  appClient.get(`/teams/${teamId}/rollingpapers`).then((response) => {
    return response.data;
  });

const postTeam = ({
  teamName,
  teamDescription,
  emoji,
  color,
  nickname,
}: Omit<Team, "id">) =>
  appClient
    .post("/teams", {
      name: teamName,
      description: teamDescription,
      emoji,
      color,
      nickname,
    })
    .then((response) => response.data);

const postTeamNickname = ({ teamId, nickname }: TeamNicknameArgs) =>
  appClient
    .post(`/teams/${teamId}`, { nickname })
    .then((response) => response.data);

const putTeamNickname = ({ teamId, nickname }: TeamNicknameArgs) =>
  appClient
    .put(`/teams/${teamId}/me`, { nickname })
    .then((response) => response.data);

export {
  getMyTeams,
  getTeamSearchResult,
  getTeam,
  getTeamMembers,
  getTeamRollingpapers,
  postTeam,
  postTeamNickname,
  putTeamNickname,
};

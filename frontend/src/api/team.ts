import { appClient } from "@/api";
import { Team } from "@/types";
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

const getTeam = (id: number) =>
  appClient.get(`/teams/${id}`).then((response) => response.data);

const getTeamMembers = (id: number) =>
  appClient.get(`/teams/${id}/members`).then((response) => response.data);

const getTeamRollingpapers = (id: number) =>
  appClient.get(`/teams/${id}/rollingpapers`).then((response) => {
    return response.data;
  });

const postTeam = ({
  name,
  description,
  emoji,
  color,
  nickname,
}: Omit<Team, "id" | "joined">) =>
  appClient
    .post("/teams", {
      name,
      description,
      emoji,
      color,
      nickname,
    })
    .then((response) => response.data);

const postTeamNickname = ({ id, nickname }: Pick<Team, "id" | "nickname">) =>
  appClient
    .post(`/teams/${id}`, { nickname })
    .then((response) => response.data);

const putTeamNickname = ({ id, nickname }: Pick<Team, "id" | "nickname">) =>
  appClient
    .put(`/teams/${id}/me`, { nickname })
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

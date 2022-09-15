import axios from "axios";

import { appClient, handleApiError } from "@/api";
import ApiError from "@/util/ApiError";

import { ApiOptions, Team } from "@/types";

interface SearchRequest {
  keyword: string;
  count: number;
}

const getMyTeams =
  (teamPageCount = 5, options?: ApiOptions) =>
  async ({ pageParam = 0 }) => {
    try {
      const { data } = await appClient.get(
        `teams/me?page=${pageParam}&count=${teamPageCount}`
      );

      return data;
    } catch (error) {
      handleApiError({
        error,
        errorHandler: options?.onError,
      });
    }
  };

const getTeamSearchResult =
  ({ keyword, count }: SearchRequest, options?: ApiOptions) =>
  async ({ pageParam = 0 }) => {
    try {
      const { data } = await appClient.get(
        `teams?keyword=${keyword}&page=${pageParam}&count=${count}`
      );

      return data;
    } catch (error) {
      handleApiError({
        error,
        errorHandler: options?.onError,
      });
    }
  };

const getTeam = async (id: number, options?: ApiOptions) => {
  try {
    const { data } = await appClient.get(`/teams/${id}`);

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getTeamMembers = async (id: number, options?: ApiOptions) => {
  try {
    const { data } = await appClient.get(`/teams/${id}/members`);

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getTeamRollingpapers = async (id: number, options?: ApiOptions) => {
  try {
    const { data } = await appClient.get(`/teams/${id}/rollingpapers`);

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getTeamWithInviteToken = async (
  inviteToken: string,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.get(
      `/teams/invite?inviteToken=${inviteToken}`
    );

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const getTeamMyNickname = async (id: number, options?: ApiOptions) => {
  try {
    const { data } = await appClient
      .get(`/teams/${id}/me`)
      .then((response) => response.data);

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postTeam = async (
  {
    name,
    description,
    emoji,
    color,
    nickname,
    secret,
  }: Omit<Team, "id" | "joined">,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post("/teams", {
      name,
      description,
      emoji,
      color,
      nickname,
      secret,
    });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postTeamInviteToken = async (
  { id }: Pick<Team, "id">,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post(`/teams/${id}/invite`);

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postTeamMember = async (
  { id, nickname }: Pick<Team, "id" | "nickname">,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post(`/teams/${id}`, { nickname });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postTeamMemberWithInviteToken = async (
  { inviteToken, nickname }: Pick<Team, "nickname"> & { inviteToken: string },
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post(`/teams/invite/join`, {
      inviteToken,
      nickname,
    });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const putTeamNickname = async (
  { id, nickname }: Pick<Team, "id" | "nickname">,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.put(`/teams/${id}/me`, { nickname });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

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

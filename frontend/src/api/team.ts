import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

import { Team } from "@/types";

interface SearchRequest {
  keyword: string;
  count: number;
}

const getMyTeams =
  (teamPageCount = 5) =>
  async ({ pageParam = 0 }) => {
    try {
      const { data } = await appClient.get(
        `teams/me?page=${pageParam}&count=${teamPageCount}`
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const customError = error.response.data as ApiError;
        throw new ApiError(customError.errorCode, customError.message);
      }
    }
  };

const getTeamSearchResult =
  ({ keyword, count }: SearchRequest) =>
  async ({ pageParam = 0 }) => {
    try {
      const { data } = await appClient.get(
        `teams?keyword=${keyword}&page=${pageParam}&count=${count}`
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const customError = error.response.data as ApiError;
        throw new ApiError(customError.errorCode, customError.message);
      }
    }
  };

const getTeam = async (id: number) => {
  try {
    const { data } = await appClient.get(`/teams/${id}`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getTeamMembers = async (id: number) => {
  try {
    const { data } = await appClient.get(`/teams/${id}/members`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getTeamRollingpapers = async (id: number) => {
  try {
    const { data } = await appClient.get(`/teams/${id}/rollingpapers`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getTeamWithInviteToken = async (inviteToken: string) => {
  try {
    const { data } = await appClient.get(
      `/teams/invite?inviteToken=${inviteToken}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const getTeamMyNickname = async (id: number) => {
  try {
    const { data } = await appClient
      .get(`/teams/${id}/me`)
      .then((response) => response.data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postTeam = async ({
  name,
  description,
  emoji,
  color,
  nickname,
  secret,
}: Omit<Team, "id" | "joined">) => {
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
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postTeamInviteToken = async ({ id }: Pick<Team, "id">) => {
  try {
    const { data } = await appClient.post(`/teams/${id}/invite`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postTeamMember = async ({
  id,
  nickname,
}: Pick<Team, "id" | "nickname">) => {
  try {
    const { data } = await appClient.post(`/teams/${id}`, { nickname });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postTeamMemberWithInviteToken = async ({
  inviteToken,
  nickname,
}: Pick<Team, "nickname"> & { inviteToken: string }) => {
  try {
    const { data } = await appClient.post(`/teams/invite/join`, {
      inviteToken,
      nickname,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const putTeamNickname = async ({
  id,
  nickname,
}: Pick<Team, "id" | "nickname">) => {
  try {
    const { data } = await appClient.put(`/teams/${id}/me`, { nickname });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
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

import axios from "axios";

import { appClient } from "@/api";
import ApiError from "@/util/ApiError";

interface RequestPostRollingpaper {
  teamId: number;
  title: string;
  addresseeId: number;
}
const getRollingpaper = async (teamId: number, id: number) => {
  try {
    const { data } = await appClient.get(
      `/teams/${teamId}/rollingpapers/${id}`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postTeamRollingpaper = async ({
  teamId,
  title,
}: Omit<RequestPostRollingpaper, "addresseeId">) => {
  try {
    const { data } = await appClient.post(
      `/teams/${teamId}/team-rollingpapers`,
      {
        title,
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

const postMemberRollingpaper = async ({
  teamId,
  title,
  addresseeId,
}: RequestPostRollingpaper) => {
  try {
    const { data } = await appClient.post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const customError = error.response.data as ApiError;
      throw new ApiError(customError.errorCode, customError.message);
    }
  }
};

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

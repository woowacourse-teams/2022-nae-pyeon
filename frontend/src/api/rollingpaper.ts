import axios from "axios";

import { appClient, handleApiError } from "@/api";

import { ApiOptions } from "@/types";

interface RequestPostRollingpaper {
  teamId: number;
  title: string;
  addresseeId: number;
}
const getRollingpaper = async (
  teamId: number,
  id: number,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.get(
      `/teams/${teamId}/rollingpapers/${id}`
    );

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postTeamRollingpaper = async (
  { teamId, title }: Omit<RequestPostRollingpaper, "addresseeId">,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post(
      `/teams/${teamId}/team-rollingpapers`,
      {
        title,
      }
    );

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

const postMemberRollingpaper = async (
  { teamId, title, addresseeId }: RequestPostRollingpaper,
  options?: ApiOptions
) => {
  try {
    const { data } = await appClient.post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    });

    return data;
  } catch (error) {
    handleApiError({
      error,
      errorHandler: options?.onError,
    });
  }
};

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

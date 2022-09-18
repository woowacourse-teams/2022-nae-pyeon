import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types/api";

import {
  GetRollingpaperRequest,
  PostTeamRollingpaperRequest,
  PostMemberRollingpaperRequest,
} from "@/types/apiRequest";

import {
  GetRollingpaperResponse,
  PostMemberRollingpaperResponse,
  PostTeamRollingpaperResponse,
} from "@/types/apiResponse";

const getRollingpaper = async (
  { teamId, id }: GetRollingpaperRequest,
  options?: ApiOptions
) =>
  requestApi<GetRollingpaperResponse>(
    () => appClient.get(`/teams/${teamId}/rollingpapers/${id}`),
    options
  );

const postTeamRollingpaper = async (
  { teamId, title }: PostTeamRollingpaperRequest,
  options?: ApiOptions
) =>
  requestApi<PostTeamRollingpaperResponse>(
    () =>
      appClient.post(`/teams/${teamId}/team-rollingpapers`, {
        title,
      }),
    options
  );

const postMemberRollingpaper = async (
  { teamId, title, addresseeId }: PostMemberRollingpaperRequest,
  options?: ApiOptions
) =>
  requestApi<PostMemberRollingpaperResponse>(
    () =>
      appClient.post(`/teams/${teamId}/rollingpapers`, {
        title,
        addresseeId,
      }),
    options
  );

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

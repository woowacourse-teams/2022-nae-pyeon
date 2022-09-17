import { appClient, requestApi } from "@/api";

import { ApiOptions } from "@/types";
import {
  GetRollingpaperRequest,
  PostTeamRollingpaperRequest,
  PostMemberRollingpaperRequest,
} from "@/types/apiRequest";

const getRollingpaper = async (
  { teamId, id }: GetRollingpaperRequest,
  options?: ApiOptions
) =>
  requestApi(
    () => appClient.get(`/teams/${teamId}/rollingpapers/${id}`),
    options
  );

const postTeamRollingpaper = async (
  { teamId, title }: PostTeamRollingpaperRequest,
  options?: ApiOptions
) =>
  requestApi(
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
  requestApi(
    () =>
      appClient.post(`/teams/${teamId}/rollingpapers`, {
        title,
        addresseeId,
      }),
    options
  );

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

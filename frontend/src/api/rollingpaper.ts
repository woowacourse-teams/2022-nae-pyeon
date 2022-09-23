import { appClient, requestApi } from "@/api";

import {
  GetRollingpaperRequest,
  PostTeamRollingpaperRequest,
  PostMemberRollingpaperRequest,
} from "@/types/apiRequest";

const getRollingpaper = async ({ teamId, id }: GetRollingpaperRequest) =>
  requestApi(() => appClient.get(`/teams/${teamId}/rollingpapers/${id}`));

const postTeamRollingpaper = async ({
  teamId,
  title,
}: PostTeamRollingpaperRequest) =>
  requestApi(() =>
    appClient.post(`/teams/${teamId}/team-rollingpapers`, {
      title,
    })
  );

const postMemberRollingpaper = async ({
  teamId,
  title,
  addresseeId,
}: PostMemberRollingpaperRequest) =>
  requestApi(() =>
    appClient.post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    })
  );

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

import { appClient, requestApi } from "@/api";

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
) =>
  requestApi(
    () => appClient.get(`/teams/${teamId}/rollingpapers/${id}`),
    options
  );

const postTeamRollingpaper = async (
  { teamId, title }: Omit<RequestPostRollingpaper, "addresseeId">,
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
  { teamId, title, addresseeId }: RequestPostRollingpaper,
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

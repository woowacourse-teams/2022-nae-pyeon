import { appClient } from "@/api";

interface PostRollingpaperRequest {
  teamId: number;
  title: string;
  addresseeId: number;
}
const getRollingpaper = (teamId: number, id: number) =>
  appClient
    .get(`/teams/${teamId}/rollingpapers/${id}`)
    .then((response) => response.data);

const postTeamRollingpaper = ({
  teamId,
  title,
}: Omit<PostRollingpaperRequest, "addresseeId">) =>
  appClient
    .post(`/teams/${teamId}/team-rollingpapers`, {
      title,
    })
    .then((response) => response.data);

const postMemberRollingpaper = ({
  teamId,
  title,
  addresseeId,
}: PostRollingpaperRequest) =>
  appClient
    .post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    })
    .then((response) => response.data);

export { getRollingpaper, postTeamRollingpaper, postMemberRollingpaper };

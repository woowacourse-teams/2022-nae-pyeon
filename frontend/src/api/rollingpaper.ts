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

const postRollingpaper = ({
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

export { getRollingpaper, postRollingpaper };

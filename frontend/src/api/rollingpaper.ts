import { appClient } from "@/api";

interface PostRollingpaperArgs {
  teamId: number;
  title: string;
  addresseeId: number;
}
const getRollingpaper = (teamId: number, rollingpaperId: number) =>
  appClient
    .get(`/teams/${teamId}/rollingpapers/${rollingpaperId}`)
    .then((response) => response.data);

const postRollingpaper = ({
  teamId,
  title,
  addresseeId,
}: PostRollingpaperArgs) =>
  appClient
    .post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    })
    .then((response) => response.data);

export { getRollingpaper, postRollingpaper };

import { appClient } from "@/api";

interface PostRollingpaperProp {
  teamId: number;
  title: string;
  addresseeId: number;
}
const getRollingpaper = (teamId: number, rollingpaperId: number) =>
  appClient
    .get(`/teams/${teamId}/rollingpapers/${rollingpaperId}`)
    .then((response) => response.data);

const postNewRollingpaper = ({
  teamId,
  title,
  addresseeId,
}: PostRollingpaperProp) =>
  appClient
    .post(`/teams/${teamId}/rollingpapers`, {
      title,
      addresseeId,
    })
    .then((response) => response.data);

export { getRollingpaper, postNewRollingpaper };

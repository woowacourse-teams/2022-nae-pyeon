import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamRollingpapers } from "@/api/team";

import { GetTeamRollingpapersResponse } from "@/types/apiResponse";

const useReadTeamRollingpaper = (teamId: number) =>
  useQuery<GetTeamRollingpapersResponse, AxiosError>(
    ["rollingpaperList", teamId],
    () => getTeamRollingpapers(teamId)
  );

export default useReadTeamRollingpaper;

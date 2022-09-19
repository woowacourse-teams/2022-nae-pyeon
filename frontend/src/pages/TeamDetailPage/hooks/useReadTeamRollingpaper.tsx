import useCustomQuery from "@/api/useCustomQuery";

import { getTeamRollingpapers } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamRollingpapersResponse } from "@/types/apiResponse";

const useReadTeamRollingpaper = (teamId: number, options?: QueryOptions) =>
  useCustomQuery<GetTeamRollingpapersResponse>(
    ["rollingpaperList", teamId],
    () => getTeamRollingpapers(teamId),
    { ...options }
  );

export default useReadTeamRollingpaper;

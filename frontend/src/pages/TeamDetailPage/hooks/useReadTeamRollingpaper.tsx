import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamRollingpapers } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamRollingpapersResponse } from "@/types/apiResponse";

const useReadTeamRollingpaper = (teamId: number, options?: QueryOptions) =>
  useQuery<GetTeamRollingpapersResponse, AxiosError>(
    ["rollingpaperList", teamId],
    () => getTeamRollingpapers(teamId),
    { useErrorBoundary: !options?.onError, ...options }
  );

export default useReadTeamRollingpaper;

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeam } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamResponse } from "@/types/apiResponse";

const useReadTeamDetail = (teamId: number, options?: QueryOptions) =>
  useQuery<GetTeamResponse, AxiosError>(
    ["team", teamId],
    () => getTeam(teamId),
    {
      useErrorBoundary: !options?.onError,
      ...options,
    }
  );

export default useReadTeamDetail;

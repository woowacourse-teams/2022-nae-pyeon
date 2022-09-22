import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeam } from "@/api/team";

import { GetTeamResponse } from "@/types/apiResponse";

const useReadTeamDetail = (teamId: number) =>
  useQuery<GetTeamResponse, AxiosError>(
    ["team", teamId],
    () => getTeam(teamId),
    {
      useErrorBoundary: true,
    }
  );

export default useReadTeamDetail;

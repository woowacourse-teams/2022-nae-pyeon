import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMyNickname } from "@/api/team";

import { GetTeamMyNicknameResponse } from "@/types/apiResponse";
import { QueryOptions } from "@/types/api";

const useReadTeamNickname = (teamId: number, options?: QueryOptions) =>
  useQuery<GetTeamMyNicknameResponse, AxiosError>(
    ["team-nickname", teamId],
    () => getTeamMyNickname(teamId),
    {
      useErrorBoundary: !options?.onError,
      ...options,
    }
  );

export default useReadTeamNickname;

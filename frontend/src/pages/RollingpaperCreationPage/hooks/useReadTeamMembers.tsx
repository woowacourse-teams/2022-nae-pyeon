import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMembers } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamMembersResponse } from "@/types/apiResponse";

const useReadTeamMembers = (teamId: number, options: QueryOptions) =>
  useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      useErrorBoundary: !options?.onError,
      ...options,
    }
  );

export default useReadTeamMembers;

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

const useReadTeamMembers = (teamId: number) =>
  useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      useErrorBoundary: true,
    }
  );

export default useReadTeamMembers;

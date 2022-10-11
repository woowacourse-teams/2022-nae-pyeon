import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

const useReadTeamMembers = (
  teamId: number | null,
  onSuccess: (data: GetTeamMembersResponse) => void
) => {
  return useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId!),
    {
      onSuccess,
    }
  );
};
export default useReadTeamMembers;

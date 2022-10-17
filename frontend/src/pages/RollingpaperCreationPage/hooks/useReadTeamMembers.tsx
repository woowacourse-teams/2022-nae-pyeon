import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

interface UseReadTeamMembersParams {
  teamId: number | null;
  onSuccess: (data: GetTeamMembersResponse) => void;
}

const useReadTeamMembers = ({
  teamId,
  onSuccess,
}: UseReadTeamMembersParams) => {
  return useQuery<GetTeamMembersResponse, AxiosError>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId!),
    {
      onSuccess,
      enabled: !!teamId,
    }
  );
};
export default useReadTeamMembers;

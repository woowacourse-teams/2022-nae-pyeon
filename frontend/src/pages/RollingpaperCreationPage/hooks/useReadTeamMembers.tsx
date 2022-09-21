import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/api/team";

import { GetTeamMembersResponse } from "@/types/apiResponse";

interface UseReadTeamMembersArgs {
  teamId: number;
  onSuccess: (data: GetTeamMembersResponse) => void;
}

const useReadTeamMembers = ({ teamId, onSuccess }: UseReadTeamMembersArgs) => {
  return useQuery(["team-member", teamId], () => getTeamMembers(+teamId), {
    onSuccess,
  });
};

export default useReadTeamMembers;

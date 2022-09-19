import useCustomQuery from "@/api/useCustomQuery";

import { getTeamMembers } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamMembersResponse } from "@/types/apiResponse";

const useReadTeamMembers = (teamId: number, options: QueryOptions) => {
  return useCustomQuery<GetTeamMembersResponse>(
    ["team-member", teamId],
    () => getTeamMembers(+teamId),
    {
      ...options,
    }
  );
};

export default useReadTeamMembers;

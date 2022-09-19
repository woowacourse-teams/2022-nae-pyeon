import useCustomQuery from "@/api/useCustomQuery";

import { getTeamWithInviteToken } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamResponse } from "@/types/apiResponse";

const useTeamDetailWithInviteToken = (
  inviteToken: string,
  options: QueryOptions
) => {
  return useCustomQuery<GetTeamResponse>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { ...options }
  );
};

export default useTeamDetailWithInviteToken;

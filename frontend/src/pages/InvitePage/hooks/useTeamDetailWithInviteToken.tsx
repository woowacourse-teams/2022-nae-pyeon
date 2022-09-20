import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamWithInviteToken } from "@/api/team";

import { QueryOptions } from "@/types/api";
import { GetTeamResponse } from "@/types/apiResponse";

const useTeamDetailWithInviteToken = (
  inviteToken: string,
  options: QueryOptions
) => {
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { useErrorBoundary: !options?.onError, ...options }
  );
};

export default useTeamDetailWithInviteToken;

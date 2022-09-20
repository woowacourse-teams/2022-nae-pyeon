import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamWithInviteToken } from "@/api/team";
import { GetTeamResponse } from "@/types/apiResponse";

const useTeamDetailWithInviteToken = (inviteToken: string) => {
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    { useErrorBoundary: true }
  );
};

export default useTeamDetailWithInviteToken;

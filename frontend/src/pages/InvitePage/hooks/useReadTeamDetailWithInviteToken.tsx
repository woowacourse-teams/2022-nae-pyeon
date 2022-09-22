import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getTeamWithInviteToken } from "@/api/team";
import { GetTeamResponse } from "@/types/apiResponse";
import useCheckTeamJoined from "./useCheckTeamJoined";

const useReadTeamDetailWithInviteToken = (inviteToken: string) => {
  const handleTeamDetailWithInviteTokenSuccess = useCheckTeamJoined();
  return useQuery<GetTeamResponse, AxiosError>(
    ["teamDetailWithInviteToken", inviteToken],
    () => getTeamWithInviteToken(inviteToken),
    {
      onSuccess: handleTeamDetailWithInviteTokenSuccess,
      useErrorBoundary: true,
    }
  );
};

export default useReadTeamDetailWithInviteToken;
